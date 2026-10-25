import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, User, Tag, ShieldCheck, Palette, Sparkles, MessageSquare, ArrowRight, X, Maximize2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const projectFallbackMap = {
  'luxury-villa-cctv': {
    title: 'Luxury Villa Security Integration',
    slug: 'luxury-villa-cctv',
    division: 'Security Solutions',
    category: 'CCTV Surveillance',
    client: 'Private Residence, Calicut',
    location: 'Calicut, Kerala',
    completedDate: '2024',
    description: 'Complete perimeter and internal security integration for a 10,000 sq ft luxury villa. Included 32 IP cameras with AI human detection, thermal night vision, and 60 days of redundant cloud and NVR storage.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200',
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'
    ]
  },
  'techpark-smart-access': {
    title: 'TechPark Smart Access Control',
    slug: 'techpark-smart-access',
    division: 'Security Solutions',
    category: 'Smart Locks',
    client: 'CyberSpace IT Park',
    location: 'Kochi, Kerala',
    completedDate: '2024',
    description: 'Implemented an enterprise-grade biometric and RFID access control system for a 5-story IT park, integrating with their existing HR attendance software.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?q=80&w=1200',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200'
    ]
  },
  'corporate-id-rebrand': {
    title: 'Corporate Rebranding ID Cards',
    slug: 'corporate-id-rebrand',
    division: 'Design & Printing',
    category: 'ID Cards',
    client: 'Global Logistics Inc',
    location: 'Dubai, UAE',
    completedDate: '2024',
    description: 'Designed and printed 2,500 NFC-enabled smart ID cards with premium custom lanyards for a major logistics company rebranding.',
    coverImage: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1612015900186-b4130097a8e7?q=80&w=1200'
    ]
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let fetched = null;
      try {
        const { data } = await api.get(`/projects/slug/${slug}`);
        if (data && data.title) {
          fetched = data;
        }
      } catch (err) {
        console.log('Using local fallback for project');
      }

      const fallback = projectFallbackMap[slug] || projectFallbackMap['luxury-villa-cctv'];
      setProject({ ...fallback, ...fetched });
    } catch (err) {
      setProject(projectFallbackMap['luxury-villa-cctv']);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isDesign = project.division === 'Design & Printing';
  const ThemeIcon = isDesign ? Palette : ShieldCheck;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] selection:bg-[#C6A15B] selection:text-white">
      <Helmet>
        <title>{project.title} | JK Solutions</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <Navbar />

      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#9E8148] hover:text-[#111111] transition-colors mb-6 sm:mb-8">
            <ArrowLeft size={16} /> Back to All Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            
            {/* Left Column: Visual Showcase & Description */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              
              {/* Cover Image Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onClick={() => project.coverImage && setSelectedImage(project.coverImage)}
                className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xl relative group cursor-pointer"
              >
                <img 
                  src={project.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                    <Maximize2 size={13} /> View Full Image
                  </div>
                </div>
              </motion.div>

              {/* Gallery Grid */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E8148]">
                      PROJECT GALLERY ({project.gallery.length} PHOTOS)
                    </h3>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      Click any photo to view full size
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {project.gallery.map((img, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        key={idx} 
                        onClick={() => setSelectedImage(img)}
                        className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group cursor-pointer relative"
                      >
                        <img 
                          src={img} 
                          alt={`Gallery photo ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <Maximize2 size={14} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Description Content */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E8148]">
                  <Sparkles size={14} className="text-[#C6A15B]" /> PROJECT OVERVIEW
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-[#Plus Jakarta Sans]">
                  Project Summary & Implementation
                </h2>
                <p className="text-xs sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap font-normal">
                  {project.description}
                </p>
              </div>

            </div>

            {/* Right Column: Project Meta Info Box */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 w-full space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#C6A15B]/30 shadow-xl space-y-6">
                
                <div>
                  <span className="inline-flex items-center gap-2 text-[#9E8148] font-extrabold text-[10px] sm:text-xs uppercase tracking-widest bg-[#C6A15B]/15 px-3 py-1 rounded-full border border-[#C6A15B]/30 mb-3">
                    <ThemeIcon size={13} /> {project.division}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2 font-[#Plus Jakarta Sans]">
                    {project.title}
                  </h1>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B] shrink-0">
                      <Tag size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Category</span>
                      <span className="text-[#111111] font-semibold">{project.category}</span>
                    </div>
                  </div>
                  
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B] shrink-0">
                        <User size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Client</span>
                        <span className="text-[#111111] font-semibold">{project.client}</span>
                      </div>
                    </div>
                  )}

                  {project.location && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B] shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Location</span>
                        <span className="text-[#111111] font-semibold">{project.location}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B] shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Completion Year</span>
                      <span className="text-[#111111] font-semibold">{project.completedDate || '2024'}</span>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link to="/contact">
                    <Button variant="primary" className="w-full justify-center py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#C6A15B] text-white hover:bg-[#B5904B] shadow-md flex items-center gap-2">
                      <MessageSquare size={15} /> Discuss Similar Project <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow-xl z-10"
              title="Close (ESC)"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black cursor-default"
            >
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
