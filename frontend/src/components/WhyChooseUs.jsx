import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  "Certified Engineers",
  "Premium Brands",
  "Fast Installation",
  "Affordable Pricing",
  "Extended Warranty",
  "Comprehensive AMC Support",
  "24x7 Emergency Service",
  "Advanced AI Technology"
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#101010] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why <span className="text-accent">JK Security</span> is the Trusted Choice.
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              We don't just install equipment; we engineer peace of mind. With over a decade of excellence, we bring you world-class security and automation solutions tailored for your lifestyle.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="text-white font-medium">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop" 
              alt="Installation Excellence" 
              className="relative z-10 rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[600px] w-full"
            />
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl z-20 flex items-center gap-4"
            >
              <div className="text-5xl font-bold text-accent">12+</div>
              <div className="text-sm font-medium text-white uppercase tracking-wider">Years of<br/>Experience</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
