import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, Download, ShoppingBag, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);
  
  const orderNumber = searchParams.get('order_number');

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    }
  }, []);

  const handleDownloadInvoice = () => {
    if (!orderData) return;

    const invoiceText = `
INVOICE
Order #${orderData.orderNumber}
Date: ${new Date(orderData.orderDate).toLocaleDateString()}

BILL TO:
${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}
${orderData.customerInfo.address}
${orderData.customerInfo.apartment ? orderData.customerInfo.apartment + '\n' : ''}${orderData.customerInfo.city}, ${orderData.customerInfo.state} ${orderData.customerInfo.zipCode}
Email: ${orderData.customerInfo.email}
Phone: ${orderData.customerInfo.phone}

ITEMS:
${orderData.items.map((item: any, index: number) => `
${index + 1}. ${item.productName}
   Size: ${item.size} | Color: ${item.color}
   Design: ${item.designName}
   Quantity: ${item.quantity}
   Price: $${item.itemTotal.toFixed(2)}
`).join('\n')}

SUMMARY:
Subtotal: $${orderData.subtotal.toFixed(2)}
Shipping: ${orderData.shippingCost === 0 ? 'FREE' : '$' + orderData.shippingCost.toFixed(2)}
Total: $${orderData.totalPrice.toFixed(2)}

Payment Method: ${orderData.paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
Payment Status: ${orderData.paymentStatus}

Thank you for your order!
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${orderData.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your order!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-start gap-3">
            <Mail className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Confirmation Email Sent</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                We've sent order confirmation and tracking details to <strong>{orderData.customerInfo.email}</strong>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-blue-600 dark:hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </button>

          
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </a>

          
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-blue-600 dark:hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </a>
        </motion.div>

      </div>
    </div>
  );
}