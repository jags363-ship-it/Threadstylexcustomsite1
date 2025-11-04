import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Package, ShieldCheck, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const modelImages = [
        'https://i.pinimg.com/1200x/92/a1/de/92a1de7f8954d6e792e51d497731667d.jpg',
    'https://i.pinimg.com/1200x/4b/28/3f/4b283f5d723c3988a64e1aafd21ec7c4.jpg',
       'https://i.pinimg.com/1200x/18/07/8e/18078eede2dcac62a5c38136a09f8ff5.jpg',
  'https://i.pinimg.com/736x/61/63/e4/6163e40fddce19517288b4b3757a7e5b.jpg',
    'https://i.pinimg.com/1200x/74/3d/56/743d56ada745492a776a73c0423d8442.jpg',
  'https://i.pinimg.com/736x/6b/61/c3/6b61c3d9ddc2ead7fb9cb1d83e4e15f2.jpg',
    'https://i.pinimg.com/1200x/64/07/86/64078626f2744ec46a9c7c08fbec2601.jpg',
    'https://i.pinimg.com/1200x/00/c7/28/00c72863fc8ca97ed285add5dc615bd5.jpg',

  ];

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % modelImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [modelImages.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24 transition-colors">
      {/* Falling Snowflakes Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400 dark:text-cyan-300 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            ❄
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-cyan-50/50 dark:via-gray-900/50 dark:to-gray-900/50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
          >
            <Snowflake className="w-4 h-4" />
            <span className="font-semibold">Winter Collection 2025 ❄️</span>
            <Snowflake className="w-4 h-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            Cozy Custom Apparel for Winter Vibes
          </motion.h1>

          {/* Model Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-blue-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={modelImages[currentSlide]}
                    alt="Halloween Hoodie Model"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {modelImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Design your perfect winter wardrobe with custom prints. Stay warm, stay stylish! ⛄
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Snowflake className="w-5 h-5 text-blue-600" />
              <span className="text-sm md:text-base font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Package className="w-5 h-5 text-cyan-500" />
              <span className="text-sm md:text-base font-medium">Custom Designs</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className="text-sm md:text-base font-medium">Perfect Gifts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}