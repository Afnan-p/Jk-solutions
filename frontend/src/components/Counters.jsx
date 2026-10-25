import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Award, ThumbsUp, Headset } from 'lucide-react';

const stats = [
  { label: 'PROJECTS COMPLETED', value: 1500, suffix: '+', icon: Shield, isStatic: false },
  { label: 'YEARS OF EXPERIENCE', value: 10, suffix: '+', icon: Award, isStatic: false },
  { label: 'CLIENT SATISFACTION', value: 98, suffix: '%', icon: ThumbsUp, isStatic: false },
  { label: 'SUPPORT', value: 24, suffix: '/7', icon: Headset, isStatic: true, staticText: '24/7' },
];

const CounterItem = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const IconComponent = stat.icon;

  useEffect(() => {
    if (!isInView || stat.isStatic) return;

    let startTime = null;
    const duration = 2200; // 2.2s smooth deceleration animation

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutExpo for realistic rolling deceleration
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easedProgress * stat.value);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setCount(stat.value);
      }
    };

    const animFrame = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, stat]);

  return (
    <div ref={ref} className="text-center px-2 py-4 sm:px-4 sm:py-6 flex flex-col items-center justify-center group">
      {/* Icon Badge */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full sm:rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-3 sm:mb-4 shadow-sm group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/20 transition-all duration-300"
      >
        <IconComponent size={16} className="sm:w-5 sm:h-5 stroke-[1.75]" />
      </motion.div>

      {/* Animated Rolling Number */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FAF9F5] tracking-tight mb-1 sm:mb-2 font-[#Plus Jakarta Sans]">
        {stat.isStatic ? (
          <span className="inline-flex items-center">
            24<span className="text-[#C6A15B]">/7</span>
          </span>
        ) : (
          <>
            <span>{count.toLocaleString()}</span>
            <span className="text-[#C6A15B] ml-0.5">{stat.suffix}</span>
          </>
        )}
      </div>
      
      {/* Uppercase Label */}
      <div className="text-[#EDE8DC]/70 font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[9px] sm:text-[11px] group-hover:text-[#FAF9F5] transition-colors max-w-[120px] sm:max-w-none">
        {stat.label}
      </div>
    </div>
  );
};

const Counters = () => {
  return (
    <section className="py-14 sm:py-18 md:py-22 bg-[#121514] text-[#FAF9F5] relative overflow-hidden border-y border-[#C6A15B]/20">
      
      {/* Soft Matte Dark Shade Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0e] via-[#151917] to-[#0d0f0e] pointer-events-none" />

      {/* Ultra Subtle Ambient Matte Shading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-[#C6A15B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Service-focused Tagline Quote */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 text-center">
          <p className="text-slate-300/90 text-xs sm:text-sm md:text-base font-medium italic tracking-wide max-w-2xl px-2">
            “Empowering homes and businesses with intelligent security solutions and world-class creative design & printing services.”
          </p>
        </div>

        {/* Statistics Grid (No partitions) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <CounterItem stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
