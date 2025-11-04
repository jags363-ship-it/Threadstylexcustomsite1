import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
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
              <h1 className="text-xs font-bold text-gray-900">
                ThreadStylez
              </h1>
              <p className="text-xs text-gray-600">
                Custom Apparel
              </p>
            </div>
          </motion.a>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Products
              </a>
              <a href="#designs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Designs
              </a>
              <a href="#reviews" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Reviews
              </a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                FAQ
              </a>
            </nav>

            <ThemeToggle />

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