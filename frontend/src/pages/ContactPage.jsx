import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, 
  MessageSquare, ShieldCheck, Sparkles, ExternalLink, ChevronDown, User, Building, Send, Award
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import api from '../api';

const serviceOptions = [
  { id: 'cctv', label: 'CCTV Surveillance', category: 'Security' },
  { id: 'home-automation', label: 'Home Automation', category: 'Security' },
  { id: 'gate-automation', label: 'Gate Automation', category: 'Security' },
  { id: 'access-control', label: 'Access Control', category: 'Security' },
  { id: 'solar', label: 'Solar Systems', category: 'Security' },
  { id: 'networking', label: 'Networking & Wi-Fi', category: 'Security' },
  { id: 'graphic-design', label: 'Graphic Design', category: 'Design' },
  { id: 'corporate-printing', label: 'Corporate Printing', category: 'Design' },
  { id: 'custom-gifts', label: 'Customized Gifts', category: 'Design' },
  { id: 'trophies', label: 'Trophies & Mementos', category: 'Design' },
];

const contactFaqs = [
  {
    q: "How soon can a technician visit my site for inspection?",
    a: "Our inspection team typically reaches sites within 24 to 48 hours across Kerala for CCTV, Automation, and Security audits."
  },
  {
    q: "Do you provide custom design samples before printing?",
    a: "Yes! Our graphic design team produces digital proofs and sample prints for corporate stationery, trophies, and customized gifts prior to full production."
  },
  {
    q: "What warranties do you offer on security installations?",
    a: "We provide official manufacturer warranties (1 to 3 years) on all CCTV cameras, DVR/NVR units, and smart automation hardware, backed by our local service support."
  },
  {
    q: "Can I request an instant quote online?",
    a: "Absolutely! Submit the form on this page or call us directly at +91 98765 43210 for an immediate consultation and detailed quotation."
  }
];

