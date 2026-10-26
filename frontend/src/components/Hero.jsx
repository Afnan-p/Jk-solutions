import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Video, Cpu, Smartphone, 
  PenTool, FileText, Trophy, Gift 
} from 'lucide-react';

const heroSlides = [
  {
    id: 'security',
    eyebrow: 'TRUSTED SECURITY PARTNER',
    titleLine1: '24/7 INTELLIGENT',
    titleLine2: 'PROTECTION.',
    description: 'Advanced security, smart automation and reliable solutions for homes, businesses and beyond. Experience uncompromised safety powered by AI.',
    ctaPrimary: 'Explore Security',
    ctaPrimaryLink: 'security-solutions',
    ctaSecondary: 'Watch Video',
    image: '/hero-light-bg.jpg',
    mobileImage: '/hero-light-bg.jpg',
    features: [
      { label: 'HD Video Quality', desc: '4K Ultra HD', icon: Video },
      { label: 'AI Motion Detection', desc: 'Smart recognition', icon: Cpu },
      { label: 'Remote Monitoring', desc: 'Live mobile app', icon: Smartphone },
      { label: '24/7 Support', desc: 'Active monitoring', icon: ShieldCheck }
    ]
  },
  {
    id: 'design',
    eyebrow: 'CREATIVE DESIGN & PRINTING',
    titleLine1: 'ELEVATE YOUR BRAND',
    titleLine2: 'IDENTITY.',
    description: 'World-class graphic design, luxury corporate printing, custom trophies, mementos, and premium corporate gifts tailored to impress.',
    ctaPrimary: 'Explore Design & Print',
    ctaPrimaryLink: 'design-section',
    ctaSecondary: 'Get Custom Quote',
    image: '/hero-design-bg.jpg',
    mobileImage: '/hero-design-bg.jpg',
    features: [
      { label: 'Graphic Design', desc: 'Brand identity', icon: PenTool },
      { label: 'Corporate Printing', desc: 'Luxury stationery', icon: FileText },
      { label: 'Trophies & Awards', desc: 'Laser engraved', icon: Trophy },
      { label: 'Custom Gifts', desc: 'Corporate gifting', icon: Gift }
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = heroSlides[currentSlide];

  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId) || document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = slide.id === 'design' ? '/services/design' : '/services/security';
    }
  };

  return (
    <section 
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="relative w-full min-h-[100dvh] lg:h-screen lg:min-h-[700px] bg-white lg:bg-gradient-to-br lg:from-white lg:via-[#F8F9FA] lg:to-[#F1F3F5] overflow-hidden flex flex-col justify-end lg:justify-center text-slate-900"
    >
      
      {/* Background Hero Image with Responsive Desktop & Mobile Framing */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`hero-bg-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-0 right-0 w-full lg:w-[58%] xl:w-[60%] h-[275px] sm:h-[340px] lg:h-full z-0 overflow-hidden pointer-events-none"
        >
          <img 
            src={slide.image} 
            alt={`JK Solutions ${slide.eyebrow}`} 
            className={`w-full h-full object-cover ${
              slide.id === 'security' 
                ? 'object-[68%_center] lg:object-[65%_center]' 
                : 'object-[82%_center] lg:object-center'
            }`}
          />

          {/* Mobile Gradients: Clean top vignette for navbar, smooth bottom fade into solid white */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white via-white/85 to-transparent lg:hidden" />

          {/* Desktop Gradient: Left-Edge Fade to blend seamlessly into left white area */}
          <div className="hidden lg:block absolute top-0 left-0 w-2/5 sm:w-1/3 h-full bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Background Tech Grid & Ambient Accents for Desktop (≥ lg) */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#C6A15B]/10 via-slate-100/50 to-transparent rounded-full blur-[140px]" />
        <div 
          className="absolute inset-y-0 left-0 w-1/2 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      {/* Main Slide Content Container */}
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10 flex-1 flex flex-col justify-end lg:justify-center pt-[215px] sm:pt-[275px] lg:pt-0 pb-20 sm:pb-24 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, Paragraph, Buttons & Feature Cards */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left max-w-2xl">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={`text-content-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className={`w-full ${slide.id === 'design' ? 'pt-3 sm:pt-6 lg:pt-11' : ''}`}
              >
                {/* Text Block */}
                <div className="relative z-10 mb-2 sm:mb-0">
                  
                  {/* Eyebrow Badge & Slide Indicator */}
                  <div className="flex items-center justify-between w-full max-w-md mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-[2px] bg-[#C6A15B]" />
                      <span className="text-[10px] sm:text-xs font-extrabold text-[#C6A15B] uppercase tracking-[0.2em] font-heading drop-shadow-xs flex items-center gap-1.5">
                        {slide.eyebrow}
                      </span>
                    </div>

                    {/* Elegant Slide Indicators (2 dots) */}
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {heroSlides.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentSlide === idx 
                              ? 'w-6 bg-[#C6A15B]' 
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Switch to ${s.eyebrow}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Editorial Main Headline */}
                  <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.1] mb-2 sm:mb-5 font-heading">
                    {slide.titleLine1} <br />
                    <span className="text-[#C6A15B]">{slide.titleLine2}</span>
                  </h1>

                  {/* Supporting Copy */}
                  <p className="text-slate-700 text-[11px] sm:text-base lg:text-lg leading-relaxed font-normal max-w-xl mb-3.5 sm:mb-6">
                    {slide.description}
                  </p>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center gap-2.5 sm:gap-4 mb-3.5 sm:mb-6 w-full">
                  <button 
                    onClick={() => scrollToTarget(slide.ctaPrimaryLink)} 
                    className="py-2.5 sm:py-3.5 px-5 sm:px-7 font-extrabold text-xs uppercase tracking-wider bg-[#C6A15B] hover:bg-[#B5904B] text-white rounded-full shadow-lg shadow-[#C6A15B]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {slide.ctaPrimary} <ArrowRight size={14} />
                  </button>
                </div>

                {/* Feature Cards: 2x2 Grid on Mobile, 4-in-a-row on Desktop (Zero Cut-Off) */}
                <div className="w-full max-w-2xl mb-1 sm:mb-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                    {slide.features.map((feat, idx) => {
                      const IconComponent = feat.icon;
                      return (
                        <div 
                          key={idx} 
                          className="w-full bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#C6A15B]/60 transition-all p-2 sm:p-2.5 px-2.5 sm:px-3 rounded-xl flex items-center gap-2 group"
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C6A15B]/10 border border-[#C6A15B]/25 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-all shrink-0">
                            <IconComponent size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-slate-900 font-bold text-[10.5px] sm:text-[11px] tracking-tight truncate leading-snug">
                              {feat.label}
                            </div>
                            <div className="text-slate-500 text-[9px] sm:text-[10px] font-medium leading-none mt-0.5 truncate">
                              {feat.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[360px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

