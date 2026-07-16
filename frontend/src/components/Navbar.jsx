import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ShieldCheck, Palette } from 'lucide-react';
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings in Navbar:', err);
      }
    };
    fetchSettings();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = () => {
    const rawNumber = settings?.phone1 || '+919876543210';
    // Remove all non-numeric characters except +
    const cleanNumber = rawNumber.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanNumber.startsWith('+') ? cleanNumber.substring(1) : cleanNumber}?text=Hello,%20I%20would%20like%20to%20book%20a%20site%20visit`;
  };

  const securityServices = [
    { name: 'CCTV', path: '/services/security/cctv' },
    { name: 'Home Automation', path: '/services/security/home-automation' },
    { name: 'Gate Automation', path: '/services/security/gate-automation' },
    { name: 'Solar', path: '/services/security/solar' },
    { name: 'Smart Locks', path: '/services/security/smart-locks' },
  ];

  const designServices = [
    { name: 'ID Cards', path: '/services/design/id-cards' },
    { name: 'Trophy & Mementos', path: '/services/design/trophy-mementos' },
    { name: 'Customized Gifts', path: '/services/design/customized-gifts' },
    { name: 'Flex Printing', path: '/services/design/flex-printing' },
    { name: 'Corporate Printing', path: '/services/design/corporate-printing' },
    { name: 'Graphic Design', path: '/services/design/graphic-design' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 relative flex justify-between items-center">
        {/* Logo Setup */}
        <Link to="/" className="flex items-center gap-3 z-10 hover:opacity-90 transition-opacity">
          <img src="/jk-logo-official-new.webp" alt="JK Solutions Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-xl" />
          <div className="flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-wide uppercase leading-none mb-1">
              JK Solutions
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-accent tracking-[0.25em] uppercase leading-none">
              Technology Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 z-10">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
          
          {/* Services Mega Menu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-300 hover:text-white transition-colors py-4">
              <span>Services</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showMegaMenu ? 'rotate-180' : ''}`} />
            </div>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {showMegaMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden pt-2"
                >
                  <div className="grid grid-cols-2 p-6 gap-8">
                    {/* Security Column */}
                    <div>
                      <div className="flex items-center gap-2 text-accent font-bold mb-4 pb-2 border-b border-white/5">
                        <ShieldCheck size={18} />
                        Security Solutions
                      </div>
                      <ul className="space-y-3">
                        {securityServices.map((service) => (
                          <li key={service.name}>
                            <Link 
                              to={service.path} 
                              className="text-sm text-gray-400 hover:text-white transition-colors block"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="/services/security" className="inline-block mt-4 text-xs font-bold text-accent hover:text-white transition-colors uppercase tracking-wider">
                        View All Security →
                      </Link>
                    </div>

                    {/* Design Column */}
                    <div>
                      <div className="flex items-center gap-2 text-purple-400 font-bold mb-4 pb-2 border-b border-white/5">
                        <Palette size={18} />
                        Design & Printing
                      </div>
                      <ul className="space-y-3">
                        {designServices.map((service) => (
                          <li key={service.name}>
                            <Link 
                              to={service.path} 
                              className="text-sm text-gray-400 hover:text-white transition-colors block"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="/services/design" className="inline-block mt-4 text-xs font-bold text-purple-400 hover:text-white transition-colors uppercase tracking-wider">
                        View All Design →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Projects Dropdown Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setShowMegaMenuProjects(true)}
            onMouseLeave={() => setShowMegaMenuProjects(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-300 hover:text-white transition-colors py-4">
              <span>Our Works</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showMegaMenuProjects ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {showMegaMenuProjects && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-3 flex flex-col gap-1"
                >
                  <Link 
                    to="/projects/security" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-accent/10 group transition-all" 
                    onClick={() => setShowMegaMenuProjects(false)}
                  >
                    <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <ShieldCheck size={16} className="text-accent" />
                    </div>
                    Security Portfolio
                  </Link>
                  
                  <Link 
                    to="/projects/design" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-500/10 group transition-all" 
                    onClick={() => setShowMegaMenuProjects(false)}
                  >
                    <div className="bg-white/5 p-2 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Palette size={16} className="text-purple-400" />
                    </div>
                    Design Portfolio
                  </Link>
                  
                  <div className="my-1 border-t border-white/5 mx-2"></div>
                  
                  <Link 
                    to="/projects" 
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-wider uppercase mt-1" 
                    onClick={() => setShowMegaMenuProjects(false)}
                  >
                    View All Projects →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6 z-10">
          <a href={`tel:${settings?.phone1 || '+919876543210'}`} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors text-gray-200">
            <Phone size={16} className="text-accent" />
            <span>Call Now</span>
          </a>
          <Button 
            variant="primary" 
            className="text-sm"
            onClick={() => window.open(getWhatsAppLink(), '_blank')}
          >
            Book Site Visit
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#101010] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-accent transition-colors">Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-accent transition-colors">About</Link>
              
              {/* Mobile Services Accordion */}
              <div>
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-white hover:text-accent transition-colors"
                >
                  Services <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-2 space-y-4"
                    >
                      <div className="text-accent text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldCheck size={14}/> Security</div>
                      {securityServices.map(s => (
                        <Link key={s.name} to={s.path} onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white text-sm py-1">{s.name}</Link>
                      ))}
                      
                      <div className="text-purple-400 text-sm font-bold uppercase tracking-wider mb-2 mt-4 flex items-center gap-2"><Palette size={14}/> Design & Printing</div>
                      {designServices.map(s => (
                        <Link key={s.name} to={s.path} onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white text-sm py-1">{s.name}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Projects Accordion */}
              <div>
                <button 
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-white hover:text-accent transition-colors"
                >
                  Our Works <ChevronDown size={20} className={`transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileProjectsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-2 space-y-2"
                    >
                      <Link to="/projects/security" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-accent text-sm py-1">Security Portfolio</Link>
                      <Link to="/projects/design" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-purple-400 text-sm py-1">Design Portfolio</Link>
                      <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white text-sm py-1">View All Projects</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-accent transition-colors">Contact</Link>
            </div>
            <div className="px-6 pb-6">
              <Button 
                variant="primary" 
                className="w-full justify-center"
                onClick={() => window.open(getWhatsAppLink(), '_blank')}
              >
                Book Site Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
