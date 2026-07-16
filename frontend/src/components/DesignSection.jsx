import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';
import api from '../api';

const getPremiumImage = (service) => {
  if (service.image && service.image.trim() !== '') return service.image;
  const title = service.title.toLowerCase();
  if (title.includes('id card')) return 'https://images.unsplash.com/photo-1589330694653-061036324838?q=80&w=800';
  if (title.includes('trophy') || title.includes('memento')) return 'https://images.unsplash.com/photo-1563244096-7c98c199dc65?q=80&w=800';
  if (title.includes('gift')) return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800';
  if (title.includes('flex') || title.includes('banner')) return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800';
  if (title.includes('print')) return 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800';
  return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800';
};

const DesignSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.filter(s => s.division === 'Design & Printing' && s.isActive !== false));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden" id="design-section">
      {/* Decorative background glow (Purple for design) */}
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6"
          >
            <Palette size={32} className="text-purple-400" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Design & Printing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Transforming your ideas into stunning visual realities. Premium quality printing and creative design solutions for businesses that demand the best.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
                <Link to={`/services/design/${service.slug}`} className="block group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-purple-500/20 hover:border-purple-500 transition-colors duration-500">
                  {/* Background Image using img tag for lazy loading performance */}
                  <img 
                    src={getPremiumImage(service)}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle Purple Glow on Hover */}
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content (Centered at Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-center flex flex-col items-center justify-end h-full translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">{service.title}</h3>
                    
                    <p className="text-sm text-gray-300 line-clamp-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 px-2">
                      {service.description || "Premium creative design solutions."}
                    </p>
                    
                    {/* Animated Underline / Button indicator */}
                    <div className="flex items-center gap-2 text-purple-400 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span>Explore Details</span>
                      <div className="w-6 h-[2px] bg-purple-400 group-hover:w-10 transition-all duration-300" />
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
      </div>
    </section>
  );
};

export default DesignSection;
