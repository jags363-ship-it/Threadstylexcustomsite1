import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Coach A. Rahman',
    role: 'Basketball — Islamic Games NJ 2025',
    text: 'Ordered jerseys for 24 players — every piece arrived on time, with the correct names and numbers. Quality was phenomenal. Will be using ThreadStylez for all our Islamic Games 2026 orders.',
    rating: 5,
    initials: 'AR',
  },
  {
    name: 'Fatima K.',
    role: 'Soccer Team Captain — Women\'s Division',
    text: 'The full kits looked amazing on the field. Logo was crisp, colors were exactly what we submitted. Delivery was within 2 weeks as promised. Highly recommend for any Islamic Games team.',
    rating: 5,
    initials: 'FK',
  },
  {
    name: 'Ibrahim S.',
    role: 'Track & Field — Islamic Games Dallas',
    text: 'We needed singlets and tracksuits for our entire squad on a tight timeline. ThreadStylez delivered. The communication was excellent and everything came out better than expected.',
    rating: 5,
    initials: 'IS',
  },
  {
    name: 'Yusuf M.',
    role: 'Athletic Director — Islamic School League',
    text: 'As the athletic director for our Islamic school, ThreadStylez has been our go-to for years. Now that they\'re the official Islamic Games provider, it makes ordering even easier. Outstanding.',
    rating: 5,
    initials: 'YM',
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-3" style={{color:"#1B4D3E"}}>Trusted by Islamic Games Athletes &amp; Teams</p>
          <h2 className="step-heading" style={{color:"#0A1628"}}>WHAT TEAMS SAY</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-gray-600 text-sm font-body leading-relaxed flex-1 mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#1B4D3E]/40 border border-[#2D7A55]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4CAF7D] font-display font-black text-xs">{r.initials}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-display font-bold text-sm">{r.name}</p>
                  <p className="text-gray-500 text-[10px]">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
