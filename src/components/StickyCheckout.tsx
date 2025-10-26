import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StickyCheckoutProps {
  selectedDesign: string | null;
  uploadedFile: File | null;
  quantity: number;
  price: number;
  onCheckout: () => void;
  isLoading: boolean;
  error: string | null;
}

export function StickyCheckout({
  selectedDesign,
  uploadedFile,
  quantity,
  price,
  onCheckout,
  isLoading,
  error
}: StickyCheckoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasDesign = selectedDesign !== null || uploadedFile !== null;
  const total = (price * quantity).toFixed(2);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50 md:hidden transition-colors"
        >
          <div className="container mx-auto px-4 py-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-xl mb-3 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${total}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onCheckout}
                disabled={!hasDesign || isLoading}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                  hasDesign && !isLoading
                    ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isLoading ? 'Processing...' : 'Checkout'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
