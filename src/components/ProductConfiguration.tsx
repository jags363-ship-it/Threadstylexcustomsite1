import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, CheckCircle, RotateCw, Upload, Check, X, AlertCircle, Users, User, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { products, getProductsBySport, getProductsByCategory, getIGMerchProducts, getJerseyPageProducts, SPORTS_LIST, CATEGORIES_LIST } from '../data/products';
import { getPlacementsForProduct } from '../data/placements';
import { useCart } from '../context/CartContext';
import { designs } from '../data/designs';

interface Props {
  selectedSize: string; setSelectedSize: (v: string) => void;
  selectedColor: string; setSelectedColor: (v: string) => void;
  quantity: number; setQuantity: (v: number) => void;
  selectedProduct: string; setSelectedProduct: (v: string) => void;
  selectedDesign: string | null; setSelectedDesign: (v: string | null) => void;
  uploadedFile: File | null; setUploadedFile: (v: File | null) => void;
  selectedPlacements: string[]; setSelectedPlacements: (v: string[]) => void;
  teamName: string; setTeamName: (v: string) => void;
  playerName: string; setPlayerName: (v: string) => void;
  playerNumber: string; setPlayerNumber: (v: string) => void;
  orderType: 'individual' | 'team'; setOrderType: (v: 'individual' | 'team') => void;
}

// Sport icons map
const SPORT_ICONS: Record<string, string> = {
  'Basketball': '🏀', 'Soccer': '⚽', 'Volleyball': '🏐',
  'Flag Football': '🏈', 'Cricket': '🏏', 'Softball': '🥎',
  'Track & Field': '🏃', 'Martial Arts': '🥋', 'Tennis': '🎾',
  'Table Tennis': '🏓', 'Archery': '🏹', 'Arm Wrestling': '💪',
  'Fitness Course': '🏋️', 'Pickleball': '🏸', '5K Run': '🏃',
  'Bike Ride': '🚴', 'Badminton': '🏸', 'Ultimate Frisbee': '🥏',
};

