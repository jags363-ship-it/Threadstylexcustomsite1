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
    console.log('🛒 Starting checkout session...');
    console.log('📥 Received checkout data:', data);
    
    // Generate order identifiers
    const orderNumber = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `OID-${Date.now().toString(36)}`;
    
    console.log('🔢 Order Number:', orderNumber);
    console.log('🔢 Order ID:', orderId);
    
    // Build full address string
    const addressParts = [
      data.customerInfo.address,
      data.customerInfo.apartment,
      data.customerInfo.city,
      data.customerInfo.state,
      data.customerInfo.zipCode
    ].filter(Boolean);
    const fullAddress = addressParts.join(', ');
    
    console.log('📍 Full Address:', fullAddress);
    
    // Format items array - match EXACT working format
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
    
    console.log('📦 Formatted Items:', formattedItems);
    
    // Prepare order payload - EXACT format as working Postman test
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
    
    console.log('✅ Final N8n Payload:');
    console.log(JSON.stringify(n8nOrderPayload, null, 2));
    
    // Save for success page
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
    
    // Send to N8n
    console.log('📤 Calling N8n webhook...');
    
    try {
      const n8nResult = await sendOrderToN8n(n8nOrderPayload);
      console.log('✅ N8n result:', n8nResult);
    } catch (n8nError) {
      console.error('⚠️ N8n failed:', n8nError);
      // Continue anyway
    }
    
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

export const getStripe = () => null;