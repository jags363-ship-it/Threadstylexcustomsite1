import { motion, AnimatePresence } from 'framer-motion';
import { getNearestEventRushStatus } from '../lib/rushOrder';
import { RushOrderBanner } from './RushOrderBanner';
import { useEffect, useState } from 'react';
import { Users, ChevronDown, ExternalLink, MapPin } from 'lucide-react';

const IG_LOGO = 'https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png';
const TS_LOGO = 'https://threadstylez.com/wp-content/uploads/2025/03/logo1.png';

const IG_EVENTS = [
  { city: 'New Jersey', date: 'June 6–7, 2026' },
  { city: 'Dallas', date: 'June 13–14, 2026' },
  { city: 'Chicago', date: 'July 17–18, 2026' },
  { city: 'Michigan', date: 'Sept 6–7, 2026' },
  { city: 'Houston', date: 'Sept/Oct 2026' },
];

// Bright vivid well-lit sports photos — NO dark backgrounds
const SLIDES = [
  { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=90', label: 'Basketball' },
  { src: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?w=900&q=90', label: 'Soccer' },
  { src: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=90', label: 'Volleyball' },
  { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=90', label: 'Track & Field' },
  { src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=90', label: 'Swimming' },
  { src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=90', label: 'Tennis' },
  { src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&q=90', label: 'Martial Arts' },
  { src: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&q=90', label: 'Badminton' },
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
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveEvent(p => (p + 1) % IG_EVENTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden pt-28 pb-16"
      style={{ background: 'linear-gradient(135deg, #F0F4F8 0%, #EAF2EA 40%, #F5F0E8 100%)' }}
    >
      {/* Subtle colour blobs */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(27,77,62,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(200,169,81,0.07) 0%, transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            {/* Logo lockup */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6 flex-wrap">
              {/* Logo links to homepage NOT wholesale */}
              <a href="/" className="flex-shrink-0">
                <img src={TS_LOGO} alt="ThreadStylez" className="h-10 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }} />
              </a>
              <span className="text-gray-400 font-bold text-lg">×</span>
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img src={IG_LOGO} alt="Islamic Games" className="h-10 w-auto object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const b = document.createElement('span');
                    b.style.cssText = 'padding:4px 10px;background:#1B4D3E;color:white;font-size:11px;font-weight:900;border-radius:6px;text-transform:uppercase;';
                    b.textContent = 'Islamic Games';
                    el.parentNode?.appendChild(b);
                  }} />
              </a>
              <span className="text-xs font-bold text-[#1B4D3E] bg-[#1B4D3E]/10 border border-[#2D7A55]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                Official Partner 2026
              </span>
            </motion.div>

            {/* Headline — "Official Apparel Provider for" SMALL, "Islamic Games 2026" BIG */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
              <p className="text-[#1B4D3E] font-bold uppercase tracking-[0.15em] text-sm mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Official Apparel Provider for
              </p>
              <h1 className="font-black leading-none text-[#0A1628]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>
                ISLAMIC GAMES{' '}
                <span style={{
                  background: 'linear-gradient(120deg,#B8903E,#E8CC7A,#C8A951)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>2026</span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              className="text-gray-600 text-base leading-relaxed mb-1 max-w-xl">
              <strong className="text-[#0A1628]">ThreadStylez</strong> — North America's largest Muslim sports event.{' '}
              <strong className="text-[#0A1628]">10,000+ athletes</strong> · <strong className="text-[#0A1628]">900+ teams</strong> nationwide.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
              className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xl">
              Custom jerseys, hoodies, tracksuits and team gear across all 19 sports.
            </motion.p>

            {/* Event pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
              className="flex flex-wrap gap-2 mb-5">
              {IG_EVENTS.map((ev, i) => (
                <div key={ev.city}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide transition-all duration-500 ${
                    i === activeEvent ? 'border-[#1B4D3E] bg-[#1B4D3E] text-white' : 'border-gray-300 text-gray-500 bg-white'
                  }`}>
                  <MapPin className="w-3 h-3" />
                  {ev.city}
                  {i === activeEvent && <span className="normal-case font-normal">{ev.date}</span>}
                </div>
              ))}
            </motion.div>

            {/* Rush banner */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-5">
              <RushOrderBanner status={rushStatus} />
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3">
              <a href="#products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: 'linear-gradient(135deg,#1B4D3E,#2D7A55)', color: 'white', fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '0.1em' }}>
                Browse by Sport →
              </a>
              <a href="#team-orders"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-[#C8A951] text-[#0A1628] bg-white hover:bg-[#C8A951] transition-all"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '0.1em' }}>
                <Users className="w-4 h-4" /> Team Order
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
              className="flex flex-wrap gap-6 mt-7 pt-5 border-t border-gray-200">
              {[
                { label: '10,000+', sub: 'Athletes 2026' },
                { label: '900+', sub: 'Teams' },
                { label: '19', sub: 'Sports' },
                { label: '2 Wks', sub: 'Delivery' },
              ].map(({ label, sub }) => (
                <div key={sub} className="text-center">
                  <div className="font-black text-lg text-[#1B4D3E]" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{label}</div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-wider">{sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {/* Carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl mb-4 bg-gray-100" style={{ aspectRatio: '4/3' }}>
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
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-black text-[#0A1628] uppercase tracking-wider shadow-sm border border-white">
                  {SLIDES[currentSlide].label}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all ${i === currentSlide ? 'bg-[#C8A951] w-5 h-1.5' : 'bg-white/60 w-1.5 h-1.5'}`} />
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div id="delivery" className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#1B4D3E] uppercase tracking-widest">NJ Games — June 6, 2026</p>
                <a href="https://islamic-games.com/new-jersey/" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-[#1B4D3E] flex items-center gap-1">
                  Register <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[{ val: timeLeft.days, label: 'Days' }, { val: timeLeft.hours, label: 'Hrs' }, { val: timeLeft.mins, label: 'Min' }, { val: timeLeft.secs, label: 'Sec' }]
                  .map(({ val, label }) => (
                    <div key={label} className="text-center bg-[#0A1628] rounded-xl py-3">
                      <div className="font-black text-xl text-white leading-none" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
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
                <p className="font-black text-sm text-[#0A1628] uppercase" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  ThreadStylez × Islamic Games
                </p>
                <p className="text-gray-500 text-xs mt-0.5">Official apparel provider — all 2026 events</p>
              </div>
              <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:text-[#1B4D3E] hover:border-[#1B4D3E] transition-all flex items-center gap-1 flex-shrink-0">
                IG <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400">
        <span className="text-[10px] tracking-widest uppercase">Browse</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
