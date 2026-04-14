import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Trophy, Users, Shirt } from 'lucide-react';

const TS_LOGO = 'https://threadstylez.com/wp-content/uploads/2025/03/logo1.png';
const IG_LOGO = 'https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png';

const events = [
  { city: 'New Jersey', date: 'June 6–7, 2026', sports: 'Basketball · Soccer · Volleyball · Cricket', url: 'https://islamic-games.com/new-jersey/' },
  { city: 'Dallas, TX', date: 'June 13–14, 2026', sports: 'Basketball · Soccer · Flag Football · Track', url: 'https://islamic-games.com/dallas/' },
  { city: 'Chicago, IL', date: 'July 17–18, 2026', sports: 'Basketball · Soccer · Volleyball · Cricket', url: 'https://islamic-games.com/chicago/' },
  { city: 'Michigan', date: 'Sept 6–7, 2026', sports: 'Basketball · Soccer · Volleyball · Swimming', url: 'https://islamic-games.com/michigan/' },
  { city: 'Houston, TX', date: 'Sept/Oct 2026', sports: 'Basketball · Soccer · Track · More TBA', url: 'https://islamic-games.com/houston/' },
];

const stats = [
  { val: '35+', label: 'Years of Islamic Games' },
  { val: '10,000+', label: 'Athletes in 2026' },
  { val: '900+', label: 'Teams nationwide' },
  { val: '50,000+', label: 'Expected attendance' },
];

export function IGPartnershipSection() {
  return (
    <section className="py-20 bg-navy-800 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section label */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Official Partnership</p>
          <h2 className="step-heading mb-4">THREADSTYLEZ × ISLAMIC GAMES 2026</h2>
          <p className="text-gray-400 font-body max-w-2xl mx-auto">
            ThreadStylez is proud to be the official apparel provider for Islamic Games 2026 — North America's largest and most celebrated Muslim sports festival, uniting athletes, families, and communities in the spirit of faith, health, and sportsmanship.
          </p>
        </div>

        {/* Logo lockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-14 p-8 rounded-2xl border border-[#2D7A55]/20 bg-[#1B4D3E]/8"
        >
          <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <img
              src={TS_LOGO}
              alt="ThreadStylez — Official Apparel Provider"
              className="h-16 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
            />
          </a>

          <div className="text-center">
            <div className="text-gray-600 text-3xl font-display font-black">×</div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">Official Provider</p>
          </div>

          <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <img
              src={IG_LOGO}
              alt="Islamic Games 2026"
              className="h-16 w-auto object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const div = document.createElement('div');
                div.style.cssText = 'padding:12px 20px;background:#1B4D3E;border:1px solid #2D7A55;border-radius:12px;color:white;font-weight:900;font-size:16px;letter-spacing:.05em;text-transform:uppercase;';
                div.textContent = 'Islamic Games';
                el.parentNode?.appendChild(div);
              }}
            />
          </a>

          <div className="hidden sm:block w-px h-16 bg-white/10" />

          <div className="text-center sm:text-left">
            <p className="font-display font-black text-white text-lg uppercase tracking-wide">
              ThreadStylezBrands.com
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Dedicated Islamic Games apparel portal — launching 2026
            </p>
            <a
              href="https://threadstylezbrands.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-400 text-xs font-display font-bold uppercase tracking-wider mt-2 transition-colors"
            >
              threadstylezbrands.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface p-5 text-center"
            >
              <div className="font-display font-black text-gold-500 text-3xl leading-none mb-1">{s.val}</div>
              <div className="text-gray-500 text-xs uppercase tracking-wider font-body">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* 2026 Event grid */}
        <div className="mb-10">
          <p className="section-label mb-6 text-center">2026 Event Schedule — Order Apparel for Each Location</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((ev, i) => (
              <motion.a
                key={ev.city}
                href={ev.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group card-surface p-5 hover:border-[#2D7A55]/50 transition-all block"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#4CAF7D] flex-shrink-0" />
                    <h3 className="font-display font-black text-white text-lg uppercase tracking-wide leading-none">{ev.city}</h3>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gold-500 flex-shrink-0 transition-colors" />
                </div>
                <p className="text-gold-500 font-display font-bold text-sm mb-2">{ev.date}</p>
                <p className="text-gray-500 text-xs">{ev.sports}</p>
              </motion.a>
            ))}

            {/* Coming soon card */}
            <div className="card-surface p-5 flex items-center justify-center border-dashed">
              <div className="text-center">
                <div className="text-gray-600 text-2xl mb-2">+</div>
                <p className="font-display font-bold text-gray-600 text-sm uppercase tracking-wide">More cities TBA</p>
                <a href="https://islamic-games.com" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-gray-600 hover:text-gold-500 mt-1 inline-flex items-center gap-1 transition-colors">
                  Check islamic-games.com <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: Shirt,
              title: 'All Sports Covered',
              desc: 'Custom jerseys, hoodies, tracksuits, singlets, and accessories for every Islamic Games sport — basketball, soccer, cricket, track, swimming, volleyball, and more.',
            },
            {
              icon: Users,
              title: 'Teams & Individuals',
              desc: 'Whether you\'re ordering for yourself or for 100+ athletes, we handle it all. Team bulk pricing (15% off 5+ items) and individual custom orders both supported.',
            },
            {
              icon: Trophy,
              title: 'Official Quality',
              desc: 'As the official provider, all ThreadStylez apparel meets the Islamic Games\' standards for quality, durability, and professional presentation on the field.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-surface p-5">
              <div className="w-10 h-10 rounded-xl bg-[#1B4D3E]/40 border border-[#2D7A55]/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#4CAF7D]" />
              </div>
              <h4 className="font-display font-black text-white text-base uppercase tracking-wide mb-2">{title}</h4>
              <p className="text-gray-500 text-xs font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
