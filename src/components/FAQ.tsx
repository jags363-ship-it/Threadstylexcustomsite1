import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is the standard delivery time?',
    a: 'Standard production and delivery takes approximately 2 weeks (± a few days) from the time your order is confirmed and payment is received. This covers printing, quality check, packaging, and shipping.',
  },
  {
    q: 'What is a Rush Order?',
    a: 'If your event is within 2 weeks of placing your order, it is automatically classified as a Rush Order. We will do our absolute best to fulfill it on time, but we CANNOT guarantee delivery before your event date. We strongly recommend ordering at least 3 weeks in advance.',
  },
  {
    q: 'Can I order for my whole team?',
    a: 'Absolutely. Select "Team Order" in the order type section. Team orders of 5+ items receive a 15% bulk discount. You can specify individual sizes and player details for each team member — or submit a roster sheet via email after ordering.',
  },
  {
    q: 'What customization options are available?',
    a: 'You can customize: Team Name, Player Name, Player Number, Team Logo (upload your own), Primary and Secondary colors, and Print Placements (front, back, sleeve, etc.). All items support full sublimation or screen printing depending on the product.',
  },
  {
    q: 'Why is this the "Official IG Apparel Partner"?',
    a: 'ThreadStylez is the officially designated apparel vendor for IG (Instagram) teams participating in National Games events. This means your order meets the official quality and branding standards required for team representation.',
  },
  {
    q: 'What file format should I upload for my logo?',
    a: 'We recommend PNG with transparent background (300×300px minimum). SVG and JPG files are also accepted. For best print quality, provide high-resolution files at the largest size available.',
  },
  {
    q: 'Can I mix different sizes in a team order?',
    a: 'Yes. After placing your order, contact our team at orders@threadstylez.com with your size breakdown per player. For large team orders, we recommend emailing a roster sheet.',
  },
  {
    q: 'What is your return / exchange policy?',
    a: 'Custom-printed orders cannot be returned unless there is a manufacturing defect. Blank/non-customized orders may be returned within 14 days. Please contact us within 72 hours of receiving your order if there is an issue.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-navy-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Have Questions?</p>
          <h2 className="step-heading">FREQUENTLY ASKED</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left bg-navy-900 hover:bg-navy-700 transition-colors"
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
                    <p className="px-5 pb-5 text-gray-400 text-sm font-body leading-relaxed border-t border-white/5 pt-4">
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
