import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Tag, CheckCircle, RotateCw, Upload, Check, X, AlertCircle, MapPin, Users, User, Package } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { products, getProductsByCategory, getProductsBySport, ALL_SPORTS } from '../data/products';
import { getPlacementsForProduct } from '../data/placements';
import { designs } from '../data/designs';

interface ProductConfigurationProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  selectedDesign: string | null;
  setSelectedDesign: (design: string | null) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  selectedPlacements: string[];
  setSelectedPlacements: (placements: string[]) => void;
  // National Games extras
  teamName: string;
  setTeamName: (v: string) => void;
  playerName: string;
  setPlayerName: (v: string) => void;
  playerNumber: string;
  setPlayerNumber: (v: string) => void;
  orderType: 'individual' | 'team';
  setOrderType: (v: 'individual' | 'team') => void;
}

const CATEGORIES = [
  { id: 'all',           label: 'All Items',       icon: '🏅' },
  { id: 'tshirt',        label: 'T-Shirts',         icon: '👕' },
  { id: 'jersey',        label: 'Jerseys',          icon: '🏆' },
  { id: 'hoodie',        label: 'Hoodies',          icon: '🧥' },
  { id: 'sweatshirt',    label: 'Crewnecks',        icon: '🔵' },
  { id: 'sweatpants',    label: 'Tracksuit Pants',  icon: '🏃' },
  { id: 'sport-specific',label: 'Sport-Specific',   icon: '⚡' },
  { id: 'hat',           label: 'Hats & Accessories',icon: '🧢' },
];

const SPORTS = ['All Sports', ...ALL_SPORTS];

