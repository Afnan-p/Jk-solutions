import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | JK Security Solutions</title>
        <meta name="description" content="Learn about our journey, mission, and the premium technology we use to secure luxury homes and enterprises in Kerala." />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Engineering <span className="text-accent">Excellence</span></h1>
            <p className="text-xl text-gray-400">
              For over a decade, JK Security Solutions has been at the forefront of the technological revolution in Kerala, bringing intelligent automation and premium security to luxury residences and corporate enterprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Our Office" 
                loading="lazy"
                decoding="async"
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full h-[500px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-accent mb-3">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To provide unparalleled peace of mind through seamlessly integrated, cutting-edge technology. We believe that security and automation should be invisible, intuitive, and infinitely reliable.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent mb-3">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To be the gold standard for smart living and enterprise security in South India, constantly pushing the boundaries of what's possible in modern architecture integration.
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
