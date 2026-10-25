import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080A09] text-[#FAF9F5] pt-16 pb-8 border-t border-[#C6A15B]/20 relative overflow-hidden">
      {/* Ambient Glass Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Top 5-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1: Logo & Description */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/jk-logo-official-new.webp" alt="JK Solutions" className="h-8 w-8 object-contain rounded-md border border-[#C6A15B]/30" />
              <span className="text-base font-extrabold text-[#FAF9F5] tracking-tight uppercase leading-none font-[#Plus Jakarta Sans]">
                JK SOLUTIONS
              </span>
            </Link>

            <p className="text-xs text-[#EDE8DC]/70 leading-relaxed">
              Your trusted partner for security, automation, solar and printing solutions.
            </p>

            <div className="flex gap-2">
              {['FB', 'IG', 'LN', 'TW'].map((item, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-[10px] font-bold text-[#EDE8DC] hover:bg-[#C6A15B] hover:text-[#101312] hover:border-[#C6A15B] transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold text-[#FAF9F5] uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE8DC]/70">
              <li><Link to="/" className="hover:text-[#C6A15B] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#C6A15B] transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-[#C6A15B] transition-colors">Our Works</Link></li>
              <li><a href="#how-it-works" className="hover:text-[#C6A15B] transition-colors">Blog</a></li>
              <li><Link to="/contact" className="hover:text-[#C6A15B] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-xs font-extrabold text-[#FAF9F5] uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE8DC]/70">
              <li><Link to="/services/security/cctv" className="hover:text-[#C6A15B] transition-colors">CCTV Surveillance</Link></li>
              <li><Link to="/services/security/home-automation" className="hover:text-[#C6A15B] transition-colors">Home Automation</Link></li>
              <li><Link to="/services/security/gate-automation" className="hover:text-[#C6A15B] transition-colors">Gate Automation</Link></li>
              <li><Link to="/services/security/smart-locks" className="hover:text-[#C6A15B] transition-colors">Access Control</Link></li>
              <li><Link to="/services/security/solar" className="hover:text-[#C6A15B] transition-colors">Solar Systems</Link></li>
              <li><Link to="/services/security" className="hover:text-[#C6A15B] transition-colors">Networking</Link></li>
              <li><Link to="/services/design" className="hover:text-[#C6A15B] transition-colors">Design & Printing</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-xs font-extrabold text-[#FAF9F5] uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Contact Info
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE8DC]/70">
              <li className="flex items-center gap-2">
                <MapPin size={13} className="text-[#C6A15B] flex-shrink-0" />
                <span>Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-[#C6A15B] flex-shrink-0" />
                <span>+91 9876 543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[#C6A15B] flex-shrink-0" />
                <span>info@jksolutions.in</span>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Clock size={13} className="text-[#C6A15B] flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Right Side Tagline & Scroll To Top */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <div className="text-left lg:text-right">
              <h3 className="text-base font-extrabold text-[#FAF9F5] leading-tight mb-1">
                Building <br />
                Safer Spaces <br />
                Together
              </h3>
            </div>

            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass-panel-dark border border-[#C6A15B]/40 text-[#C6A15B] flex items-center justify-center hover:bg-[#C6A15B] hover:text-[#101312] transition-all duration-300 cursor-pointer mt-4 lg:mt-0 shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-[#77766F]">
          <p>© 2025 JK Solutions. All rights reserved.</p>
          <p className="text-[#9E8148] font-semibold">Designed for a safer tomorrow.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
