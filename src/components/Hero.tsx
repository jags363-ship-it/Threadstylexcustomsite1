import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, Package, Users, ChevronDown } from 'lucide-react';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const slides = [
    { src: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-TSPH.png',  label: 'Team Hoodies' },
    { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',  label: 'Soccer Kits' },
    { src: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',  label: 'Volleyball Jerseys' },
    { src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',  label: 'Track & Field Singlets' },
    { src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',  label: 'Cricket Whites' },
    { src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',     label: 'Tennis Polos' },
    { src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',  label: 'Cycling Jerseys' },
    { src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80',     label: 'Martial Arts Gear' },
    { src: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',  label: '5K Run Tees' },
    { src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80',     label: 'Ultimate Frisbee' },
  ];

  // Event countdown — update this date
  const EVENT_DATE = new Date('2025-08-01T09:00:00');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = EVENT_DATE.getTime() - now.getTime();
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

  const isRushZone = timeLeft.days <= 14 && timeLeft.days > 0;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-900 pt-24">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-navy-800 opacity-60 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Copy */}
          <div>
            {/* IG Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 border border-gold-500/30 bg-gold-500/5 rounded-full px-5 py-2 mb-8"
            >
              <span className="w-5 h-5 rounded-sm bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 flex-shrink-0" />
              <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-display font-bold">
                Official IG Apparel Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              <span className="block text-white">OFFICIAL</span>
              <span className="block text-white">NATIONAL GAMES</span>
              <span className="block gold-text">APPAREL PORTAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-body text-lg leading-relaxed mb-8 max-w-xl"
            >
              Customize and order premium apparel for <strong className="text-white">all sports</strong> — individuals &amp; teams. The preferred vendor for IG apparel across all national competitions.
            </motion.p>

            {/* Rush / Delivery Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className={`rounded-xl p-4 mb-8 border ${isRushZone
                ? 'bg-rush/10 border-rush/40 text-white'
                : 'bg-white/5 border-white/10 text-gray-300'}`}
            >
              {isRushZone ? (
                <div className="flex items-start gap-3">
                  <span className="text-rush text-xl mt-0.5">⚠</span>
                  <div>
                    <p className="font-display font-bold text-rush uppercase tracking-wider text-sm">Rush Order Zone Active</p>
                    <p className="text-xs mt-0.5 text-gray-300">You're within 2 weeks of the event. Orders placed now are <strong>RUSH ORDERS</strong> — delivery before event date is <strong>NOT guaranteed.</strong></p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-display font-bold text-sm uppercase tracking-wider">Standard Delivery: 2 Weeks (± a few days)</p>
                    <p className="text-xs text-gray-400 mt-0.5">Orders within 2 weeks of event become Rush Orders — not guaranteed before event date.</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href="#products" className="btn-gold px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2">
                Customize &amp; Order Now <span>→</span>
              </a>
              <a href="#team-orders" className="btn-outline px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2">
                <Users className="w-4 h-4" />
                Start Team Order
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, label: 'Official IG Partner' },
                { icon: Package, label: '2-Week Standard Delivery' },
                { icon: Users, label: 'Individual & Team Orders' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 text-gold-500" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Carousel + Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Product carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 aspect-[4/3] bg-navy-800">
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

              {/* Category label overlay */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-navy-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-xs font-display font-bold text-gold-500 tracking-wider uppercase">
                  {slides[currentSlide].label}
                </span>
              </div>

              {/* Dot nav */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all ${i === currentSlide ? 'bg-gold-500 w-5 h-1.5' : 'bg-white/30 w-1.5 h-1.5'}`}
                  />
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div id="delivery" className="card-surface p-5">
              <p className="section-label mb-4 text-center">Event Countdown — Order Before It's Too Late</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.mins, label: 'Mins' },
                  { val: timeLeft.secs, label: 'Secs' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center bg-navy-700 rounded-xl py-3 border border-white/5">
                    <div className="font-display font-black text-3xl text-white leading-none">
                      {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 text-xs mt-3">
                {timeLeft.days <= 14 ? (
                  <span className="text-rush font-semibold">⚠ Rush order zone — delivery not guaranteed before event</span>
                ) : (
                  <>Order now for standard 2-week delivery — <span className="text-gold-500 font-semibold">estimated delivery before event</span></>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600">
        <span className="text-[10px] tracking-widest uppercase">Browse</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
