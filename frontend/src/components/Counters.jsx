import { motion } from 'framer-motion';

const stats = [
  { label: 'Projects Completed', value: '1500', suffix: '+' },
  { label: 'Satisfied Clients', value: '98', suffix: '%' },
  { label: 'Years Experience', value: '12', suffix: '+' },
  { label: 'Support Available', value: '24/7', suffix: '' },
];

const Counters = () => {
  return (
    <section className="py-20 bg-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-black/10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 flex items-center justify-center">
                {stat.value}<span className="text-3xl md:text-4xl lg:text-5xl">{stat.suffix}</span>
              </div>
              <div className="text-black/80 font-medium uppercase tracking-wider text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
