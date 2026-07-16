import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "Do you provide installation services outside Kerala?",
    answer: "Currently, our primary focus is within Kerala. However, for large-scale enterprise or luxury villa projects, our team is equipped to travel across South India."
  },
  {
    question: "What is the warranty period for your CCTV and Automation products?",
    answer: "We offer a standard 1-year comprehensive warranty on all products and installations. Extended warranty and Annual Maintenance Contracts (AMC) are also available."
  },
  {
    question: "Can I control my home automation system remotely?",
    answer: "Yes, absolutely. Our smart home solutions allow you to control lighting, climate, security, and gates from anywhere in the world using a secure mobile application."
  },
  {
    question: "How long does a typical home automation installation take?",
    answer: "For a standard 3BHK villa, wireless automation takes 2-3 days. Wired, comprehensive systems during the construction phase can take a few weeks aligned with the building progress."
  },
  {
    question: "Do you use generic brands for security cameras?",
    answer: "No. We strictly partner with industry-leading, premium brands like Hikvision, Dahua, CP Plus, and Ajax to ensure maximum reliability and cutting-edge features."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked <span className="text-accent">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                <span className={`text-accent transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
