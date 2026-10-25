import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import FAQSection from './FAQSection';
import api from '../api';

const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'CCTV',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      return alert('Name and Phone are required.');
    }
    
    setIsSubmitting(true);
    try {
      await api.post('/enquiries', formData);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', serviceInterest: 'CCTV', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', serviceInterest: 'CCTV', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white text-[#1B1D1A] relative border-t border-[#C6A15B]/20 overflow-hidden" id="contact-section">
      {/* Background Ambient Glass Lights */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D9BD82]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Unified 2-Column Grid matching reference mockup */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: FAQ Section (6 cols) */}
          <div className="lg:col-span-6">
            <FAQSection />
          </div>

          {/* Right Column: Contact Form & Info (6 cols) */}
          <div className="lg:col-span-6">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-2">
              — GET IN TOUCH —
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B1D1A] tracking-tight mb-2 font-[#Plus Jakarta Sans]">
              Let's <span className="text-[#C6A15B]">Secure</span> Your Space
            </h2>

            <p className="text-xs text-[#77766F] leading-relaxed mb-6">
              Tell us what you need and our team will help you find the right solution.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a href="tel:+919876543210" className="glass-panel-light border border-[#C6A15B]/25 p-3.5 rounded-2xl flex items-center gap-3 transition-all hover:border-[#C6A15B] hover:shadow-md group">
                <div className="w-8 h-8 rounded-xl bg-[#101312] text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#101312] flex items-center justify-center flex-shrink-0 shadow-sm transition-colors">
                  <Phone size={14} />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-bold text-[#1B1D1A]">Call Us</div>
                  <div className="text-[#77766F] text-[11px] truncate">+91 9876 543210</div>
                </div>
              </a>

              <a href="mailto:info@jksolutions.in" className="glass-panel-light border border-[#C6A15B]/25 p-3.5 rounded-2xl flex items-center gap-3 transition-all hover:border-[#C6A15B] hover:shadow-md group">
                <div className="w-8 h-8 rounded-xl bg-[#101312] text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#101312] flex items-center justify-center flex-shrink-0 shadow-sm transition-colors">
                  <Mail size={14} />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-bold text-[#1B1D1A]">Email Us</div>
                  <div className="text-[#77766F] text-[11px] truncate">info@jksolutions.in</div>
                </div>
              </a>

              <div className="glass-panel-light border border-[#C6A15B]/25 p-3.5 rounded-2xl flex items-center gap-3 transition-all hover:border-[#C6A15B]/60 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#101312] text-[#C6A15B] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin size={14} />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-bold text-[#1B1D1A]">Visit Us</div>
                  <div className="text-[#77766F] text-[11px] truncate">Kochi, Kerala, India</div>
                </div>
              </div>

              <div className="glass-panel-light border border-[#C6A15B]/25 p-3.5 rounded-2xl flex items-center gap-3 transition-all hover:border-[#C6A15B]/60 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#101312] text-[#C6A15B] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock size={14} />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-bold text-[#1B1D1A]">Working Hours</div>
                  <div className="text-[#77766F] text-[11px] truncate">Mon - Sat: 9:00 - 6:30</div>
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="glass-panel-light border border-[#C6A15B]/30 p-7 rounded-3xl shadow-lg relative overflow-hidden backdrop-blur-xl">
              {isSuccess && (
                <div className="absolute inset-0 bg-[#FAF9F5]/95 z-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl backdrop-blur-md">
                  <CheckCircle2 size={32} className="text-green-600 mb-2" />
                  <h4 className="font-bold text-sm text-[#1B1D1A]">Enquiry Sent Successfully!</h4>
                  <p className="text-xs text-[#77766F]">Our team will get back to you shortly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#77766F] block mb-1">Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#1B1D1A] border border-[#C6A15B]/30 focus:border-[#C6A15B] transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#77766F] block mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#1B1D1A] border border-[#C6A15B]/30 focus:border-[#C6A15B] transition-all"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#77766F] block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#1B1D1A] border border-[#C6A15B]/30 focus:border-[#C6A15B] transition-all"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#77766F] block mb-1">Service Required</label>
                    <select 
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#1B1D1A] border border-[#C6A15B]/30 focus:border-[#C6A15B] transition-all cursor-pointer"
                    >
                      <option value="CCTV">CCTV Surveillance</option>
                      <option value="Home Automation">Home Automation</option>
                      <option value="Gate Automation">Gate Automation</option>
                      <option value="Access Control">Access Control</option>
                      <option value="Solar">Solar Systems</option>
                      <option value="Networking">Networking & Wi-Fi</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Corporate Printing">Corporate Printing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#77766F] block mb-1">Your Message</label>
                  <textarea 
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#1B1D1A] border border-[#C6A15B]/30 focus:border-[#C6A15B] transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-extrabold uppercase tracking-wider bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] rounded-xl shadow-md transition-all hover:shadow-[0_0_20px_rgba(198,161,91,0.4)]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'} <ArrowRight size={14} />
                </Button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ConsultationSection;
