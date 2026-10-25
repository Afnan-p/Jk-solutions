import { motion } from 'framer-motion';
import { PhoneCall, ArrowRight } from 'lucide-react';
import Button from './Button';

const FinalCTA = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact-section') || document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section className="py-24 bg-[#F5F1E8] relative overflow-hidden border-t border-[#C6A15B]/20" id="final-cta">
      {/* Background Ambient Glass Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#D9BD82]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="bg-gradient-to-br from-[#0E1110] via-[#141816] to-[#0A0D0C] text-[#FAF9F5] p-8 md:p-14 rounded-3xl relative overflow-hidden shadow-2xl border-2 border-[#C6A15B]/40">
          
          {/* Inner Card Subtle Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C6A15B]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Text & CTA */}
            <div className="lg:col-span-8">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-extrabold text-[#FAF9F5] tracking-tight mb-4 font-[#Plus Jakarta Sans]"
              >
                Ready to <span className="text-[#C6A15B] drop-shadow-[0_0_20px_rgba(198,161,91,0.4)]">Secure</span> Your Space?
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#EDE8DC]/85 text-base sm:text-lg mb-8 max-w-xl font-normal leading-relaxed"
              >
                Let's build a smarter, safer and more connected space for you.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button 
                  onClick={scrollToContact}
                  variant="primary"
                  className="py-3.5 px-7 font-extrabold text-xs uppercase tracking-wider bg-[#C6A15B] text-[#0E1110] hover:bg-[#D9BD82] shadow-[0_0_25px_rgba(198,161,91,0.35)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  Get a Free Consultation <ArrowRight size={15} />
                </Button>

                <a 
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 text-[#FAF9F5] hover:border-[#C6A15B] bg-white/10 backdrop-blur-md transition-all"
                >
                  <PhoneCall size={14} className="text-[#C6A15B]" />
                  Call Us
                </a>
              </motion.div>
            </div>

            {/* Right Floating Typography */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="text-right border-r-2 border-[#C6A15B] pr-5 opacity-90">
                <div className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#C6A15B]">SECURITY</div>
                <div className="text-xs font-extrabold uppercase tracking-[0.3em] text-white">AUTOMATION</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EDE8DC]/70 mt-1">A SMARTER TOMORROW</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
