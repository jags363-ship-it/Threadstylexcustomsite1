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

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    // Upload custom design if provided
    let designUrl = '';
    if (data.customDesignFile) {
      designUrl = await uploadCustomDesign(data.customDesignFile);
      console.log('✅ Design uploaded:', designUrl);
    }

    // Store order
    const order = {
      orderNumber,
      ...data,
      orderId: `order_${Date.now()}`,
      paymentStatus: 'completed',
      orderStatus: 'processing',
      createdAt: new Date().toISOString(),
      designUrl,
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Simulate processing
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