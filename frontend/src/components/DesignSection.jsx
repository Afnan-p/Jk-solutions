import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, FileText, Trophy, Gift, Maximize2, CreditCard, X, Sparkles, ExternalLink } from 'lucide-react';
import api from '../api';

const defaultDesignServices = [
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Graphic Design',
    description: 'Creative designs & brand identities.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800',
    link: '/services/design/graphic-design',
    icon: PenTool
  },
  {
    id: 'corporate-printing',
    slug: 'corporate-printing',
    title: 'Corporate Printing',
    description: 'Professional printing for every business need.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
    link: '/services/design/corporate-printing',
    icon: FileText
  },
  {
    id: 'trophies-mementos',
    slug: 'trophy-mementos',
    title: 'Trophies & Mementos',
    description: 'Custom awards for achievements and special moments.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800',
    link: '/services/design/trophy-mementos',
    icon: Trophy
  },
  {
    id: 'customized-gifts',
    slug: 'customized-gifts',
    title: 'Customized Gifts',
    description: 'Personalized gifts for every occasion.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
    link: '/services/design/customized-gifts',
    icon: Gift
  },
  {
    id: 'flex-printing',
    slug: 'flex-printing',
    title: 'Flex Printing',
    description: 'Large format printing for events, promotions and outdoor use.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=800',
    link: '/services/design/flex-printing',
    icon: Maximize2
  },
  {
    id: 'id-cards',
    slug: 'id-cards',
    title: 'ID Cards',
    description: 'Premium quality ID cards for corporates, hospitals, and institutions.',
    image: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=800',
    link: '/services/design/id-cards',
    icon: CreditCard
  }
];

const designFallbackImages = {
  'graphic-design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800',
  'corporate-printing': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
  'trophy-mementos': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800',
  'customized-gifts': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
  'flex-printing': 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=800',
  'id-cards': 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=800'
};

const getDesignIcon = (item, index) => {
  if (item.icon) return item.icon;
  const slug = item.slug || '';
  if (slug.includes('graphic') || slug.includes('logo')) return PenTool;
  if (slug.includes('corporate') || slug.includes('print')) return FileText;
  if (slug.includes('trophy') || slug.includes('mementos') || slug.includes('award')) return Trophy;
  if (slug.includes('gift')) return Gift;
  if (slug.includes('flex') || slug.includes('banner')) return Maximize2;
  if (slug.includes('id') || slug.includes('card')) return CreditCard;
  
  const icons = [PenTool, FileText, Trophy, Gift, Maximize2, CreditCard];
  return icons[index % icons.length] || PenTool;
};

const DesignSection = () => {
  const [services, setServices] = useState(defaultDesignServices);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        const filtered = data.filter(s => s.division === 'Design & Printing' && s.isActive !== false);
        if (filtered && filtered.length > 0) {
          const mapped = filtered.map((item, idx) => ({
            ...item,
            id: item.slug || item._id,
            link: `/services/design/${item.slug}`,
            icon: getDesignIcon(item, idx),
            image: (item.image && item.image.startsWith('http')) ? item.image : (defaultDesignServices[idx]?.image || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800')
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.log('Using default design services list');
      }
    };
    fetchServices();
  }, []);

  const allDesignServices = services;

  return (
    <section className="py-16 md:py-28 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200/60" id="design-section">
      
      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#9E8148]/5 rounded-full blur-[120px] pointer-events-none" />

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
              Design & <span className="text-[#C6A15B]">Printing</span>
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
              Bring your ideas to life with professional design and high-quality printing solutions for businesses and events.
            </p>
            <Link to="/services/design" className="inline-block mb-2">
              <button className="py-2.5 px-5 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-[#C6A15B]/20 flex items-center gap-2">
                VIEW ALL SERVICES <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="text-[9px] font-extrabold tracking-[0.2em] text-slate-400 uppercase pt-2 border-t border-slate-200/80">
            IDEAS • DESIGN • PRINT • DELIVER
          </div>

          {/* Vertical Stacked Rectangular Cards List */}
          <div className="space-y-3 pt-2">
            {allDesignServices.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id || i}
                  onClick={() => setSelectedServiceModal(card)}
                  className="group relative block w-full h-[105px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  {/* Background Image */}
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = designFallbackImages[card.slug] || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800';
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />

                  {/* Card Inner Content */}
                  <div className="relative z-10 h-full px-4 py-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 flex items-center justify-center text-[#C6A15B] shadow-sm shrink-0">
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
          
          {/* LEFT SIDE: Editorial Introduction Block */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start">
            
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
                Design & <br />
                <span className="text-[#C6A15B]">Printing</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-sm font-normal">
                Bring your ideas to life with professional design and high-quality printing solutions for businesses and events.
              </p>

              <Link to="/services/design" className="inline-block mb-8">
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
              IDEAS • DESIGN • PRINT • DELIVER
            </motion.div>

          </div>

          {/* RIGHT SIDE: Photographic Service Cards Grid */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {allDesignServices.map((card, i) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={card.id || card._id || i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="w-full"
                  >
                    <Link 
                      to={card.link}
                      className="group relative block h-[210px] sm:h-[220px] rounded-[22px] overflow-hidden border border-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                    >
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = designFallbackImages[card.slug] || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800';
                        }}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 group-hover:from-slate-950/95 transition-opacity" />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white/80 flex items-center justify-center text-[#C6A15B] shadow-sm shrink-0">
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
                    Design & Printing
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
                    to={selectedServiceModal.link}
                    onClick={() => setSelectedServiceModal(null)}
                    className="w-full py-3 px-4 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-2"
                  >
                    View Full Details & Specs <ExternalLink size={14} />
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

export default DesignSection;
