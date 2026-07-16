import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Palette, Package } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const ServiceDetail = () => {
  const { division, slug } = useParams();
  const [service, setService] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Ensure backend uses the api instance to fetch data
      const { data: serviceData } = await api.get(`/services/slug/${slug}`);
      setService(serviceData);

      // Fetch related projects
      const { data: projectsData } = await api.get(`/projects/service/${slug}`);
      setProjects(projectsData);
      
    } catch (err) {
      console.error(err);
      setError('Service not found or error loading data.');
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

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-gray-400 mb-8">{error}</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const isDesign = service.division === 'Design & Printing';
  const themeColor = isDesign ? 'text-purple-400' : 'text-accent';
  const ThemeIcon = isDesign ? Palette : ShieldCheck;

  return (
    <>
      <Helmet>
        <title>{service.title} | JK Solutions</title>
        <meta name="description" content={service.description} />
      </Helmet>
      
      <Navbar />

      {/* Premium Hero Banner */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img src={service.image || '/home automation.png'} alt={service.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className={`inline-flex items-center gap-2 ${themeColor} font-bold tracking-widest text-sm mb-6 uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md`}>
              <ThemeIcon size={16} /> {service.division}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Rich Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Advantages */}
              {service.advantages && service.advantages.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="text-3xl font-bold text-white mb-8">Key Advantages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.advantages.map((adv, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-[#101010] border border-white/5 hover:border-white/10 transition-colors">
                        <CheckCircle2 size={24} className={`${themeColor} flex-shrink-0 mt-1`} />
                        <span className="text-gray-300 text-lg leading-relaxed">{adv}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Available Products / Materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {service.availableProducts && service.availableProducts.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h3 className="text-2xl font-bold text-white mb-6">Available Products</h3>
                    <ul className="space-y-4">
                      {service.availableProducts.map((prod, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <ChevronRight size={18} className={themeColor} /> {prod}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {service.materialsUsed && service.materialsUsed.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h3 className="text-2xl font-bold text-white mb-6">Materials Used</h3>
                    <ul className="space-y-4">
                      {service.materialsUsed.map((mat, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <Package size={18} className={themeColor} /> {mat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-[#101010] border border-white/5">
                        <h4 className="text-lg font-bold text-white mb-2">{faq.question}</h4>
                        <p className="text-gray-400">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Column: CTA & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 p-8 rounded-3xl bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">Start Your Project</h3>
                <p className="text-gray-400 mb-8">Get a free consultation and customized quote for your specific requirements.</p>
                <Link to="/contact">
                  <Button className="w-full justify-center py-4 text-lg">Request a Quote</Button>
                </Link>
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-500 block mb-2">Or call us directly</span>
                  <a href="tel:+919876543210" className={`text-xl font-bold ${themeColor} hover:text-white transition-colors`}>
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Recent Works - Dynamic Portfolio Showcase */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Recent Works</h2>
              <p className="text-gray-400 text-lg max-w-2xl">Explore our latest successful implementations in {service.title.toLowerCase()}.</p>
            </div>
            <Link to="/projects" className={`inline-flex items-center gap-2 ${themeColor} font-medium hover:text-white transition-colors`}>
              View All Projects <ArrowRight size={20} />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#101010] border border-white/5">
              <p className="text-gray-400 text-lg">New showcase projects are being updated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div 
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group block rounded-2xl overflow-hidden bg-[#101010] border border-white/5"
                >
                  <Link to={`/projects/${project.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                      <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        <span>{project.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServiceDetail;
