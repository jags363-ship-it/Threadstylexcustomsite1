import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock } from 'lucide-react';
import { createCheckoutSession } from '../api/stripe';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;
}

export function CheckoutModal({ isOpen, onClose, cartItems, cartSubtotal, cartShipping, cartTotal }: CheckoutModalProps) {
  console.log('=== CheckoutModal Props ===');
  console.log('cartItems:', cartItems);
  console.log('cartSubtotal:', cartSubtotal);
  console.log('cartShipping:', cartShipping);
  console.log('cartTotal:', cartTotal);
  console.log('cartItems with itemTotal:', cartItems.map(item => ({ id: item.id, itemTotal: item.itemTotal, basePrice: item.basePrice, placementPrice: item.placementPrice, quantity: item.quantity })));

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Valid 10-digit phone required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.firstName.length < 2) newErrors.firstName = 'First name required';
    if (formData.lastName.length < 2) newErrors.lastName = 'Last name required';
    if (formData.address.length < 5) newErrors.address = 'Address required';
    if (formData.city.length < 2) newErrors.city = 'City required';
    if (formData.state.length < 2) newErrors.state = 'State required';
    if (!formData.zipCode.match(/^\d{5}$/)) newErrors.zipCode = 'Valid ZIP code required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsProcessing(true);

    try {
      const checkoutData = {
        items: cartItems,
        customerInfo: {
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: 'card' as const,
        subtotal: cartSubtotal,
        shippingCost: cartShipping,
        totalPrice: cartTotal,
      };

      // Clear cart before redirecting to Stripe
      clearCart();

      // This will redirect to Stripe Checkout - no return after this
      await createCheckoutSession(checkoutData);

    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 dark:bg-gray-700/50">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 2 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors ${
                      step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        1
                      </div>
                      Contact Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          placeholder="1234567890"
                          maxLength={10}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                    >
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        2
                      </div>
                      Shipping & Payment
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      {errors.address && (
                        <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        {errors.city && (
                          <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          maxLength={2}
                        />
                        {errors.state && (
                          <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          maxLength={5}
                        />
                        {errors.zipCode && (
                          <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-6">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Secure Stripe Checkout
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            You'll be redirected to Stripe's secure payment page to complete your purchase safely.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5" />
                            <span>Continue to Payment</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl h-fit sticky top-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Summary</h3>
                
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pb-3 border-b border-gray-200 dark:border-gray-600 last:border-0">
                      <div className="flex gap-3">
                        <img 
                          src={item.productImage} 
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Size: {item.size} • {item.color}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Design: {item.designName || item.designType}
                          </p>
                          {item.placements && item.placements.length > 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {item.placements.length} placement{item.placements.length > 1 ? 's' : ''}
                            </p>
                          )}
                          <p className="text-sm font-bold text-blue-600 dark:text-cyan-400 mt-1">
                            ${item.itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="text-gray-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className={cartShipping === 0 ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-900 dark:text-white'}>
                      {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-2xl text-blue-600 dark:text-cyan-400">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}