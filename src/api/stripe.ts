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

// Send order to N8n webhook with MAXIMUM debugging
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
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ BAD RESPONSE:');
      console.error('Status:', response.status);
      console.error('Body:', errorText);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    let result;
    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
      console.log('✅ JSON Response:', result);
    } else {
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
    console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error Message:', error instanceof Error ? error.message : String(error));
    console.error('Full Error:', error);
    if (error instanceof Error && error.stack) {
      console.error('Stack Trace:', error.stack);
    }
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
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
        designImageUrl = `https://threadstylez.com/designs/${item.designId}.jpg`;
        designUrl = `https://threadstylez.com/designs/${item.designId}`;
      } else if (item.designType === 'custom') {
        designImageUrl = 'Custom Upload';
        designUrl = 'Custom Upload';
      }
      
      return {
        lineNumber: index + 1,
        productName: item.productName || 'Product',
        productImage: item.productImage || '',
        size: item.size || '',
        color: item.color || '',
        quantity: item.quantity || 1,
        designName: item.designName || '',
        placementsStr: placementsStr,
basePrice: Number((item.basePrice || 0).toFixed(2)),
placementFee: Number((item.placementPrice || 0).toFixed(2)),
itemTotal: Number((item.itemTotal || 0).toFixed(2)),
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
subtotal: Number(data.subtotal.toFixed(2)),
shipping: Number(data.shippingCost.toFixed(2)),
totalPrice: Number(data.totalPrice.toFixed(2)),
      orderStatus: 'Pending',
      trackingNumber: '',
      shippedDate: '',
      markAsShippedUrl: `https://threadstylez.com/orders/${orderNumber}`,
      items: formattedItems
    };
    
    console.log('✅ Final N8n Payload:', JSON.stringify(n8nOrderPayload, null, 2));
    
    // Save order for success page
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
    
    // Send to N8n webhook
    console.log('📤 Sending to N8n...');
    const n8nPromise = sendOrderToN8n(n8nOrderPayload);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('N8n timeout')), 10000)
    );
    
    try {
      await Promise.race([n8nPromise, timeoutPromise]);
      console.log('✅ N8n notification sent');
    } catch (n8nError) {
      console.warn('⚠️ N8n failed (order still processed):', n8nError);
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

// Remove Stripe completely
export const getStripe = () => null;