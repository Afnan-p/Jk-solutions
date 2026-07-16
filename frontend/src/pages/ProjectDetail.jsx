import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, User, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/projects/slug/${slug}`);
      setProject(data);
    } catch (err) {
      setError('Project not found.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">{error}</p>
        <Link to="/projects" className="text-accent hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const isDesign = project.division === 'Design & Printing';
  const themeColor = isDesign ? 'text-purple-400' : 'text-accent';

  return (
    <>
      <Helmet>
        <title>{project.title} | JK Solutions Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <Navbar />

      <section className="pt-32 pb-12 bg-[#050505]">
        <div className="container mx-auto px-6">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8"
              >
                <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
              </motion.div>

              {/* Gallery Grid if available */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {project.gallery.map((img, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      key={idx} 
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                    >
                      <img src={img} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="lg:w-1/3 lg:sticky lg:top-32 w-full">
              <div className="p-8 rounded-3xl bg-[#101010] border border-white/5 space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
                  <p className={`${themeColor} font-medium`}>{project.division}</p>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-4">
                    <Tag size={20} className="text-gray-500 mt-1" />
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Category</span>
                      <span className="text-gray-200 font-medium">{project.category}</span>
                    </div>
                  </div>
                  
                  {project.client && (
                    <div className="flex items-start gap-4">
                      <User size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Client</span>
                        <span className="text-gray-200 font-medium">{project.client}</span>
                      </div>
                    </div>
                  )}

                  {project.location && (
                    <div className="flex items-start gap-4">
                      <MapPin size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Location</span>
                        <span className="text-gray-200 font-medium">{project.location}</span>
                      </div>
                    </div>
                  )}
                  
                  {project.createdAt && (
                    <div className="flex items-start gap-4">
                      <Calendar size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Completed</span>
                        <span className="text-gray-200 font-medium">{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetail;
