import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import api from '../api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        // Filter featured projects and limit to 4
        const featured = data.filter(p => p.isFeatured).slice(0, 4);
        setProjects(featured);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Featured <span className="text-accent">Projects</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg"
            >
              Explore our portfolio of premium installations across luxury homes, commercial spaces, and industrial sectors.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button onClick={() => navigate('/projects')} variant="outline" className="group hidden md:flex">
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No featured projects available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer border border-white/10 hover:border-accent/40 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                <img 
                  src={project.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Content Container - Always visible & native premium */}
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-accent/10 backdrop-blur-md border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                      {project.category}
                    </span>
                    
                    {/* Native Click Affordance */}
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                      <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">{project.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {project.description || "Premium technology integration."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-10 md:hidden flex justify-center">
          <Button onClick={() => navigate('/projects')} variant="outline" className="group w-full">
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
