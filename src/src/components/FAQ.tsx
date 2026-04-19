import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is ThreadStylez the official apparel provider for Islamic Games 2026?', a: 'Yes. ThreadStylez (threadstylez.com / threadstylezbrands.com) is the officially designated apparel provider for Islamic Games 2026 — covering all events across the USA and Canada including New Jersey, Dallas, Chicago, Michigan, Houston, and more.' },
  { q: 'What is the standard delivery time?', a: 'Standard production and delivery takes approximately 2 weeks from order confirmation. We strongly recommend ordering at least 3 weeks before your event date.' },
  { q: 'What is a Rush Order?', a: 'If your event is within 2 weeks of placing your order, it is a Rush Order. We cannot guarantee delivery before your event. Order 3–4 weeks in advance to ensure on-time delivery.' },
  { q: 'Can I order for my whole team?', a: 'Yes. Select "Team Order" for 15% bulk pricing on 5+ items. For large rosters, email sales@threadstylez.com after ordering.' },
  { q: 'What customization is available?', a: 'Team Name, Player Name & Number, Team Logo upload, Primary & Secondary Colors, and print placement (front, back, sleeve). All items support sublimation, screen printing, or embroidery. Modest-cut options available.' },
  { q: 'What file format for team logos?', a: 'PNG with transparent background recommended (300×300px min). SVG and JPG also accepted.' },
  { q: 'What is the return policy?', a: 'Custom-printed orders cannot be returned unless there is a manufacturing defect. Blank items may be returned within 14 days. Contact us within 72 hours of delivery for any issues.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 border-t border-gray-100" style={{ background: '#F8F7F4' }}>
      <div className="max-w-xl mx-auto px-4">

        <div className="text-center mb-6">
          <p style={{ color: '#1B4D3E', fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '4px' }}>Help</p>
          <h2 style={{ color: '#0A1628', fontSize: '18px', fontWeight: 700, margin: 0 }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '12px', padding: '12px 16px', textAlign: 'left', background: 'none', border: 'none',
                  cursor: 'pointer',
                  backgroundColor: open === i ? '#F0F4F0' : 'white',
                }}
              >
                {/* QUESTION — forced dark color inline so nothing can override it */}
                <span style={{
                  color: '#111827',
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  fontFamily: 'Barlow, sans-serif',
                }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown style={{ width: '14px', height: '14px', color: open === i ? '#1B4D3E' : '#9CA3AF' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* ANSWER — also forced inline */}
                    <p style={{
                      padding: '10px 16px 14px',
                      color: '#4B5563',
                      fontSize: '12px',
                      lineHeight: '1.6',
                      borderTop: '1px solid #F3F4F6',
                      margin: 0,
                      fontFamily: 'Barlow, sans-serif',
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '11px', marginTop: '16px' }}>
          Questions? Email{' '}
          <a href="mailto:sales@threadstylez.com" style={{ color: '#1B4D3E', fontWeight: 600 }}>
            sales@threadstylez.com
          </a>
        </p>
      </div>
    </section>
  );
}
