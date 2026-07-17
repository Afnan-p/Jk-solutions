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

      <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-gray-300 uppercase mb-6">
              <Sparkles size={14} className="text-accent" />
              Who We Are
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Technology & Design <span className="text-accent">Excellence</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              For over a decade, JK Solutions has been at the forefront of innovation in Kerala. We bring intelligent automation, premium security, and world-class design & printing services to luxury residences and corporate enterprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-2xl blur-xl -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Our Office" 
                loading="lazy"
                decoding="async"
                className="rounded-2xl border border-white/10 w-full h-[550px] object-cover shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-500 group">
                <div className="bg-accent/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={24} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To provide unparalleled peace of mind and brand value through seamlessly integrated, cutting-edge technology. We believe that security and design should be intuitive, aesthetic, and infinitely reliable.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-500 group">
                <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lightbulb size={24} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
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
