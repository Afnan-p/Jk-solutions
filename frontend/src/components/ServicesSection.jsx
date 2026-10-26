import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Cpu, ShieldCheck, Lock, Sun, Wifi, X, Sparkles, ExternalLink } from 'lucide-react';
import api from '../api';

const defaultSecurityServices = [
  {
    _id: 'cctv',
    title: 'CCTV Surveillance',
    slug: 'cctv',
    description: 'Advanced 4K AI-powered camera surveillance with 24/7 cloud monitoring for home and enterprise properties.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800',
    icon: Camera
  },
  {
    _id: 'home-automation',
    title: 'Home Automation',
    slug: 'home-automation',
    description: 'Smart living made simple with lighting, climate & scene control.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800',
    icon: Cpu
  },
  {
    _id: 'gate-automation',
    title: 'Gate Automation',
    slug: 'gate-automation',
    description: 'Secure and convenient access control for motorized gates.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    icon: ShieldCheck
  },
  {
    _id: 'access-control',
    title: 'Access Control',
    slug: 'access-control',
    description: 'Modern biometric access solutions for heightened security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800',
    icon: Lock
  },
  {
    _id: 'solar-systems',
    title: 'Solar Systems',
    slug: 'solar',
    description: 'Sustainable solar power solutions for lower energy costs.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800',
    icon: Sun
  },
  {
    _id: 'networking-wifi',
    title: 'Networking & Wi-Fi',
    slug: 'networking-wifi',
    description: 'Enterprise-grade Wi-Fi 6 coverage for every space.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800',
    icon: Wifi
  }
];

const GUARANTEED_FALLBACK = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800';

const fallbackImages = {
  cctv: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800',
  'home-automation': 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800',
  'gate-automation': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
  'smart-locks': 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800',
  'access-control': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800',
  solar: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800',
  'solar-systems': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800',
  'networking-wifi': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800'
};

const getSecurityIcon = (item, index) => {
  if (item.icon) return item.icon;
  const slug = item.slug || '';
  if (slug.includes('cctv')) return Camera;
  if (slug.includes('home') || slug.includes('automation')) return Cpu;
  if (slug.includes('gate')) return ShieldCheck;
  if (slug.includes('access') || slug.includes('lock')) return Lock;
  if (slug.includes('solar')) return Sun;
  if (slug.includes('wifi') || slug.includes('network')) return Wifi;
  
  const icons = [Camera, Cpu, ShieldCheck, Lock, Sun, Wifi];
  return icons[index % icons.length] || Camera;
};

const getImageSrc = (item, idx) => {
  if (item && item.image && typeof item.image === 'string' && item.image.startsWith('http') && !item.image.includes('photo-1551882547-ff40c0d5b5df')) {
    return item.image;
  }
  const slug = item ? (item.slug || '') : '';
  return fallbackImages[slug] || GUARANTEED_FALLBACK;
};

