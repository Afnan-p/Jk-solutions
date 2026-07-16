import { motion } from 'framer-motion';

const logos = [
  'HIKVISION', 'CP PLUS', 'dahua', 'Hi-Focus', 'tp-link', 'ZKTeco', 'AJAX', 'EZVIZ'
];

const TrustLogos = () => {
  return (
    <section className="py-12 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Trusted by industry leaders</p>
      </div>
      <div className="flex relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap"
        >
          {/* Duplicate list for seamless infinite loop */}
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="mx-12 md:mx-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustLogos;
