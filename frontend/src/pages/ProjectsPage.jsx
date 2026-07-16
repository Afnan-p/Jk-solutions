import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationSection from '../components/ConsultationSection';
import api from '../api';

const ProjectsPage = ({ division }) => {
  const divisionName = division === 'design' ? 'Design & Printing' : (division === 'security' ? 'Security Solutions' : null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9); // Initial load count

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamically extract unique categories and divisions for filters
  const categories = useMemo(() => {
    // If a specific division is passed, don't show the division names in the filter, just 'All' and the categories.
    const baseProjects = divisionName ? projects.filter(p => p.division === divisionName) : projects;
    
    const defaultCats = divisionName ? ['All'] : ['All', 'Security Solutions', 'Design & Printing'];
    const dynamicCats = [...new Set(baseProjects.map(p => p.category))];
    // Merge without duplicates
    return [...new Set([...defaultCats, ...dynamicCats])].filter(Boolean);
  }, [projects, divisionName]);

  const filteredProjects = useMemo(() => {
    const baseProjects = divisionName ? projects.filter(p => p.division === divisionName) : projects;
    
    if (activeCategory === 'All') return baseProjects;
    if (activeCategory === 'Security Solutions') return baseProjects.filter(p => p.division === 'Security Solutions');
    if (activeCategory === 'Design & Printing') return baseProjects.filter(p => p.division === 'Design & Printing');
    return baseProjects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects, divisionName]);

  return (
    <>
      <Helmet>
        <title>Portfolio & Projects | JK Solutions</title>
        <meta name="description" content="View our portfolio of premium Security and Design installations." />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {division === 'design' && 'Design '}
              {division === 'security' && 'Security '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${division === 'design' ? 'from-purple-400 to-pink-400' : 'from-accent to-yellow-400'}`}>
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              {division === 'design' 
                ? "Discover our premium print and design portfolio that elevates brand identity."
                : (division === 'security' 
                  ? "Explore our intelligent security and automation installations for modern living."
                  : "Discover how we've transformed spaces with intelligent engineering and premium design solutions.")}
            </p>
          </motion.div>

          {/* Sticky Filter Bar */}
          <div className="sticky top-24 z-30 bg-[#050505]/80 backdrop-blur-xl py-4 mb-12 -mx-6 px-6 border-y border-white/5">
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(9); // Reset pagination on filter change
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? (division === 'design' ? 'bg-purple-500 text-black shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]') 
                      : 'bg-[#151515] text-gray-400 hover:text-white hover:bg-[#202020] border border-white/5'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-24 text-red-400">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              No projects found in this category.
            </div>
          ) : (
            /* Masonry Layout */
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {filteredProjects.slice(0, visibleCount).map((project, index) => {
                  const isDesign = project.division === 'Design & Printing';
                  const themeColor = isDesign ? 'text-purple-400' : 'text-accent';
                  
                  return (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="break-inside-avoid"
                    >
                      <Link to={`/projects/${project.slug}`} className="group relative block rounded-2xl overflow-hidden bg-[#101010] border border-white/5">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                          src={project.coverImage} 
                          alt={project.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${themeColor}`}>
                            {project.category}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 leading-snug">{project.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {visibleCount < filteredProjects.length && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-24">
          <ConsultationSection />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
