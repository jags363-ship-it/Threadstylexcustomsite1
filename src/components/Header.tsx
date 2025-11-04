import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img
              src="/image.png"
              alt="ThreadStylez Logo"
              className="w-60 h-48 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xs font-bold text-gray-900 dark:text-white">
                ThreadStylez
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Custom Apparel
              </p>
            </div>
          </motion.a>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium">
                Products
              </a>
              <a href="#designs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium">
                Designs
              </a>
              <a href="#reviews" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium">
                Reviews
              </a>
              <a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium">
                FAQ
              </a>
            </nav>

            <ThemeToggle />

            {/* Cart Button */}
            <motion.button
              onClick={onCartClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Main Website Link */}
            <motion.a
              href="https://threadstylez.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <span className="hidden sm:inline">Visit Main Site</span>
              <span className="sm:hidden">Main Site</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  );
}