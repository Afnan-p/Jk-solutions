import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import DesignSection from '../components/DesignSection';
import ConsultationSection from '../components/ConsultationSection';

const ServicesPage = ({ division }) => {
  return (
    <>
      <Helmet>
        <title>Our Services | JK Security Solutions</title>
        <meta name="description" content="Explore our premium range of security and automation solutions including CCTV, Smart Homes, Gate Automation, and Solar Systems." />
      </Helmet>

      <Navbar />

      <main className="pt-32">
        <div className="container mx-auto px-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our <span className={division === 'design' ? 'text-purple-400' : 'text-accent'}>Services</span></h1>
            <p className="text-xl text-gray-400">
              {division === 'design' 
                ? 'Premium quality printing and creative design solutions for businesses that demand the best.'
                : 'Comprehensive, end-to-end technological solutions designed for modern luxury and uncompromising security.'}
            </p>
          </motion.div>
        </div>

        <div className="pb-24">
          {(!division || division === 'security') && <ServicesSection />}
          {(!division || division === 'design') && <DesignSection />}
        </div>
        
        <ConsultationSection />
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
