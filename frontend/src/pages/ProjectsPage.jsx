import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

const fallbackProjects = [
  {
    _id: '1',
    title: 'Luxury Villa Security Integration',
    slug: 'luxury-villa-cctv',
    division: 'Security Solutions',
    category: 'CCTV Surveillance',
    location: 'Calicut, Kerala',
    description: 'Complete perimeter and internal security integration for a 10,000 sq ft luxury villa with 32 IP cameras and thermal night vision.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'
  },
  {
    _id: '2',
    title: 'TechPark Smart Access Control',
    slug: 'techpark-smart-access',
    division: 'Security Solutions',
    category: 'Smart Locks',
    location: 'Kochi, Kerala',
    description: 'Implemented an enterprise-grade biometric and RFID access control system for a 5-story IT park.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'
  },
  {
    _id: '3',
    title: 'Corporate Rebranding ID Cards',
    slug: 'corporate-id-rebrand',
    division: 'Design & Printing',
    category: 'ID Cards',
    location: 'Dubai, UAE',
    description: 'Designed and printed 2,500 NFC-enabled smart ID cards with premium custom lanyards for a major logistics company.',
    coverImage: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=800'
  }
];

const ProjectsPage = ({ division }) => {
  const divisionName = division === 'design' ? 'Design & Printing' : (division === 'security' ? 'Security Solutions' : null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12); // Initial load count

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/projects');
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      console.log('Using local fallback projects');
      setProjects(fallbackProjects);
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

      <main className="bg-[#FAF8F5] min-h-screen">
        {/* Editorial Luxury Hero Showcase Banner */}
        <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-24 bg-[#0F1210] text-[#FAF9F5] overflow-hidden border-b border-[#C6A15B]/30 mb-10">
          
          {/* Cover Image Background with Rich Dark Vignette */}
          <div className="absolute inset-0 z-0">
            <img 
              src={
                division === 'design'
                  ? 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1920'
                  : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920'
              } 
              alt="Projects Portfolio Cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1920';
              }}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110 scale-105 transform hover:scale-100 transition-transform duration-1000 opacity-60" 
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F1210]/90 via-[#0F1210]/60 to-[#0F1210]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1210]/80 via-transparent to-[#0F1210]/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#C6A15B]/15 rounded-full blur-[180px] pointer-events-none" />
          </div>

          <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            
            {/* Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[#C6A15B] font-extrabold tracking-[0.25em] text-[10px] sm:text-xs uppercase bg-[#C6A15B]/15 px-4 py-1.5 rounded-full border border-[#C6A15B]/40 backdrop-blur-md mb-6 shadow-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
              — {divisionName ? divisionName.toUpperCase() : 'SELECTED WORKS'} —
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-5 text-[#FAF9F5] tracking-tight font-[#Plus Jakarta Sans] drop-shadow-md"
            >
              {division === 'design' && 'Design '}
              {division === 'security' && 'Security '}
              <span className="text-[#C6A15B] drop-shadow-[0_0_25px_rgba(198,161,91,0.4)]">
                Portfolio
              </span>
            </motion.h1>

            {/* Subtitle Badge */}
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-base text-[#EDE8DC]/90 max-w-2xl mx-auto leading-relaxed font-normal bg-black/40 px-6 py-3.5 rounded-xl border border-white/10 backdrop-blur-md shadow-xl"
            >
              {division === 'design' 
                ? "Discover our premium print and design portfolio that elevates brand identity."
                : (division === 'security' 
                  ? "Explore our intelligent security and automation installations for modern living."
                  : "Discover how we've transformed spaces with intelligent engineering and premium design solutions.")}
            </motion.p>

          </div>
        </section>

        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">

          {/* Sticky Category Filter Pills */}
          <div className="sticky top-24 z-30 bg-[#FAF8F5]/90 backdrop-blur-xl py-4 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(12);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#111111] text-[#C6A15B] shadow-md border border-[#111111]' 
                        : 'bg-white text-slate-700 hover:text-[#111111] hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-24 text-red-500 font-semibold">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 text-slate-500 font-medium">
              No projects found in this category.
            </div>
          ) : (
            /* Compact & Cute 4-5 Cards per Row Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5">
              <AnimatePresence>
                {filteredProjects.slice(0, visibleCount).map((project, index) => {
                  return (
                    <motion.div
                      key={project._id || index}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                      <Link 
                        to={`/projects/${project.slug}`} 
                        className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-[#C6A15B] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Compact Aspect Cover Image */}
                        <div className="relative overflow-hidden aspect-[4/3] bg-slate-950">
                          <img 
                            src={project.coverImage || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800'} 
                            alt={project.title} 
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800';
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />
                          
                          {/* Cute Category Badge */}
                          <span className="absolute top-3 left-3 text-[8.5px] font-extrabold uppercase tracking-wider bg-[#111111]/90 backdrop-blur-md text-[#C6A15B] px-2.5 py-0.5 rounded-full border border-[#C6A15B]/30 shadow-sm">
                            {project.category || 'Project'}
                          </span>

                          {/* Hover Arrow Icon */}
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#C6A15B] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md transform -translate-y-1 group-hover:translate-y-0">
                            <ArrowUpRight size={13} />
                          </div>
                        </div>

                        {/* Card Info Content */}
                        <div className="p-4 flex flex-col justify-between flex-grow bg-white">
                          <div>
                            <h3 className="text-sm sm:text-[15px] font-extrabold text-[#111111] group-hover:text-[#C6A15B] transition-colors mb-1.5 line-clamp-1 font-[#Plus Jakarta Sans]">
                              {project.title}
                            </h3>
                            <p className="text-slate-500 text-[11px] sm:text-xs line-clamp-2 leading-relaxed font-normal mb-3">
                              {project.description}
                            </p>
                          </div>

                          {/* Footer Meta Details */}
                          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-400">
                            <span className="flex items-center gap-1 text-slate-500 truncate max-w-[140px]">
                              <MapPin size={11} className="text-[#C6A15B] shrink-0" />
                              <span className="truncate">{project.location || 'Kerala'}</span>
                            </span>
                            <span className="text-[#C6A15B] font-extrabold uppercase tracking-wider text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                              Details →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {visibleCount < filteredProjects.length && (
            <div className="mt-14 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="bg-[#111111] hover:bg-[#C6A15B] text-white font-extrabold px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