export function ProductConfiguration({
  selectedSize, setSelectedSize,
  selectedColor, setSelectedColor,
  quantity, setQuantity,
  selectedProduct, setSelectedProduct,
  selectedDesign, setSelectedDesign,
  uploadedFile, setUploadedFile,
  selectedPlacements, setSelectedPlacements,
  teamName, setTeamName,
  playerName, setPlayerName,
  playerNumber, setPlayerNumber,
  orderType, setOrderType,
}: ProductConfigurationProps) {
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [activeTab, setActiveTab] = useState<'designs' | 'upload'>('designs');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSport, setActiveSport] = useState('All Sports');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const currentColor = currentProduct.colors.find(c => c.id === selectedColor) || currentProduct.colors[0];
  const savings = currentProduct.originalPrice - currentProduct.price;
  const savingsPercent = Math.round((savings / currentProduct.originalPrice) * 100);
  const hasBackImage = !!currentColor.backImage;
  const currentImage = viewSide === 'back' && currentColor.backImage ? currentColor.backImage : currentColor.image;

  const teamUnitPrice = Math.round(currentProduct.price * 0.85 * 100) / 100; // 15% team discount

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    const np = products.find(p => p.id === productId);
    if (np) { setSelectedSize(np.sizes[2]); setSelectedColor(np.colors[0].id); setViewSide('front'); }
  };

  const handleColorChange = (colorId: string) => { setSelectedColor(colorId); setViewSide('front'); };

  const togglePlacement = (key: string) => {
    setSelectedPlacements(selectedPlacements.includes(key)
      ? selectedPlacements.filter(p => p !== key)
      : [...selectedPlacements, key]);
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
            if (width > height) { height = (height / width) * max; width = max; }
            else { width = (width / height) * max; height = max; }
          }
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => {
            if (blob) resolve(new File([blob], file.name, { type: file.type, lastModified: Date.now() }));
            else reject(new Error('Compression failed'));
          }, file.type, 0.85);
        };
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Read failed'));
      reader.readAsDataURL(file);
    });
  }, []);

  const validateAndProcessFile = useCallback(async (file: File) => {
    setError(null); setIsProcessing(true);
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) { setError('PNG or JPG only!'); setIsProcessing(false); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Max 5MB!'); setIsProcessing(false); return; }
    try {
      const processed = file.size > 2 * 1024 * 1024 ? await compressImage(file) : file;
      setUploadedFile(processed); setSelectedDesign(null); setError(null);
    } catch { setError('Failed to process image.'); }
    finally { setIsProcessing(false); }
  }, [compressImage, setUploadedFile, setSelectedDesign]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0]; if (file) validateAndProcessFile(file);
  }, [validateAndProcessFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (file) validateAndProcessFile(file);
  }, [validateAndProcessFile]);

  const clearUpload = () => { setUploadedFile(null); setError(null); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const filteredProducts = (() => {
    const byCat = getProductsByCategory(activeCategory);
    if (activeSport === 'All Sports') return byCat;
    return byCat.filter(p => p.sports.includes(activeSport));
  })();

  return (
    <section id="products" className="py-16 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Step 1 of 4</p>
          <h2 className="step-heading mb-3" style={{color:"#0A1628"}}>SELECT YOUR APPAREL</h2>
          <p className="text-gray-600 font-body max-w-xl mx-auto">Browse our full collection. All items are customizable with team name, player name, number, and your logo.</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-display font-bold tracking-wider uppercase transition-all border flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#C8A951] text-[#060E1A] border-[#C8A951] shadow-sm'
                  : 'border-gray-300 text-gray-600 hover:border-[#1B4D3E] hover:text-[#1B4D3E]'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Sport Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <span className="text-gray-600 text-xs uppercase tracking-widest font-display self-center pr-1">Sport:</span>
          {SPORTS.map(sport => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-display font-semibold tracking-wide transition-all border ${
                activeSport === sport
                  ? 'border-white/40 text-white bg-white/10'
                  : 'border-white/5 text-gray-600 hover:border-white/15 hover:text-gray-400'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-display font-bold uppercase tracking-wider text-white">No items found</p>
            <p className="text-sm mt-1">Try a different category or sport filter</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-16">
          {filteredProducts.map(product => {
            const isSelected = selectedProduct === product.id;
            const pSavings = Math.round((1 - product.price / product.originalPrice) * 100);
            return (
              <motion.button
                key={product.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProductChange(product.id)}
                className={`relative flex flex-col rounded-xl overflow-hidden border transition-all text-left ${
                  isSelected ? 'border-[#C8A951] shadow-lg shadow-[#C8A951]/15' : 'border-gray-200 hover:border-[#C8A951]/50 card-surface'
                }`}
                style={{ background: isSelected ? 'rgba(200,169,81,0.08)' : '#FFFFFF' }}
              >
                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {product.badge && (
                    <span className="bg-gold-500 text-navy-900 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {pSavings > 0 && (
                    <span className="bg-navy-900/80 text-gold-500 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-gold-500/30">
                      {pSavings}% OFF
                    </span>
                  )}
                </div>

                {/* Product image */}
                <div className="aspect-square overflow-hidden bg-navy-700 flex items-center justify-center relative">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/blank-placeholder.svg'; }}
                  />
                  {/* Team order badge overlay */}
                  {product.teamOrderMin && (
                    <div className="absolute bottom-2 right-2 bg-navy-900/80 backdrop-blur-sm text-[9px] text-gold-500 font-display font-bold px-1.5 py-0.5 rounded-full border border-gold-500/20">
                      Team min {product.teamOrderMin}
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1 bg-white">
                  {/* Category label */}
                  <p className="text-[9px] text-gold-500 font-display font-bold uppercase tracking-widest mb-0.5">
                    {product.categoryLabel}
                  </p>
                  {/* Name */}
                  <p className="text-white text-xs font-display font-bold leading-tight mb-2 line-clamp-2">{product.name}</p>
                  {/* Sport tags */}
                  {product.sports && product.sports.length > 0 && product.sports[0] !== ALL_SPORTS[0] && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.sports.slice(0, 2).map(s => (
                        <span key={s} className="text-[9px] text-gray-500 border border-white/10 px-1.5 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                      {product.sports.length > 2 && (
                        <span className="text-[9px] text-gray-600">+{product.sports.length - 2}</span>
                      )}
                    </div>
                  )}
                  {/* Custom print badge — always shown */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[9px] text-gold-500 border border-gold-500/30 bg-gold-500/5 px-1.5 py-0.5 rounded-full font-display font-bold tracking-wide">
                      ✦ Custom Print
                    </span>
                  </div>
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mt-auto">
                    <span className="text-gold-500 font-display font-black text-base">${product.price}</span>
                    <span className="text-gray-600 text-xs line-through">${product.originalPrice}</span>
                  </div>
                  {/* Team price */}
                  <p className="text-[10px] text-gray-600 mt-0.5">
                    Team: <span className="text-gold-500 font-semibold">${(product.price * 0.85).toFixed(0)}/ea</span> (5+)
                  </p>
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="mt-2 text-[10px] font-display font-bold text-gold-500 uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        )}

        {/* Configuration Panel */}
        <div id="designs" className="grid lg:grid-cols-2 gap-8">

          {/* Left: Image + Design + Placements */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="card-surface p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentProduct.id}-${selectedColor}-${viewSide}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="aspect-square rounded-xl overflow-hidden bg-navy-700 flex items-center justify-center"
                >
                  <img src={currentImage} alt={`${currentProduct.name}`} className="w-full h-full object-contain p-4" />
                </motion.div>
              </AnimatePresence>

              {hasBackImage && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(['front', 'back'] as const).map(side => (
                    <button key={side} onClick={() => setViewSide(side)}
                      className={`py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        viewSide === side ? 'btn-gold' : 'border border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {side === 'back' && <RotateCw className="w-3 h-3" />} {side} View
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Design Picker */}
            <div className="card-surface overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide">Pick Your Design</h3>
                <p className="text-gray-500 text-xs mt-0.5">Choose a gallery design or upload your team logo</p>
              </div>
              <div className="flex border-b border-white/5">
                {(['designs', 'upload'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 text-xs font-display font-bold uppercase tracking-wider transition-all ${
                      activeTab === tab ? 'btn-gold' : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab === 'designs' ? 'Gallery Designs' : 'Upload Logo / Art'}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'designs' ? (
                    <motion.div key="designs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
                        {designs.map(design => (
                          <motion.button
                            key={design.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            onClick={() => { setSelectedDesign(design.id); setUploadedFile(null); setError(null); }}
                            className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                              selectedDesign === design.id ? 'ring-2 ring-gold-500 shadow-lg' : 'ring-1 ring-white/10 hover:ring-white/25'
                            }`}
                          >
                            <img src={design.thumbnailSrc} alt={design.name} className="w-full h-full object-cover" loading="lazy" />
                            {selectedDesign === design.id && (
                              <div className="absolute inset-0 bg-gold-500/80 flex items-center justify-center">
                                <Check className="w-7 h-7 text-navy-900" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="upload" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                      <div
                        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          isDragging ? 'border-gold-500 bg-gold-500/5' : 'border-white/15 hover:border-white/30'
                        }`}
                      >
                        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileSelect} className="hidden" />
                        {!uploadedFile ? (
                          <div className="space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto">
                              <Upload className="w-5 h-5 text-gold-500" />
                            </div>
                            <div>
                              <p className="text-sm font-display font-bold text-white mb-1">Drop file or click to browse</p>
                              <p className="text-xs text-gray-500 mb-3">PNG / JPG / SVG · Max 5MB · Transparent BG recommended</p>
                              <button onClick={() => fileInputRef.current?.click()} disabled={isProcessing}
                                className="btn-gold px-5 py-2 rounded-lg text-xs inline-flex items-center gap-2">
                                {isProcessing ? 'Processing...' : 'Select File'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="relative inline-block">
                              <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" className="max-w-full h-28 object-contain rounded-lg" />
                              <button onClick={clearUpload} className="absolute -top-2 -right-2 w-5 h-5 bg-rush text-white rounded-full flex items-center justify-center">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-green-400 flex items-center justify-center gap-1.5"><Check className="w-3 h-3" />{uploadedFile.name}</p>
                          </div>
                        )}
                        {error && <p className="mt-2 text-xs text-rush flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Print Placements */}
            {(selectedDesign || uploadedFile) && selectedDesign !== 'blank' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card-surface overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white uppercase tracking-wide text-sm">Print Placements</h3>
                    <p className="text-xs text-gray-500">{selectedPlacements.length > 0 ? `${selectedPlacements.length} selected` : 'Select print locations'}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 max-h-72 overflow-y-auto scrollbar-hide">
                  {getPlacementsForProduct(selectedProduct).map(placement => {
                    const sel = selectedPlacements.includes(placement.key);
                    return (
                      <motion.button key={placement.key} whileTap={{ scale: 0.99 }} onClick={() => togglePlacement(placement.key)}
                        className={`w-full text-left p-3 rounded-xl transition-all border ${
                          sel ? 'border-gold-500/50 bg-gold-500/5' : 'border-white/5 bg-navy-800 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className={`font-display font-bold text-sm uppercase tracking-wide ${sel ? 'text-gold-500' : 'text-white'}`}>
                              {sel && <Check className="w-3 h-3 inline mr-1.5" />}{placement.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{placement.description} · Max {placement.maxW}"×{placement.maxH}"</div>
                          </div>
                          <span className={`text-sm font-display font-bold ${sel ? 'text-gold-500' : 'text-gray-400'}`}>+${placement.addOn.toFixed(2)}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {selectedDesign === 'blank' && (
              <div className="card-surface p-5 text-center">
                <p className="text-white font-display font-bold">✓ Blank apparel — no print placements needed</p>
                <p className="text-gray-500 text-xs mt-1">Customization via embroidery or heat press available upon request.</p>
              </div>
            )}
          </div>

          {/* Right: Config + National Games Fields */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="card-surface p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gold-500 font-display font-bold uppercase tracking-wider mb-1">{currentProduct.id.replace('-', ' ')}</p>
                  <h2 className="font-display font-black text-white text-2xl uppercase leading-tight">{currentProduct.name}</h2>
                </div>
                <span className="bg-gold-500 text-navy-900 px-2.5 py-1 rounded-full text-xs font-display font-black flex items-center gap-1 flex-shrink-0">
                  <Tag className="w-3 h-3" />{savingsPercent}% OFF
                </span>
              </div>
              <p className="text-gray-400 text-sm font-body mb-4">{currentProduct.description}</p>
              <div className="space-y-1.5 mb-4">
                {currentProduct.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-3 pt-3 border-t border-white/5">
                <span className="font-display font-black text-white text-4xl">${currentProduct.price}</span>
                <span className="text-gray-600 text-xl line-through">${currentProduct.originalPrice}</span>
                <span className="text-xs text-gray-500 ml-auto">Team price: <strong className="text-gold-500">${teamUnitPrice}/ea</strong></span>
              </div>
            </div>

            {/* Order Type */}
            <div id="team-orders" className="card-surface p-6">
              <h3 className="font-display font-bold text-white uppercase tracking-wide mb-4 text-sm">Order Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: 'individual', icon: User, label: 'Individual', sub: 'Single order' },
                  { id: 'team', icon: Users, label: 'Team Order', sub: '15% bulk discount' },
                ] as const).map(({ id, icon: Icon, label, sub }) => (
                  <button key={id} onClick={() => setOrderType(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      orderType === id ? 'border-gold-500 bg-gold-500/5' : 'border-white/10 hover:border-white/20 bg-navy-800'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${orderType === id ? 'text-gold-500' : 'text-gray-400'}`} />
                    <div>
                      <p className={`font-display font-bold text-sm uppercase tracking-wide ${orderType === id ? 'text-gold-500' : 'text-white'}`}>{label}</p>
                      <p className="text-gray-500 text-[10px]">{sub}</p>
                    </div>
                    {orderType === id && <Check className="w-3.5 h-3.5 text-gold-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* National Games Customization */}
            <div className="card-surface p-6 space-y-4">
              <div>
                <h3 className="font-display font-bold text-white uppercase tracking-wide text-sm mb-1">Team & Player Details</h3>
                <p className="text-gray-500 text-xs">These details will be printed/embroidered on your order.</p>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-1.5">Team Name</label>
                <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} maxLength={40}
                  placeholder="e.g. Canada Athletics"
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500/50 font-body transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-1.5">Player Name</label>
                  <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} maxLength={30}
                    placeholder="e.g. Johnson"
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500/50 font-body transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-1.5">Player Number</label>
                  <input type="text" value={playerNumber} onChange={e => setPlayerNumber(e.target.value.replace(/\D/g, '').slice(0, 3))} maxLength={3}
                    placeholder="e.g. 23"
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500/50 font-body transition-colors"
                  />
                </div>
              </div>

              {/* Live jersey preview */}
              {(teamName || playerName || playerNumber) && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-navy-900 rounded-xl p-4 border border-white/5 flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-lg bg-navy-700 border border-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={currentImage} alt="" className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Preview</p>
                    {teamName && <p className="font-display font-black text-gold-500 text-sm uppercase tracking-wider leading-none">{teamName}</p>}
                    {playerName && <p className="text-white font-display font-bold text-sm uppercase">{playerName}</p>}
                    {playerNumber && <p className="text-gray-400 text-xs font-display">#{playerNumber}</p>}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Custom Print Callout — always visible */}
            <div className="card-surface p-4 border border-gold-500/20 bg-gold-500/5">
              <p className="text-gold-500 font-display font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span>✦</span> Custom Print — Included on Every Order
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'Team name on front & back',
                  'Player name & number',
                  'Upload your team logo / crest',
                  'Choose primary & secondary colours',
                  'Screen print, sublimation, or embroidery',
                  'Individual athletes & full teams',
                ].map(f => (
                  <div key={f} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                    <span className="text-gold-500 mt-0.5 flex-shrink-0">→</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Size + Color + Quantity */}
            <div className="card-surface p-6 space-y-5">
              {/* Size */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all border ${
                        selectedSize === size ? 'btn-gold border-gold-500' : 'border-gray-300 text-gray-600 hover:border-[#1B4D3E] hover:text-[#1B4D3E]'
                      }`}
                    >{size}</button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.colors.map(color => (
                    <button key={color.id} onClick={() => handleColorChange(color.id)} title={color.name}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === color.id ? 'border-gold-500 scale-110' : 'border-white/10 hover:border-white/30'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.id && (
                        <div className={`absolute inset-0 flex items-center justify-center`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${color.id === 'white' ? 'bg-navy-900' : 'bg-white'}`} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-display font-bold mb-2">
                  Quantity {orderType === 'team' && <span className="text-gold-500">(Team Bulk)</span>}
                </label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-navy-800 border border-white/10 hover:border-white/25 text-white flex items-center justify-center transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-display font-black text-2xl w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(999, quantity + 1))}
                    className="w-10 h-10 rounded-xl btn-gold flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </button>
                  {orderType === 'team' && quantity >= 5 && (
                    <span className="text-xs text-gold-500 font-display font-bold ml-2">✓ Team discount applied</span>
                  )}
                </div>
                {orderType === 'team' && quantity < 5 && (
                  <p className="text-xs text-gray-500 mt-2">Add {5 - quantity} more for team bulk pricing</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery notice at bottom of configurator */}
        <div className="mt-8 bg-navy-800 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex-shrink-0 flex items-center justify-center">
            <Package className="w-5 h-5 text-gold-500" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-white uppercase tracking-wider text-sm">Delivery Policy</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Standard production &amp; delivery: <strong className="text-white">2 weeks (± a few days)</strong> from order confirmation.
              Orders placed within 2 weeks of your event will be flagged as <strong className="text-rush">RUSH ORDERS</strong> — delivery before the event date is <strong className="text-rush">NOT guaranteed</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
