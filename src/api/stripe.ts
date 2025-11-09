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

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔵 N8N WEBHOOK DEBUG START');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📍 Webhook URL:', webhookUrl);
  console.log('📦 Full Payload:');
  console.log(JSON.stringify(orderData, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    console.log('⏳ Making fetch request...');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log('✓ Fetch completed!');
    console.log('📊 Response Status:', response.status);
    console.log('📊 Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ BAD RESPONSE:');
      console.error('Status:', response.status);
      console.error('Body:', errorText);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    let result;
    try {
      result = await response.json();
      console.log('✅ JSON Response:', result);
    } catch {
      result = await response.text();
      console.log('✅ Text Response:', result);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 N8N WEBHOOK SUCCESS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

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
    console.log('🛒 Starting Stripe checkout session...');

    const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured');
    }

    const lineItems = data.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productName,
          description: `${item.size} • ${item.color} • ${item.designName || item.designType}`,
          images: [item.productImage],
        },
        unit_amount: Math.round((item.itemTotal / item.quantity) * 100),
      },
      quantity: item.quantity,
    }));

    if (data.shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            description: '',
            images: [],
          },
          unit_amount: Math.round(data.shippingCost * 100),
        },
        quantity: 1,
      });
    }

    const orderNumber = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `OID-${Date.now().toString(36)}`;

    const urlParams = new URLSearchParams({
      'mode': 'payment',
      'success_url': `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}&order_number=${orderNumber}`,
      'cancel_url': `${window.location.origin}`,
      'customer_email': data.customerInfo.email,
      'metadata[order_number]': orderNumber,
      'metadata[order_id]': orderId,
      'metadata[customer_phone]': data.customerInfo.phone,
      'metadata[shipping_address]': JSON.stringify({
        firstName: data.customerInfo.firstName,
        lastName: data.customerInfo.lastName,
        address: data.customerInfo.address,
        apartment: data.customerInfo.apartment,
        city: data.customerInfo.city,
        state: data.customerInfo.state,
        zipCode: data.customerInfo.zipCode,
        country: data.customerInfo.country,
      }),
    } as any);

    lineItems.forEach((item, idx) => {
      urlParams.append(`line_items[${idx}][price_data][currency]`, item.price_data.currency);
      urlParams.append(`line_items[${idx}][price_data][product_data][name]`, item.price_data.product_data.name);
      if (item.price_data.product_data.description) {
        urlParams.append(`line_items[${idx}][price_data][product_data][description]`, item.price_data.product_data.description);
      }
      urlParams.append(`line_items[${idx}][price_data][unit_amount]`, item.price_data.unit_amount.toString());
      urlParams.append(`line_items[${idx}][quantity]`, item.quantity.toString());
    });

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlParams.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to create checkout session');
    }

    const session = await response.json();

    const pendingOrder = {
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
      stripeSessionId: session.id,
    };

    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    console.log('💾 Pending order saved to localStorage');

    window.location.href = session.url;

    return {
      success: true,
      orderId: orderId,
      orderNumber: orderNumber,
      sessionId: session.id,
    };

  } catch (error) {
    console.error('💥 Stripe checkout error:', error);
    throw error;
  }
};

export const getStripe = () => null;
