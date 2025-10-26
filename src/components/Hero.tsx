import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Package, ShieldCheck, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [currentSlide, setCurrentSlide] = useState(0);

  const modelImages = [
    'https://i.pinimg.com/1200x/4b/28/3f/4b283f5d723c3988a64e1aafd21ec7c4.jpg',
    'https://i.pinimg.com/1200x/84/64/89/84648920ae6b299a6d81b24d11d4035e.jpg',
    'https://i.pinimg.com/1200x/74/3d/56/743d56ada745492a776a73c0423d8442.jpg',
    'https://i.pinimg.com/1200x/2b/60/cd/2b60cd42a7d163a23cda0ac2fa076ce6.jpg',
    'https://i.pinimg.com/1200x/64/07/86/64078626f2744ec46a9c7c08fbec2601.jpg',
    'https://i.pinimg.com/1200x/00/c7/28/00c72863fc8ca97ed285add5dc615bd5.jpg',
    'https://i.pinimg.com/1200x/94/05/f1/9405f1b5c039053600c2d1c86a8358eb.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % modelImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [modelImages.length]);

  function getTimeLeft() {
    const targetDate = new Date('2025-10-31T23:59:59').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24 transition-colors">
      {/* Scary Halloween Background Images */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5">
        {/* Pumpkin 1 */}
        <motion.img
          src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&fit=crop"
          alt=""
          className="absolute top-10 left-10 w-32 h-32 object-cover rounded-2xl transform -rotate-12"
          animate={{
            y: [0, -20, 0],
            rotate: [-12, -8, -12]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Skull */}
        <motion.img
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&fit=crop"
          alt=""
          className="absolute top-20 right-20 w-40 h-40 object-cover rounded-full transform rotate-12"
          animate={{
            y: [0, 20, 0],
            rotate: [12, 16, 12]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        {/* Witch */}
        <motion.img
          src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&fit=crop"
          alt=""
          className="absolute bottom-20 left-20 w-36 h-36 object-cover rounded-2xl transform rotate-6"
          animate={{
            y: [0, -15, 0],
            rotate: [6, 10, 6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        {/* Bat */}
        <motion.img
          src="https://i.pinimg.com/1200x/6b/5c/ad/6b5cad193379e55f1b9ea6fb10155693.jpg"
          alt=""
          className="absolute bottom-10 right-10 w-44 h-44 object-cover rounded-full transform -rotate-6"
          animate={{
            y: [0, 15, 0],
            rotate: [-6, -10, -6]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        {/* Haunted House */}
        <motion.img
          src="https://images.unsplash.com/photo-1572346634942-5daa4e6e2f40?w=400&fit=crop"
          alt=""
          className="absolute top-1/2 left-5 w-28 h-28 object-cover rounded-2xl transform -rotate-45"
          animate={{
            x: [0, -10, 0],
            rotate: [-45, -50, -45]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        {/* Ghost */}
        <motion.img
          src="https://i.pinimg.com/1200x/84/64/89/84648920ae6b299a6d81b24d11d4035e.jpg"
          alt=""
          className="absolute top-1/3 right-5 w-32 h-32 object-cover rounded-full transform rotate-45"
          animate={{
            x: [0, 10, 0],
            rotate: [45, 50, 45]
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        {/* Pumpkin 2 */}
        <motion.img
          src="https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=400&fit=crop"
          alt=""
          className="absolute top-1/4 left-1/4 w-36 h-36 object-cover rounded-2xl transform rotate-12"
          animate={{
            y: [0, -18, 0],
            rotate: [12, 18, 12]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        {/* Spider Web */}
        <motion.img
          src="https://i.pinimg.com/1200x/f2/3f/ce/f23fcec7202403f6bc275062f125355d.jpg"
          alt=""
          className="absolute bottom-1/4 right-1/4 w-40 h-40 object-cover rounded-full transform -rotate-20"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [-20, -25, -20]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />
        {/* Jack-o-lantern */}
        <motion.img
          src="https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=400&fit=crop"
          alt=""
          className="absolute top-2/3 left-10 w-32 h-32 object-cover rounded-full transform rotate-30"
          animate={{
            y: [0, 20, 0],
            rotate: [30, 35, 30]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
        {/* Full Moon */}
        <motion.img
          src="ttps://images.unsplash.com/photo-1446292267125-fecb4ecbf1a5?w=400&fit=crop"
          alt=""
          className="absolute top-40 right-1/3 w-28 h-28 object-cover rounded-full transform"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.2
          }}
        />
        {/* Graveyard */}
        <motion.img
          src="https://i.pinimg.com/1200x/f7/5f/0b/f75f0b1e923a2d8671bb2e978ff18018.jpg"
          alt=""
          className="absolute bottom-1/3 left-1/3 w-35 h-35 object-cover rounded-2xl transform -rotate-15"
          animate={{
            y: [0, -12, 0],
            rotate: [-15, -20, -15]
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        {/* Black Cat */}
        <motion.img
          src="https://i.pinimg.com/1200x/40/b6/0e/40b60e0f6c652d4f3782274c172cb8ad.jpg"
          alt=""
          className="absolute top-1/2 right-1/4 w-30 h-30 object-cover rounded-2xl transform rotate-8"
          animate={{
            x: [0, 15, 0],
            rotate: [8, 12, 8]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.8
          }}
        />
      </div>

      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/50 to-purple-50/50 dark:via-gray-900/50 dark:to-gray-900/50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">Spooky Sale - Limited Time!</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent leading-tight"
          >
            Haunt the night in custom hoodies
          </motion.h1>

          {/* Model Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-orange-200">
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
                        ? 'bg-orange-600 w-8'
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
            Choose from our spooky designs or upload your own. Premium quality hoodies that make Halloween unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8 max-w-2xl mx-auto transition-colors"
          >
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Sale ends in:</p>
            <div className="grid grid-cols-4 gap-3 md:gap-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-gradient-to-br from-orange-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Package className="w-5 h-5 text-orange-600" />
              <span className="text-sm md:text-base font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span className="text-sm md:text-base font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Star className="w-5 h-5 text-orange-600 fill-orange-600" />
              <span className="text-sm md:text-base font-medium">4.9/5 Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}