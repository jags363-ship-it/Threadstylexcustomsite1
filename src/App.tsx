import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductConfiguration } from './components/ProductConfiguration';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { StickyCheckout } from './components/StickyCheckout';
import { ThemeToggle } from './components/ThemeToggle';
import { useUTM } from './hooks/useUTM';
import { products } from './data/products';
import { placements } from './data/placements';
import { CheckoutModal } from './components/CheckoutModal';

function App() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('hoodie');
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const utmParams = useUTM();
  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const currentColor = currentProduct.colors.find(c => c.id === selectedColor) || currentProduct.colors[0];
  const selectedPlacementObjects = placements.filter(p => selectedPlacements.includes(p.key));
const basePrice = currentProduct.price * quantity;
const placementPrice = selectedPlacementObjects.reduce((sum, p) => sum + p.addOn, 0);
const subtotal = basePrice + placementPrice;

// Shipping calculation
const SHIPPING_THRESHOLD = 35;
const SHIPPING_FEE = 7.99;
const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
const totalPrice = subtotal + shippingCost;

const qualifiesForFreeShipping = subtotal >= SHIPPING_THRESHOLD;

const handleCheckout = () => {
  setError(null);

  const isBlankSelected = selectedDesign === 'blank';

  if (!selectedDesign && !uploadedFile) {
    setError('Pick a design or select blank apparel! 🎃');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (!isBlankSelected && selectedPlacements.length === 0) {
    setError('Choose where to print your design! 📍');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  console.log('Opening checkout modal...'); // ← ADD THIS
  console.log('Order details:', {
    productName: currentProduct.name,
    size: selectedSize,
    color: selectedColor,
    total: totalPrice
  }); // ← ADD THIS
  
  setShowCheckoutModal(true);
};

  const hasDesign = selectedDesign !== null || uploadedFile !== null;
const isBlankSelected = selectedDesign === 'blank';
const canCheckout = hasDesign && (isBlankSelected || selectedPlacements.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <ThemeToggle />

      <div className="pt-20 md:pt-24">
        <Hero />
        
        <ProductConfiguration
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedDesign={selectedDesign}
          setSelectedDesign={setSelectedDesign}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          selectedPlacements={selectedPlacements}
          setSelectedPlacements={setSelectedPlacements}
        />

        <section className="py-8 md:py-12 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/30 px-6 py-4 rounded-xl mb-6 shadow-lg"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

{/* Price Breakdown */}
{hasDesign && (selectedDesign === 'blank' || selectedPlacements.length > 0) && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-lg"
  >
    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Summary</h3>
    <div className="space-y-3">
      <div className="flex justify-between text-gray-700 dark:text-gray-300">
        <span>{currentProduct.name} ({quantity}x)</span>
        <span>${basePrice.toFixed(2)}</span>
      </div>
      {selectedDesign === 'blank' ? (
        <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm italic">
          <span>No design - blank apparel</span>
          <span>$0.00</span>
        </div>
      ) : (
        selectedPlacementObjects.map((placement) => (
          <div key={placement.key} className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>{placement.label}</span>
            <span>+${placement.addOn.toFixed(2)}</span>
          </div>
        ))
      )}
      
      {/* Subtotal */}
      <div className="flex justify-between text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      {/* Shipping */}
      <div className="flex justify-between text-gray-700 dark:text-gray-300">
        <span className="flex items-center gap-2">
          Shipping (US)
          {qualifiesForFreeShipping && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-semibold">
              FREE
            </span>
          )}
        </span>
        <span className={qualifiesForFreeShipping ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
          {qualifiesForFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
        </span>
      </div>
      
      {/* Free shipping banner */}
      {!qualifiesForFreeShipping && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
            🚚 Add ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for FREE shipping!
          </p>
        </div>
      )}
      
      {qualifiesForFreeShipping && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
            🎉 You qualify for FREE shipping!
          </p>
        </div>
      )}
      
      {/* Total */}
      <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-3 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  </motion.div>
)}

<motion.button
  whileHover={{ scale: canCheckout ? 1.02 : 1 }}
  whileTap={{ scale: canCheckout ? 0.98 : 1 }}
  onClick={handleCheckout}
  disabled={!canCheckout || isLoading}
  className={`w-full flex items-center justify-center gap-3 px-8 py-6 rounded-2xl font-bold text-xl shadow-xl transition-all ${
    canCheckout && !isLoading
      ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:shadow-2xl'
      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
  }`}
>
  <ShoppingCart className="w-6 h-6" />
  {isLoading ? 'Processing Your Order...' : `Checkout - $${totalPrice.toFixed(2)}`}
</motion.button>

{!hasDesign && (
  <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
    Select a design or blank apparel to continue
  </p>
)}
{hasDesign && !isBlankSelected && selectedPlacements.length === 0 && (
  <p className="text-center text-orange-600 dark:text-orange-400 mt-4 text-sm font-semibold">
    Choose a print placement to continue 🎃
  </p>
)}
            </div>
          </div>
        </section>

        <Reviews />

        <FAQ />

        <Footer />
      </div>

      <StickyCheckout
        selectedDesign={selectedDesign}
        uploadedFile={uploadedFile}
        quantity={quantity}
        price={totalPrice}
        onCheckout={handleCheckout}
        isLoading={isLoading}
        error={error}
      />
      
      <CheckoutModal
  isOpen={showCheckoutModal}
  onClose={() => setShowCheckoutModal(false)}
  orderDetails={{
    productName: currentProduct.name,
    productId: currentProduct.id,
    size: selectedSize!,
    color: selectedColor,
    quantity,
    designType: uploadedFile ? 'custom' : 'gallery',
    designId: selectedDesign || undefined,
    placements: selectedPlacementObjects,
    basePrice,
    placementPrice,
    subtotal,
    shippingCost,
    totalPrice,
  }}
  customDesignFile={uploadedFile}
/>
    </div>
  );
}

export default App;