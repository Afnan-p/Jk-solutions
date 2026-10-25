import { motion } from 'framer-motion';
import { MessageSquareText, Search, FileText, Wrench, Headphones, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';

const steps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Understand your requirements and recommend the right solutions.',
    icon: MessageSquareText,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'
  },
  {
    step: '02',
    title: 'Site Inspection',
    description: 'Analyze your property and existing setup for the best possible solution.',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800'
  },
  {
    step: '03',
    title: 'Solution Design',
    description: 'Create a customized plan tailored to your space and needs.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800'
  },
  {
    step: '04',
    title: 'Installation',
    description: 'Professional and neat installation by our certified technicians.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800'
  },
  {
    step: '05',
    title: 'Support & Maintenance',
    description: 'Ongoing support and maintenance to keep you always protected.',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800'
  }
];

const cardEasing = [0.22, 1, 0.36, 1];

const HowItWorks = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const stepRatio = scrollLeft / maxScroll;
        const index = Math.min(
          steps.length - 1,
          Math.max(0, Math.round(stepRatio * (steps.length - 1)))
        );
        setActiveIndex(index);
      }
    }
  };

  const scrollToStep = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index];
      if (card) {
        scrollRef.current.scrollTo({
          left: card.offsetLeft - 24,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-24 bg-white text-[#1B1D1A] relative border-t border-[#C6A15B]/20 overflow-hidden" id="how-it-works">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C6A15B]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Grid with Left & Right Typographic accents matching Image 1 */}
        <div className="grid lg:grid-cols-12 gap-6 items-center mb-16">
          
          {/* Left Side Accent Text */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#77766F]/80 leading-relaxed">
              <div>FROM</div>
              <div>CONSULTATION</div>
              <div>TO CONTINUED SUPPORT</div>
              <div className="w-10 h-[1.5px] bg-[#C6A15B] mt-2" />
            </div>
          </div>

          {/* Center Main Header */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cardEasing }}
            className="lg:col-span-6 text-center"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-2">
              — OUR PROCESS —
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1B1D1A] tracking-tight mb-4 font-[#Plus Jakarta Sans]">
              How We <span className="text-[#C6A15B]">Secure</span> Your Space
            </h2>

            <p className="text-[#77766F] text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              A transparent 5-step engineering process to deliver complete protection for your home or business.
            </p>
          </motion.div>

          {/* Right Side Accent Text */}
          <div className="hidden lg:flex lg:col-span-3 justify-end">
            <div className="border-l-2 border-[#C6A15B] pl-3.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#77766F]/80 space-y-1">
              <div>PEOPLE</div>
              <div>SPACES</div>
              <div>TECHNOLOGY</div>
              <div className="text-[#9E8148]">SAFER TOMORROWS</div>
            </div>
          </div>

        </div>

        {/* 5-Step Process Grid */}
        <div className="relative">
          
          {/* Connecting Horizontal Gold Line with Dots across columns */}
          <div className="hidden lg:block absolute top-[48%] left-8 right-8 h-[1px] bg-[#C6A15B]/35 z-0">
            <div className="flex justify-between items-center w-full h-full px-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#C6A15B] shadow-[0_0_8px_rgba(198,161,91,0.6)]" />
              ))}
            </div>
          </div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3.5 -mx-6 px-6 pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5 md:overflow-visible md:m-0 md:p-0 relative z-10"
          >
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: cardEasing }}
                  className="snap-start w-[220px] sm:w-[250px] md:w-auto min-w-[210px] md:min-w-0 flex-shrink-0 md:flex-shrink-1 glass-panel-light rounded-2xl p-3.5 flex flex-col justify-between border border-[#C6A15B]/25 hover:border-[#C6A15B] shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top Step Number Header */}
                    <div className="px-1 pt-0.5 pb-2 flex items-center justify-between">
                      <div className="text-lg font-extrabold text-[#1B1D1A] tracking-tight font-heading">
                        {item.step}
                        <div className="w-4 h-[2px] bg-[#C6A15B] mt-0.5" />
                      </div>
                    </div>

                    {/* Image with Diagonal Cutout */}
                    <div className="relative w-full h-28 sm:h-36 mb-3 rounded-xl overflow-hidden shadow-inner">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                        style={{
                          clipPath: 'polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 24%)'
                        }}
                      />

                      {/* Overlapping Dark Circular Icon Badge */}
                      <div className="absolute bottom-1.5 left-1.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#101312] border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C6A15B] group-hover:text-[#101312] transition-all">
                        <IconComponent size={14} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-0.5 mb-3">
                      <h3 className="text-sm font-bold text-[#1B1D1A] mb-1 tracking-tight group-hover:text-[#C6A15B] transition-colors font-heading truncate">
                        {item.title}
                      </h3>

                      <p className="text-[11px] text-[#77766F] leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-[#C6A15B]/15 flex items-center justify-between px-0.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#77766F] group-hover:text-[#C6A15B] transition-colors">
                      Learn More
                    </span>
                    
                    <div className="flex-1 h-[1px] bg-[#C6A15B]/20 mx-2" />

                    <div className="w-6 h-6 rounded-full bg-[#EAE4D7] border border-[#C6A15B]/30 text-[#1B1D1A] flex items-center justify-center group-hover:bg-[#C6A15B] group-hover:text-[#101312] transition-colors shadow-xs">
                      <ArrowRight size={11} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile View Scrolling Indicator */}
          <div className="flex md:hidden flex-col items-center justify-center gap-2 mt-5 relative z-10">
            {/* Animated Swipe Badge */}
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#9E8148] bg-[#C6A15B]/10 px-3.5 py-1 rounded-full border border-[#C6A15B]/25">
              <motion.span
                animate={{ x: [-3, 1, -3] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="text-xs text-[#C6A15B]"
              >
                ‹
              </motion.span>
              <span>Swipe to view steps</span>
              <motion.span
                animate={{ x: [3, -1, 3] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="text-xs text-[#C6A15B]"
              >
                ›
              </motion.span>
            </div>

            {/* Step Indicator Dots */}
            <div className="flex items-center gap-2 mt-0.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to step ${idx + 1}`}
                  onClick={() => scrollToStep(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'w-6 bg-[#C6A15B] shadow-[0_0_8px_rgba(198,161,91,0.6)]' 
                      : 'w-1.5 bg-[#C6A15B]/30 hover:bg-[#C6A15B]/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Footer Tagline */}
        <div className="mt-16 flex items-center justify-center gap-4 text-center">
          <div className="w-16 sm:w-24 h-[1px] bg-[#C6A15B]/40" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#9E8148]">
            A SAFER TOMORROW TOGETHER
          </span>
          <div className="w-16 sm:w-24 h-[1px] bg-[#C6A15B]/40" />
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
