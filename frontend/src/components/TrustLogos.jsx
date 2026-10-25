import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const brands = [
  { name: 'dahua', sub: 'Technology' },
  { name: 'Hi-Focus', sub: 'Surveillance' },
  { name: 'tp-link', sub: 'Networking' },
  { name: 'ZKTECO', sub: 'Biometrics' },
  { name: 'AJAX', sub: 'Smart Alarm' },
  { name: 'EZVIZ', sub: 'Smart Security' },
  { name: 'HIKVISION', sub: 'Security Leader' }
];

// Duplicated array for seamless 100% continuous infinite loop
const doubleBrands = [...brands, ...brands];

const TrustLogos = () => {
  return (
    <section className="py-8 sm:py-10 bg-white text-[#1B1D1A] relative overflow-hidden border-y border-[#C6A15B]/20">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] bg-[#C6A15B]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Header & Marquee Ticker Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Header Tag */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148]">
              — TRUSTED TECHNOLOGY PARTNERS —
            </span>
          </div>

          {/* Infinite Auto-Scrolling Marquee Track */}
          <div className="flex-1 w-full overflow-hidden relative py-1">
            {/* Left & Right Soft Edge Gradient Fades */}
            <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex items-center gap-8 sm:gap-12 md:gap-14 whitespace-nowrap w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 22
              }}
            >
              {doubleBrands.map((brand, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center opacity-75 hover:opacity-100 transition-opacity cursor-pointer group shrink-0"
                >
                  <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-[#1B1D1A] group-hover:text-[#C6A15B] transition-colors font-heading">
                    {brand.name}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-[#77766F] mt-0.5">
                    {brand.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Glass Callout Badge */}
          <div className="flex-shrink-0 hidden xl:flex items-center gap-3 glass-panel-light px-4 py-2 rounded-xl shadow-sm">
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-[#1B1D1A]">Quality Brands</div>
              <div className="text-[10px] text-[#77766F]">Stronger Security</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#101312] text-[#C6A15B] flex items-center justify-center shadow-md">
              <Plus size={14} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustLogos;
