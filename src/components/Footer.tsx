import { ExternalLink, Mail, MapPin, Shield } from 'lucide-react';

const TS_LOGO = 'https://threadstylez.com/wp-content/uploads/2023/08/Threadstylezlogo2.png';
const IG_LOGO = 'https://islamic-games.com/wp-content/uploads/2022/09/Islamic-Games-Logo.png';

const IG_EVENTS_2026 = [
  { city: 'New Jersey', date: 'June 6–7', url: 'https://islamic-games.com/new-jersey/' },
  { city: 'Dallas, TX', date: 'June 13–14', url: 'https://islamic-games.com/dallas/' },
  { city: 'Chicago, IL', date: 'July 17–18', url: 'https://islamic-games.com/chicago/' },
  { city: 'Michigan', date: 'Sept 6–7', url: 'https://islamic-games.com/michigan/' },
  { city: 'Houston, TX', date: 'Sept/Oct', url: 'https://islamic-games.com/houston/' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-[#C8A951] pt-16 pb-8 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Main partnership banner */}
        <div className="rounded-2xl border border-[#1B4D3E]/20 bg-[#1B4D3E]/5 p-6 mb-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <img
              src={TS_LOGO}
              alt="ThreadStylez"
              className="h-10 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
            />
            <span className="text-gray-400 text-xl font-display font-black">×</span>
            <img
              src={IG_LOGO}
              alt="Islamic Games"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const div = document.createElement('div');
                div.style.cssText = 'height:40px;padding:0 12px;background:#1B4D3E;border:1px solid #2D7A55;border-radius:8px;display:flex;align-items:center;color:white;font-weight:900;font-size:12px;letter-spacing:.08em;text-transform:uppercase;';
                div.textContent = 'Islamic Games';
                el.parentNode?.appendChild(div);
              }}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display font-black text-[#0A1628] text-lg uppercase tracking-wide">Official Apparel Provider — Islamic Games 2026</p>
            <p className="text-gray-600 text-sm mt-1">
              ThreadStylez (threadstylezbrands.com) is the exclusive official apparel provider for all Islamic Games 2026 events across the United States and Canada — serving 10,000+ athletes on 900+ teams.
            </p>
          </div>
          <a
            href="https://islamic-games.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-all px-5 py-2.5 rounded-xl text-xs flex-shrink-0 flex items-center gap-2 font-bold uppercase tracking-wider"
          >
            Islamic Games Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
              <img
                src={TS_LOGO}
                alt="ThreadStylez"
                className="h-12 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
              />
            </a>
            <p className="text-gray-600 text-sm font-body leading-relaxed max-w-sm mb-4">
              ThreadStylez is North America's premier wholesale blank &amp; custom apparel provider — and the official apparel supplier for Islamic Games 2026. Serving individuals, teams, leagues, Islamic schools, and organizations nationwide.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-3.5 h-3.5 text-[#C8A951]" />
                <a href="mailto:sales@threadstylez.com" className="hover:text-[#1B4D3E] transition-colors">sales@threadstylez.com</a>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ExternalLink className="w-3.5 h-3.5 text-[#C8A951]" />
                <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B4D3E] transition-colors">threadstylez.com</a>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ExternalLink className="w-3.5 h-3.5 text-[#C8A951]" />
                <a href="https://threadstylezbrands.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B4D3E] transition-colors">threadstylezbrands.com</a>
                <span className="text-[10px] bg-[#C8A951]/10 border border-[#C8A951]/30 text-[#C8A951] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Launching 2026</span>
              </div>
            </div>
          </div>

          {/* 2026 Events */}
          <div>
            <h4 className="font-display font-bold text-[#0A1628] uppercase tracking-wider text-sm mb-5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C8A951]" />
              IG 2026 Events
            </h4>
            <ul className="space-y-3">
              {IG_EVENTS_2026.map((ev) => (
                <li key={ev.city}>
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-600 text-sm group-hover:text-[#1B4D3E] transition-colors">{ev.city}</span>
                    <span className="text-gray-400 text-xs group-hover:text-[#C8A951] transition-colors">{ev.date}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://islamic-games.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-[#1B4D3E] hover:text-[#2D7A55] mt-4 font-bold uppercase tracking-wider transition-colors"
            >
              All events at islamic-games.com <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Portal links + Delivery */}
          <div>
            <h4 className="font-display font-bold text-[#0A1628] uppercase tracking-wider text-sm mb-5">Portal</h4>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              {[
                { label: 'Browse Apparel', href: '#products' },
                { label: 'Customization', href: '#designs' },
                { label: 'Team Orders', href: '#team-orders' },
                { label: 'Delivery Info', href: '#delivery' },
                { label: 'Size Guide', href: 'https://threadstylez.com/size-guide/', ext: true },
                { label: 'FAQ', href: '#faq' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noopener noreferrer' : undefined}
                    className="hover:text-[#1B4D3E] transition-colors flex items-center gap-1.5">
                    {l.label} {l.ext && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>

            {/* Delivery reminder */}
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <p className="text-orange-700 text-xs font-bold uppercase tracking-wider mb-1">⚠ Delivery Reminder</p>
              <p className="text-gray-600 text-xs">Standard: 2 weeks. Rush orders (within 2 weeks of event) are <strong>NOT guaranteed</strong> before event date.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© {year} ThreadStylez / ThreadStylezBrands.com · Official Islamic Games 2026 Apparel Provider. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#C8A951]" />
            <span className="text-gray-500 text-xs">Secure checkout via Stripe</span>
          </div>
          <a href="https://threadstylez.com" target="_blank" rel="noopener noreferrer"
            className="border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-all px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider">
            Visit ThreadStylez.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
