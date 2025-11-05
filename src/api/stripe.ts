import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY |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| '');

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`N8n webhook failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Order sent to N8n:', result);
    return result;
  } catch (error) {
    console.error('❌ N8n webhook error:', error);
    throw error;
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

    // Prepare order data for N8n
    const order = {
      orderNumber,
      orderId: `order_${Date.now()}`,
      orderDate: new Date().toISOString(),
      paymentStatus: 'completed',
      orderStatus: 'pending',
      shippingStatus: 'pending',
      trackingNumber: '',
      
      // Customer info
      customerInfo: data.customerInfo,
      
      // All items
      items: formattedItems,
      itemCount: formattedItems.length,
      
      // Pricing
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      totalPrice: data.totalPrice,
      
      // Payment
      paymentMethod: data.paymentMethod,
    };
    
    // Save to localStorage for success page
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Send to N8n workflow
    await sendOrderToN8n(order);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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