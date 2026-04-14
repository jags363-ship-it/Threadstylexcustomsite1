import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, ExternalLink } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/97 backdrop-blur-md border-b border-white/5">

      {/* Islamic Games 2026 Official Partner Strip */}
      <div className="bg-gradient-to-r from-[#1B4D3E] via-[#2D7A55] to-[#1B4D3E] text-white text-center py-2 px-4 text-xs font-display font-bold tracking-widest uppercase">
        <span className="inline-flex items-center justify-center gap-3 flex-wrap">
          {/* Islamic Games logo inline */}
          <img
            src="https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png"
            alt="Islamic Games"
            className="h-5 w-auto object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-[#C8A951]">Official Apparel Provider</span>
          <span className="opacity-40">·</span>
          <span>Islamic Games 2026</span>
          <span className="opacity-40">·</span>
          <span>NJ · Dallas · Chicago · Michigan · Houston &amp; More</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo — Threadstylez.com official */}
          <motion.a
            href="https://threadstylez.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src="https://threadstylez.com/wp-content/uploads/2025/03/logo1.png"
              alt="ThreadStylez"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback to image.png from the public folder
                (e.target as HTMLImageElement).src = '/image.png';
              }}
            />
            <div className="hidden sm:block border-l border-white/10 pl-3">
              <p className="text-[10px] text-gold-500 font-display font-bold tracking-widest uppercase leading-none">Islamic Games 2026</p>
              <p className="text-xs text-gray-400 font-body leading-none mt-0.5">Official Apparel Portal</p>
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
              className="hidden sm:inline-flex items-center gap-1.5 btn-gold px-4 py-2 rounded-lg text-xs"
            >
              ThreadStylez.com <ExternalLink className="w-3 h-3" />
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
          <a
            href="https://threadstylez.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold-500 text-sm font-display font-bold pt-1"
          >
            Visit ThreadStylez.com <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}
    </header>
  );
}