export function ProductConfiguration({
  selectedSize, setSelectedSize, selectedColor, setSelectedColor,
  quantity, setQuantity, selectedProduct, setSelectedProduct,
  selectedDesign, setSelectedDesign, uploadedFile, setUploadedFile,
  selectedPlacements, setSelectedPlacements, teamName, setTeamName,
  playerName, setPlayerName, playerNumber, setPlayerNumber,
  orderType, setOrderType,
}: Props) {
  // Step 1 = sport selection, Step 2 = product selection, Step 3 = customization
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const currentColor = currentProduct.colors.find(c => c.id === selectedColor) || currentProduct.colors[0];
  const hasBackImage = !!currentColor.backImage;
  const currentImage = viewSide === 'back' && currentColor.backImage ? currentColor.backImage : currentColor.image;
  const savingsPercent = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
  const teamPrice = +(currentProduct.price * 0.85).toFixed(2);
  // IG Merch: only show in standalone IG Merch section, never mixed into sport pages
  // For jersey listings, apply Men's → Women's → Other → ordering
  const displayedProducts = activeCategory === 'ig-merch'
    ? getIGMerchProducts()
    : selectedSport
      ? activeCategory === 'jersey'
        ? getJerseyPageProducts(selectedSport)
        : getProductsBySport(selectedSport).filter(p => activeCategory === 'all' || p.category === activeCategory)
      : activeCategory === 'jersey'
        ? getJerseyPageProducts()
        : getProductsByCategory(activeCategory === 'all' ? 'all' : activeCategory).filter(p => p.category !== 'ig-merch');

  const handleSelectSport = (sport: string) => {
    setSelectedSport(sport);
    setActiveCategory('all');
    const first = getProductsBySport(sport)[0];
    if (first) { setSelectedProduct(first.id); setSelectedColor(first.colors[0]?.id || 'black'); setSelectedSize(first.sizes[0] || 'M'); }
    setStep(2);
  };

  const handleSelectProduct = (productId: string) => {
    const p = products.find(x => x.id === productId)!;
    setSelectedProduct(productId);
    setSelectedColor(p.colors[0]?.id || 'black');
    setSelectedSize(p.sizes.includes('M') ? 'M' : p.sizes[0]);
    setViewSide('front');
    setStep(3);
    setTimeout(() => document.getElementById('customization-panel')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const compressImage = useCallback(async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const max = 2000;
          if (width > max || height > max) {
            if (width > height) { height = (height/width)*max; width = max; }
            else { width = (width/height)*max; height = max; }
          }
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => {
            if (blob) resolve(new File([blob], file.name, { type: file.type }));
            else reject(new Error('Failed'));
          }, file.type, 0.85);
        };
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Read failed'));
      reader.readAsDataURL(file);
    });
  }, []);

  const processFile = useCallback(async (file: File) => {
    setFileError(null); setIsProcessing(true);
    if (!file.type.match(/^image\/(png|jpeg|jpg|svg\+xml)$/)) { setFileError('PNG, JPG, or SVG only'); setIsProcessing(false); return; }
    if (file.size > 5 * 1024 * 1024) { setFileError('Max file size: 5MB'); setIsProcessing(false); return; }
    try {
      const processed = file.size > 2 * 1024 * 1024 ? await compressImage(file) : file;
      setUploadedFile(processed);
      setSelectedDesign(null);
      const reader = new FileReader();
      reader.onload = (e) => setUploadedPreview(e.target?.result as string);
      reader.readAsDataURL(processed);
    } catch { setFileError('Failed to process image'); }
    finally { setIsProcessing(false); }
  }, [compressImage, setUploadedFile, setSelectedDesign]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `cart_${Date.now()}_${Math.random()}`,
      productId: currentProduct.id,
      productName: currentProduct.name,
      productImage: currentImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
      designType: uploadedFile ? 'custom' as const : selectedDesign === 'blank' ? 'blank' as const : 'gallery' as const,
      designId: selectedDesign || undefined,
      designName: selectedDesign ? designs.find(d => d.id === selectedDesign)?.name : 'Custom Upload',
      customDesignFile: uploadedFile || undefined,
      placements: getPlacementsForProduct(currentProduct.id).filter(p => selectedPlacements.includes(p.key)),
      basePrice: orderType === 'team' && quantity >= currentProduct.teamOrderMin ? teamPrice * quantity : currentProduct.price * quantity,
      placementPrice: 0,
      itemTotal: orderType === 'team' && quantity >= currentProduct.teamOrderMin ? teamPrice * quantity : currentProduct.price * quantity,
      teamName: teamName || undefined,
      playerName: playerName || undefined,
      playerNumber: playerNumber || undefined,
      orderType,
      sport: selectedSport || undefined,
    };
    addToCart(cartItem as any);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
    setSelectedDesign(null); setUploadedFile(null); setUploadedPreview(null); setSelectedPlacements([]); setQuantity(1);
  };

  // ── STEP 1: Sport Selection ────────────────────────────────
  if (step === 1) {
    return (
      <section id="products" className="py-16 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#1B4D3E] mb-2">Step 1 — Choose Your Sport</p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-[#0A1628]" style={{fontFamily:"'Barlow',sans-serif"}}>
              SELECT YOUR SPORT
            </h2>
            <p className="text-gray-600 mt-3 text-base">Pick your sport to see the right apparel options for your team</p>
          </div>

          {/* IG Merch standalone shortcut — 10% larger than sport cards */}
          <div className="mb-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedSport(''); setActiveCategory('ig-merch'); setStep(2); }}
              className="flex items-center gap-3 px-[2.2rem] py-[1.1rem] rounded-2xl font-black text-[1.21rem] uppercase tracking-wide shadow-lg border-2 border-[#C8A951]"
              style={{ background: 'linear-gradient(135deg,#0A1628,#1B4D3E)', color: '#C8A951', fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              🏅 Islamic Games Official Merchandise
              <ChevronRight className="w-[1.375rem] h-[1.375rem]" />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SPORTS_LIST.map((sport) => {
              const count = getProductsBySport(sport).length;
              return (
                <motion.button
                  key={sport}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectSport(sport)}
                  className="bg-white rounded-2xl p-5 text-center border-2 border-transparent hover:border-[#1B4D3E] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">{SPORT_ICONS[sport] || '🏅'}</div>
                  <p className="font-bold text-sm text-[#0A1628] group-hover:text-[#1B4D3E]"
                     style={{ fontFamily: "'Barlow',sans-serif" }}>
                    {sport}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{count} items</p>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => { setSelectedSport(''); setActiveCategory('all'); setStep(2); }}
              className="text-[#1B4D3E] font-bold text-sm underline underline-offset-4 hover:text-[#2D7A55]"
            >
              Browse all apparel →
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── STEP 2: Product Grid ────────────────────────────────────
  if (step === 2) {
    return (
      <section id="products" className="py-16 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <button onClick={() => setStep(1)} className="hover:text-[#1B4D3E] font-semibold">All Sports</button>
            {selectedSport && <><ChevronRight className="w-4 h-4" /><span className="font-bold text-[#0A1628]">{SPORT_ICONS[selectedSport]} {selectedSport}</span></>}
            {activeCategory === 'ig-merch' && !selectedSport && <><ChevronRight className="w-4 h-4" /><span className="font-bold text-[#0A1628]">🏅 IG Merchandise</span></>}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#1B4D3E] mb-1">Step 2 — Select Apparel</p>
              <h2 className="font-extrabold text-2xl text-[#0A1628]" style={{fontFamily:"'Barlow',sans-serif"}}>
                {selectedSport ? `${selectedSport} Apparel` : 'All Apparel'}
              </h2>
              <p className="text-gray-500 text-sm">{displayedProducts.length} items — click any to customize</p>
            </div>
            <button onClick={() => setStep(1)}
              className="text-sm font-bold text-[#1B4D3E] border-2 border-[#1B4D3E] px-4 py-2 rounded-xl hover:bg-[#1B4D3E] hover:text-white transition-all">
              ← Change Sport
            </button>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[{ id: 'all', label: 'All', emoji: '🏅' }, ...CATEGORIES_LIST].map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border-2 transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#1B4D3E] bg-[#1B4D3E] text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#1B4D3E] hover:text-[#1B4D3E]'
                }`}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {displayedProducts.map((product) => {
              const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <motion.button
                  key={product.id}
                  whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectProduct(product.id)}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#1B4D3E] shadow-sm hover:shadow-lg transition-all text-left group"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img src={product.thumbnail} alt={product.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {disc > 0 && <span className="bg-[#C8A951] text-[#0A1628] text-[10px] font-black px-2 py-0.5 rounded-full">{disc}% OFF</span>}
                      {product.badge && <span className="bg-[#1B4D3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{product.badge}</span>}
                      {product.modest && <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Modest</span>}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-[#1B4D3E] font-medium uppercase tracking-wide">{product.categoryLabel}</p>
                    <p className="font-semibold text-sm text-[#0A1628] leading-tight mt-0.5 line-clamp-2">{product.name}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-black text-[#0A1628]">${product.price}</span>
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    </div>
                    <p className="text-[10px] text-[#1B4D3E] font-bold mt-0.5">
                      Team: ${(product.price * 0.85).toFixed(0)}/ea (min {product.teamOrderMin})
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.colors.slice(0, 8).map(c => (
                        <div key={c.id} title={c.name}
                          className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                          style={{ backgroundColor: c.hex }} />
                      ))}
                      {product.colors.length > 8 && <span className="text-[10px] text-gray-400">+{product.colors.length - 8}</span>}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ── STEP 3: Customization ───────────────────────────────────
  return (
    <section id="customization-panel" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <button onClick={() => setStep(1)} className="hover:text-[#1B4D3E] font-semibold">All Sports</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => setStep(2)} className="hover:text-[#1B4D3E] font-semibold">
            {selectedSport || 'All Apparel'}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="font-bold text-[#0A1628]">{currentProduct.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT — Image + Upload */}
          <div className="space-y-5">
            {/* Product image */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedProduct}-${selectedColor}-${viewSide}`}
                  src={currentImage}
                  alt={currentProduct.name}
                  className="w-full aspect-square object-contain p-8"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                />
              </AnimatePresence>
              {hasBackImage && (
                <div className="p-3 border-t border-gray-200 flex gap-2">
                  {(['front', 'back'] as const).map(side => (
                    <button key={side} onClick={() => setViewSide(side)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                        viewSide === side
                          ? 'bg-[#0A1628] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                      {side === 'back' && <RotateCw className="w-3 h-3" />} {side} View
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Upload logo section — NO gallery designs */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-base text-[#0A1628]">Upload Your Team Logo / Artwork</h3>
                <p className="text-xs text-gray-500 mt-0.5">PNG, JPG, or SVG · Max 5MB · Transparent background recommended</p>
              </div>
              <div className="p-5">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} className="hidden" />

                {!uploadedPreview ? (
                  <div
                    onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-[#1B4D3E] bg-green-50' : 'border-gray-300 hover:border-[#1B4D3E] hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1B4D3E]/10 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-[#1B4D3E]" />
                    </div>
                    <p className="font-bold text-gray-700 text-sm mb-1">Drop your logo here or click to browse</p>
                    <p className="text-xs text-gray-400">PNG · JPG · SVG · Max 5MB</p>
                    {isProcessing && <p className="text-[#1B4D3E] text-xs mt-2 font-bold">Processing...</p>}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <img src={uploadedPreview} alt="Logo" className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-white" />
                    <div className="flex-1">
                      <p className="font-bold text-green-800 text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" /> Logo uploaded
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Will be printed on your order</p>
                    </div>
                    <button onClick={() => { setUploadedFile(null); setUploadedPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {fileError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fileError}</p>}

                <div className="mt-4 p-4 bg-[#0A1628] rounded-xl text-white">
                  <p className="font-black text-xs uppercase tracking-wider text-[#C8A951] mb-2">+ Custom Print — Included On Every Order</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                    {['Team name on front & back','Player name & number','Upload your team logo / crest','Screen print, sublimation, or embroidery','Choose primary & secondary colours','Individual athletes & full teams'].map(f => (
                      <div key={f} className="flex items-start gap-1"><Check className="w-3 h-3 text-[#C8A951] flex-shrink-0 mt-0.5" />{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Config panel */}
          <div className="space-y-5">
            {/* Product info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs text-[#1B4D3E] font-bold uppercase tracking-wider">{currentProduct.categoryLabel}</p>
                  <h2 className="font-bold text-xl text-[#0A1628] leading-tight mt-0.5">{currentProduct.name}</h2>
                </div>
                {savingsPercent > 0 && (
                  <span className="bg-[#C8A951] text-[#0A1628] text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0">{savingsPercent}% OFF</span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{currentProduct.description}</p>
              <div className="space-y-1 mb-4">
                {currentProduct.features.slice(0, 4).map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B4D3E] flex-shrink-0 mt-0.5" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-3 pt-4 border-t border-gray-100">
                <span className="font-black text-3xl text-[#0A1628]">${currentProduct.price}</span>
                <span className="text-gray-400 text-lg line-through">${currentProduct.originalPrice}</span>
                <span className="text-xs text-[#1B4D3E] font-bold ml-auto">Team: ${teamPrice}/ea (min {currentProduct.teamOrderMin})</span>
              </div>
            </div>

            {/* Order type */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Order Type</p>
              <div className="grid grid-cols-2 gap-3">
                {([['individual', User, 'Individual', 'Single order'] as const, ['team', Users, 'Team Order', '15% bulk discount'] as const]).map(([id, Icon, label, sub]) => (
                  <button key={id} onClick={() => setOrderType(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      orderType === id ? 'border-[#1B4D3E] bg-[#1B4D3E]/5' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <Icon className={`w-6 h-6 ${orderType === id ? 'text-[#1B4D3E]' : 'text-gray-400'}`} />
                    <p className={`font-semibold text-sm ${orderType === id ? 'text-[#1B4D3E]' : 'text-gray-700'}`}>{label}</p>
                    <p className="text-gray-500 text-[10px]">{sub}</p>
                    {orderType === id && <Check className="w-3.5 h-3.5 text-[#1B4D3E]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Team / Player details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Team & Player Details</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Team Name</label>
                  <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} maxLength={40}
                    placeholder="e.g. Canada Athletics"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4D3E] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Player Name</label>
                    <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} maxLength={30}
                      placeholder="e.g. Johnson"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4D3E] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Player Number</label>
                    <input type="text" value={playerNumber} onChange={e => setPlayerNumber(e.target.value.replace(/\D/,'').slice(0,3))} maxLength={3}
                      placeholder="e.g. 23"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4D3E] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Age category (sport-specific) */}
            {currentProduct.ageCategories && currentProduct.ageCategories.length > 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Age Category</p>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.ageCategories.map(age => (
                    <button key={age}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-gray-200 hover:border-[#1B4D3E] hover:text-[#1B4D3E] text-gray-600 transition-all">{age}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {currentProduct.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? 'border-[#0A1628] bg-[#0A1628] text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}>{size}</button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">
                Color — <span className="text-[#0A1628] normal-case">{currentProduct.colors.find(c => c.id === selectedColor)?.name}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {currentProduct.colors.map(color => (
                  <button key={color.id} onClick={() => { setSelectedColor(color.id); setViewSide('front'); }}
                    title={color.name}
                    className={`w-9 h-9 rounded-full border-4 transition-all ${
                      selectedColor === color.id ? 'border-[#0A1628] scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}>
                    {selectedColor === color.id && (
                      <div className="flex items-center justify-center h-full">
                        <div className={`w-2.5 h-2.5 rounded-full ${color.hex === '#FFFFFF' ? 'bg-gray-900' : 'bg-white'}`} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">
                Quantity {orderType === 'team' && <span className="text-[#1B4D3E]">— Team Bulk</span>}
              </p>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xl transition-all">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-black text-[#0A1628] w-10 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(999, quantity + 1))}
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl transition-all"
                  style={{ background: 'linear-gradient(135deg,#C8A951,#E8CC7A)', color: '#0A1628' }}>
                  <Plus className="w-4 h-4" />
                </button>
              {orderType === 'team' && quantity >= currentProduct.teamOrderMin && (
                  <span className="text-xs text-[#1B4D3E] font-bold">✓ Team discount applied</span>
                )}
              </div>
              {orderType === 'team' && quantity < currentProduct.teamOrderMin && (
                <p className="text-xs text-gray-400 mt-2">Add {currentProduct.teamOrderMin - quantity} more for team pricing (min 2 units)</p>
              )}
            </div>

            {/* Price summary + Add to Cart */}
            <div className="bg-[#0A1628] rounded-2xl p-5 text-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-400 text-xs">
                    {orderType === 'team' && quantity >= currentProduct.teamOrderMin ? 'Team price' : 'Price'} × {quantity}
                  </p>
                  <p className="font-black text-2xl text-white">
                    ${(orderType === 'team' && quantity >= currentProduct.teamOrderMin ? teamPrice : currentProduct.price) * quantity}
                  </p>
                </div>
                {orderType === 'team' && quantity >= currentProduct.teamOrderMin && (
                  <div className="text-right">
                    <p className="text-[#C8A951] text-xs font-bold">15% bulk discount</p>
                    <p className="text-gray-400 text-xs line-through">${currentProduct.price * quantity}</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all"
                style={{ background: addedToCart ? '#16A34A' : 'linear-gradient(135deg,#C8A951,#E8CC7A)', color: '#0A1628' }}
              >
                {addedToCart ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </motion.button>

              <p className="text-center text-gray-500 text-xs mt-3">
                📦 Standard 2-week delivery · Rush orders within 2 weeks of event not guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
