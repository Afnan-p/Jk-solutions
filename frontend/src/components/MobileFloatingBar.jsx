import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShieldCheck, Briefcase, Info, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileFloatingBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.startsWith('/services')) setActiveTab('services');
    else if (path.startsWith('/projects')) setActiveTab('projects');
    else if (path === '/about') setActiveTab('about');
    else if (path === '/contact') setActiveTab('contact');
  }, [location]);

  // Hide mobile nav bar on Admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleNavigation = (tab, path, elementId) => {
    setActiveTab(tab);
    if (location.pathname === '/' && elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(path);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/', elementId: 'hero' },
    { id: 'services', label: 'Services', icon: ShieldCheck, path: '/services', elementId: 'security-solutions' },
    { id: 'projects', label: 'Works', icon: Briefcase, path: '/projects', elementId: 'projects' },
    { id: 'about', label: 'About', icon: Info, path: '/about', elementId: 'about-section' },
    { id: 'contact', label: 'Contact', icon: PhoneCall, path: '/contact', elementId: 'contact-section' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[94%] max-w-[420px] pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      {/* Sleek Glassmorphism Floating Pill Bar */}
      <div className="bg-[#080A09]/90 backdrop-blur-2xl border border-white/20 shadow-[0_16px_36px_rgba(0,0,0,0.7)] rounded-full px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavigation(item.id, item.path, item.elementId)}
              className={`relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-300 cursor-pointer ${
                isActive ? 'text-[#050505] font-extrabold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {/* Active Gold Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] to-[#D9BD82] rounded-full shadow-[0_0_12px_rgba(198,161,91,0.5)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Icon size={16} className={`relative z-10 ${isActive ? 'text-[#050505] stroke-[2.5]' : 'text-slate-300'}`} />
              <span className={`text-[8.5px] font-extrabold uppercase tracking-wider relative z-10 leading-none ${isActive ? 'text-[#050505]' : 'text-slate-300'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFloatingBar;