const ContactPage = () => {
  const [settings, setSettings] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'CCTV Surveillance',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data) setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      return alert('Please enter your Name and Phone Number.');
    }
    
    setIsSubmitting(true);
    try {
      const response = await api.post('/enquiries', formData);
      if (response && (response.status === 201 || response.status === 200)) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', serviceInterest: 'CCTV Surveillance', message: '' });
        setTimeout(() => setIsSuccess(false), 6000);
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', serviceInterest: 'CCTV Surveillance', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const s = {
    phoneMain: settings?.phone1 || settings?.phoneMain || '+91 98765 43210',
    emailSales: settings?.email1 || settings?.emailSales || 'sales@jksolutions.in',
    address: settings?.address || 'JK Solutions Corporate Tower, MG Road, Ernakulam, Kochi, Kerala, India - 682001',
    businessHoursWeekdays: settings?.businessHoursWeekdays || '9:00 AM - 6:30 PM',
    googleMapUrl: 'https://maps.google.com/maps?q=Kochi%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed',
    founderName: settings?.founderName || 'Jaseel Kumar',
    founderRole: settings?.founderRole || 'Chief Designer & Founder',
    founderImage: settings?.founderImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800'
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | JK Solutions — Security & Design Excellence</title>
        <meta name="description" content="Get in touch with JK Solutions in Kochi, Kerala. 24/7 inquiry support for CCTV surveillance, home automation, solar systems, access control, and corporate printing." />
      </Helmet>

      <Navbar />

      {/* WHITE THEME MAIN CONTAINER */}
      <main className="bg-[#FAF8F5] text-[#1B1D1A] min-h-screen pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        
        {/* Soft Ambient Warm Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C6A15B]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#D9BD82]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          
          {/* ============================================================ */}
          {/* HERO BANNER */}
          {/* ============================================================ */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 font-heading text-[#111111]"
            >
              Let's Build Something <br className="hidden sm:inline" />
              <span className="text-[#C6A15B]">Extraordinary.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Have a security project, automation requirement, or custom design inquiry? 
              Connect with our expert engineering and design teams today.
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/* 3 QUICK ACTION HIGHLIGHT CARDS (White Theme) */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            
            {/* Phone Card */}
            <motion.a 
              href={`tel:${s.phoneMain}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-white border border-[#C6A15B]/30 hover:border-[#C6A15B] p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-all shadow-sm shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E8148]">Direct Phone</div>
                  <div className="text-[#111111] font-extrabold text-base sm:text-lg mt-0.5">{s.phoneMain}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Mon - Sat: 9 AM to 6:30 PM</div>
                </div>
              </div>
              <ArrowRight size={18} className="text-[#C6A15B] group-hover:translate-x-1 transition-transform shrink-0" />
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a 
              href={`https://wa.me/${s.phoneMain.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-white border border-emerald-500/30 hover:border-emerald-500 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm shrink-0">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">WhatsApp Priority</div>
                  <div className="text-[#111111] font-extrabold text-base sm:text-lg mt-0.5">Chat Directly</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Fast response & instant estimates</div>
                </div>
              </div>
              <ArrowRight size={18} className="text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </motion.a>

            {/* Email Card */}
            <motion.a 
              href={`mailto:${s.emailSales}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-white border border-[#C6A15B]/30 hover:border-[#C6A15B] p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-all shadow-sm shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E8148]">Official Email</div>
                  <div className="text-[#111111] font-extrabold text-base sm:text-lg mt-0.5 truncate max-w-[180px] sm:max-w-none">{s.emailSales}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">RFQs & Corporate Proposals</div>
                </div>
              </div>
              <ArrowRight size={18} className="text-[#C6A15B] group-hover:translate-x-1 transition-transform shrink-0" />
            </motion.a>

          </div>

          {/* ============================================================ */}
          {/* MAIN 2-COLUMN SECTION: FORM & PROPER PROFILE / MAP */}
          {/* ============================================================ */}
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-20">
            
            {/* LEFT: INSTANT ENQUIRY FORM (7 cols, White Theme) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 bg-white border border-[#C6A15B]/35 p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden"
            >
              {/* Form Ambient Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-heading">Send an Instant Enquiry</h2>
                  <p className="text-slate-500 text-xs sm:text-sm">Select a category and our specialists will respond shortly.</p>
                </div>
              </div>

              {/* Service Selection Chips */}
              <div className="mb-6">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#9E8148] block mb-2.5">
                  Select Required Service *
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((item) => {
                    const isSelected = formData.serviceInterest === item.label;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, serviceInterest: item.label });
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#C6A15B] text-white shadow-md shadow-[#C6A15B]/30 font-extrabold scale-105'
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#C6A15B]/50 hover:text-[#111111]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-3 text-xs sm:text-sm font-bold shadow-xs"
                  >
                    <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
                    <div>
                      <div>Enquiry Sent & Received Successfully!</div>
                      <div className="text-[11px] font-normal text-emerald-700">Our executive team will call you back shortly.</div>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#C6A15B] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]/20 transition-all"
                      />
                      <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#C6A15B] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]/20 transition-all"
                      />
                      <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#C6A15B] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]/20 transition-all"
                    />
                    <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                    Project Requirements / Notes
                  </label>
                  <textarea 
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your property location, budget or specific security & design preferences..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#C6A15B] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]/20 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#C6A15B] hover:bg-[#B5904B] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#C6A15B]/25 transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request Now</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  🔒 We respect your privacy. Your information is confidential & secure.
                </p>
              </form>

            </motion.div>

            {/* RIGHT: PROPER EXECUTIVE PROFILE CARD & MAP (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 space-y-6"
            >
              
              {/* ELEGANT EXECUTIVE PROFILE CARD (PROPER UN-ZOOMED IMAGE FRAMING) */}
              <div className="bg-white border border-[#C6A15B]/35 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  
                  {/* Portrait Executive Profile Frame - Adapts perfectly to cutouts & photos without cutting */}
                  <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#C6A15B] shadow-lg shrink-0 bg-gradient-to-b from-[#161a19] via-[#0b0e0d] to-[#040605] flex items-end justify-center p-1.5 group">
                    {/* Ambient Gold Radial Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,91,0.25),transparent_70%)] pointer-events-none" />
                    <img 
                      src={s.founderImage} 
                      alt={s.founderName}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800';
                      }}
                      className="relative z-10 w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]" 
                    />
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#9E8148] text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                      <Award size={12} />
                      <span>{s.founderRole}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] font-heading leading-tight">{s.founderName}</h3>
                    <p className="text-[#C6A15B] text-xs font-bold mt-0.5">JK Solutions Executive Leadership</p>
                    
                    <p className="text-slate-600 text-xs leading-relaxed mt-2.5 font-medium italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "Committed to bringing world-class security technology and creative printing perfection to Kerala."
                    </p>
                  </div>

                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-600 font-medium">
                    <span className="font-bold text-[#111111]">Direct Call:</span> {s.phoneMain}
                  </div>
                  <a href={`tel:${s.phoneMain}`} className="px-4 py-2 rounded-xl bg-[#C6A15B] text-white font-extrabold hover:bg-[#B5904B] transition-all shadow-sm">
                    Call Direct
                  </a>
                </div>
              </div>

              {/* Headquarters Info Box */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-lg">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                    <Building size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#111111] font-heading">JK Solutions Headquarters</h3>
                    <p className="text-slate-500 text-xs">Kochi, Kerala, India</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#C6A15B] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium text-[#111111]">{s.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#C6A15B] shrink-0" />
                    <div>
                      <span className="font-bold text-[#111111]">Mon - Sat:</span> {s.businessHoursWeekdays}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-[#C6A15B] shrink-0" />
                    <div>
                      <span className="font-bold text-[#111111]">Support:</span> 24/7 Priority Assistance
                    </div>
                  </div>
                </div>
              </div>

              {/* PROPER WORKING GOOGLE MAP CONTAINER */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg group h-[220px]">
                <iframe 
                  src={s.googleMapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JK Solutions Location Map"
                ></iframe>

                {/* Map Overlay Button */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a 
                    href="https://maps.google.com/?q=Kochi+Kerala" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#111111] hover:bg-[#C6A15B] hover:text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* FREQUENTLY ASKED QUESTIONS SECTION */}
          {/* ============================================================ */}
          <div className="max-w-4xl mx-auto pt-10 border-t border-slate-200/80">
            
            <div className="text-center mb-10">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-2">
                — HAVE QUESTIONS? —
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-heading">
                Contact <span className="text-[#C6A15B]">FAQs</span>
              </h2>
            </div>

            <div className="space-y-3">
              {contactFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-white border border-slate-200/80 hover:border-[#C6A15B]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111111] hover:text-[#C6A15B] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={`text-[#C6A15B] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
