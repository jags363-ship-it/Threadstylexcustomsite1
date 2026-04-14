import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Coach T. Williams',
    role: 'Track & Field — National Games 2024',
    text: 'Ordered jerseys for 18 athletes with 3 weeks lead time. Everything arrived on time, perfectly customized. The quality was exceptional — exactly what a national-level event demands.',
    rating: 5,
    initials: 'TW',
  },
  {
    name: 'Sarah M.',
    role: 'Soccer Team Captain — Women\'s Division',
    text: 'The team order process was seamless. Everyone got their correct sizes, names, and numbers. Delivery was within the 2-week window as promised. Highly recommend for any team.',
    rating: 5,
    initials: 'SM',
  },
  {
    name: 'Marcus O.',
    role: 'Basketball Club — Provincial Rep.',
    text: 'Used ThreadStylez for our national tournament. The reversible jerseys were outstanding. Print quality held up after multiple washes. Will be ordering again for the summer games.',
    rating: 5,
    initials: 'MO',
  },
  {
    name: 'Jennifer K.',
    role: 'Athletics Administrator — IG Team',
    text: 'As the IG official partner, ThreadStylez made our team branding process effortless. The logo came out crisp, colors were accurate, and the tracksuits looked elite on the field.',
    rating: 5,
    initials: 'JK',
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Trusted by Athletes & Teams</p>
          <h2 className="step-heading">WHAT TEAMS SAY</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface p-5 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm font-body leading-relaxed flex-1 mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-500 font-display font-black text-xs">{r.initials}</span>
                </div>
                <div>
                  <p className="text-white font-display font-bold text-sm">{r.name}</p>
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
