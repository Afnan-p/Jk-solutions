import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const getPremiumImage = (service) => {
  if (service.image && service.image.trim() !== '') return service.image;
  // Premium fallback images based on title keywords
  const title = service.title.toLowerCase();
  if (title.includes('cctv') || title.includes('camera')) return 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800';
  if (title.includes('home') || title.includes('automation')) return 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800';
  if (title.includes('gate')) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800';
  if (title.includes('solar')) return 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800';
  if (title.includes('lock')) return 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800'; // Generic smart home
  if (title.includes('wifi') || title.includes('network')) return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800';
  return 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800'; // Luxury modern home
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.filter(s => s.division === 'Security Solutions' && s.isActive !== false));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden" id="services">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Security Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Engineering excellence combined with luxury aesthetics to create the ultimate smart living experience.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, visibleCount).map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/services/security/${service.slug}`} className="block group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-accent/20 hover:border-accent transition-colors duration-500">
                  {/* Background Image using img tag for lazy loading performance */}
                  <img 
                    src={getPremiumImage(service)} 
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content (Centered at Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-center flex flex-col items-center justify-end h-full translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">{service.title}</h3>
                    
                    <p className="text-sm text-gray-300 line-clamp-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 px-2">
                      {service.description || "Premium smart solutions for modern living."}
                    </p>
                    
                    {/* Animated Underline / Button indicator */}
                    <div className="flex items-center gap-2 text-accent font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span>Explore Details</span>
                      <div className="w-6 h-[2px] bg-accent group-hover:w-10 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {visibleCount < services.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 py-3 rounded-full transition-all duration-300"
            >
              Load More Services
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link to="/projects/security" className="inline-flex items-center gap-2 text-white hover:text-accent font-bold tracking-wider uppercase text-sm transition-colors">
            View Related Projects 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
