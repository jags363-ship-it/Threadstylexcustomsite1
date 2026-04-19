import { getNearestEventRushStatus } from './lib/rushOrder';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, AlertCircle, ShoppingCart, CheckCircle } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductConfiguration } from './components/ProductConfiguration';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { StickyCheckout } from './components/StickyCheckout';
import { useUTM } from './hooks/useUTM';
import { products } from './data/products';
import { placements } from './data/placements';
import { designs } from './data/designs';
import { useCart } from './context/CartContext';
import { CartModal } from './components/CartModal';
import { IGPartnershipSection } from './components/IGPartnershipSection';
import { RushOrderBanner } from './components/RushOrderBanner';

// Rush order logic — centralised in lib/rushOrder.ts

function App() {
  // Product state (preserved from original)
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('hoodie');
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);

  // National Games extras
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [orderType, setOrderType] = useState<'individual' | 'team'>('individual');

  const { addToCart } = useCart();
  useUTM();

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const selectedPlacementObjects = placements.filter(p => selectedPlacements.includes(p.key));

  const basePrice = currentProduct.price * quantity;
  const placementPrice = selectedPlacementObjects.reduce((sum, p) => sum + p.addOn, 0) * quantity;
  const teamDiscount = orderType === 'team' && quantity >= 2 ? basePrice * 0.15 : 0;
  const subtotal = basePrice + placementPrice - teamDiscount;
  const SHIPPING_FEE = 7.99;
  const shippingCost = subtotal >= 35 ? 0 : SHIPPING_FEE;
  const totalPrice = subtotal + shippingCost;

  const rushStatus = getNearestEventRushStatus();
  const rush = rushStatus.isRush;
  const estimatedDelivery = rushStatus.estimatedDeliveryDate;

  const hasDesign = selectedDesign !== null || uploadedFile !== null;
  const isBlankSelected = selectedDesign === 'blank';
  const canAddToCart = hasDesign && (isBlankSelected || selectedPlacements.length > 0);

  const handleAddToCart = () => {
    setError(null);
    if (!selectedDesign && !uploadedFile) {
      setError('Pick a design or select blank apparel to continue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!isBlankSelected && selectedPlacements.length === 0) {
      setError('Choose at least one print placement to continue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const designName = selectedDesign ? designs.find(d => d.id === selectedDesign)?.name : 'Custom Design';
    const selectedColorObj = currentProduct.colors.find(c => c.id === selectedColor);
    const productImage = selectedColorObj?.image || currentProduct.colors[0]?.image || '';

    const cartItem = {
      id: `cart_${Date.now()}_${Math.random()}`,
      productId: currentProduct.id,
      productName: currentProduct.name,
      productImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
      designType: uploadedFile ? 'custom' as const : isBlankSelected ? 'blank' as const : 'gallery' as const,
      designId: selectedDesign || undefined,
      designName,
      customDesignFile: uploadedFile || undefined,
      placements: selectedPlacementObjects,
      basePrice: basePrice - teamDiscount,
      placementPrice,
      itemTotal: subtotal,
      // National Games extras stored in metadata
      teamName: teamName || undefined,
      playerName: playerName || undefined,
      playerNumber: playerNumber || undefined,
      orderType,
      isRush: rush,
    };

    try {
      addToCart(cartItem as any);
      setShowCart(true);
      setSelectedDesign(null);
      setUploadedFile(null);
      setSelectedPlacements([]);
      setQuantity(1);
    } catch {
      setError('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Header onCartClick={() => setShowCart(true)} />

      <div className="pt-[128px]"> {/* offset for fixed header + IG strip */}
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
          teamName={teamName}
          setTeamName={setTeamName}
          playerName={playerName}
          setPlayerName={setPlayerName}
          playerNumber={playerNumber}
          setPlayerNumber={setPlayerNumber}
          orderType={orderType}
          setOrderType={setOrderType}
        />

        {/* Order Summary + Add to Cart */}
        <section className="py-12 bg-[#F8F7F4] border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-rush flex-shrink-0" />
                  <span className="text-sm font-body">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Price Summary */}
            {canAddToCart && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-surface p-6 mb-6 shadow-sm"
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wider text-sm mb-5">Order Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>{currentProduct.name} ×{quantity}</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {teamDiscount > 0 && (
                    <div className="flex justify-between text-gold-500">
                      <span>Team bulk discount (15%)</span>
                      <span>−${teamDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {isBlankSelected ? (
                    <div className="flex justify-between text-gray-500 italic text-xs">
                      <span>No design — blank apparel</span>
                      <span>$0.00</span>
                    </div>
                  ) : (
                    selectedPlacementObjects.map(p => (
                      <div key={p.key} className="flex justify-between text-gray-700">
                        <span>{p.label}</span>
                        <span>+${p.addOn.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                  {teamName && <div className="flex justify-between text-gray-400 text-xs"><span>Team: {teamName}</span></div>}
                  {playerName && <div className="flex justify-between text-gray-400 text-xs"><span>Player: {playerName} {playerNumber ? `#${playerNumber}` : ''}</span></div>}
                  
                  <div className="border-t border-white/5 pt-3 mt-3">
                    <div className="flex justify-between text-gray-500 text-xs mb-1">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? '✓ Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-display font-black text-xl">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery estimate — from shared rush utility */}
                <div className="mt-5">
                  <RushOrderBanner status={rushStatus} />
                </div>
              </motion.div>
            )}

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: canAddToCart ? 1.01 : 1 }}
              whileTap={{ scale: canAddToCart ? 0.99 : 1 }}
              onClick={handleAddToCart}
              disabled={!canAddToCart || isLoading}
              className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-display font-black text-lg uppercase tracking-wider transition-all ${
                canAddToCart && !isLoading
                  ? 'btn-gold shadow-xl shadow-gold-500/20'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </motion.button>

            {!hasDesign && (
              <p className="text-center text-gray-600 mt-4 text-sm font-body">
                Select a design or blank apparel above to continue
              </p>
            )}
            {hasDesign && !isBlankSelected && selectedPlacements.length === 0 && (
              <p className="text-center text-gold-500 mt-4 text-sm font-display font-bold uppercase tracking-wide">
                Choose a print placement to continue
              </p>
            )}

            {/* Delivery policy reminder */}
            <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
              {[
                { icon: CheckCircle, label: 'Official IG Partner' },
                { icon: Package, label: '2-Wk Standard Delivery' },
                { icon: CheckCircle, label: 'Secure Stripe Checkout' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Icon className="w-3.5 h-3.5 text-gold-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <IGPartnershipSection />
        <Reviews />
        <FAQ />
        <Footer />
      </div>

      <StickyCheckout
        selectedDesign={selectedDesign}
        uploadedFile={uploadedFile}
        quantity={quantity}
        price={totalPrice}
        onCheckout={handleAddToCart}
        isLoading={isLoading}
        error={error}
        orderType={orderType}
        teamName={teamName}
      />

      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}

export default App;
