import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, Lock, Check } from 'lucide-react';
import { useState } from 'react';
import { createCheckoutSession, CheckoutData } from '../api/stripe';
import { sendOrderConfirmation } from '../api/email';
import { X, CheckCircle, Download, ExternalLink } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
OrderDetails {
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

export function CheckoutModal({ isOpen, onClose, orderDetails }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [formData, setFormData] = useState({
    // Contact Info
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';

    // Phone validation
    if (!formData.phone) newErrors.phone = 'Phone is required';

    // Shipping validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';

    // Payment validation (only for card)
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
      
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsProcessing(true);

  try {
    // Prepare checkout data
    const checkoutData: CheckoutData = {
      productId: orderDetails.productName.toLowerCase().replace(/\s+/g, '-'),
      productName: orderDetails.productName,
      size: orderDetails.size,
      color: orderDetails.color,
      quantity: orderDetails.quantity,
      designType: orderDetails.designType === 'Custom Upload' ? 'custom' : 'gallery',
      placements: orderDetails.placements.map(label => ({
        key: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        price: 0, // Will be calculated from placement objects
      })),
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
      paymentMethod,
    };

    // Create checkout session
    const result = await createCheckoutSession(checkoutData);

    if (result.success) {
      // Send confirmation email
      await sendOrderConfirmation({
        ...checkoutData,
        orderNumber: result.orderNumber,
      });
setIsProcessing(false);
onClose();

// Add this redirect:
window.location.href = `/order-success?order_id=${result.orderId}`;
      
      // Optionally redirect to success page
      // window.location.href = `/order-success?order_id=${result.orderId}`;
    }
  } catch (error: any) {
    console.error('Checkout error:', error);
    alert('Payment failed. Please try again.');
    setIsProcessing(false);
  }
};

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete your order</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Left Column - Forms */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-orange-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-orange-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                    <Truck className="w-5 h-5" />
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                        placeholder="123 Main Street"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none"
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                          placeholder="CA"
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                          placeholder="90210"
                        />
                        {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                    <Lock className="w-5 h-5" />
                    Payment Method
                  </h3>

                  {/* Payment Method Selector */}
                  <div className="flex gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === 'card'
                          ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-orange-600'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                        paymentMethod === 'paypal'
                          ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-orange-600'
                      }`}
                    >
                      PayPal
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 focus:outline-none`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PayPal */}
                  {paymentMethod === 'paypal' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 text-center"
                    >
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You'll be redirected to PayPal to complete your purchase
                      </p>
                      <div className="text-4xl">💳</div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Product:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.productName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Size:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Color:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.color}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Design:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.designType}</span>
                    </div>
                    {orderDetails.placements.length > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Placements:</span>
                        <div className="mt-1 space-y-1">
                          {orderDetails.placements.map((placement, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-900 dark:text-white">
                              <Check className="w-3 h-3 text-green-600" />
                              <span className="font-semibold text-xs">{placement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
<div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
    <span className="text-gray-900 dark:text-white">${orderDetails.basePrice.toFixed(2)}</span>
  </div>
  
  <div className="flex justify-between text-sm">
    <span>Shipping:</span>
    <span className={orderDetails.shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
      {orderDetails.shippingCost === 0 ? 'FREE' : `$${orderDetails.shippingCost.toFixed(2)}`}
    </span>
  </div>
  
  {orderDetails.placements && orderDetails.placements.length > 0 && (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-400">Placements:</span>
      <span className="text-gray-900 dark:text-white">+${orderDetails.placementPrice.toFixed(2)}</span>
    </div>
  )}
  
  <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between">
    <span className="font-bold text-gray-900 dark:text-white">Total:</span>
    <span className="font-bold text-2xl text-orange-600">${orderDetails.totalPrice.toFixed(2)}</span>
  </div>
</div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Pay $${orderDetails.totalPrice.toFixed(2)}`}
                  </motion.button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Secure checkout • SSL encrypted</span>
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