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
  
  console.log('🔵 Starting N8n webhook call...');
  console.log('🔵 Webhook URL:', webhookUrl);
  console.log('🔵 Order data being sent:', JSON.stringify(orderData, null, 2));
  
  try {
    console.log('🔵 Making fetch request...');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ N8n webhook failed:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    console.log('✅ N8n webhook success! Response:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ N8n webhook error:', error);
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    console.log('🟢 Starting checkout session...');
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    console.log('🟢 Generated order number:', orderNumber);
    
    // Format items for better readability
    const formattedItems = data.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      designType: item.designType,
      designName: item.designName || item.designType,
      placements: item.placements.map((p: any) => ({
        label: p.label,
        price: p.addOn || p.price || 0
      })),
      basePrice: item.basePrice,
      placementPrice: item.placementPrice,
      itemTotal: item.itemTotal,
    }));

    console.log('🟢 Formatted items:', formattedItems);

    // Prepare order data
    const order = {
      orderNumber,
      orderId: `order_${Date.now()}`,
      orderDate: new Date().toISOString(),
      paymentStatus: 'completed',
      orderStatus: 'pending',
      shippingStatus: 'pending',
      trackingNumber: '',
      
      customerInfo: data.customerInfo,
      items: formattedItems,
      itemCount: formattedItems.length,
      
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      totalPrice: data.totalPrice,
      
      paymentMethod: data.paymentMethod,
    };
    
    console.log('🟢 Complete order object:', JSON.stringify(order, null, 2));
    
    // Save to localStorage for success page
    localStorage.setItem('lastOrder', JSON.stringify(order));
    console.log('💾 Order saved to localStorage');
    
    // Send to N8n (with timeout protection)
    console.log('🟢 Calling sendOrderToN8n...');
    const n8nPromise = sendOrderToN8n(order);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('N8n timeout after 5 seconds')), 5000)
    );
    
    try {
      const n8nResult = await Promise.race([n8nPromise, timeoutPromise]);
      console.log('✅ N8n call completed:', n8nResult);
    } catch (n8nError) {
      console.warn('⚠️ N8n notification failed (continuing anyway):', n8nError);
      // Continue checkout even if N8n fails
    }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Order processing complete');
    
    return {
      success: true,
      orderId: order.orderId,
      orderNumber: order.orderNumber,
    };
  } catch (error) {
    console.error('💥 Checkout error:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise;