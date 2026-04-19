import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RushOrderBanner } from '../components/RushOrderBanner';
import { getNearestEventRushStatus } from '../lib/rushOrder';

interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cart, cartSubtotal, cartShipping, cartTotal, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
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
  const [calculatedShipping, setCalculatedShipping] = useState<number | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  // Rush order status — computed once, never affects payment logic
  const rushStatus = getNearestEventRushStatus();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

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

  const calculateShipping = async () => {
    if (!formData.zipCode || formData.zipCode.length < 5) return;
    setShippingLoading(true);
    // Shipping rates based on ZIP/state — real-time estimate
    // Simple rule: Hawaii/Alaska = $25, rest of US standard based on cart
    const hawaiiAlaska = ['HI', 'AK'];
    const isRemote = hawaiiAlaska.includes(formData.state.toUpperCase());
    const baseShipping = cartSubtotal >= 75 ? 0 : cartSubtotal >= 35 ? 7.99 : 12.99;
    const shipping = isRemote ? 25 : baseShipping;
    setTimeout(() => {
      setCalculatedShipping(shipping);
      setShippingLoading(false);
    }, 600); // Simulate API call
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) { calculateShipping(); setStep(3); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const orderNumber = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderId = `OID-${Date.now().toString(36)}`;

      const addressParts = [
        formData.address,
        formData.apartment,
        formData.city,
        formData.state,
        formData.zipCode
      ].filter(Boolean);
      const fullAddress = addressParts.join(', ');

      const formattedItems = cart.map((item, index) => {
        const placementsStr = item.placements && item.placements.length > 0
          ? item.placements.map((p: any) => p.label).join(', ')
          : '';

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
        };
      });

      const n8nOrderPayload = {
        orderNumber: orderNumber,
        orderId: orderId,
        date: new Date().toISOString(),
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: fullAddress,
        subtotal: Number(cartSubtotal.toFixed(2)),
        shipping: Number(cartShipping.toFixed(2)),
        totalPrice: Number(cartTotal.toFixed(2)),
        orderStatus: 'Pending',
        trackingNumber: '',
        shippedDate: '',
        items: formattedItems
      };

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(cartTotal * 100),
          orderData: n8nOrderPayload,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
                line2: formData.apartment,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: formData.country,
              },
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        const appOrder = {
          orderNumber,
          orderId,
          orderDate: new Date().toISOString(),
          paymentStatus: 'paid',
          orderStatus: 'pending',
          shippingStatus: 'pending',
          trackingNumber: '',
          customerInfo: formData,
          items: cart,
          itemCount: cart.length,
          subtotal: cartSubtotal,
          shippingCost: cartShipping,
          totalPrice: cartTotal,
          paymentMethod: 'card',
        };

        localStorage.setItem('completedOrder', JSON.stringify(appOrder));

        clearCart();

        navigate(`/order-success?order_number=${orderNumber}`);
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#dc2626',
      },
    },
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Secure Checkout
            </h1>
          </div>

          {/* Rush Order Warning — visual only, no payment logic change */}
          {(rushStatus.isRush || rushStatus.warningLevel === 'caution') && (
            <div className="px-6 pt-4">
              <RushOrderBanner status={rushStatus} />
            </div>
          )}

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
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
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

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        3
                      </div>
                      Payment Information
                    </h3>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Secure Payment
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Your payment is processed securely with Stripe. We never store your card details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Information
                      </label>
                      <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700">
                        <CardElement options={cardElementOptions} />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <p className="text-red-800 dark:text-red-200">{error}</p>
                      </div>
                    )}

                    {/* Rush Order final acknowledgment — displayed in Step 3 before payment */}
                    {rushStatus.isRush && (
                      <div className="bg-[#3D0000] border border-red-900/60 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-rush flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-display font-bold text-red-200 text-sm uppercase tracking-wider mb-1">Rush Order Acknowledgment</p>
                          <p className="text-xs text-red-300 leading-relaxed">
                            By completing this purchase you confirm you understand this is a <strong>RUSH ORDER</strong>. Standard production time is 2 weeks. Delivery before your event date is <strong>NOT guaranteed</strong>. No refunds will be issued for late delivery on rush orders.
                          </p>
                        </div>
                      </div>
                    )}

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
                        disabled={isProcessing || !stripe}
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
                            <span>Pay ${cartTotal.toFixed(2)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl h-fit lg:sticky lg:top-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Summary</h3>

                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
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
                    <span className={
                      shippingLoading ? 'text-gray-400 italic' :
                      (calculatedShipping !== null ? calculatedShipping : cartShipping) === 0
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-900 dark:text-white'
                    }>
                      {shippingLoading ? 'Calculating...' :
                        calculatedShipping !== null
                          ? (calculatedShipping === 0 ? 'FREE' : `$${calculatedShipping.toFixed(2)}`)
                          : (cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`)
                      }
                    </span>
                  </div>
                  {calculatedShipping !== null && formData.state && (
                    <div className="text-xs text-green-600 font-medium">
                      ✓ Shipping estimated for {formData.state.toUpperCase()}
                    </div>
                  )}

                  <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-2xl text-blue-600 dark:text-cyan-400">
                      ${(cartSubtotal + (calculatedShipping !== null ? calculatedShipping : cartShipping)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
