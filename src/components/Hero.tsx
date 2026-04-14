import { motion, AnimatePresence } from 'framer-motion';
import { getNearestEventRushStatus } from '../lib/rushOrder';
import { RushOrderBanner } from './RushOrderBanner';
import { useEffect, useState } from 'react';
import { Users, ChevronDown, ExternalLink, MapPin } from 'lucide-react';

const IG_LOGO = 'https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png';
const TS_LOGO = 'https://threadstylez.com/wp-content/uploads/2025/03/logo1.png';

// 2026 Islamic Games locations
const IG_EVENTS = [
  { city: 'New Jersey', date: 'June 6–7, 2026' },
  { city: 'Dallas', date: 'June 13–14, 2026' },
  { city: 'Chicago', date: 'July 17–18, 2026' },
  { city: 'Michigan', date: 'Sept 6–7, 2026' },
  { city: 'Houston', date: 'Sept/Oct 2026' },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [activeEvent, setActiveEvent] = useState(0);

  const slides = [
    { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=85', label: 'Basketball' },
    { src: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=85', label: 'Soccer' },
    { src: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=85', label: 'Volleyball' },
    { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85', label: 'Track & Field' },
    { src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=85', label: 'Swimming' },
    { src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85', label: 'Cricket' },
    { src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=85', label: 'Martial Arts' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85', label: 'Ceremony' },
  ];

  // Countdown to first 2026 event — NJ June 6
  const EVENT_DATE = new Date('2026-06-06T09:00:00');

  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE.getTime() - new Date().getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveEvent(p => (p + 1) % IG_EVENTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  const rushStatus = getNearestEventRushStatus();
  const isRushZone = rushStatus.isRush;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-900 pt-28">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Green Islamic Games ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1B4D3E] opacity-10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT COPY ── */}
          <div>

            {/* Dual logo lockup */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              {/* ThreadStylez logo */}
              <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img
                  src={TS_LOGO}
                  alt="ThreadStylez"
                  className="h-10 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
                />
              </a>

              <div className="text-gray-600 text-sm font-display font-bold">×</div>

              {/* Islamic Games logo */}
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img
                  src={IG_LOGO}
                  alt="Islamic Games"
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    // Fallback text badge if logo 404s
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const badge = document.createElement('div');
                    badge.className = 'px-3 py-1.5 rounded-lg bg-[#1B4D3E] border border-[#2D7A55] text-white text-xs font-display font-black uppercase tracking-wider';
                    badge.textContent = 'Islamic Games';
                    el.parentNode?.appendChild(badge);
                  }}
                />
              </a>

              <div className="border border-[#2D7A55]/40 bg-[#1B4D3E]/20 rounded-full px-3 py-1">
                <span className="text-[#4CAF7D] text-[10px] font-display font-black tracking-widest uppercase">Official Partner 2026</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black leading-none mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              <span className="block text-white">OFFICIAL APPAREL</span>
              <span className="block text-white">PROVIDER FOR</span>
              <span className="block gold-text">ISLAMIC GAMES 2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-gray-400 font-body text-lg leading-relaxed mb-3 max-w-xl"
            >
              <strong className="text-white">ThreadStylez</strong> is the official apparel provider for Islamic Games 2026 — North America's largest Muslim sports event with <strong className="text-white">10,000+ athletes</strong> across <strong className="text-white">900+ teams</strong> nationwide.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="text-gray-500 font-body text-sm leading-relaxed mb-6 max-w-xl"
            >
              Order custom jerseys, hoodies, tracksuits, and team gear for your athletes across all sports — basketball, soccer, volleyball, cricket, track &amp; field, swimming, and more.
            </motion.p>

            {/* Rotating event locations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {IG_EVENTS.map((ev, i) => (
                <div
                  key={ev.city}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-display font-bold uppercase tracking-wide transition-all duration-500 ${
                    i === activeEvent
                      ? 'border-[#2D7A55] bg-[#1B4D3E]/30 text-[#4CAF7D]'
                      : 'border-white/8 text-gray-600'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {ev.city}
                  {i === activeEvent && <span className="text-gray-500 font-body normal-case font-normal tracking-normal">{ev.date}</span>}
                </div>
              ))}
            </motion.div>

            {/* Rush / Delivery notice — from shared utility */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <RushOrderBanner status={rushStatus} />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href="#products" className="btn-gold px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2">
                Customize &amp; Order Now →
              </a>
              <a href="#team-orders" className="btn-outline px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2">
                <Users className="w-4 h-4" />
                Start Team Order
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }} className="flex flex-wrap gap-5">
              {[
                { label: '10,000+ Athletes', sub: 'Islamic Games 2026' },
                { label: '900+ Teams', sub: 'Nationwide' },
                { label: '2-Week Delivery', sub: 'Standard orders' },
              ].map(({ label, sub }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-black text-gold-500 text-xl leading-none">{label}</div>
                  <div className="text-gray-600 text-[10px] uppercase tracking-wider mt-0.5">{sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Product carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-5 aspect-[4/3] bg-navy-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].label}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/blank-placeholder.svg'; }}
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4">
                <span className="bg-navy-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-xs font-display font-bold text-gold-500 tracking-wider uppercase">
                  {slides[currentSlide].label}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all ${i === currentSlide ? 'bg-gold-500 w-5 h-1.5' : 'bg-white/30 w-1.5 h-1.5'}`}
                  />
                ))}
              </div>
            </div>

            {/* Countdown to first NJ event */}
            <div id="delivery" className="card-surface p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="section-label">NJ Games Countdown — June 6, 2026</p>
                <a href="https://islamic-games.com/new-jersey/" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-gray-500 hover:text-gold-500 flex items-center gap-1 transition-colors">
                  Register <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.mins, label: 'Mins' },
                  { val: timeLeft.secs, label: 'Secs' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center bg-navy-700 rounded-xl py-3 border border-white/5">
                    <div className="font-display font-black text-2xl text-white leading-none">{String(val).padStart(2, '0')}</div>
                    <div className="text-gray-500 text-[9px] mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 text-[10px] mt-3">
                Order at least 3 weeks before your event date for standard delivery
              </p>
            </div>

            {/* Partnership callout */}
            <div className="card-surface p-4 flex items-center gap-4">
              <img
                src={IG_LOGO}
                alt="Islamic Games"
                className="h-12 w-auto object-contain flex-shrink-0"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  const div = document.createElement('div');
                  div.className = 'h-12 w-12 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-white font-display font-black text-xs flex-shrink-0';
                  div.textContent = 'IG';
                  el.parentNode?.prepend(div);
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-display font-bold text-sm uppercase tracking-wide leading-tight">ThreadStylez × Islamic Games</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                  Official apparel provider for all 2026 Islamic Games events across the USA &amp; Canada
                </p>
              </div>
              <a
                href="https://islamic-games.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-3 py-2 rounded-lg text-[10px] flex-shrink-0 flex items-center gap-1"
              >
                IG Site <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-700">
        <span className="text-[10px] tracking-widest uppercase">Browse Apparel</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
