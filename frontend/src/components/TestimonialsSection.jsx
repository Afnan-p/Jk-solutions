import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useState, useEffect } from 'react';
import api from '../api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/testimonials');
        setTestimonials(data.filter(t => t.isActive));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null;
  if (testimonials.length === 0) return null;
  return (
    <section className="py-24 bg-[#101010] relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Client <span className="text-accent">Testimonials</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Don't just take our word for it. Hear what our satisfied clients have to say about our premium installations.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-gradient-to-br from-[#121212] to-[#080808] border border-white/5 hover:border-accent/20 p-8 rounded-3xl h-[300px] flex flex-col relative mt-8 transition-colors duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,1)]">
                  <div className="absolute -top-6 right-8 text-accent/10 transition-colors duration-500 group-hover:text-accent/20">
                    <Quote size={60} />
                  </div>
                  
                  <div className="flex gap-1 text-accent mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-gray-400 mb-8 flex-grow leading-relaxed relative z-10 line-clamp-4 text-sm italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image || `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`} 
                      alt={testimonial.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                    />
                    <div>
                      <h4 className="text-white font-bold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
