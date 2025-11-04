import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Truck, Download, ExternalLink } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrder } from '../api/orders';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface OrderDetails {
  orderNumber: string;
  orderId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  totalPrice: number;
  email: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  placements: Array<{ label: string }>;
  createdAt: string;
}

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        // Try to get last order from localStorage
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
          setOrder(JSON.parse(lastOrder));
        }
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrder(orderId);
        if (orderData) {
          setOrder(orderData as any);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Thank you for your order!
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
          >
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                <p className="text-3xl font-bold text-blue-600">${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Details
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Product</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.productName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Size</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Color</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.color}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Quantity</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.quantity}</p>
                  </div>
                  {order.placements && order.placements.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Print Placements</p>
                      <div className="flex flex-wrap gap-2">
                        {order.placements.map((placement, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-blue-600 dark:text-cyan-400 rounded-full text-xs font-semibold"
                          >
                            {placement.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                <p>{order.customerInfo.address}</p>
                <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Confirmation Email Sent
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  We've sent order confirmation and tracking details to <span className="font-semibold">{order.email}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Order Processing</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We'll start printing your custom design within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Quality Check</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Each item is carefully inspected before shipping.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive tracking info when your order ships (3-5 business days).</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-600 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>

            <a
              href="https://threadstylez.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-purple-600 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Main Site
            </a>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}