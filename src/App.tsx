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
import { designs } from './data/designs';
import { useCart } from './context/CartContext';
import { CartModal } from './components/CartModal';
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
  const [showCart, setShowCart] = useState(false);
const { addToCart, cart, cartSubtotal, cartShipping, cartTotal } = useCart();
  const { addToCart } = useCart();
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

const handleAddToCart = () => {
  setError(null);

  const isBlankSelected = selectedDesign === 'blank';

  if (!selectedDesign && !uploadedFile) {
    setError('Pick a design or select blank apparel! ❄️');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (!isBlankSelected && selectedPlacements.length === 0) {
    setError('Choose where to print your design! 📍');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  console.log('Adding to cart...'); // Debug

  // Get design name
  const designName = selectedDesign 
    ? designs.find(d => d.id === selectedDesign)?.name 
    : 'Custom Design';

// Get product image from colors array
const selectedColorObj = currentProduct.colors.find(c => c.id === selectedColor);
const productImage = selectedColorObj?.image || currentProduct.colors[0]?.image || 'https://via.placeholder.com/150?text=Product';
console.log('Product image:', productImage); // Debug
  // Create cart item
  const cartItem = {
    id: `cart_${Date.now()}_${Math.random()}`,
    productId: currentProduct.id,
    productName: currentProduct.name,
    productImage,
    size: selectedSize!,
    color: selectedColor,
    quantity,
    designType: uploadedFile ? 'custom' as const : isBlankSelected ? 'blank' as const : 'gallery' as const,
    designId: selectedDesign || undefined,
    designName,
    customDesignFile: uploadedFile || undefined,
    placements: selectedPlacementObjects,
    basePrice,
    placementPrice,
    itemTotal: basePrice + placementPrice,
  };

  console.log('Cart item to add:', cartItem); // Debug

  try {
    addToCart(cartItem);
    console.log('Item added to cart successfully!'); // Debug
    
    
    
    // Open cart automatically
    setShowCart(true);
    
    // Reset selections
    setSelectedDesign(null);
    setUploadedFile(null);
    setSelectedPlacements([]);
    setQuantity(1);
  } catch (error) {
    console.error('Error adding to cart:', error);
    setError('Failed to add to cart. Please try again.');
  }
};

  const hasDesign = selectedDesign !== null || uploadedFile !== null;
  const isBlankSelected = selectedDesign === 'blank';
  const canAddToCart = hasDesign && (isBlankSelected || selectedPlacements.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header onCartClick={() => setShowCart(true)} />
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
                  <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Current Item Summary</h3>
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
                    
                    <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-3 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Item Total</span>
                      <span>${(basePrice + placementPrice).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: canAddToCart ? 1.02 : 1 }}
                whileTap={{ scale: canAddToCart ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={!canAddToCart || isLoading}
                className={`w-full flex items-center justify-center gap-3 px-8 py-6 rounded-2xl font-bold text-xl shadow-xl transition-all ${
                  canAddToCart && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
              </motion.button>

              {!hasDesign && (
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Select a design or blank apparel to continue
                </p>
              )}
              {hasDesign && !isBlankSelected && selectedPlacements.length === 0 && (
                <p className="text-center text-blue-600 dark:text-cyan-400 mt-4 text-sm font-semibold">
                  Choose a print placement to continue ❄️
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
        price={basePrice + placementPrice}
        onCheckout={handleAddToCart}
        isLoading={isLoading}
        error={error}
      />
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          setShowCheckoutModal(true);
        }}
      />

      <CheckoutModal
  isOpen={showCheckoutModal}
  onClose={() => setShowCheckoutModal(false)}
  cartItems={cart}
  cartSubtotal={cartSubtotal}
  cartShipping={cartShipping}
  cartTotal={cartTotal}
/>
    </div>
  );
}

export default App;