import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import api from '../api';

const defaultProjects = [
  {
    _id: 'proj-1',
    title: 'Annual Sports Meet Trophies',
    slug: 'annual-sports-trophies',
    category: 'Sports & Events',
    location: 'Kochi, Kerala',
    description: 'Custom mementos for corporate events.',
    coverImage: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800'
  },
  {
    _id: 'proj-2',
    title: 'Corporate Rebranding ID Cards',
    slug: 'corporate-id-rebrand',
    category: 'Corporate Printing',
    location: 'Kochi, Kerala',
    description: 'Complete ID card solution for a company.',
    coverImage: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=800'
  },
  {
    _id: 'proj-3',
    title: 'Luxury Villa Security Integration',
    slug: 'luxury-villa-cctv',
    category: 'Security & Automation',
    location: 'Calicut, Kerala',
    description: 'CCTV, access control & automation.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'
  },
  {
    _id: 'proj-4',
    title: 'TechPark Smart Access',
    slug: 'techpark-smart-access',
    category: 'Access Control',
    location: 'Kochi, Kerala',
    description: 'Access control system installation.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'
  }
];

const cardEasing = [0.22, 1, 0.36, 1];

const ProjectsSection = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        const featured = data.filter(p => p.isFeatured);
        if (featured && featured.length > 0) {
          // Fix broken coverImage if present
          const sanitized = featured.map(p => {
            if (p.coverImage && p.coverImage.includes('1589828131333')) {
              return { ...p, coverImage: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800' };
            }
            return p;
          });
          setProjects(sanitized.slice(0, 4));
        }
      } catch (error) {
        console.log('Using default featured projects showcase');
      }
    };
    fetchFeaturedProjects();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const stepRatio = scrollLeft / maxScroll;
        const index = Math.min(
          projects.length - 1,
          Math.max(0, Math.round(stepRatio * (projects.length - 1)))
        );
        setActiveIndex(index);
      }
    }
  };

  const scrollToStep = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index];
      if (card) {
        scrollRef.current.scrollTo({
          left: card.offsetLeft - 24,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-24 bg-white text-[#1B1D1A] relative overflow-hidden" id="projects">
      
      {/* Background Glow */}
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#C6A15B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-2">
              — OUR WORK —
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1B1D1A] tracking-tight mb-2 font-[#Plus Jakarta Sans]">
              Featured <span className="text-[#C6A15B]">Projects</span>
            </h2>

            <p className="text-[#77766F] text-base">
              Real spaces. Real solutions.
            </p>
          </div>

          <div>
            <Button 
              onClick={() => navigate('/projects')} 
              variant="primary" 
              className="py-3 px-6 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] shadow-[0_4px_20px_rgba(198,161,91,0.25)]"
            >
              View All Projects <ArrowUpRight size={15} />
            </Button>
          </div>
        </div>

        {/* 4 Glass Visual Cards Grid (Touch Swipeable Carousel on Mobile) */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3.5 sm:gap-5 -mx-6 px-6 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 sm:overflow-visible sm:m-0 sm:p-0 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: cardEasing }}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="snap-start w-[220px] xs:w-[240px] sm:w-full min-w-[210px] xs:min-w-[230px] sm:min-w-0 max-w-[265px] mx-auto h-[250px] sm:h-[290px] group relative rounded-2xl overflow-hidden cursor-pointer glass-panel-dark border border-[#C6A15B]/30 hover:border-[#C6A15B] shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex-shrink-0 sm:flex-shrink-1"
            >
              {/* Image */}
              <img 
                src={project.coverImage || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800'} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              
              {/* Soft Gradient Overlay for Text Clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/95 via-[#080A09]/50 to-transparent z-10" />
              
              {/* Content Container */}
              <div className="absolute bottom-0 left-0 w-full p-3.5 sm:p-4.5 z-20 flex flex-col justify-end text-white group-hover:-translate-y-0.5 transition-transform duration-300">
                
                {/* Glass Category Badge */}
                <div className="mb-1.5 sm:mb-2">
                  <span className="glass-pill text-[#C6A15B] text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest py-0.5 px-2 sm:py-1 sm:px-2.5 rounded-full shadow-sm">
                    {project.category || 'Security'}
                  </span>
                </div>

                <h3 className="text-xs sm:text-base font-bold text-[#FAF9F5] mb-1 leading-snug group-hover:text-[#C6A15B] transition-colors font-heading line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="text-[10px] sm:text-[11px] text-[#EDE8DC]/80 line-clamp-1 mb-2 sm:mb-2.5 font-normal">
                  {project.description}
                </p>

                {/* Location & Glass Arrow */}
                <div className="flex items-center justify-between text-xs text-[#77766F] pt-2 border-t border-white/15">
                  <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#EDE8DC]/80">
                    <MapPin size={11} className="text-[#C6A15B]" />
                    {project.location || 'Kerala'}
                  </span>

                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40 text-[#C6A15B] flex items-center justify-center group-hover:bg-[#C6A15B] group-hover:text-[#101312] transition-colors shadow-md">
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Scrolling Indicator */}
        <div className="flex sm:hidden flex-col items-center justify-center gap-2 mt-4 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#9E8148] bg-[#C6A15B]/10 px-3.5 py-1 rounded-full border border-[#C6A15B]/25">
            <motion.span
              animate={{ x: [-3, 1, -3] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-xs text-[#C6A15B]"
            >
              ‹
            </motion.span>
            <span>Swipe to view projects</span>
            <motion.span
              animate={{ x: [3, -1, 3] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-xs text-[#C6A15B]"
            >
              ›
            </motion.span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            {projects.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to project ${idx + 1}`}
                onClick={() => scrollToStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-6 bg-[#C6A15B] shadow-[0_0_8px_rgba(198,161,91,0.6)]' 
                    : 'w-1.5 bg-[#C6A15B]/30 hover:bg-[#C6A15B]/50'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
