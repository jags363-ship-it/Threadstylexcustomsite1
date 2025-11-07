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
  
  try {
    const response = await fetch(webhookUrl, {
        method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderPayload)   // your object
});

    if (!response.ok) {
      console.warn(`⚠️ N8n webhook returned ${response.status}`);
      return { success: false, error: `HTTP ${response.status}` };
    }

    const result = await response.json();
    console.log('✅ Order sent to N8n:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ N8n webhook error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
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
        price: p.price
      })),
      basePrice: item.basePrice,
      placementPrice: item.placementPrice,
      itemTotal: item.itemTotal,
    }));

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
    
    // Save to localStorage for success page
    localStorage.setItem('lastOrder', JSON.stringify(order));
    console.log('💾 Order saved to localStorage');
    
    // Send to N8n (with timeout protection)
    const n8nPromise = sendOrderToN8n(order);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('N8n timeout')), 5000)
    );
    
    try {
      const n8nResult = await Promise.race([n8nPromise, timeoutPromise]);
      console.log('✅ N8n notification sent:', n8nResult);
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
    console.error('Checkout error:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise;