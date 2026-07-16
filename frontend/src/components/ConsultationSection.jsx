import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import api from '../api';

const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert('Name and Phone are required.');
    
    setIsSubmitting(true);
    try {
      await api.post('/enquiries', formData);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', serviceInterest: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#101010] relative">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="glass rounded-3xl overflow-hidden relative z-10 border border-white/10">
          <div className="grid lg:grid-cols-2">
            
            {/* Contact Info Side */}
            <div className="bg-[#0a0a0a] p-10 md:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Secure Your Space</h2>
                <p className="text-gray-400 mb-12">
                  Request a free site visit or consultation. Our engineering experts will assess your requirements and provide a tailored solution.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Call Us Directly</h4>
                      <p className="text-gray-400">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email Enquiry</h4>
                      <p className="text-gray-400">sales@jksecurity.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Head Office</h4>
                      <p className="text-gray-400">123 Corporate Tower, MG Road, Kerala, India - 682001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10 md:p-16 relative">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 z-20 bg-[#101010]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                  <p className="text-gray-400">Our team will get back to you shortly.</p>
                </motion.div>
              )}

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-300">Service of Interest</label>
                  <select 
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#101010]">Select a Service</option>
                    <option value="Security Solutions" className="bg-[#101010]">Security Solutions</option>
                    <option value="Design & Printing" className="bg-[#101010]">Design & Printing</option>
                    <option value="Other / Multiple" className="bg-[#101010]">Other / Multiple</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-300">Message (Optional)</label>
                  <textarea 
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <Button className="w-full mt-4" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <Send size={16} />}
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