const ServicesSection = () => {
  const [services, setServices] = useState(defaultSecurityServices);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        const filtered = data.filter(s => s.division === 'Security Solutions' && s.isActive !== false);
        if (filtered && filtered.length > 0) {
          const mapped = filtered.map((item, idx) => ({
            ...item,
            image: getImageSrc(item, idx),
            icon: getSecurityIcon(item, idx)
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.log('Using default security services showcase');
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 md:py-28 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200/60" id="security-solutions">
      
      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#9E8148]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ============================================================ */}
        {/* MOBILE VIEW (sm:hidden): Stacked Header -> Vertical Rectangular Cards */}
        {/* ============================================================ */}
        <div className="block sm:hidden space-y-6">
          
          {/* Header Block */}
          <div>
            <span className="text-[#C6A15B] font-extrabold text-[10px] tracking-[0.25em] uppercase block mb-1.5">
              — OUR SERVICES
            </span>
            <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-3 font-heading">
              Security & <span className="text-[#C6A15B]">Solutions</span>
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
              Comprehensive security and automation solutions for a safer, smarter tomorrow.
            </p>
            <Link to="/services/security" className="inline-block mb-2">
              <button className="py-2.5 px-5 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-[#C6A15B]/20 flex items-center gap-2">
                VIEW ALL SERVICES <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="text-[9px] font-extrabold tracking-[0.2em] text-slate-400 uppercase pt-2 border-t border-slate-200/80">
            MONITOR • PROTECT • AUTOMATE • SECURE
          </div>

          {/* Vertical Stacked Rectangular Cards List */}
          <div className="space-y-3 pt-2">
            {services.map((card, i) => {
              const IconComp = getSecurityIcon(card, i);
              const imgSrc = getImageSrc(card, i);
              return (
                <div
                  key={card._id || card.slug || i}
                  onClick={() => setSelectedServiceModal({ ...card, icon: IconComp, image: imgSrc })}
                  className="group relative block w-full h-[105px] rounded-lg overflow-hidden border border-[#C6A15B]/40 hover:border-[#C6A15B] shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  {/* Background Image */}
                  <img 
                    src={imgSrc} 
                    alt={card.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = GUARANTEED_FALLBACK;
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />

                  {/* Card Inner Content */}
                  <div className="relative z-10 h-full px-4 py-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className="w-10 h-10 rounded-lg bg-white/95 backdrop-blur-md border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shadow-sm shrink-0">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug font-heading">
                          {card.title}
                        </h3>
                        <p className="text-slate-300 text-[11px] font-normal leading-tight line-clamp-1 mt-0.5">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles size={14} className="text-[#C6A15B]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (hidden sm:grid): 100% Untouched original grid */}
        {/* ============================================================ */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Service Cards (lg:order-1 order-2) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 lg:order-1 order-2">
            
            {/* Dynamic Grid: All Active Services in 3 Columns */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {services.map((card, i) => {
                const IconComp = getSecurityIcon(card, i);
                const imgSrc = getImageSrc(card, i);
                return (
                  <motion.div
                    key={card._id || card.slug || i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
                    className="w-full"
                  >
                    <Link 
                      to={`/services/security/${card.slug || 'detail'}`}
                      className="group relative block h-[210px] sm:h-[220px] rounded-lg overflow-hidden border border-[#C6A15B]/50 hover:border-[#C6A15B] shadow-sm hover:shadow-[0_14px_30px_rgba(198,161,91,0.22)] hover:-translate-y-1 transition-all duration-400 cursor-pointer"
                    >
                      {/* Edge-to-Edge Photograph */}
                      <img 
                        src={imgSrc} 
                        alt={card.title} 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = GUARANTEED_FALLBACK;
                        }}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      
                      {/* Dark-to-Transparent Soft Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 group-hover:from-slate-950/95 transition-opacity" />

                      {/* Content Overlay */}
                      <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
                        <div className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shadow-sm shrink-0">
                          <IconComp size={15} />
                        </div>

                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <h3 className="text-white font-extrabold text-base sm:text-lg leading-tight group-hover:text-[#C6A15B] transition-colors mb-1 font-heading">
                              {card.title}
                            </h3>
                            <p className="text-slate-200 text-xs font-normal leading-snug line-clamp-2 max-w-[200px]">
                              {card.description}
                            </p>
                          </div>

                          <div className="w-7 h-7 rounded-full bg-white text-slate-900 group-hover:bg-[#C6A15B] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-md">
                            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* RIGHT SIDE: Text & Details */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start lg:order-2 order-1 lg:pl-4">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#C6A15B] font-extrabold text-[11px] tracking-[0.25em] uppercase block mb-3">
                — OUR SERVICES
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.05] mb-6 font-heading">
                Security & <br />
                <span className="text-[#C6A15B]">Solutions</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-sm font-normal">
                Comprehensive security and automation solutions for a safer, smarter tomorrow.
              </p>

              <Link to="/services/security" className="inline-block mb-8">
                <button className="py-3.5 px-7 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#C6A15B]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer">
                  VIEW ALL SERVICES <ArrowRight size={14} />
                </button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase pt-4 border-t border-slate-200/60 w-full"
            >
              MONITOR • PROTECT • AUTOMATE • SECURE
            </motion.div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* QUICK DETAIL OVERLAY MODAL FOR MOBILE CARD CLICK */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900"
            >
              {/* Modal Cover Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
                <img 
                  src={selectedServiceModal.image} 
                  alt={selectedServiceModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-black transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Badge & Title */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C6A15B] bg-black/40 px-2.5 py-0.5 rounded-full border border-[#C6A15B]/30 backdrop-blur-md">
                    Security Solutions
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1 font-heading">
                    {selectedServiceModal.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedServiceModal.description}
                </p>

                <div className="pt-2 flex flex-col gap-2.5">
                  <Link
                    to={`/services/security/${selectedServiceModal.slug || 'detail'}`}
                    onClick={() => setSelectedServiceModal(null)}
                    className="w-full py-3 px-4 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-2"
                  >
                    View Full Details & Models <ExternalLink size={14} />
                  </Link>
                  <button
                    onClick={() => setSelectedServiceModal(null)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-xs uppercase tracking-wider text-center"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ServicesSection;

