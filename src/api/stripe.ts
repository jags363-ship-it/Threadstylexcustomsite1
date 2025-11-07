import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

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
  
  console.log('🔵 Sending to N8n:', webhookUrl);
  console.log('🔵 Payload:', JSON.stringify(orderData, null, 2));
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log('🔵 N8n Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ N8n webhook failed:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}` };
    }

    const result = await response.json();
    console.log('✅ N8n success:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ N8n error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const orderId = `order_${Date.now()}`;
    
    // Build full address string (N8n format)
    const addressParts = [
      data.customerInfo.address,
      data.customerInfo.apartment,
      data.customerInfo.city,
      data.customerInfo.state,
      data.customerInfo.zipCode
    ].filter(Boolean);
    const fullAddress = addressParts.join(', ');
    
    // Format items for N8n (with lineNumber, placementsStr, etc)
    const formattedItems = data.items.map((item, index) => {
      // Convert placements array to comma-separated string
      const placementsStr = item.placements && item.placements.length > 0
        ? item.placements.map((p: any) => p.label).join(', ')
        : '';
      
      return {
        lineNumber: index + 1,
        productName: item.productName,
        productImage: item.productImage,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        designName: item.designName || '',
        placementsStr: placementsStr,
        basePrice: item.basePrice,
        placementFee: item.placementPrice || 0,
        itemTotal: item.itemTotal,
        designImageUrl: '', // Add if you have design images
        designUrl: '' // Add if you have design URLs
      };
    });

    // Prepare order in N8n format
    const n8nOrder = {
      orderNumber,
      orderId,
      date: new Date().toISOString(),
      customerName: `${data.customerInfo.firstName} ${data.customerInfo.lastName}`,
      email: data.customerInfo.email,
      phone: data.customerInfo.phone,
      address: fullAddress,
      subtotal: data.subtotal,
      shipping: data.shippingCost,
      totalPrice: data.totalPrice,
      orderStatus: 'Pending',
      trackingNumber: '',
      shippedDate: '',
      markAsShippedUrl: `https://threadstylez.com/orders/${orderNumber}`,
      items: formattedItems
    };
    
    console.log('🟢 Order formatted for N8n:', JSON.stringify(n8nOrder, null, 2));
    
    // Also save in app format for success page
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
    
    // Save to localStorage for success page
    localStorage.setItem('lastOrder', JSON.stringify(appOrder));
    console.log('💾 Order saved to localStorage');
    
    // Send to N8n (with timeout protection)
    console.log('🟢 Sending to N8n...');
    const n8nPromise = sendOrderToN8n(n8nOrder);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('N8n timeout')), 5000)
    );
    
    try {
      await Promise.race([n8nPromise, timeoutPromise]);
      console.log('✅ N8n notification sent');
    } catch (n8nError) {
      console.warn('⚠️ N8n failed (order still processed):', n8nError);
    }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Checkout complete');
    
    return {
      success: true,
      orderId: orderId,
      orderNumber: orderNumber,
    };
  } catch (error) {
    console.error('💥 Checkout error:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise;