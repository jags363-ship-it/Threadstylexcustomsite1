import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Customize', href: '#designs' },
    { label: 'Team Orders', href: '#team-orders' },
    { label: 'Delivery Info', href: '#delivery' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-white/5">
      {/* IG Partner strip */}
      <div className="bg-gold-500 text-navy-900 text-center py-1.5 text-xs font-display font-bold tracking-widest uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 inline-block" />
          Official IG Apparel Partner — National Games 2025
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 inline-block" />
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img src="/image.png" alt="ThreadStylez" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block border-l border-white/10 pl-3">
              <p className="text-[10px] text-gold-500 font-display font-bold tracking-widest uppercase leading-none">National Games</p>
              <p className="text-xs text-gray-400 font-body">Official Apparel Portal</p>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-body font-medium transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCartClick}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-300" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold-500 text-navy-900 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            <a
              href="https://threadstylez.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-gold px-4 py-2 rounded-lg text-xs"
            >
              Main Site →
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-navy-800 border-t border-white/5 px-4 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-white py-2 font-body text-sm border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
