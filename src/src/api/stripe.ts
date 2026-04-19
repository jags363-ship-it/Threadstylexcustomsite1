import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
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
      const errorText = await response.text();
      console.error('❌ BAD RESPONSE:');
      console.error('Status:', response.status);
      console.error('Body:', errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    let result;
    try {
      result = await response.json();
    } catch {
      result = await response.text();
    }
    
    
    return { success: true, data: result };
    
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('💥 N8N WEBHOOK EXCEPTION');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error:', error);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    
    // ═══════════════════════════════════════
    // STEP 1: Generate Order Identifiers
    // ═══════════════════════════════════════
    const orderNumber = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `OID-${Date.now().toString(36)}`;
    
    
    // ═══════════════════════════════════════
    // STEP 2: Build Address
    // ═══════════════════════════════════════
    const addressParts = [
      data.customerInfo.address,
      data.customerInfo.apartment,
      data.customerInfo.city,
      data.customerInfo.state,
      data.customerInfo.zipCode
    ].filter(Boolean);
    const fullAddress = addressParts.join(', ');
    
    
    // ═══════════════════════════════════════
    // STEP 3: Format Items for N8n
    // ═══════════════════════════════════════
    const formattedItems = data.items.map((item, index) => {
      const placementsStr = item.placements && item.placements.length > 0
        ? item.placements.map((p: any) => p.label).join(', ')
        : '';
      
      let designImageUrl = '';
      let designUrl = '';
      
      if (item.designType === 'gallery' && item.designId) {
        designImageUrl = `https://picsum.photos/seed/${item.designId}/400/400`;
        designUrl = `https://threadstylez.com/designs/${item.designId}`;
      } else if (item.designType === 'custom') {
        designImageUrl = '';
        designUrl = '';
      }
      
      return {
        lineNumber: index + 1,
        productName: item.productName || 'Product',
        productImage: item.productImage || 'https://picsum.photos/seed/product/200/200',
        size: item.size || '',
        color: item.color || '',
        quantity: item.quantity || 1,
        designName: item.designName || '',
        placementsStr: placementsStr,
        basePrice: Number((item.basePrice || 0).toFixed(1)),
        placementFee: Number((item.placementPrice || 0).toFixed(1)),
        itemTotal: Number((item.itemTotal || 0).toFixed(1)),
        designImageUrl: designImageUrl,
        designUrl: designUrl
      };
    });
    
    
    // ═══════════════════════════════════════
    // STEP 4: Prepare N8n Payload
    // ═══════════════════════════════════════
    const n8nOrderPayload = {
      orderNumber: orderNumber,
      orderId: orderId,
      date: new Date().toISOString(),
      customerName: `${data.customerInfo.firstName} ${data.customerInfo.lastName}`,
      email: data.customerInfo.email,
      phone: data.customerInfo.phone,
      address: fullAddress,
      subtotal: Number(data.subtotal.toFixed(1)),
      shipping: Number(data.shippingCost.toFixed(1)),
      totalPrice: Number(data.totalPrice.toFixed(1)),
      orderStatus: 'Pending',
      trackingNumber: '',
      shippedDate: '',
      markAsShippedUrl: `https://threadstylez.com/orders/${orderNumber}`,
      items: formattedItems
    };
    
    
    // ═══════════════════════════════════════
    // STEP 5: Save Order to LocalStorage
    // ═══════════════════════════════════════
    const appOrder = {
      orderNumber,
      orderId,
      orderDate: new Date().toISOString(),
      paymentStatus: 'pending',
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
    
    localStorage.setItem('pendingOrder', JSON.stringify(appOrder));
    
    // ═══════════════════════════════════════
    // STEP 6: Send to N8n
    // ═══════════════════════════════════════
    
    try {
      const n8nResult = await sendOrderToN8n(n8nOrderPayload);
    } catch (n8nError) {
      console.error('⚠️ N8n failed:', n8nError);
      // Continue anyway - payment is more important
    }
    
    // ═══════════════════════════════════════
    // STEP 7: Create Stripe Checkout Session
    // ═══════════════════════════════════════
    
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe not initialized. Check VITE_STRIPE_PUBLIC_KEY.');
    }
    
    // Prepare line items for Stripe
    const stripeItems = data.items.map(item => ({
      productName: item.productName,
      productImage: item.productImage,
      size: item.size,
      color: item.color,
      designName: item.designName || '',
      quantity: item.quantity,
      itemTotal: item.itemTotal,
    }));
    
    // Add shipping as separate item if > 0
    if (data.shippingCost > 0) {
      stripeItems.push({
        productName: 'Shipping',
        productImage: '',
        size: '',
        color: '',
        designName: 'Standard Shipping',
        quantity: 1,
        itemTotal: data.shippingCost,
      });
    }
    
    // Call Vercel API route to create checkout session
    const apiResponse = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: stripeItems,
        customerEmail: data.customerInfo.email,
        orderNumber: orderNumber,
        successUrl: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}&order_number=${orderNumber}`,
        cancelUrl: `${window.location.origin}/checkout`,
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await apiResponse.json();
    
    // ═══════════════════════════════════════
    // STEP 8: Redirect to Stripe Checkout
    // ═══════════════════════════════════════
    
    const { error } = await (stripe as any).redirectToCheckout({ sessionId });

    if (error) {
      console.error('❌ Stripe redirect error:', error);
      throw error;
    }
    
    
    return { success: true, orderId, orderNumber };
    
  } catch (error) {
    console.error('💥 Checkout error:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise;