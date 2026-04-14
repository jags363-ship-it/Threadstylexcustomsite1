import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle, Zap } from 'lucide-react';

interface StickyCheckoutProps {
  selectedDesign: string | null;
  uploadedFile: File | null;
  quantity: number;
  price: number;
  onCheckout: () => void;
  isLoading: boolean;
  error: string | null;
  orderType?: 'individual' | 'team';
  teamName?: string;
}

export function StickyCheckout({
  selectedDesign,
  uploadedFile,
  quantity,
  price,
  onCheckout,
  isLoading,
  error,
  orderType = 'individual',
  teamName,
}: StickyCheckoutProps) {
  const hasDesign = selectedDesign !== null || uploadedFile !== null;
  const show = hasDesign && price > 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-navy-800 border-t border-white/10 px-4 py-4 safe-bottom">
            {error && (
              <div className="flex items-center gap-2 text-rush text-xs mb-3 bg-rush/10 px-3 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-gray-400 text-xs font-body">
                  {orderType === 'team' && teamName ? teamName : 'Your order'} · {quantity} {quantity === 1 ? 'item' : 'items'}
                </p>
                <p className="text-white font-display font-black text-xl">${price.toFixed(2)}</p>
              </div>
              <button
                onClick={onCheckout}
                disabled={isLoading}
                className="btn-gold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 flex-shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4 animate-spin" />Processing...</span>
                ) : (
                  <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" />Add to Cart</span>
                )}
              </button>
            </div>

            {/* Delivery micro-notice */}
            <p className="text-center text-gray-600 text-[10px] mt-2">
              📦 Standard 2-week delivery · Rush orders not guaranteed
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
