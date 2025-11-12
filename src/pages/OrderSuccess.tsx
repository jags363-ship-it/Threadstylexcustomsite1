import { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Mail, Download, ShoppingBag, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const orderNumber = searchParams.get('order_number');

      if (!sessionId || !orderNumber) {
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
          setOrderData(JSON.parse(lastOrder));
        }
        setIsVerifying(false);
        return;
      }

      try {
        const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
          },
        });

        const session = await response.json();

        if (session.payment_status === 'paid') {
          const pendingOrder = localStorage.getItem('pendingOrder');
          if (pendingOrder) {
            const order = JSON.parse(pendingOrder);
            order.paymentStatus = 'completed';
            order.orderStatus = 'confirmed';

            setOrderData(order);
            localStorage.setItem('lastOrder', JSON.stringify(order));
            localStorage.removeItem('pendingOrder');

            const addressParts = [
              order.customerInfo.address,
              order.customerInfo.apartment,
              order.customerInfo.city,
              order.customerInfo.state,
              order.customerInfo.zipCode
            ].filter(Boolean);
            const fullAddress = addressParts.join(', ');

            const formattedItems = order.items.map((item: any, index: number) => {
              const placementsStr = item.placements && item.placements.length > 0
                ? item.placements.map((p: any) => p.label).join(', ')
                : '';

              let designImageUrl = '';
              let designUrl = '';

              if (item.designType === 'gallery' && item.designId) {
                designImageUrl = `https://picsum.photos/seed/${item.designId}/400/400`;
                designUrl = `https://threadstylez.com/designs/${item.designId}`;
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

            const n8nOrderPayload = {
              orderNumber: order.orderNumber,
              orderId: order.orderId,
              date: new Date().toISOString(),
              customerName: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
              email: order.customerInfo.email,
              phone: order.customerInfo.phone,
              address: fullAddress,
              subtotal: Number(order.subtotal.toFixed(1)),
              shipping: Number(order.shippingCost.toFixed(1)),
              totalPrice: Number(order.totalPrice.toFixed(1)),
              orderStatus: 'Confirmed',
              trackingNumber: '',
              shippedDate: '',
              markAsShippedUrl: `https://threadstylez.com/orders/${order.orderNumber}`,
              items: formattedItems
            };

            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://amrio.app.n8n.cloud/webhook/orders/new';

            try {
              await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(n8nOrderPayload),
              });
            } catch (webhookError) {
              console.error('N8n webhook error:', webhookError);
            }
          }
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        window.location.href = '/';
      }

      setIsVerifying(false);
    };

    verifyPayment();
  }, [searchParams]);

  const handleDownloadInvoice = () => {
    if (!orderData) return;

    const doc = new jsPDF();
    
    // ═══════════════════════════════════════
    // HEADER - Blue Background with Company Name
    // ═══════════════════════════════════════
    doc.setFillColor(37, 99, 235); // Blue
    doc.rect(0, 0, 210, 45, 'F');
    
    // Company Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('ThreadStylez', 105, 20, { align: 'center' });
    
    // Tagline
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Custom Apparel & Designs', 105, 28, { align: 'center' });
    
    // Website
    doc.setFontSize(9);
    doc.text('www.threadstylez.com | support@threadstylez.com', 105, 36, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // ═══════════════════════════════════════
    // INVOICE TITLE & ORDER INFO
    // ═══════════════════════════════════════
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 20, 60);
    
    // Order Details Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 68, 85, 25, 2, 2, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('Order Number:', 25, 75);
    doc.text('Order Date:', 25, 82);
    doc.text('Payment Status:', 25, 89);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(orderData.orderNumber, 60, 75);
    doc.text(new Date(orderData.orderDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), 60, 82);
    
    // Payment Status with color
    if (orderData.paymentStatus === 'completed') {
      doc.setTextColor(34, 197, 94); // Green
      doc.setFont('helvetica', 'bold');
      doc.text('PAID', 60, 89);
    } else {
      doc.text(orderData.paymentStatus.toUpperCase(), 60, 89);
    }
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    // ═══════════════════════════════════════
    // CUSTOMER INFO (Right Side)
    // ═══════════════════════════════════════
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 120, 60);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const customerName = `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`;
    doc.text(customerName, 120, 68);
    doc.text(orderData.customerInfo.address, 120, 75);
    
    let yCustomer = 82;
    if (orderData.customerInfo.apartment) {
      doc.text(orderData.customerInfo.apartment, 120, yCustomer);
      yCustomer += 7;
    }
    
    doc.text(`${orderData.customerInfo.city}, ${orderData.customerInfo.state} ${orderData.customerInfo.zipCode}`, 120, yCustomer);
    yCustomer += 7;
    doc.text(orderData.customerInfo.email, 120, yCustomer);
    yCustomer += 7;
    doc.text(orderData.customerInfo.phone, 120, yCustomer);
    
    // ═══════════════════════════════════════
    // LINE SEPARATOR
    // ═══════════════════════════════════════
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 105, 190, 105);
    
    // ═══════════════════════════════════════
    // ITEMS TABLE HEADER
    // ═══════════════════════════════════════
    let yPos = 115;
    doc.setFillColor(37, 99, 235);
    doc.rect(20, yPos - 6, 170, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Item', 25, yPos);
    doc.text('Size', 100, yPos);
    doc.text('Color', 120, yPos);
    doc.text('Qty', 150, yPos);
    doc.text('Price', 175, yPos);
    
    yPos += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    // ═══════════════════════════════════════
    // ITEMS LIST
    // ═══════════════════════════════════════
    orderData.items.forEach((item: any, index: number) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Alternate row background
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(20, yPos - 4, 170, 16, 'F');
      }
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(item.productName, 25, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.text(item.size, 100, yPos);
      doc.text(item.color, 120, yPos);
      doc.text(item.quantity.toString(), 150, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(`$${item.itemTotal.toFixed(2)}`, 175, yPos);
      
      yPos += 5;
      
      // Design details
      if (item.designName) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Design: ${item.designName}`, 25, yPos);
        yPos += 4;
      }
      
      // Placements
      if (item.placements && item.placements.length > 0) {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        const placementText = item.placements.map((p: any) => p.label).join(', ');
        doc.text(`Placements: ${placementText}`, 25, yPos);
        yPos += 4;
      }
      
      doc.setTextColor(0, 0, 0);
      yPos += 7;
    });
    
    // ═══════════════════════════════════════
    // TOTALS SECTION
    // ═══════════════════════════════════════
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(120, yPos, 190, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Subtotal
    doc.text('Subtotal:', 130, yPos);
    doc.text(`$${orderData.subtotal.toFixed(2)}`, 175, yPos, { align: 'right' });
    yPos += 7;
    
    // Shipping
    doc.text('Shipping:', 130, yPos);
    if (orderData.shippingCost === 0) {
      doc.setTextColor(34, 197, 94);
      doc.setFont('helvetica', 'bold');
      doc.text('FREE', 175, yPos, { align: 'right' });
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
    } else {
      doc.text(`$${orderData.shippingCost.toFixed(2)}`, 175, yPos, { align: 'right' });
    }
    yPos += 10;
    
    // Total
    doc.setFillColor(37, 99, 235);
    doc.rect(120, yPos - 5, 70, 12, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TOTAL:', 130, yPos + 3);
    doc.text(`$${orderData.totalPrice.toFixed(2)}`, 185, yPos + 3, { align: 'right' });
    
    // ═══════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', 105, 275, { align: 'center' });
    
    doc.setFontSize(8);
    doc.text('ThreadStylez | Premium Custom Apparel', 105, 282, { align: 'center' });
    doc.text('Questions? Email support@threadstylez.com or visit www.threadstylez.com', 105, 287, { align: 'center' });
    
    // Save PDF
    doc.save(`ThreadStylez-Invoice-${orderData.orderNumber}.pdf`);
  };

  if (isVerifying || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {isVerifying ? 'Verifying payment...' : 'Loading order details...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your order!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          {/* Order Number & Total */}
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orderData.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-cyan-400">${orderData.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h2>
            </div>

            <div className="space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <img 
                    src={item.productImage} 
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg bg-white"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{item.productName}</p>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                      <p>Size: {item.size} • Color: {item.color}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Design: {item.designName}</p>
                      {item.placements && item.placements.length > 0 && (
                        <p>Placements: {item.placements.map((p: any) => p.label).join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-cyan-400">${item.itemTotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Shipping</span>
                <span className={orderData.shippingCost === 0 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                  {orderData.shippingCost === 0 ? 'FREE' : `$${orderData.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-300 dark:border-gray-600">
                <span>Total</span>
                <span>${orderData.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="font-semibold">{orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</p>
              <p>{orderData.customerInfo.address}</p>
              {orderData.customerInfo.apartment && <p>{orderData.customerInfo.apartment}</p>}
              <p>{orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}</p>
            </div>
          </div>
        </div>

        {/* Confirmation Email Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Confirmation Email Sent</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                We've sent order confirmation and tracking details to <strong>{orderData.customerInfo.email}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-blue-600 dark:hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Download Invoice</span>
          </button>

          <a
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Continue Shopping</span>
          </a>

          <a
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-blue-600 dark:hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </a>
        </div>

      </div>
    </div>
  );
}