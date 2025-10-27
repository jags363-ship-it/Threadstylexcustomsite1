import { loadStripe } from '@stripe/stripe-js';
import { uploadCustomDesign } from './fileUpload';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export interface CheckoutData {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  designType: 'gallery' | 'custom';
  designId?: string;
  customDesignFile?: File;
  placements: Array<{
    key: string;
    label: string;
    price: number;
  }>;
  basePrice: number;
  placementPrice: number;
  totalPrice: number;
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
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
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
    
    // Upload custom design if provided
    let designUrl = '';
    if (data.customDesignFile) {
      designUrl = await uploadCustomDesign(data.customDesignFile);
      console.log('✅ Design uploaded:', designUrl);
    }

    // Prepare order data
    const order = {
      orderNumber,
      orderId: `order_${Date.now()}`,
      orderDate: new Date().toISOString(),
      paymentStatus: 'completed',
      orderStatus: 'pending',
      shippingStatus: 'pending',
      trackingNumber: '',
      ...data,
      designUrl,
      // Format placements as comma-separated string for easy reading
      placementsFormatted: data.placements.map(p => p.label).join(', '),
    };
    
    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Send to N8n workflow
    await sendOrderToN8n(order);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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