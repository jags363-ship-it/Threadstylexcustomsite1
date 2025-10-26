import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, X, AlertCircle, MapPin } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { designs } from '../data/designs';
import { getPlacementsForProduct, Placement } from '../data/placements';

interface DesignPickerProps {
  selectedDesign: string | null;
  setSelectedDesign: (design: string | null) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  selectedProduct: string;
  selectedPlacements: string[];
  setSelectedPlacements: (placements: string[]) => void;
}

export function DesignPicker({
  selectedDesign,
  setSelectedDesign,
  uploadedFile,
  setUploadedFile,
  selectedProduct,
  selectedPlacements,
  setSelectedPlacements
}: DesignPickerProps) {
  const [activeTab, setActiveTab] = useState<'designs' | 'upload'>('designs');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availablePlacements = getPlacementsForProduct(selectedProduct);
  const hasDesign = selectedDesign || uploadedFile;

  const togglePlacement = (placementKey: string) => {
    if (selectedPlacements.includes(placementKey)) {
      setSelectedPlacements(selectedPlacements.filter(p => p !== placementKey));
    } else {
      setSelectedPlacements([...selectedPlacements, placementKey]);
    }
  };

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
      setError('This ghost needs a PNG or JPG! 👻');
      setIsProcessing(false);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('This ghost needs a PNG under 5MB 👻');
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
      setError('Failed to process image. Please try another file.');
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
    <section id="designs" className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white"
          >
            Pick Your Perfect Design
          </motion.h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('designs')}
                className={`flex-1 py-4 px-6 font-semibold text-lg transition-all ${
                  activeTab === 'designs'
                    ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Choose a Design
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-4 px-6 font-semibold text-lg transition-all ${
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Upload Yours
              </button>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'designs' ? (
                  <motion.div
                    key="designs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {designs.map((design) => (
                        <motion.button
                          key={design.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDesignSelect(design.id)}
                          className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                            selectedDesign === design.id
                              ? 'ring-4 ring-orange-600 shadow-xl'
                              : 'ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-gray-300 dark:hover:ring-gray-500'
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
                              <Check className="w-12 h-12 text-white" />
                            </motion.div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-xs md:text-sm font-semibold text-center">
                              {design.name}
                            </p>
                          </div>
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
                      className={`relative border-3 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all ${
                        isDragging
                          ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
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
                        <div className="space-y-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 text-white mx-auto"
                          >
                            <Upload className="w-8 h-8" />
                          </motion.div>
                          <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Drop your design here or click to browse
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              PNG or JPG • Max 5MB • We'll compress files over 2MB
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
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
                          className="space-y-4"
                        >
                          <div className="relative inline-block">
                            <img
                              src={URL.createObjectURL(uploadedFile)}
                              alt="Uploaded design"
                              className="max-w-full h-48 object-contain rounded-xl"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={clearUpload}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <X className="w-5 h-5" />
                            </motion.button>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <Check className="w-5 h-5" />
                            <span className="font-semibold">
                              {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)}MB)
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">{error}</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Placement Selector - Multi-Select */}
          <AnimatePresence>
            {hasDesign && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Choose Print Placements
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select one or more locations (click to add/remove)
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {availablePlacements.map((placement) => {
                    const isSelected = selectedPlacements.includes(placement.key);
                    return (
                      <motion.button
                        key={placement.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => togglePlacement(placement.key)}
                        className={`relative p-4 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-900/20 dark:to-purple-900/20 ring-4 ring-orange-600 shadow-lg'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 dark:text-white mb-1">
                              {placement.label}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {placement.description}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Max size: {placement.maxW}" × {placement.maxH}"
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className={`text-lg font-bold ${
                              isSelected
                                ? 'text-orange-600' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              +${placement.addOn.toFixed(2)}
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center"
                              >
                                <Check className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {selectedPlacements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  >
                    <p className="text-center text-green-700 dark:text-green-400 font-semibold">
                      ✅ {selectedPlacements.length} placement{selectedPlacements.length > 1 ? 's' : ''} selected
                    </p>
                  </motion.div>
                )}

                {selectedPlacements.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-orange-600 font-semibold mt-4"
                  >
                    Please select at least one placement to continue 🎃
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}