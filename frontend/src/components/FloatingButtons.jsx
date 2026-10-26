import { PhoneCall, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const FloatingButtons = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');

  useEffect(() => {
    let isMounted = true;
    api.get('/settings').then(({ data }) => {
      if (isMounted && data && data.phoneMain) {
        setPhone(data.phoneMain);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hide floating buttons on Admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const cleanNumber = phone.replace(/[^0-9]/g, '');
  const waNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;

  return (
    <div className="fixed bottom-[88px] right-3 sm:bottom-24 sm:right-6 lg:bottom-8 lg:right-8 z-40 flex flex-col gap-2.5 sm:gap-3 pointer-events-none pb-[env(safe-area-inset-bottom)]">
      
      {/* Phone Call Floating Button */}
      <motion.a
        href={`tel:${phone}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-black/40 border border-slate-200/90 hover:border-[#C6A15B] hover:shadow-[0_8px_25px_rgba(198,161,91,0.4)] pointer-events-auto transition-all duration-300"
        aria-label="Call Us Directly"
      >
        <PhoneCall className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-[#080A09] fill-current stroke-[2.2] transition-transform group-hover:scale-110" />
        
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping pointer-events-none opacity-30 -z-10" />

        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#080A09]/95 backdrop-blur-md border border-[#C6A15B]/40 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none hidden sm:block">
          Call Us Now ({phone})
        </span>
      </motion.a>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#1DA851] text-white flex items-center justify-center shadow-xl shadow-emerald-950/30 border border-emerald-400/30 pointer-events-auto transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>

        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#080A09]/95 backdrop-blur-md border border-[#C6A15B]/40 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none hidden sm:block">
          WhatsApp Us
        </span>
      </motion.a>

      {/* Back To Top Floating Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-[#080A09]/95 backdrop-blur-xl border border-[#C6A15B]/40 text-white flex items-center justify-center shadow-xl pointer-events-auto hover:bg-[#121614] hover:border-[#C6A15B] transition-all duration-300 cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-[#C6A15B] group-hover:-translate-y-0.5 transition-transform" />
            
            {/* Tooltip on Hover */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#080A09]/95 backdrop-blur-md border border-[#C6A15B]/40 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none hidden sm:block">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FloatingButtons;
