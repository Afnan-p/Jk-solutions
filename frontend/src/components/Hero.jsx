import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, PhoneCall, Palette } from 'lucide-react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Button from './Button';

const slides = [
  {
    id: 1,
    // Replace with your PNG file in the public/assets/ folder
    image: '/home automation.png', 
    label: 'SMART HOME AUTOMATION',
    heading1: 'SECURE YOUR HOME.',
    heading2: 'POWER YOUR FUTURE.',
    description: 'Experience intelligent home automation with advanced security systems, smart locks, and seamless mobile control designed for modern living.',
    features: ['Smart Lighting', 'Smart Security', 'Smart Climate', 'Remote Control'],
    primaryAction: 'Book Free Site Visit',
    secondaryAction: 'Explore Solutions',
    secondaryIcon: ShieldCheck
  },
  {
    id: 2,
    // Replace with your PNG file in the public/assets/ folder
    image: '/cctv.png', 
    label: 'CCTV SURVEILLANCE',
    heading1: '24/7 INTELLIGENT',
    heading2: 'PROTECTION.',
    description: 'Protect your home and business with AI-powered CCTV surveillance, remote monitoring, and real-time security alerts.',
    features: ['HD Video Quality', 'AI Motion Detection', 'Night Vision', 'Remote Access'],
    primaryAction: 'Book Free Consultation',
    secondaryAction: 'View CCTV Solutions',
    secondaryIcon: ShieldCheck
  },
  {
    id: 3,
    // Replace with your PNG file in the public/assets/ folder
    image: '/gate.png', 
    label: 'GATE AUTOMATION',
    heading1: 'OPEN GATES',
    heading2: 'WITH ONE TOUCH.',
    description: 'Upgrade your entrance with intelligent gate automation for enhanced security, convenience, and modern living.',
    features: ['Remote Control', 'Auto Close', 'High Security', 'Durable Motors'],
    primaryAction: 'Book Site Visit',
    secondaryAction: 'Explore Automation',
    secondaryIcon: ShieldCheck
  },
  {
    id: 4,
    // Replace with your PNG file in the public/assets/ folder
    image: '/solar.png', 
    label: 'SOLAR ENERGY',
    heading1: 'POWER YOUR',
    heading2: 'TOMORROW.',
    description: 'Reduce electricity costs with high-performance solar systems designed for homes, businesses, and industrial projects.',
    features: ['High Efficiency', 'Eco Friendly', 'Long Life', 'Maximum Savings'],
    primaryAction: 'Get Free Quote',
    secondaryAction: 'Explore Solar',
    secondaryIcon: ShieldCheck
  },
  {
    id: 5,
    image: '/design_printing.png', 
    label: 'CREATIVE DESIGN & PRINTING',
    heading1: 'BRING YOUR',
    heading2: 'BRAND TO LIFE.',
    description: 'Transform your ideas into impactful branding with premium graphic design, commercial printing, customized gifts, trophies, ID cards, flex banners, corporate stationery, and complete business branding solutions. From concept to delivery — everything under one roof.',
    features: ['Graphic Design', 'Premium Printing', 'Trophy & Awards', 'Customized Gifts'],
    primaryAction: 'Get Free Design Consultation',
    secondaryAction: 'Explore Design Services',
    secondaryIcon: Palette
  }
];

const stats = [
  { value: '1500+', label: 'Projects Completed' },
  { value: '10+', label: 'Years Experience' },
  { value: '24/7', label: 'Customer Support' },
  { value: '100%', label: 'Customer Satisfaction' }
];

const Hero = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#050505]">
      
      {/* Main Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        observer={true}
        observeParents={true}
        speed={1000}
        rewind={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active',
        }}
        className="w-full h-full absolute inset-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={slide.image} 
                alt={slide.label}
                loading="lazy"
                className="w-full h-full object-cover scale-105 swiper-zoom-target"
                style={{ transformOrigin: 'center center' }}
              />
              {/* 50% Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center pt-32 pb-16 md:pt-40 md:pb-24">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-[700px]">
                  
                  {/* Label */}
                  <div 
                    className="slide-element inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-white text-xs font-bold tracking-widest uppercase">
                      {slide.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="slide-element text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.05] tracking-tighter mb-4">
                    {slide.heading1} <br />
                    <span className="text-accent">{slide.heading2}</span>
                  </h1>

                  {/* Description */}
                  <p className="slide-element text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* Features Grid */}
                  <div className="slide-element grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-5 mb-10 max-w-lg">
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 font-medium">
                        <CheckCircle2 size={18} className="text-accent" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Division Buttons */}
                  <div className="slide-element flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4">
                    <Button onClick={() => window.location.href = '/services/security'} className="w-full sm:w-auto font-semibold text-base py-3 sm:py-4 px-6 sm:px-8 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                      <ShieldCheck size={20} className="mr-2 inline" /> Security Solutions
                    </Button>
                    <Button onClick={() => {
                        document.getElementById('design-section')?.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      variant="secondary" 
                      className="w-full sm:w-auto font-semibold text-base py-3 sm:py-4 px-6 sm:px-8 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
                    >
                      <Palette size={20} className="mr-2 inline text-purple-400" /> Design & Printing
                    </Button>
                  </div>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <HeroControls />
      </Swiper>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center md:hidden"
      >
        <span className="text-xs text-white/50 tracking-widest uppercase mb-2">Scroll</span>
        <ChevronDown size={24} className="text-white/50" />
      </motion.div>

      {/* CSS for custom Swiper active states and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-slide-active .slide-element {
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        .swiper-slide-active .slide-element:nth-child(1) { animation-delay: 0.2s; }
        .swiper-slide-active .slide-element:nth-child(2) { animation-delay: 0.4s; }
        .swiper-slide-active .slide-element:nth-child(3) { animation-delay: 0.6s; }
        .swiper-slide-active .slide-element:nth-child(4) { animation-delay: 0.8s; }
        .swiper-slide-active .slide-element:nth-child(5) { animation-delay: 1.0s; }
        
        .swiper-slide-active img.swiper-zoom-target {
          animation: slowZoom 10s ease-out forwards;
        }

        @keyframes slideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        .hero-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0 4px !important;
        }
        .hero-bullet:hover {
          background: rgba(255, 255, 255, 0.6);
        }
        .hero-bullet-active {
          width: 32px;
          border-radius: 4px;
          background: #FDB515;
          box-shadow: 0 0 10px rgba(253, 181, 21, 0.4);
        }
      `}} />
    </div>
  );
};

const HeroControls = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute z-20 bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
      <div className="bg-[#101010]/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 md:px-6 md:py-3 flex items-center gap-4 md:gap-6 shadow-2xl pointer-events-auto">
        <button 
          onClick={() => swiper.slidePrev()}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="hero-pagination flex items-center gap-2" />
        <button 
          onClick={() => swiper.slideNext()}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
