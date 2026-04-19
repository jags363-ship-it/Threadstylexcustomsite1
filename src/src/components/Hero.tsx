import { motion, AnimatePresence } from 'framer-motion';
import { getNearestEventRushStatus } from '../lib/rushOrder';
import { RushOrderBanner } from './RushOrderBanner';
import { useEffect, useState } from 'react';
import { Users, ChevronDown, ExternalLink, MapPin, Star, Truck, Palette } from 'lucide-react';

const IG_LOGO = 'https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png';
const TS_LOGO = 'https://threadstylez.com/wp-content/uploads/2025/03/logo1.png';

const IG_EVENTS = [
  { city: 'New Jersey', date: 'June 6–7, 2026' },
  { city: 'Dallas', date: 'June 13–14, 2026' },
  { city: 'Chicago', date: 'July 17–18, 2026' },
  { city: 'Michigan', date: 'Sept 6–7, 2026' },
  { city: 'Houston', date: 'Sept/Oct 2026' },
];

// Official Islamic Games athlete photos
const SLIDES = [
  { src: '/hijabi_soccer.webp', label: 'Soccer' },
  { src: '/sports_hijab.webp', label: 'Track & Field' },
  { src: '/basketball.jpg', label: 'Basketball' },
  { src: '/hijabi_basketball.webp', label: 'Basketball' },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [activeEvent, setActiveEvent] = useState(0);
  const rushStatus = getNearestEventRushStatus();
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
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveEvent(p => (p + 1) % IG_EVENTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        // Light clean background — white/very light grey like FansIdea
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAF9 50%, #F5F7FF 100%)',
        paddingTop: '140px',
        paddingBottom: '60px',
      }}
    >
      {/* Very subtle brand blobs — barely visible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 60%, rgba(27,77,62,0.04) 0%, transparent 45%), radial-gradient(circle at 90% 15%, rgba(200,169,81,0.04) 0%, transparent 45%)'
        }} />

      <div className="relative max-w-7xl mx-auto px-4 py-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            {/* Logo lockup */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6 flex-wrap">
              <a href="/" className="flex-shrink-0">
                <img src={TS_LOGO} alt="ThreadStylez" className="h-12 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }} />
              </a>
              <span className="text-gray-300 font-bold text-xl">×</span>
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img src={IG_LOGO} alt="Islamic Games" className="h-12 w-auto object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const b = document.createElement('span');
                    b.style.cssText = 'padding:5px 12px;background:#1B4D3E;color:white;font-size:11px;font-weight:900;border-radius:6px;text-transform:uppercase;letter-spacing:.08em;';
                    b.textContent = 'Islamic Games';
                    el.parentNode?.appendChild(b);
                  }} />
              </a>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ color: '#1B4D3E', background: 'rgba(27,77,62,0.08)', border: '1px solid rgba(27,77,62,0.2)' }}>
                Official Partner 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
              <p className="font-bold uppercase tracking-[0.18em] text-sm mb-2"
                style={{ color: '#1B4D3E', fontFamily: "'Barlow Condensed', sans-serif" }}>
                Official Apparel Provider for
              </p>
              <h1 className="font-black leading-none text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>
                ISLAMIC GAMES{' '}
                <span style={{
                  background: 'linear-gradient(120deg,#B8903E,#E8CC7A,#C8A951)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>2026</span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              className="text-gray-600 text-base leading-relaxed mb-1 max-w-xl">
              <strong className="text-gray-900">ThreadStylez</strong> — North America's largest Muslim sports event.{' '}
              <strong className="text-gray-900">10,000+ athletes</strong> · <strong className="text-gray-900">900+ teams</strong> nationwide.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
              className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xl">
              Custom jerseys, hoodies, tracksuits and team gear across all sports.
            </motion.p>

            {/* Event pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
              className="flex flex-wrap gap-2 mb-5">
              {IG_EVENTS.map((ev, i) => (
                <div key={ev.city}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide transition-all duration-500"
                  style={i === activeEvent
                    ? { borderColor: '#1B4D3E', background: '#1B4D3E', color: 'white' }
                    : { borderColor: '#E0E0E0', color: '#888', background: 'white' }
                  }>
                  <MapPin className="w-3 h-3" />
                  {ev.city}
                  {i === activeEvent && <span className="normal-case font-normal opacity-90">{ev.date}</span>}
                </div>
              ))}
            </motion.div>

            {/* Rush banner */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-5">
              <RushOrderBanner status={rushStatus} />
            </motion.div>

            {/* CTAs — FansIdea-style bold buttons */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3">
              <a href="#products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5"
                style={{
                  background: '#1B4D3E',
                  color: 'white',
                  fontFamily: "'Barlow Condensed',sans-serif",
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 15px rgba(27,77,62,0.25)',
                }}>
                Browse by Sport →
              </a>
              <a href="#team-orders"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5"
                style={{
                  background: 'white',
                  color: '#0A1628',
                  fontFamily: "'Barlow Condensed',sans-serif",
                  letterSpacing: '0.1em',
                  border: '2px solid #C8A951',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                <Users className="w-4 h-4" /> Team Order
              </a>
            </motion.div>

            {/* Trust badges — FansIdea style */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
              className="flex flex-wrap gap-5 mt-7 pt-6 border-t border-gray-100">
              {[
                { icon: Star, label: '10,000+', sub: 'Athletes 2026' },
                { icon: Users, label: '900+', sub: 'Teams' },
                { icon: Truck, label: '2 Wks', sub: 'Standard Delivery' },
                { icon: Palette, label: 'Full', sub: 'Custom Print' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={sub} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(27,77,62,0.08)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                  </div>
                  <div>
                    <div className="font-black text-sm text-gray-900" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{label}</div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {/* Main carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl mb-4 bg-gray-50"
              style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={SLIDES[currentSlide].src}
                  alt={SLIDES[currentSlide].label}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                />
              </AnimatePresence>

              {/* Label badge */}
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-black text-gray-900 uppercase tracking-wider shadow-sm"
                  style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
                  {SLIDES[currentSlide].label}
                </span>
              </div>

              {/* Official partner overlay badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
                  style={{ background: '#1B4D3E', color: '#C8A951', fontFamily: "'Barlow Condensed',sans-serif" }}>
                  Official IG 2026
                </span>
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}
                    className="rounded-full transition-all"
                    style={{
                      background: i === currentSlide ? '#C8A951' : 'rgba(255,255,255,0.6)',
                      width: i === currentSlide ? '18px' : '6px',
                      height: '6px',
                    }} />
                ))}
              </div>
            </div>

            {/* Countdown — clean white card */}
            <div id="delivery" className="rounded-2xl border border-gray-200 p-4 mb-3 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1B4D3E' }}>
                  NJ Games — June 6, 2026
                </p>
                <a href="https://islamic-games.com/new-jersey/" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                  Register <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hrs' },
                  { val: timeLeft.mins, label: 'Min' },
                  { val: timeLeft.secs, label: 'Sec' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center rounded-xl py-3"
                    style={{ background: '#0A1628' }}>
                    <div className="font-black text-xl text-white leading-none"
                      style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                      {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-gray-500 text-[9px] mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
              <img src={IG_LOGO} alt="Islamic Games" className="h-10 w-auto object-contain flex-shrink-0"
                onError={(e) => {
                  const el = e.target as HTMLImageElement; el.style.display = 'none';
                  const d = document.createElement('div');
                  d.style.cssText = 'width:40px;height:40px;background:#1B4D3E;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:11px;flex-shrink:0;';
                  d.textContent = 'IG'; el.parentNode?.prepend(d);
                }} />
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-gray-900 uppercase" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  ThreadStylez × Islamic Games
                </p>
                <p className="text-gray-500 text-xs mt-0.5">Official apparel provider — all 2026 events</p>
              </div>
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:text-[#1B4D3E] hover:border-[#1B4D3E] transition-all flex items-center gap-1 flex-shrink-0">
                IG Site <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-300">
        <span className="text-[10px] tracking-widest uppercase">Browse</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
