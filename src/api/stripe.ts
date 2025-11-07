import { loadStripe } from '@stripe/stripe-js';

// Get Stripe public key from environment
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  console.error('❌ VITE_STRIPE_PUBLIC_KEY is not set in .env file!');
}

const stripePromise = STRIPE_PUBLIC_KEY ? loadStripe(STRIPE_PUBLIC_KEY) : null;

export interface CheckoutData {
  items: any[];
  customerInfo: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'paypal';
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
}

// Send order to N8n webhook
const sendOrderToN8n = async (orderData: any) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://amrio.app.n8n.cloud/webhook/orders/new';
  
  console.log('📤 Sending order to N8n webhook:', webhookUrl);
  console.log('📦 Payload:', JSON.stringify(orderData, null, 2));
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log('📥 N8n Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ N8n webhook failed:', errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    console.log('✅ N8n webhook success! Response:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ N8n webhook error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    console.log('🛒 Starting checkout session...');
    
    // Generate order identifiers
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const orderId = `OID-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    
    console.log('🔢 Order Number:', orderNumber);
    console.log('🔢 Order ID:', orderId);
    
    // Build full address string (single line)
    const addressParts = [
      data.customerInfo.address,
      data.customerInfo.apartment,
      data.customerInfo.city,
      data.customerInfo.state,
      data.customerInfo.zipCode
    ].filter(Boolean);
    const fullAddress = addressParts.join(', ');
    
    console.log('📍 Full Address:', fullAddress);
    
    // Format items array - EXACTLY matching n8n structure
    const formattedItems = data.items.map((item, index) => {
      // Convert placements array to comma-separated string
      const placementsStr = item.placements && item.placements.length > 0
        ? item.placements.map((p: any) => p.label).join(', ')
        : '';
      
      // Determine design URLs based on design type
      let designImageUrl = '';
      let designUrl = '';
      
      if (item.designType === 'gallery' && item.designId) {
        // Gallery design - construct URLs from design ID
        designImageUrl = `https://threadstylez.com/designs/${item.designId}.jpg`;
        designUrl = `https://threadstylez.com/designs/${item.designId}`;
      } else if (item.designType === 'custom') {
        // Custom upload - set placeholder (file will be attached separately if needed)
        designImageUrl = 'Custom Upload';
        designUrl = 'Custom Upload';
      }
      // else blank design - leave empty strings
      
      return {
        lineNumber: index + 1,
        productName: item.productName || 'Product',
        productImage: item.productImage || '',
        size: item.size || '',
        color: item.color || '',
        quantity: item.quantity || 1,
        designName: item.designName || '',
        placementsStr: placementsStr,
        basePrice: parseFloat((item.basePrice || 0).toFixed(2)),
        placementFee: parseFloat((item.placementPrice || 0).toFixed(2)),
        itemTotal: parseFloat((item.itemTotal || 0).toFixed(2)),
        designImageUrl: designImageUrl,
        designUrl: designUrl
      };
    });
    
    console.log('📦 Formatted Items:', formattedItems);
    
    // Prepare order payload in EXACT n8n format
    const n8nOrderPayload = {
      orderNumber: orderNumber,
      orderId: orderId,
      date: new Date().toISOString(),
      customerName: `${data.customerInfo.firstName} ${data.customerInfo.lastName}`,
      email: data.customerInfo.email,
      phone: data.customerInfo.phone,
      address: fullAddress,
      subtotal: parseFloat(data.subtotal.toFixed(2)),
      shipping: parseFloat(data.shippingCost.toFixed(2)),
      totalPrice: parseFloat(data.totalPrice.toFixed(2)),
      orderStatus: 'Pending',
      trackingNumber: '',
      shippedDate: '',
      markAsShippedUrl: `https://threadstylez.com/orders/${orderNumber}`,
      items: formattedItems
    };
    
    console.log('✅ Final N8n Payload:', JSON.stringify(n8nOrderPayload, null, 2));
    
    // Save order for success page (app format)
    const appOrder = {
      orderNumber,
      orderId,
      orderDate: new Date().toISOString(),
      paymentStatus: 'completed',
      orderStatus: 'pending',
      shippingStatus: 'pending',
      trackingNumber: '',
      customerInfo: data.customerInfo,
      items: data.items,
      itemCount: data.items.length,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      totalPrice: data.totalPrice,
      paymentMethod: data.paymentMethod,
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(appOrder));
    console.log('💾 Order saved to localStorage');
    
    // Send to N8n webhook with timeout
    console.log('📤 Sending to N8n...');
    const n8nPromise = sendOrderToN8n(n8nOrderPayload);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('N8n request timeout (10s)')), 10000)
    );
    
    try {
      const n8nResult = await Promise.race([n8nPromise, timeoutPromise]);
      console.log('✅ N8n notification sent successfully:', n8nResult);
    } catch (n8nError) {
      console.warn('⚠️ N8n notification failed, but order still processed:', n8nError);
      // Continue - don't fail checkout if N8n is down
    }
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Checkout session completed successfully');
    
    return {
      success: true,
      orderId: orderId,
      orderNumber: orderNumber,
    };
    
  } catch (error) {
    console.error('💥 Checkout session failed:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise;