import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">ThreadStylez</h3>
                <p className="text-xs text-gray-400">Custom Apparel</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Premium quality custom apparel with your unique designs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#designs" className="hover:text-white transition-colors">
                  Designs
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  Main Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://threadstylez.com/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/shipping" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://threadstylez.com/faq" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/returns" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="https://threadstylez.com/size-guide" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} ThreadStylez. All rights reserved.
            </p>
            
            {/* Main Website CTA */}
            <a
              href="https://threadstylez.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              Visit ThreadStylez.com
              <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by ThreadStylez
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}