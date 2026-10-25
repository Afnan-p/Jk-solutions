import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What security solutions do you provide?",
    answer: "We provide CCTV surveillance, home automation, gate automation, access control & smart locks, solar systems, and enterprise networking."
  },
  {
    question: "Do you provide CCTV installation and maintenance?",
    answer: "Yes, we handle complete turn-key CCTV installation, mobile app configuration, and routine Annual Maintenance Contracts (AMC)."
  },
  {
    question: "Can I automate my existing home?",
    answer: "Yes, we offer both wired setups for new homes and retrofit wireless automation modules that upgrade your existing switches without rewiring."
  },
  {
    question: "Do you provide customized security solutions?",
    answer: "Yes, every system is customized based on your property layout, security requirements, and budget after an on-site inspection."
  },
  {
    question: "How long does installation usually take?",
    answer: "Standard CCTV or gate automation takes 1–2 days. Comprehensive multi-tier smart home systems take 3–7 days."
  },
  {
    question: "Do you provide after-installation support?",
    answer: "Yes, we provide full warranty support, AMC packages, and dedicated 24/7 technical assistance."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-2">
        — FAQ —
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B1D1A] tracking-tight mb-8 font-[#Plus Jakarta Sans]">
        Frequently Asked <span className="text-[#C6A15B]">Questions</span>
      </h2>

      <div className="space-y-3 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`glass-panel-light rounded-2xl overflow-hidden transition-all duration-300 border ${
                isOpen ? 'border-[#C6A15B] shadow-md' : 'border-[#C6A15B]/20 hover:border-[#C6A15B]/50'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-bold transition-colors pr-4 ${
                  isOpen ? 'text-[#C6A15B]' : 'text-[#1B1D1A] group-hover:text-[#C6A15B]'
                }`}>
                  {faq.question}
                </span>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-[#C6A15B] text-[#101312] rotate-180 shadow-sm' : 'glass-pill text-[#1B1D1A]'
                }`}>
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-4 text-[#77766F] text-xs sm:text-sm leading-relaxed border-t border-[#C6A15B]/15 pt-3 bg-white/30 backdrop-blur-xs">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
