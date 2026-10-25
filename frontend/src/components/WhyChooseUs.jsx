import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Headset, Layers, ArrowUpRight, ArrowRight } from 'lucide-react';

const features = [
  {
    number: '01',
    title: 'Genuine Products',
    description: 'We use certified and reliable technology from trusted global brands.',
    icon: ShieldCheck,
    image: '/why-genuine-products.jpg'
  },
  {
    number: '02',
    title: 'Expert Installation',
    description: 'Professional installation designed around each property for maximum performance.',
    icon: Wrench,
    image: '/why-expert-installation.jpg'
  },
  {
    number: '03',
    title: 'Reliable Support',
    description: 'Dedicated assistance after installation, whenever you need us.',
    icon: Headset,
    image: '/why-reliable-support.jpg'
  },
  {
    number: '04',
    title: 'Complete Solutions',
    description: 'Security, automation, solar, networking and printing under one roof.',
    icon: Layers,
    image: '/why-complete-solutions.jpg'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200/60" id="why-us">
      
      {/* Decorative Calligraphy & Tagline Accents */}
      <div className="absolute bottom-6 left-12 text-[#C6A15B]/30 font-serif italic text-2xl sm:text-3xl font-light pointer-events-none select-none hidden lg:block z-10">
        A Safer Tomorrow
      </div>
      <div className="absolute bottom-6 right-16 text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase pointer-events-none select-none hidden lg:block z-10">
        TRUSTED TECHNOLOGY • PROFESSIONAL PEOPLE • SAFER COMMUNITIES
      </div>

      <div className="container mx-auto px-6 max-w-[1360px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Heading, Description, CTA & Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Eyebrow Label */}
              <span className="text-[#C6A15B] font-extrabold text-[11px] tracking-[0.25em] uppercase block mb-3">
                — WHY CHOOSE US —
              </span>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6 font-heading">
                Built on Trust. <br />
                Driven by <br />
                <span className="text-[#C6A15B]">A Safer Tomorrow.</span>
              </h2>

              {/* Supporting Text */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal">
                From smart security to complete automation, we deliver reliable technology, professional installation, and long-term support — because your safety deserves more than just a solution.
              </p>

              {/* CTA Button */}
              <Link to="/about" className="inline-block">
                <button className="py-3.5 px-7 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#C6A15B]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer">
                  MORE ABOUT US <ArrowUpRight size={15} />
                </button>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT SIDE: 4 Feature Cards in 2x2 Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="glass-panel-light rounded-2xl overflow-hidden transition-all duration-400 p-2.5 flex items-center h-[175px] border border-[#C6A15B]/25 hover:border-[#C6A15B] shadow-md hover:shadow-xl group cursor-pointer hover:-translate-y-1">
                      
                      {/* Left Side Content */}
                      <div className="p-3 flex flex-col justify-between h-full w-[52%] shrink-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-extrabold text-[#C6A15B] font-mono">{item.number}</span>
                            <div className="w-6 h-6 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shadow-xs">
                              <IconComponent size={12} />
                            </div>
                          </div>
                          
                          <h3 className="text-slate-900 font-bold text-xs sm:text-sm leading-tight group-hover:text-[#C6A15B] transition-colors mb-1 font-heading">
                            {item.title}
                          </h3>

                          <p className="text-slate-500 text-[10px] leading-snug line-clamp-2 font-normal">
                            {item.description}
                          </p>
                        </div>

                        <div>
                          <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#C6A15B] text-slate-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Right Side Cover Image (Supports any aspect ratio seamlessly) */}
                      <div className="w-[48%] h-full rounded-xl overflow-hidden shrink-0 relative bg-slate-100/80 border border-slate-200/50">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
