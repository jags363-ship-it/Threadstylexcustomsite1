import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, ExternalLink, Phone } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
}

// Must match SPORTS_LIST in products.ts exactly
const SPORTS_NAV = [
  { label: 'Basketball',        icon: '🏀' },
  { label: 'Volleyball',        icon: '🏐' },
  { label: 'Soccer',            icon: '⚽' },
  { label: 'Flag Football',     icon: '🏈' },
  { label: 'Cricket',           icon: '🏏' },
  { label: 'Softball/Pickleball', icon: '🥎' },
  { label: 'Track & Field',     icon: '🏃' },
  { label: 'Tennis',            icon: '🎾' },
  { label: 'Table Tennis',      icon: '🏓' },
  { label: 'Archery',           icon: '🏹' },
  { label: 'Fitness Course',    icon: '🏋️' },
  { label: '5K Run',            icon: '👟' },
  { label: 'Bike Ride',         icon: '🚴' },
  { label: 'Badminton',         icon: '🏸' },
  { label: 'Ultimate Frisbee',  icon: '🥏' },
];

export function Header({ onCartClick }: HeaderProps) {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'All Sports', href: '#products' },
    { label: 'IG Merch', href: '#products' },
    { label: 'Team Orders', href: '#team-orders' },
    { label: 'Delivery Info', href: '#delivery' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: "'Barlow', sans-serif" }}>

      {/* Top promo bar */}
      <div style={{ background: '#1B4D3E' }} className="text-white text-center py-2 px-4">
        <span className="inline-flex items-center justify-center gap-3 flex-wrap text-xs font-bold tracking-widest uppercase">
          <Phone className="w-3 h-3 opacity-70" />
          <span>Official Apparel Provider · Islamic Games 2026</span>
          <span className="opacity-40">·</span>
          <span style={{ color: '#C8A951' }}>Free US Shipping on orders $75+</span>
          <span className="opacity-40">·</span>
          <a href="mailto:sales@threadstylez.com" className="underline opacity-80 hover:opacity-100 transition-opacity">
            sales@threadstylez.com
          </a>
        </span>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <motion.a href="/" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 flex-shrink-0">
              <img src="https://threadstylez.com/wp-content/uploads/2025/03/logo1.png" alt="ThreadStylez"
                className="object-contain" style={{ height: '64px', width: 'auto' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }} />
              <div className="hidden sm:block pl-3" style={{ borderLeft: '2px solid #C8A951' }}>
                <p className="text-xs font-bold tracking-widest uppercase leading-none"
                  style={{ color: '#1B4D3E', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Islamic Games 2026
                </p>
                <p className="text-[11px] mt-1 text-gray-500" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Official Apparel Portal
                </p>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.href + link.label} href={link.href}
                  className="text-gray-700 hover:text-[#1B4D3E] text-sm font-semibold transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wide transition-all hover:opacity-80"
                style={{ borderColor: '#1B4D3E', color: '#1B4D3E', background: '#1B4D3E10' }}>
                <img src="https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png"
                  alt="IG" className="h-5 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                IG 2026
              </a>

              <ThemeToggle />
              <motion.button onClick={onCartClick} whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl transition-all"
                style={{ background: '#F5F5F5', border: '1px solid #E0E0E0' }} aria-label="Cart">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center"
                      style={{ background: '#C8A951', color: '#060E1A' }}>
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #C8A951, #E8CC7A)',
                  color: '#060E1A',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 8px rgba(200,169,81,0.3)',
                }}>
                ThreadStylez.com <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg"
                style={{ background: '#F5F5F5', border: '1px solid #E0E0E0' }}>
                {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sport icon nav strip — icons + labels, no text-only links */}
        <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {SPORTS_NAV.map((sport) => (
                <a key={sport.label} href="#products"
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 text-gray-500 hover:text-[#1B4D3E] hover:bg-white border-b-2 border-transparent hover:border-[#1B4D3E] transition-all group"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <span className="text-lg leading-none">{sport.icon}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wide whitespace-nowrap leading-tight group-hover:text-[#1B4D3E]">
                    {sport.label}
                  </span>
                </a>
              ))}
              <a href="#products"
                className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 border-b-2 transition-all"
                style={{ color: '#C8A951', borderColor: '#C8A951', fontFamily: "'Barlow Condensed', sans-serif" }}>
                <span className="text-lg leading-none">🏅</span>
                <span className="text-[9px] font-bold uppercase tracking-wide whitespace-nowrap leading-tight">IG Merch</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-[#1B4D3E] py-2.5 font-semibold text-sm border-b border-gray-100 uppercase tracking-wide">
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Browse by Sport</p>
              <div className="flex flex-wrap gap-2">
                {SPORTS_NAV.map((s) => (
                  <a key={s.label} href="#products" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase bg-gray-100 text-gray-600 rounded-full hover:bg-[#1B4D3E] hover:text-white transition-all">
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C8A951] text-sm font-black uppercase tracking-wider pt-2">
              Visit ThreadStylez.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
