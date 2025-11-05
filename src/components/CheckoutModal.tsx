import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { createCheckoutSession, CheckoutData } from '../api/stripe';

interface OrderDetails {
  productName: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
  designType: 'gallery' | 'custom' | 'blank';
  designId?: string;
  placements: Array<{
    key: string;
    label: string;
    price: number;
  }>;
  basePrice: number;
  placementPrice: number;
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[]; // Array of cart items
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;
}

export function CheckoutModal({ isOpen, onClose, orderDetails, customDesignFile }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  
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
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
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

  const validateStep3 = () => {
    if (paymentMethod === 'paypal') return true;
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Valid card number required';
    }
    if (formData.cardName.length < 3) {
      newErrors.cardName = 'Name on card required';
    }
    if (!formData.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Valid expiry (MM/YY) required';
    }
    if (!formData.cvv.match(/^\d{3}$/)) {
      newErrors.cvv = 'Valid CVV required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsProcessing(true);

    try {
      const checkoutData: CheckoutData = {
        productId: orderDetails.productId,
        productName: orderDetails.productName,
        size: orderDetails.size,
        color: orderDetails.color,
        quantity: orderDetails.quantity,
        designType: orderDetails.designType,
        designId: orderDetails.designId,
        customDesignFile: customDesignFile || undefined,
        placements: orderDetails.placements,
        basePrice: orderDetails.basePrice,
        placementPrice: orderDetails.placementPrice,
        totalPrice: orderDetails.totalPrice,
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
        paymentMethod: paymentMethod,
      };

      const result = await createCheckoutSession(checkoutData);

      if (result.success) {
        setIsProcessing(false);
        onClose();
        
        // Redirect to success page
        window.location.href = `/order-success?order_id=${result.orderId}&order_number=${result.orderNumber}`;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
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

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 dark:bg-gray-700/50">
            {[1, 2, 3].map((s) => (
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
                {s < 3 && (
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
              {/* Left Column - Form */}
              <div className="md:col-span-2 space-y-6">
                {/* Step 1: Contact Information */}
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

                {/* Step 2: Shipping Address */}
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
                      Shipping Address
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

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        3
                      </div>
                      Payment Method
                    </h3>

                    {/* Payment Method Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <CreditCard className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold">Credit Card</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold">PayPal</p>
                      </button>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                            placeholder="4242 4242 4242 4242"
                            maxLength={16}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          />
                          {errors.cardName && (
                            <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              value={formData.expiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                setFormData({ ...formData, expiry: value });
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {errors.expiry && (
                              <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                              placeholder="123"
                              maxLength={3}
                            />
                            {errors.cvv && (
                              <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <Lock className="w-4 h-4" />
                      <span>Secure checkout • SSL encrypted</span>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl h-fit sticky top-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{orderDetails.productName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Size: {orderDetails.size} • Color: {orderDetails.color}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {orderDetails.quantity}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Design: {orderDetails.designType === 'blank' ? 'No Design' : orderDetails.designType}
                    </p>
                    {orderDetails.placements.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-500">Placements:</p>
                        {orderDetails.placements.map((p) => (
                          <p key={p.key} className="text-xs text-gray-600 dark:text-gray-400">
                            • {p.label}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
                    <span className="text-gray-900 dark:text-white">${orderDetails.basePrice.toFixed(2)}</span>
                  </div>
                  
                  {orderDetails.placements && orderDetails.placements.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Placements:</span>
                      <span className="text-gray-900 dark:text-white">+${orderDetails.placementPrice.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-600 pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="text-gray-900 dark:text-white">${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className={orderDetails.shippingCost === 0 ? 'text-green-600 font-semibold' : 'text-gray-900 dark:text-white'}>
                      {orderDetails.shippingCost === 0 ? 'FREE' : `$${orderDetails.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-2xl text-blue-600">${orderDetails.totalPrice.toFixed(2)}</span>
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