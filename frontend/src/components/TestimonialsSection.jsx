import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api';

const defaultTestimonials = [
  {
    _id: 't1',
    initials: 'CL',
    name: 'Casper Leigh',
    role: 'Home Automation',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    rating: 5,
    text: 'Awesome services. I am really happy to be here because of their services. I will continue to use their services in the future.'
  },
  {
    _id: 't2',
    initials: 'CR',
    name: 'Cian Reyes',
    role: 'CCTV Installation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    rating: 5,
    text: 'By far the best thing about this is the efficient team they\'ve put together. Everyone is so knowledgeable and friendly.'
  },
  {
    _id: 't3',
    initials: 'JD',
    name: 'John Doe',
    role: 'Access Control',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    rating: 5,
    text: 'Just wow. I knew I was going to get a great service, but they went above and beyond my expectations.'
  },
  {
    _id: 't4',
    initials: 'AW',
    name: 'Asa Walter',
    role: 'Solar Systems',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    rating: 5,
    text: 'This is the best thing that happened to my small business. They re-organized and upgraded our security in no time.'
  },
  {
    _id: 't5',
    initials: 'RK',
    name: 'Rahul K.',
    role: 'Gate Automation',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200',
    rating: 5,
    text: 'Excellent service and professional installation. Highly recommended for any smart security requirements!'
  },
  {
    _id: 't6',
    initials: 'SM',
    name: 'Sophia M.',
    role: 'Networking & Wi-Fi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    rating: 5,
    text: 'Very reliable team and great after-sales support. Their Wi-Fi setup covers our entire property seamlessly.'
  }
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [scrollX, setScrollX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive card spacing: 245px on mobile, 300px on desktop
  const cardSpacing = isMobile ? 245 : 300; 
  const totalWidth = testimonials.length * cardSpacing;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/testimonials');
        const active = data.filter(t => t.isActive);
        if (active && active.length >= 1) {
          // If fewer than 6 items, repeat to maintain a smooth continuous edge-to-edge carousel loop
          let fullList = active;
          while (fullList.length < 6) {
            fullList = [...fullList, ...active];
          }
          const mapped = fullList.map((item, idx) => ({
            ...item,
            initials: item.name ? item.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'C',
            avatar: item.avatar || item.image || defaultTestimonials[idx % defaultTestimonials.length].avatar
          }));
          setTestimonials(mapped);
        }
      } catch (error) {
        console.log('Using default client testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  // Continuous non-stop fluid flowing animation loop (60FPS edge-to-edge)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // Smooth flowing speed
      const speed = isMobile ? 0.038 : 0.045;
      setScrollX(prev => (prev + delta * speed) % totalWidth);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [totalWidth, isMobile]);

  return (
    <section 
      className="py-10 sm:py-24 bg-[#F5F1E8] text-[#1B1D1A] relative overflow-hidden w-full" 
      id="testimonials"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-[#C6A15B]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-14 relative z-10 px-4">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-1.5 sm:mb-2">
            — TESTIMONIALS —
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1B1D1A] tracking-tight mb-2 sm:mb-3 font-[#Plus Jakarta Sans]">
            What our <span className="text-[#C6A15B]">Clients say!</span>
          </h2>
          <div className="w-12 sm:w-16 h-[2.5px] sm:h-[3px] bg-[#C6A15B] mx-auto rounded-full" />
        </div>

        {/* Continuous Full-Width Gliding Carousel (Edge-to-Edge) */}
        <div className="relative h-[330px] sm:h-[460px] flex items-center justify-center overflow-hidden w-full">
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((item, index) => {
              // Calculate continuous position relative to center (0)
              let relX = (index * cardSpacing - scrollX) % totalWidth;
              if (relX > totalWidth / 2) relX -= totalWidth;
              if (relX < -totalWidth / 2) relX += totalWidth;

              const distFromCenter = Math.abs(relX);
              const isVisible = distFromCenter < 1400;

              if (!isVisible) return null;

              // On mobile: center card is scale 1.0, side cards scale down to 0.88 (avoids expanding out of bounds)
              const scale = isMobile 
                ? Math.max(0.88, 1.0 - (distFromCenter / 500)) 
                : Math.max(0.85, 1.12 - (distFromCenter / 500));
              const opacity = Math.max(0.4, 1 - (distFromCenter / 850));
              const zIndex = Math.round(100 - distFromCenter);
              const isCenter = distFromCenter < 35;
              const translateY = isMobile ? 0 : (isCenter ? -12 : 4);

              return (
                <div
                  key={`${item._id || 't'}-${index}`}
                  style={{
                    transform: `translateX(${relX}px) scale(${scale}) translateY(${translateY}px)`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                  }}
                  className={`absolute w-[225px] sm:w-[275px] h-[285px] sm:h-[375px] rounded-2xl p-4 sm:p-7 flex flex-col justify-between items-center text-center select-none overflow-hidden ${
                    isCenter 
                      ? 'bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-amber-100/60 ring-1 ring-[#C6A15B]/20' 
                      : 'bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100'
                  }`}
                >
                  <div className="w-full flex flex-col items-center justify-between h-full">
                    {/* Top Profile Info */}
                    <div className="flex flex-col items-center w-full">
                      {/* User Avatar */}
                      <div className="relative mb-2 sm:mb-4 mx-auto">
                        {item.avatar || item.image ? (
                          <img 
                            src={item.avatar || item.image} 
                            alt={item.name} 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm sm:shadow-md border-2 border-[#C6A15B]/30 mx-auto"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#101312] border-2 border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] font-extrabold text-xs sm:text-sm shadow-sm sm:shadow-md mx-auto">
                            {item.initials}
                          </div>
                        )}
                      </div>

                      {/* Name & Role */}
                      <h4 className="text-xs sm:text-base font-bold text-[#1B1D1A] mb-0.5 tracking-tight truncate w-full px-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#77766F] font-medium mb-2 sm:mb-3 truncate w-full px-1">
                        {item.role || 'Verified Client'}
                      </p>

                      {/* Star Rating */}
                      <div className="flex justify-center gap-1 text-[#C6A15B] mb-2 sm:mb-3">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={isMobile ? 12 : 15} fill="#C6A15B" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="w-full flex-1 flex items-center justify-center px-1 overflow-hidden">
                      <p className="text-[11px] sm:text-[13px] text-[#2C2E2B]/90 leading-relaxed italic line-clamp-4 text-center">
                        “{item.text}”
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
