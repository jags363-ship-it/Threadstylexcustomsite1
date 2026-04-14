import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is ThreadStylez the official apparel provider for Islamic Games 2026?',
    a: 'Yes. ThreadStylez (threadstylez.com / threadstylezbrands.com) is the officially designated apparel provider for Islamic Games 2026 — covering all events across the USA and Canada including New Jersey, Dallas, Chicago, Michigan, Houston, and more. This means your order meets the official quality and branding standards for team representation at the Games.',
  },
  {
    q: 'What is the standard delivery time?',
    a: 'Standard production and delivery takes approximately 2 weeks (± a few days) from order confirmation and payment. This covers printing, quality check, packaging, and shipping. We strongly recommend ordering at least 3 weeks before your event date.',
  },
  {
    q: 'What is a Rush Order and is delivery guaranteed?',
    a: 'If your event is within 2 weeks of placing your order, it is classified as a Rush Order. We will do everything possible to fulfill it, but we CANNOT guarantee delivery before your event date. For the Islamic Games events, order at least 3–4 weeks in advance to ensure on-time delivery.',
  },
  {
    q: 'Can I order apparel for my whole Islamic Games team?',
    a: 'Absolutely. Select "Team Order" to get 15% bulk pricing on orders of 5 or more items. You can specify individual sizes and player details for each athlete. For large team rosters, email your roster sheet to sales@threadstylez.com after placing your order.',
  },
  {
    q: 'What sports does Islamic Games 2026 cover?',
    a: 'Islamic Games 2026 features basketball, soccer, volleyball, cricket, softball, flag football, track & field, swimming, tennis, table tennis, badminton, pickleball, cycling, 5K, archery, and more. ThreadStylez provides apparel for all sports with full customization.',
  },
  {
    q: 'What customization options are available?',
    a: 'You can customize: Team Name, Player Name & Number, Team Logo (upload your own), Primary & Secondary Colors, and Print Placement (front, back, sleeve, etc.). All items support full sublimation or screen printing. Halal-compliant, modest-cut options are available on request.',
  },
  {
    q: 'What is ThreadStylezBrands.com?',
    a: 'ThreadStylezBrands.com is the upcoming dedicated portal launching in 2026 specifically for Islamic Games and community sports event apparel. It will be the central hub for all Islamic Games team orders, event-specific collections, and official gear. Stay tuned for the launch!',
  },
  {
    q: 'What file format should I upload for my team logo?',
    a: 'We recommend PNG with a transparent background (300×300px minimum, higher res is better). SVG and JPG are also accepted. For the cleanest print results, provide the highest resolution file you have.',
  },
  {
    q: 'Can Islamic schools and youth organizations order?',
    a: 'Yes. Islamic Games is open to Islamic schools, leagues, youth organizations, and sports academies. We offer special pricing for non-profit organizations and Islamic schools — contact us at sales@threadstylez.com for details.',
  },
  {
    q: 'What is your return policy for custom orders?',
    a: 'Custom-printed orders cannot be returned unless there is a manufacturing defect. Blank/non-customized items may be returned within 14 days. Contact us within 72 hours of delivery if there is any issue.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Have Questions?</p>
          <h2 className="step-heading" style={{color:"#0A1628"}}>FREQUENTLY ASKED</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-display font-bold text-white text-sm uppercase tracking-wide">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 ${open === i ? 'text-gold-500' : 'text-gray-500'}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-600 text-sm font-body leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
