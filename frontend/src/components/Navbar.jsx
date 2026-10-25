import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ShieldCheck, Palette, ArrowRight } from 'lucide-react';
import Button from './Button';
import api from '../api';

const Navbar = () => {
  const [settings, setSettings] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMegaMenuProjects, setShowMegaMenuProjects] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const location = useLocation();

  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings in Navbar:', err);
      }
    };
    
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      } catch (err) {
        console.log('Using default fallback services in Navbar');
      }
    };

    fetchSettings();
    fetchServices();

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      window.location.href = '/contact';
      return;
    }
    const el = document.getElementById('contact-section') || document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  const defaultSecurityServices = [
    { name: 'CCTV Surveillance', path: '/services/security/cctv' },
    { name: 'Home Automation', path: '/services/security/home-automation' },
    { name: 'Gate Automation', path: '/services/security/gate-automation' },
    { name: 'Smart Locks & Biometrics', path: '/services/security/smart-locks' },
    { name: 'Access Control Systems', path: '/services/security/access-control' },
    { name: 'Solar Systems', path: '/services/security/solar' },
    { name: 'Networking & Wi-Fi', path: '/services/security/networking-wifi' }
  ];

  const defaultDesignServices = [
    { name: 'Graphic Design', path: '/services/design/graphic-design' },
    { name: 'Corporate Printing', path: '/services/design/corporate-printing' },
    { name: 'Trophies & Mementos', path: '/services/design/trophy-mementos' },
    { name: 'Customized Gifts', path: '/services/design/customized-gifts' },
    { name: 'Flex Printing', path: '/services/design/flex-printing' },
    { name: 'ID Cards', path: '/services/design/id-cards' }
  ];

  const securityServices = servicesList.length > 0
    ? servicesList
        .filter(s => s.division === 'Security Solutions' && s.isActive !== false)
        .map(s => ({
          name: s.title,
          path: `/services/security/${s.slug}`
        }))
    : defaultSecurityServices;

  const designServices = servicesList.length > 0
    ? servicesList
        .filter(s => s.division === 'Design & Printing' && s.isActive !== false)
        .map(s => ({
          name: s.title,
          path: `/services/design/${s.slug}`
        }))
    : defaultDesignServices;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 pt-[env(safe-area-inset-top)] ${
        isScrolled 
          ? 'lg:bg-[#080A09]/92 lg:backdrop-blur-xl lg:border-b lg:border-[#C6A15B]/30 lg:shadow-2xl lg:py-3.5' 
          : 'lg:bg-gradient-to-b lg:from-[#080A09]/90 lg:via-[#080A09]/40 lg:to-transparent lg:py-5'
      }`}
    >
      <div className="px-3.5 sm:px-6 pt-2.5 sm:pt-3 lg:p-0 lg:container lg:mx-auto lg:max-w-7xl">
        <div className="mobile-glass-nav px-4 py-2.5 sm:px-6 sm:py-3 flex justify-between items-center lg:px-0 lg:py-0">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 z-10 group">
            <img 
              src="/jk-logo-official-new.webp" 
              alt="JK Solutions Logo" 
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-lg border border-[#C6A15B]/40 group-hover:border-[#C6A15B] transition-colors shadow-sm" 
            />
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-[#FAF9F5] tracking-tight uppercase leading-none font-heading group-hover:text-[#C6A15B] transition-colors">
                JK SOLUTIONS
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#C6A15B] tracking-[0.2em] uppercase leading-none mt-0.5 sm:mt-1">
                Technology & Security
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 z-10">
            <Link to="/" className="text-xs font-extrabold uppercase tracking-wider text-[#FAF9F5] hover:text-[#C6A15B] transition-colors relative py-1 group">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6A15B] group-hover:w-full transition-all duration-300" />
            </Link>
            
            {/* Services Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer text-xs font-extrabold uppercase tracking-wider text-[#FAF9F5] hover:text-[#C6A15B] transition-colors py-3 group">
                <span>Services</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${showMegaMenu ? 'rotate-180 text-[#C6A15B]' : ''}`} />
              </div>

              <AnimatePresence>
                {showMegaMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] glass-panel-dark border border-[#C6A15B]/30 shadow-2xl rounded-2xl p-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-[#C6A15B] font-bold text-xs uppercase tracking-wider mb-3 pb-2 border-b border-[#C6A15B]/20">
                          <ShieldCheck size={16} />
                          Security Solutions
                        </div>
                        <ul className="space-y-2">
                          {securityServices.map((s) => (
                            <li key={s.name}>
                              <Link 
                                to={s.path} 
                                className="text-xs text-[#EDE8DC]/90 hover:text-[#C6A15B] transition-colors block font-medium"
                                onClick={() => setShowMegaMenu(false)}
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#C6A15B] font-bold text-xs uppercase tracking-wider mb-3 pb-2 border-b border-[#C6A15B]/20">
                          <Palette size={16} />
                          Design & Printing
                        </div>
                        <ul className="space-y-2">
                          {designServices.map((s) => (
                            <li key={s.name}>
                              <Link 
                                to={s.path} 
                                className="text-xs text-[#EDE8DC]/90 hover:text-[#C6A15B] transition-colors block font-medium"
                                onClick={() => setShowMegaMenu(false)}
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Our Works Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaMenuProjects(true)}
              onMouseLeave={() => setShowMegaMenuProjects(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer text-xs font-extrabold uppercase tracking-wider text-[#FAF9F5] hover:text-[#C6A15B] transition-colors py-3 group">
                <span>Our Works</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${showMegaMenuProjects ? 'rotate-180 text-[#C6A15B]' : ''}`} />
              </div>

              <AnimatePresence>
                {showMegaMenuProjects && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 glass-panel-dark border border-[#C6A15B]/30 shadow-2xl rounded-2xl p-3 flex flex-col gap-1"
                  >
                    <Link 
                      to="/projects/security" 
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#EDE8DC]/90 hover:text-[#C6A15B] hover:bg-white/5 transition-all" 
                      onClick={() => setShowMegaMenuProjects(false)}
                    >
                      <ShieldCheck size={15} className="text-[#C6A15B]" />
                      Security Portfolio
                    </Link>
                    
                    <Link 
                      to="/projects/design" 
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#EDE8DC]/90 hover:text-[#C6A15B] hover:bg-white/5 transition-all" 
                      onClick={() => setShowMegaMenuProjects(false)}
                    >
                      <Palette size={15} className="text-[#C6A15B]" />
                      Design Portfolio
                    </Link>
                    
                    <div className="my-1 border-t border-[#C6A15B]/20 mx-2"></div>
                    
                    <Link 
                      to="/projects" 
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[#C6A15B] hover:text-white transition-colors tracking-wider uppercase" 
                      onClick={() => setShowMegaMenuProjects(false)}
                    >
                      View All Projects →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className="text-xs font-extrabold uppercase tracking-wider text-[#FAF9F5] hover:text-[#C6A15B] transition-colors relative py-1 group">
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6A15B] group-hover:w-full transition-all duration-300" />
            </Link>
            
            <Link to="/contact" className="text-xs font-extrabold uppercase tracking-wider text-[#FAF9F5] hover:text-[#C6A15B] transition-colors relative py-1 group">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6A15B] group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-5 z-10">
            <a 
              href={`tel:${settings?.phone1 || '+919876543210'}`} 
              className="flex items-center gap-2 text-xs font-extrabold text-[#FAF9F5] hover:text-[#C6A15B] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#101312] transition-all shadow-xs">
                <Phone size={13} />
              </div>
              <span>+91 9876 543210</span>
            </a>

            <button 
              className="text-xs font-extrabold uppercase tracking-wider py-2.5 px-5 rounded-xl bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] hover:-translate-y-0.5 shadow-md shadow-[#C6A15B]/25 transition-all flex items-center gap-2 cursor-pointer"
              onClick={scrollToContact}
            >
              Get a Quote <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-[#FAF9F5] z-10 p-1.5 sm:p-2 cursor-pointer focus:outline-none rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} className="text-[#FAF9F5]" /> : <Menu size={22} className="text-[#FAF9F5]" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mobile-glass-drawer mt-2.5 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase text-[#FAF9F5] hover:text-[#C6A15B]">Home</Link>
                
                <div>
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full text-sm font-bold uppercase text-[#FAF9F5] hover:text-[#C6A15B]"
                  >
                    Services <ChevronDown size={16} className={mobileServicesOpen ? 'rotate-180 text-[#C6A15B]' : ''} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-2"
                      >
                        <div className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider">Security</div>
                        {securityServices.map(s => (
                          <Link key={s.name} to={s.path} onClick={() => setMobileMenuOpen(false)} className="block text-[#EDE8DC]/80 text-xs py-1 hover:text-[#C6A15B]">{s.name}</Link>
                        ))}
                        <div className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider mt-3">Design & Printing</div>
                        {designServices.map(s => (
                          <Link key={s.name} to={s.path} onClick={() => setMobileMenuOpen(false)} className="block text-[#EDE8DC]/80 text-xs py-1 hover:text-[#C6A15B]">{s.name}</Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button 
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="flex items-center justify-between w-full text-sm font-bold uppercase text-[#FAF9F5] hover:text-[#C6A15B]"
                  >
                    Our Works <ChevronDown size={16} className={mobileProjectsOpen ? 'rotate-180 text-[#C6A15B]' : ''} />
                  </button>
                  <AnimatePresence>
                    {mobileProjectsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-2"
                      >
                        <Link to="/projects/security" onClick={() => setMobileMenuOpen(false)} className="block text-[#EDE8DC]/80 text-xs py-1 font-medium hover:text-[#C6A15B]">Security Portfolio</Link>
                        <Link to="/projects/design" onClick={() => setMobileMenuOpen(false)} className="block text-[#EDE8DC]/80 text-xs py-1 font-medium hover:text-[#C6A15B]">Design Portfolio</Link>
                        <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-[#C6A15B] text-xs py-1 font-bold uppercase">View All Projects →</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase text-[#FAF9F5] hover:text-[#C6A15B]">About</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase text-[#FAF9F5] hover:text-[#C6A15B]">Contact</Link>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button 
                  className="w-full justify-center text-xs font-bold uppercase py-3 bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] rounded-xl shadow-md flex items-center justify-center gap-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToContact();
                  }}
                >
                  Get a Quote <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
