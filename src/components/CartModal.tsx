import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const { cart, removeFromCart, cartCount, cartSubtotal, cartShipping, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="relative w-full sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Cart
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Add some custom apparel to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {item.productName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>Size: {item.size} • Color: {item.color}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>
                          Design: {item.designType === 'blank' ? 'No Design' : item.designName || item.designType}
                        </p>
                        {item.placements.length > 0 && (
                          <p className="text-xs">
                            {item.placements.length} placement{item.placements.length > 1 ? 's' : ''}: {item.placements.map(p => p.label).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-bold text-blue-600 dark:text-cyan-400">
                        ${item.itemTotal.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Totals & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className={cartShipping === 0 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                    {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                {cartShipping > 0 && (
                  <div className="text-sm text-blue-600 dark:text-cyan-400">
                    Add ${(35 - cartSubtotal).toFixed(2)} more for FREE shipping! 🚚
                  </div>
                )}
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-3 flex justify-between text-xl font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-cyan-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Proceed to Checkout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}