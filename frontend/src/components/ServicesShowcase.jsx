import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Cpu, Sun, Wifi } from 'lucide-react';
import Button from './Button';

const serviceTags = [
  { name: 'Security', icon: ShieldCheck },
  { name: 'Automation', icon: Cpu },
  { name: 'Solar', icon: Sun },
  { name: 'Networking', icon: Wifi }
];

const ServicesShowcase = () => {
  return (
    <section className="py-24 bg-[#101312] text-[#FAF9F5] relative overflow-hidden border-t border-[#C6A15B]/30" id="showcase">
      
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-[#C6A15B]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-2xl overflow-hidden glass-panel-dark border border-white/10 shadow-2xl aspect-[16/10]">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" 
                alt="Luxury Secured Property Integration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101312] via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Right Column Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="text-[#C6A15B] text-xs font-extrabold uppercase tracking-[0.25em] mb-3">
              INTEGRATED ENGINEERING
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAF9F5] tracking-tight leading-tight mb-6 font-[#Plus Jakarta Sans]">
              Complete Security. <br />
              <span className="text-[#C6A15B] drop-shadow-[0_0_20px_rgba(198,161,91,0.4)]">One Trusted Partner.</span>
            </h2>

            <p className="text-[#EDE8DC]/85 text-base leading-relaxed mb-8 font-normal">
              From residential to commercial, we deliver end-to-end solutions tailored to your needs. Protecting properties with smart technology and sustainable energy.
            </p>

            {/* Service Indicator Tags */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {serviceTags.map((tag, i) => {
                const IconComponent = tag.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/10 hover:border-[#C6A15B]/50 transition-colors backdrop-blur-md px-3.5 py-2.5 rounded-lg text-xs font-bold text-[#FAF9F5] shadow-sm">
                    <IconComponent size={15} className="text-[#C6A15B]" />
                    <span>{tag.name}</span>
                  </div>
                );
              })}
            </div>

            <Link to="/services">
              <Button variant="primary" className="py-3.5 px-7 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] inline-flex items-center gap-2 shadow-[0_0_20px_rgba(198,161,91,0.3)]">
                Explore Our Services <ArrowRight size={15} />
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
