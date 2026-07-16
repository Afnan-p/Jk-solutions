import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import api from '../api';

const ContactPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Fallback defaults if API fails or is empty
  const s = settings || {
    phoneMain: '+91 98765 43210',
    emailSales: 'sales@jksecurity.com',
    address: '123 Corporate Tower, MG Road, Ernakulam, Kerala, India - 682001',
    businessHoursWeekdays: '9:00 AM - 6:00 PM',
    businessHoursSaturday: '10:00 AM - 4:00 PM',
    googleMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3929.35105658632!2d76.3142718747926!3d9.987823573254924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d50756778f7%3A0xc66c1b359f138bf5!2sMG%20Road%2C%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    founderName: 'Jaseel Kumar',
    founderRole: 'Chief Designer & Founder',
    founderImage: 'https://pngimg.com/uploads/businessman/businessman_PNG6566.png'
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | JK Security Solutions</title>
        <meta name="description" content="Get in touch with JK Security Solutions for premium security, automation, and solar inquiries." />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-6">
          
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">Let's build <span className="text-accent italic">together.</span></h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Whether you need a premium security overhaul or a complete design consultation, we are ready to bring your vision to life.
              </p>
            </motion.div>

            {!loading && (
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column - Founder Profile & Direct Contact */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5 flex flex-col h-full"
                >
                  {/* Founder Profile - Premium Portrait (No Background) */}
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-t from-accent/20 to-transparent border border-white/5 mb-8 group">
                    <img 
                      src={s.founderImage || 'https://pngimg.com/uploads/businessman/businessman_PNG6566.png'} 
                      alt={s.founderName} 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    
                    {/* Name Tag Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                      <h3 className="text-2xl font-bold text-white mb-1">{s.founderName}</h3>
                      <p className="text-accent font-medium tracking-wider text-sm uppercase">{s.founderRole}</p>
                    </div>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="flex flex-col gap-4">
                    <a href={`tel:${s.phoneMain}`} className="flex items-center justify-between p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-accent/30 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Direct Line</p>
                          <p className="text-white font-medium text-lg">{s.phoneMain}</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-600 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                    </a>

                    <a href={`mailto:${s.emailSales}`} className="flex items-center justify-between p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-accent/30 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email Inquiry</p>
                          <p className="text-white font-medium text-lg">{s.emailSales}</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-600 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                    </a>
                  </div>
                </motion.div>

                {/* Right Column - Map & Location Details */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-7 flex flex-col h-full"
                >
                  <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-2 h-full flex flex-col">
                    
                    {/* Google Map */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
                      <iframe 
                        src={s.googleMapUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    {/* Location Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 flex-grow">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="text-accent" size={24} />
                          <h3 className="text-2xl font-bold text-white">Headquarters</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-lg mb-6 whitespace-pre-line">
                          {s.address}
                        </p>
                        
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-accent font-medium hover:text-white transition-colors">
                          Get Directions <ArrowRight size={16} />
                        </a>
                      </div>
                      
                      <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="text-accent" size={24} />
                          <h3 className="text-2xl font-bold text-white">Business Hours</h3>
                        </div>
                        <ul className="space-y-3 text-gray-400 text-lg">
                          <li className="flex justify-between">
                            <span>Mon - Fri</span>
                            <span className="text-white">{s.businessHoursWeekdays}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Saturday</span>
                            <span className="text-white">{s.businessHoursSaturday}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Sunday</span>
                            <span className="text-accent">Closed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </motion.div>

              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
