import { ExternalLink, Mail, Phone, Shield } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/image.png" alt="ThreadStylez" className="h-12 w-auto object-contain" />
              <div className="border-l border-white/10 pl-3">
                <p className="text-[10px] text-gold-500 font-display font-bold uppercase tracking-widest">National Games</p>
                <p className="text-xs text-gray-400">Official Apparel Portal</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-body leading-relaxed max-w-sm">
              The official apparel ordering portal for National Games athletes, teams, and event participants. Powered by ThreadStylez — Official IG Apparel Partner.
            </p>
            <div className="flex items-center gap-2 mt-5 p-3 rounded-xl bg-navy-800 border border-white/5 w-fit">
              <span className="w-6 h-6 rounded-sm bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-display">Official Partner</p>
                <p className="text-xs text-white font-display font-bold">IG Apparel — All National Teams</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-5">Portal</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {[
                { label: 'Browse Apparel', href: '#products' },
                { label: 'Customization', href: '#designs' },
                { label: 'Team Orders', href: '#team-orders' },
                { label: 'Delivery Info', href: '#delivery' },
                { label: 'Size Guide', href: 'https://threadstylez.com/size-guide', ext: true },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noopener noreferrer' : undefined}
                    className="hover:text-gold-500 transition-colors flex items-center gap-1.5">
                    {l.label} {l.ext && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <a href="mailto:orders@threadstylez.com" className="hover:text-gold-500 transition-colors">orders@threadstylez.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>Available via site contact</span>
              </li>
              <li>
                <a href="https://threadstylez.com/faq" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors flex items-center gap-1.5">
                  FAQ <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/returns" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors flex items-center gap-1.5">
                  Returns Policy <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            {/* Delivery box */}
            <div className="mt-6 p-4 rounded-xl bg-rush/10 border border-rush/20">
              <p className="text-rush text-xs font-display font-bold uppercase tracking-wider mb-1">⚠ Delivery Reminder</p>
              <p className="text-gray-400 text-xs">Standard: 2 weeks. Rush orders (within 2 weeks of event) are NOT guaranteed before event date.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© {year} ThreadStylez. All rights reserved. Official National Games Apparel Partner.</p>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gold-500" />
            <span className="text-gray-600 text-xs">Secure checkout via Stripe</span>
          </div>
          <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer"
            className="btn-outline px-4 py-2 rounded-lg text-xs flex items-center gap-1.5">
            Visit ThreadStylez.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
