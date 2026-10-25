import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | JK Solutions</title>
        <meta name="description" content="Learn about our journey, mission, and the premium technology we use to secure luxury homes and enterprises in Kerala." />
      </Helmet>

      <Navbar />

      <main className="bg-[#FAF8F5] min-h-screen relative overflow-hidden">
        {/* Hero Cover Picture Section */}
        <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 bg-[#FAF8F5] overflow-hidden border-b border-[#C6A15B]/20 mb-16 sm:mb-24">
          
          {/* Cover Image Background with Subtle Shadow Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920" 
              alt="About Us Cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920';
              }}
              className="w-full h-full object-cover object-center scale-105 filter brightness-95 contrast-105 transform hover:scale-100 transition-transform duration-1000 opacity-90" 
            />
            {/* Subtle Top & Bottom Gradient Shadows */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FAF8F5]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C6A15B]/20 rounded-full blur-[160px] pointer-events-none" />
          </div>

          <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            
            {/* Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[#C6A15B] font-extrabold tracking-[0.25em] text-[10px] sm:text-xs uppercase bg-black/40 px-4 py-1.5 rounded-full border border-[#C6A15B]/50 backdrop-blur-md mb-6 shadow-md"
            >
              <Sparkles size={14} className="text-[#C6A15B] animate-pulse" />
              — WHO WE ARE —
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-white tracking-tight font-[#Plus Jakarta Sans] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            >
              Technology & Design <span className="text-[#C6A15B] drop-shadow-[0_0_20px_rgba(198,161,91,0.5)]">Excellence</span>
            </motion.h1>

            {/* Subtitle Card */}
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-[#111111] max-w-3xl mx-auto leading-relaxed font-semibold bg-white/95 p-5 sm:p-6 rounded-2xl border border-slate-200/80 backdrop-blur-md shadow-xl"
            >
              For over a decade, JK Solutions has been at the forefront of innovation in Kerala. We bring intelligent automation, premium security, and world-class design & printing services to luxury residences and corporate enterprises.
            </motion.p>

          </div>
        </section>

        <div className="container mx-auto px-6 pb-24">

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C6A15B]/20 to-transparent rounded-2xl blur-xl -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Our Office" 
                loading="lazy"
                decoding="async"
                className="rounded-2xl border border-slate-200/80 w-full h-[550px] object-cover shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-200/80 p-8 rounded-2xl hover:border-[#C6A15B] transition-colors duration-500 shadow-sm group">
                <div className="bg-[#C6A15B]/15 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[#C6A15B]">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-3 font-[#Plus Jakarta Sans]">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  To provide unparalleled peace of mind and brand value through seamlessly integrated, cutting-edge technology. We believe that security and design should be intuitive, aesthetic, and infinitely reliable.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-8 rounded-2xl hover:border-[#C6A15B] transition-colors duration-500 shadow-sm group">
                <div className="bg-[#C6A15B]/15 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[#C6A15B]">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-3 font-[#Plus Jakarta Sans]">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  To be the gold standard for smart living and corporate branding in South India, constantly pushing the boundaries of what's possible in modern architecture and design.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
