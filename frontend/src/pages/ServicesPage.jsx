import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import DesignSection from '../components/DesignSection';

const ServicesPage = ({ division }) => {
  return (
    <>
      <Helmet>
        <title>Our Services | JK Security Solutions</title>
        <meta name="description" content="Explore our premium range of security and automation solutions including CCTV, Smart Homes, Gate Automation, and Solar Systems." />
      </Helmet>

      <Navbar />

      <main className="bg-[#FAF8F5]">
        {/* Hero Banner with High Quality Cover Image */}
        <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 bg-[#FAF8F5] overflow-hidden border-b border-[#C6A15B]/20">
          
          {/* Cover Image Background with Subtle Shadow Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={
                division === 'design'
                  ? 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1920'
                  : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920'
              } 
              alt="Our Services Cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1920';
              }}
              className="w-full h-full object-cover object-center scale-105 filter brightness-95 contrast-105 transform hover:scale-100 transition-transform duration-1000 opacity-90" 
            />
            {/* Subtle Top & Bottom Gradient Shadows */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FAF8F5]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C6A15B]/20 rounded-full blur-[160px] pointer-events-none" />
          </div>

          <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
            
            {/* Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[#C6A15B] font-extrabold tracking-[0.25em] text-[10px] sm:text-xs uppercase bg-black/40 px-4 py-1.5 rounded-full border border-[#C6A15B]/50 backdrop-blur-md mb-6 shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
              — JK SOLUTIONS SERVICES PORTFOLIO —
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-white tracking-tight font-[#Plus Jakarta Sans] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            >
              Our <span className="text-[#C6A15B] drop-shadow-[0_0_20px_rgba(198,161,91,0.5)]">Services</span>
            </motion.h1>

            {/* Subtitle Card */}
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-[#111111] max-w-3xl mx-auto leading-relaxed font-semibold bg-white/95 p-5 sm:p-6 rounded-2xl border border-slate-200/80 backdrop-blur-md shadow-xl"
            >
              {division === 'design' 
                ? 'Premium quality printing and creative design solutions for businesses that demand the best.'
                : 'Comprehensive, end-to-end technological solutions designed for modern luxury and uncompromising security.'}
            </motion.p>

          </div>
        </section>

        <div className="pb-24">
          {(!division || division === 'security') && <ServicesSection />}
          {(!division || division === 'design') && <DesignSection />}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
