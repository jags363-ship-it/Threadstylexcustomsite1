import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Tag, CheckCircle, RotateCw, Upload, Check, X, AlertCircle, MapPin } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { products } from '../data/products';
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
}

export function ProductConfiguration({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  selectedProduct,
  setSelectedProduct,
  selectedDesign,
  setSelectedDesign,
  uploadedFile,
  setUploadedFile,
  selectedPlacements,
  setSelectedPlacements
}: ProductConfigurationProps) {
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [activeTab, setActiveTab] = useState<'designs' | 'upload'>('designs');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const currentColor = currentProduct.colors.find(c => c.id === selectedColor) || currentProduct.colors[0];
  const savings = currentProduct.originalPrice - currentProduct.price;
  const savingsPercent = Math.round((savings / currentProduct.originalPrice) * 100);
  const hasBackImage = !!currentColor.backImage;

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    const newProduct = products.find(p => p.id === productId);
    if (newProduct) {
      setSelectedSize(newProduct.sizes[2]);
      setSelectedColor(newProduct.colors[0].id);
      setViewSide('front');
    }
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    setViewSide('front');
  };

  const currentImage = viewSide === 'back' && currentColor.backImage 
    ? currentColor.backImage 
    : currentColor.image;

  const togglePlacement = (placementKey: string) => {
    if (selectedPlacements.includes(placementKey)) {
      setSelectedPlacements(selectedPlacements.filter(p => p !== placementKey));
    } else {
      setSelectedPlacements([...selectedPlacements, placementKey]);
    }
  };

  // Image compression and upload handlers
  const compressImage = useCallback(async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const maxDimension = 2000;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Compression failed'));
              }
            },
            file.type,
            0.85
          );
        };
        img.onerror = () => reject(new Error('Image loading failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsDataURL(file);
    });
  }, []);

  const validateAndProcessFile = useCallback(async (file: File) => {
    setError(null);
    setIsProcessing(true);

    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      setError('PNG or JPG only! 👻');
      setIsProcessing(false);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Max 5MB! 👻');
      setIsProcessing(false);
      return;
    }

    try {
      let processedFile = file;
      if (file.size > 2 * 1024 * 1024) {
        processedFile = await compressImage(file);
      }

      setUploadedFile(processedFile);
      setSelectedDesign(null);
      setError(null);
    } catch (err) {
      setError('Failed to process image.');
    } finally {
      setIsProcessing(false);
    }
  }, [compressImage, setUploadedFile, setSelectedDesign]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [validateAndProcessFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [validateAndProcessFile]);

  const handleDesignSelect = (designId: string) => {
    setSelectedDesign(designId);
    setUploadedFile(null);
    setError(null);
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="products" className="py-12 md:py-16 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Side - Product Image & Design Picker */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentProduct.id}-${selectedColor}-${viewSide}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                  >
                    <img 
                      src={currentImage} 
                      alt={`${currentProduct.name} - ${currentColor.name} - ${viewSide}`}
                      className="w-full h-full object-contain p-4"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Front/Back Toggle */}
                {hasBackImage && (
                  <div className="mt-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewSide('front')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        viewSide === 'front'
                          ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      Front View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewSide('back')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        viewSide === 'back'
                          ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <RotateCw className="w-4 h-4" />
                      Back View
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Compact Design Picker */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pick Your Design
                  </h3>
                </div>

                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab('designs')}
                    className={`flex-1 py-3 px-4 font-semibold text-sm transition-all ${
                      activeTab === 'designs'
                        ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Choose a Design
                  </button>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`flex-1 py-3 px-4 font-semibold text-sm transition-all ${
                      activeTab === 'upload'
                        ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Upload Yours
                  </button>
                </div>

                <div className="p-4">
                  <AnimatePresence mode="wait">
                    {activeTab === 'designs' ? (
                      <motion.div
                        key="designs"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                          {designs.map((design) => (
                            <motion.button
                              key={design.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDesignSelect(design.id)}
                              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                                selectedDesign === design.id
                                  ? 'ring-4 ring-orange-600 shadow-xl'
                                  : 'ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-gray-300'
                              }`}
                            >
                              <img
                                src={design.thumbnailSrc}
                                alt={design.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              {selectedDesign === design.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-purple-600/90 flex items-center justify-center"
                                >
                                  <Check className="w-8 h-8 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                            isDragging
                              ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleFileSelect}
                            className="hidden"
                          />

                          {!uploadedFile ? (
                            <div className="space-y-3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 text-white mx-auto"
                              >
                                <Upload className="w-6 h-6" />
                              </motion.div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                  Drop or click to browse
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                  PNG/JPG • Max 5MB
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => fileInputRef.current?.click()}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-lg font-semibold text-sm shadow-lg"
                                  disabled={isProcessing}
                                >
                                  {isProcessing ? 'Processing...' : 'Select File'}
                                </motion.button>
                              </div>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="space-y-3"
                            >
                              <div className="relative inline-block">
                                <img
                                  src={URL.createObjectURL(uploadedFile)}
                                  alt="Uploaded design"
                                  className="max-w-full h-32 object-contain rounded-lg"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={clearUpload}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                                >
                                  <X className="w-4 h-4" />
                                </motion.button>
                              </div>
                              <div className="flex items-center justify-center gap-2 text-green-600">
                                <Check className="w-4 h-4" />
                                <span className="text-xs font-semibold">
                                  {uploadedFile.name}
                                </span>
                              </div>
                            </motion.div>
                          )}

                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 flex items-center justify-center gap-2 text-red-600 text-xs"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>{error}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

{/* Compact Placement Selector */}
              {(selectedDesign || uploadedFile) && selectedDesign !== 'blank' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Choose Print Placements
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedPlacements.length > 0 
                            ? `${selectedPlacements.length} selected` 
                            : 'Select locations'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                    {getPlacementsForProduct(selectedProduct).map((placement) => {
                      const isSelected = selectedPlacements.includes(placement.key);
                      return (
                        <motion.button
                          key={placement.key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => togglePlacement(placement.key)}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-900/20 dark:to-purple-900/20 ring-2 ring-orange-600'
                              : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {isSelected && (
                                  <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                )}
                                <div className={`font-bold text-sm ${
                                  isSelected 
                                    ? 'text-orange-600' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {placement.label}
                                </div>
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {placement.description}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Max: {placement.maxW}" × {placement.maxH}"
                              </div>
                            </div>
                            <div className={`text-sm font-bold ${
                              isSelected 
                                ? 'text-orange-600' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              +${placement.addOn.toFixed(2)}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {selectedPlacements.length === 0 && (
                    <div className="p-4 text-center text-orange-600 dark:text-orange-400 text-sm font-semibold">
                      Select at least one placement 🎃
                    </div>
                  )}
                </motion.div>
              )}

              {/* Message for blank selection */}
              {selectedDesign === 'blank' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
                >
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    ✨ Blank apparel selected - no design placements needed!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Side - Product Configuration */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-colors">
              
              {/* Product Thumbnails */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Choose Product Type
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {products.map((product) => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleProductChange(product.id)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                        selectedProduct === product.id
                          ? 'bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-900/20 dark:to-purple-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all bg-gradient-to-br from-orange-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 ${
                        selectedProduct === product.id
                          ? 'ring-4 ring-orange-600 shadow-lg'
                          : 'ring-2 ring-gray-200 opacity-60'
                      }`}>
                        <img 
                          src={product.thumbnail} 
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
  {product.name.includes('Hoodie') || product.name.includes('Hooded') ? 'Hooded Sweatshirt' :
   product.name.includes('Crewneck') ? 'Sweatshirt' :
   product.name.includes('Sweatpants') ? 'Sweatpants' :
   product.name.includes('Essential') ? 'Essential Tee' : product.name}
</div>
                        <div className={`text-sm font-bold ${
                          selectedProduct === product.id 
                            ? 'text-orange-600' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          ${product.price}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {currentProduct.name}
                  </h2>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-gradient-to-r from-orange-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap"
                  >
                    <Tag className="w-3 h-3" />
                    {savingsPercent}% OFF
                  </motion.div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{currentProduct.description}</p>
                
                {/* Product Features */}
                <div className="space-y-2">
                  {currentProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    ${currentProduct.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Size Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Size
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {currentProduct.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {currentProduct.colors.map((color) => (
                      <motion.button
                        key={color.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorChange(color.id)}
                        className={`relative w-12 h-12 rounded-full transition-all ${
                          selectedColor === color.id
                            ? 'ring-4 ring-offset-2 ring-orange-600'
                            : 'ring-2 ring-gray-300 hover:ring-gray-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              color.id === 'white' ? 'bg-gray-900' : 'bg-white'
                            }`} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{quantity}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold flex items-center justify-center transition-colors shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Base Price:</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${(currentProduct.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}