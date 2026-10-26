import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Award, ThumbsUp, Headset } from 'lucide-react';
import api from '../api';

const DEFAULT_QUOTE = '“Empowering homes and businesses with intelligent security solutions and world-class creative design & printing services.”';

const DEFAULT_STATS = [
  { label: 'PROJECTS COMPLETED', value: 1500, suffix: '+', icon: Shield, isStatic: false },
  { label: 'YEARS OF EXPERIENCE', value: 10, suffix: '+', icon: Award, isStatic: false },
  { label: 'CLIENT SATISFACTION', value: 98, suffix: '%', icon: ThumbsUp, isStatic: false },
  { label: 'SUPPORT', value: 24, suffix: '/7', icon: Headset, isStatic: true, staticText: '24/7' },
];

const CounterItem = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const IconComponent = stat.icon;

  useEffect(() => {
    if (!isInView || stat.isStatic) return;

    let startTime = null;
    const duration = 2000; // 2s smooth deceleration

    const targetVal = Number(stat.value) || 0;

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easedProgress * targetVal);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setCount(targetVal);
      }
    };

    const animFrame = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, stat]);

  return (
    <div ref={ref} className="text-center px-2 py-1.5 sm:px-4 sm:py-2 flex flex-col items-center justify-center group">
      {/* Icon Badge */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full sm:rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-2 sm:mb-2.5 shadow-sm group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/20 transition-all duration-300"
      >
        <IconComponent size={15} className="sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
      </motion.div>

      {/* Animated Rolling Number */}
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#FAF9F5] tracking-tight mb-1 font-[#Plus Jakarta Sans] leading-tight">
        {stat.isStatic ? (
          <span className="inline-flex items-center">
            {stat.staticText || stat.value}<span className="text-[#C6A15B]">{stat.suffix}</span>
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
  const [quote, setQuote] = useState(DEFAULT_QUOTE);
  const [statsData, setStatsData] = useState(DEFAULT_STATS);

  useEffect(() => {
    let isMounted = true;
    api.get('/settings')
      .then(({ data }) => {
        if (!isMounted || !data) return;

        if (data.statsQuote) {
          setQuote(data.statsQuote);
        }

        const isStat4Static = isNaN(Number(data.stat4Value)) || data.stat4Suffix === '/7' || data.stat4Value === '24/7' || data.stat4Value === '24';

        setStatsData([
          {
            label: data.stat1Label || 'PROJECTS COMPLETED',
            value: Number(data.stat1Value) || 1500,
            suffix: data.stat1Suffix !== undefined ? data.stat1Suffix : '+',
            icon: Shield,
            isStatic: isNaN(Number(data.stat1Value))
          },
          {
            label: data.stat2Label || 'YEARS OF EXPERIENCE',
            value: Number(data.stat2Value) || 10,
            suffix: data.stat2Suffix !== undefined ? data.stat2Suffix : '+',
            icon: Award,
            isStatic: isNaN(Number(data.stat2Value))
          },
          {
            label: data.stat3Label || 'CLIENT SATISFACTION',
            value: Number(data.stat3Value) || 98,
            suffix: data.stat3Suffix !== undefined ? data.stat3Suffix : '%',
            icon: ThumbsUp,
            isStatic: isNaN(Number(data.stat3Value))
          },
          {
            label: data.stat4Label || 'SUPPORT',
            value: data.stat4Value || '24',
            suffix: data.stat4Suffix !== undefined ? data.stat4Suffix : '/7',
            icon: Headset,
            isStatic: isStat4Static,
            staticText: data.stat4Value === '24/7' ? '24/7' : (data.stat4Value || '24')
          },
        ]);
      })
      .catch((err) => {
        // Fallback gracefully to default stats
        console.error('Error fetching settings for counters:', err);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-7 sm:py-9 md:py-10 bg-[#121514] text-[#FAF9F5] relative overflow-hidden border-y border-[#C6A15B]/20">
      
      {/* Soft Matte Dark Shade Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0e] via-[#151917] to-[#0d0f0e] pointer-events-none" />

      {/* Ultra Subtle Ambient Matte Shading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[160px] bg-[#C6A15B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Service-focused Tagline Quote */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 text-center">
          <p className="text-slate-300/90 text-xs sm:text-sm font-medium italic tracking-wide max-w-2xl px-2">
            {quote}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
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
