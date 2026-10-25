import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Palette, 
  Package, MessageSquare, Sparkles, Award, 
  Layers, ArrowUpRight, ChevronDown, Check
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

// Comprehensive Rich Fallback Data Map for All 12 Services
const serviceFallbackMap = {
  // SECURITY SOLUTIONS
  'cctv': {
    title: 'CCTV Surveillance',
    slug: 'cctv',
    division: 'Security Solutions',
    description: 'Advanced 4K AI-powered camera surveillance with 24/7 cloud monitoring, smart motion detection, and instant mobile alerts for complete property protection.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1600',
    features: ['4K Ultra HD Resolution', 'AI Human & Vehicle Detection', 'Night Vision Color Sensor', 'Remote Mobile App Access'],
    advantages: [
      'Deters unauthorized intrusion and vandalism with active deterrents.',
      'Crystal-clear 4K recording provides indisputable legal evidence.',
      'Real-time smartphone alerts with zero false-alarm AI filtering.',
      'Cloud & redundant local NVR storage ensures zero data loss.'
    ],
    availableProducts: ['AI Dome Cameras', 'Bullet Cameras', 'PTZ 360° Zoom Cameras', 'Wireless IP Cameras', '4K NVR Systems'],
    materialsUsed: ['IP67 Weatherproof Aluminum Alloy', 'Vandal-proof Dome Glass', 'Shielded Cat6 Heavy Copper Cable'],
    faqs: [
      { question: 'How long is video footage stored?', answer: 'Typically 30 to 90 days depending on NVR disk size and cloud retention plan.' },
      { question: 'Can I view live footage during power outages?', answer: 'Yes! All NVR and POE systems integrate seamlessly with our UPS battery backups.' },
      { question: 'Is smartphone setup included with installation?', answer: 'Yes, our technicians configure your mobile phones and devices during installation.' }
    ]
  },
  'home-automation': {
    title: 'Home Automation',
    slug: 'home-automation',
    division: 'Security Solutions',
    description: 'Transform your home into an intelligent living space with centralized touch, voice, and smartphone control over lighting, climate, security, and audio.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1600',
    features: ['Central Smart Touch Hub', 'Voice Assistant Integration', 'Automated Mood Lighting', 'Smart Energy Management'],
    advantages: [
      'Effortless touch & voice control of your entire property.',
      'Save up to 30% on monthly energy bills with automated climate scheduling.',
      'Customized scenes (e.g. "Good Night", "Movie Time", "Away Mode").',
      'Boosts property value with modern luxury tech infrastructure.'
    ],
    availableProducts: ['Smart Touch Switches', 'Motorized Curtain Drivers', 'Multi-room Audio Controllers', 'Smart Thermostats'],
    materialsUsed: ['Tempered Glass Touch Panels', 'Zigbee 3.0 / Matter Mesh Protocols', 'Flame-retardant Wiring'],
    faqs: [
      { question: 'Do I need to break walls for wiring?', answer: 'No! We offer wireless retrofittable smart switches that fit directly into existing switchboards.' },
      { question: 'Does it work if internet goes down?', answer: 'Yes! Local automation scenes and switch panel controls continue working without internet.' }
    ]
  },
  'gate-automation': {
    title: 'Gate Automation',
    slug: 'gate-automation',
    division: 'Security Solutions',
    description: 'Automate sliding and swing gates with heavy-duty motorized systems, video door phones, RFID tags, and remote wireless keyfobs for effortless access.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600',
    features: ['Heavy Duty Motorized Drive', 'Wireless Remote & Mobile Access', 'Infrared Obstacle Safety Sensors', 'Auto-close Timer'],
    advantages: [
      'Enter and exit your property without leaving your car.',
      'Robust mechanical locking prevents manual gate forcing.',
      'Safety sensors prevent gate closing on vehicles or pedestrians.',
      'Compatible with solar backup power for continuous operation.'
    ],
    availableProducts: ['Sliding Gate Motors (up to 2000kg)', 'Dual Arm Swing Motors', 'Automatic Boom Barriers', 'RFID Long-Range Readers'],
    materialsUsed: ['Heavy Duty Die-cast Aluminum Housing', 'Hardened Steel Gears', 'Weatherproof Control Enclosures'],
    faqs: [
      { question: 'What happens during a power failure?', answer: 'All gate automation systems include manual release keys and battery backup options.' }
    ]
  },
  'smart-locks': {
    title: 'Smart Locks & Biometrics',
    slug: 'smart-locks',
    division: 'Security Solutions',
    description: 'Experience keyless entry with fingerprint biometrics, RFID keycards, PIN codes, and mobile app unlocking for ultimate convenience and modern security.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?q=80&w=1600',
    features: ['Biometric Fingerprint Unlock', 'Encrypted Passcode Keypad', 'Mobile App OTP & Bluetooth', 'Auto-locking Mechanism'],
    advantages: [
      'Never worry about carrying or losing mechanical keys again.',
      'Grant temporary access codes to guests or housekeeping remotely.',
      'Real-time entry log history delivered straight to your smartphone.',
      'Built-in anti-tamper alarm and emergency power override.'
    ],
    availableProducts: ['Smart Mortise Locks', 'Glass Door Biometric Locks', 'RFID Card Readers', 'Turnstile Access Gates'],
    materialsUsed: ['Aviation-grade Zinc Alloy', 'Scratch-resistant Tempered Glass', 'Stainless Steel Mortise Deadbolts'],
    faqs: [
      { question: 'How long do batteries last in smart locks?', answer: 'Batteries last 10 to 12 months with low-battery warning alerts and USB emergency power ports.' }
    ]
  },
  'access-control': {
    title: 'Access Control Systems',
    slug: 'access-control',
    division: 'Security Solutions',
    description: 'Enterprise-grade access management systems featuring facial recognition, biometric readers, RFID cards, and centralized attendance software.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?q=80&w=1600',
    features: ['Face Recognition Terminals', 'Fingerprint Biometric Readers', 'Time & Attendance Software', 'Turnstile & Gate Integration'],
    advantages: [
      'Strict perimeter access control for corporate offices & facilities.',
      'Automated shift tracking and HR payroll integration.',
      'Anti-passback & multi-door interlocking features.',
      'Detailed audit trails of all employee movements.'
    ],
    availableProducts: ['Facial Recognition Terminals', 'Proximity Card Readers', 'Flap Barrier Turnstiles', 'Electromagnetic Locks'],
    materialsUsed: ['Anodized Aluminum Housings', 'Optical Fingerprint Sensors', 'Encrypted Mifare RFID Chips'],
    faqs: [
      { question: 'Can access control integrate with HR payroll software?', answer: 'Yes! Our software exports attendance data seamlessly into Tally, Zoho, and popular HRMS tools.' }
    ]
  },
  'solar': {
    title: 'Solar Power Systems',
    slug: 'solar',
    division: 'Security Solutions',
    description: 'Clean, sustainable solar energy solutions for homes and businesses. Lower your electricity bills and enjoy uninterrupted power with hybrid solar systems.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1600',
    features: ['Mono-PERC Solar Panels', 'Hybrid Smart Inverters', 'Lithium Battery Storage', 'Real-time Generation Monitoring'],
    advantages: [
      'Slash monthly electricity bills by up to 80% to 100%.',
      'Uninterrupted clean power during grid outages.',
      'Government subsidy eligible installations.',
      'Long-term return on investment with 25-year panel warranty.'
    ],
    availableProducts: ['On-Grid Solar Systems', 'Off-Grid Power Plants', 'Hybrid Energy Storage Systems', 'Solar Water Heaters'],
    materialsUsed: ['Anti-reflective Tempered Solar Glass', 'Anodized Aluminum Framing', 'Lithium LiFePO4 Battery Cells'],
    faqs: [
      { question: 'How much space is needed for a 5kW system?', answer: 'A 5kW system typically requires around 300 to 350 sq ft of shade-free roof space.' }
    ]
  },
  'networking-wifi': {
    title: 'Networking & Enterprise Wi-Fi',
    slug: 'networking-wifi',
    division: 'Security Solutions',
    description: 'High-speed Wi-Fi 6 coverage, mesh routing, and structured fiber cabling for seamless wireless connectivity across large estates and corporate offices.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600',
    features: ['Wi-Fi 6 Seamless Roaming', 'Gigabit PoE Switches', 'Structured Fiber Cabling', 'Guest Portal & Bandwidth Control'],
    advantages: [
      'Zero dead zones across multi-story villas and office campuses.',
      'Seamless auto-switching as you move between rooms.',
      'Isolated secure guest networks for visitors and IoT devices.',
      'High-bandwidth support for 4K streaming, gaming, and CCTV.'
    ],
    availableProducts: ['Ceiling Access Points', 'Outdoor Long-Range APs', 'Managed Gigabit PoE Switches', 'Rack Mount Routers'],
    materialsUsed: ['Category 6A Pure Copper Cable', 'Single-mode Fiber Optics', 'Surge Protected Power Panels'],
    faqs: [
      { question: 'Will outdoor gardens get Wi-Fi coverage?', answer: 'Yes! We install IP67 weatherproof outdoor access points designed for gardens and pools.' }
    ]
  },

  // DESIGN & PRINTING SERVICES
  'graphic-design': {
    title: 'Graphic Design & Branding',
    slug: 'graphic-design',
    division: 'Design & Printing',
    description: 'Elevate your brand image with world-class logo design, corporate brand guidelines, marketing collateral, and digital media graphics created by expert designers.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600',
    features: ['Vector Logo Design', 'Brand Identity Systems', 'Social Media Creatives', 'Package & Label Design'],
    advantages: [
      'Create an unforgettable, premium brand impression.',
      'Consistent visual aesthetics across all marketing channels.',
      'Complete vector source file ownership (AI, EPS, PDF, PNG).',
      'Fast turnaround with dedicated design revision cycles.'
    ],
    availableProducts: ['Brand Style Guides', 'Social Media Packs', 'Brochures & Catalogs', 'Corporate Stationery Designs'],
    materialsUsed: ['High-resolution Vector Graphics', 'CMYK & RGB Color Profiles', 'Custom Typography Kits'],
    faqs: [
      { question: 'Do I get editable source files?', answer: 'Yes, we provide full ownership of original vector source files (AI, PSD, PDF, SVG).' }
    ]
  },
  'corporate-printing': {
    title: 'Corporate Printing',
    slug: 'corporate-printing',
    division: 'Design & Printing',
    description: 'Premium print solutions for business stationery, letterheads, brochures, business cards, and corporate presentation folders with luxury finishes.',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1600',
    features: ['Spot UV & Foil Stamping', 'Textured Luxury Paper Stock', 'Die-cut Custom Shapes', 'High-definition Offset & Digital Print'],
    advantages: [
      'Tangible luxury that commands respect in client meetings.',
      'Accurate Pantone color matching across all printed media.',
      'Durable coatings prevent scuffing and moisture damage.',
      'Bulk order discounts for annual corporate stationery.'
    ],
    availableProducts: ['Velvet Touch Business Cards', 'Embossed Letterheads', 'Multi-page Tri-fold Brochures', 'Presentation Folders'],
    materialsUsed: ['350gsm Premium Board', 'Metallic Foil Inks', 'Soft-touch Velvet Lamination'],
    faqs: [
      { question: 'What is the minimum order quantity for business cards?', answer: 'Minimum order starts at 100 cards with options for custom foil stamping and spot UV.' }
    ]
  },
  'trophy-mementos': {
    title: 'Trophies & Mementos',
    slug: 'trophy-mementos',
    division: 'Design & Printing',
    description: 'Custom designed awards, crystal trophies, wooden plaques, and metallic mementos tailored for corporate recognition, sporting events, and milestones.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1600',
    features: ['Laser Engraving', '3D Laser Crystal Etching', 'Custom Metal Casting', 'Handcrafted Solid Wood Bases'],
    advantages: [
      'Honor excellence with timeless, heirloom-quality awards.',
      'Precision laser engraving for sharp logo and recipient detail.',
      'Custom bespoke shapes tailored to your brand identity.',
      'Includes premium velvet presentation gift boxes.'
    ],
    availableProducts: ['Optical Crystal Awards', 'Solid Teak Wooden Plaques', 'Gold/Silver Plated Cups', 'Acrylic Floating Frames'],
    materialsUsed: ['K9 Optical Crystal', 'Polished Brass & Bronze', 'Natural Rosewood & Teak'],
    faqs: [
      { question: 'Can you engrave our company logo on the trophy?', answer: 'Yes! We use high-precision fiber laser engraving to etch detailed logos and text.' }
    ]
  },
  'customized-gifts': {
    title: 'Customized Corporate Gifts',
    slug: 'customized-gifts',
    division: 'Design & Printing',
    description: 'Delight clients and employees with customized corporate gifts including executive diaries, metal pens, drinkware, apparel, and curated gift boxes.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600',
    features: ['Custom Logo Debossing', 'UV Printing & Engraving', 'Luxury Gift Box Packaging', 'Curated Welcome Kits'],
    advantages: [
      'Strengthen client relationships and employee appreciation.',
      'High utility items that keep your brand visible daily.',
      'Bespoke gift box assembly tailored to your budget.',
      'Express fulfillment for festival and annual events.'
    ],
    availableProducts: ['Leatherette Executive Planners', 'Insulated Vacuum Flasks', 'Engraved Metal Pens', 'Custom Polo T-Shirts'],
    materialsUsed: ['Food-grade Stainless Steel', 'PU Leatherette', 'Eco-friendly Kraft Packaging'],
    faqs: [
      { question: 'Can you create onboarding kits for new employees?', answer: 'Yes! We specialize in custom onboarding boxes with branded notebooks, pens, mugs, and keychains.' }
    ]
  },
  'flex-printing': {
    title: 'Flex & Large Format Printing',
    slug: 'flex-printing',
    division: 'Design & Printing',
    description: 'High-impact outdoor hoardings, flex banners, vinyl prints, roll-up standees, and event backdrops printed with vibrant weatherproof UV inks.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=1600',
    features: ['High DPI Large Format Print', 'UV Weatherproof & Tear-resistant', 'Backlit & Frontlit Materials', 'Aluminum Roll-Up Standees'],
    advantages: [
      'Maximum outdoor visibility for events and promotional campaigns.',
      'Fade-resistant inks withstand heavy rain and intense sunlight.',
      'Fast same-day printing available for urgent events.',
      'Complete installation and mounting service available.'
    ],
    availableProducts: ['Frontlit Flex Banners', 'Backlit Board Flex', 'Star Flex High-Glow Banners', 'Retractable Standees'],
    materialsUsed: ['Heavy 340gsm - 440gsm PVC Flex', 'Solvent & UV Inks', 'Reinforced Metal Eyelets'],
    faqs: [
      { question: 'Are flex banners resistant to rain and sun?', answer: 'Yes, our UV and solvent inks are 100% waterproof and UV fade-resistant for long-term outdoor use.' }
    ]
  },
  'id-cards': {
    title: 'ID Cards & Smart Access Cards',
    slug: 'id-cards',
    division: 'Design & Printing',
    description: 'Professional PVC ID cards, RFID smart proximity cards, and custom printed lanyards for corporate offices, schools, and hospitals.',
    image: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=1600',
    features: ['HD Retransfer Printing', 'RFID / NFC Smart Chip Embedded', 'Anti-scratch Overlamination', 'Custom Lanyard Screenprint'],
    advantages: [
      'Enhance organizational security and employee identification.',
      'Durable fused PVC cards that do not peel or fade.',
      'Seamless integration with biometric attendance machines.',
      'Custom branded lanyards with safety breakaway clasps.'
    ],
    availableProducts: ['Standard PVC ID Cards', 'RFID Proximity Smart Cards', 'Magnetic Stripe Cards', 'Satin Lanyards with Reel'],
    materialsUsed: ['0.76mm Rigid PVC', 'Dual-frequency RFID Chips', 'High-density Satin Ribbon'],
    faqs: [
      { question: 'Can you encode RFID data on the cards?', answer: 'Yes, we provide pre-encoded RFID/NFC smart cards ready for your access control system.' }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let fetchedService = null;

      try {
        const { data } = await api.get(`/services/slug/${slug}`);
        if (data && data.title) {
          fetchedService = data;
        }
      } catch (err) {
        console.log('Using local fallback for service details');
      }

      const fallback = serviceFallbackMap[slug] || serviceFallbackMap['cctv'];
      const validImage = (fetchedService?.image && fetchedService.image.startsWith('http')) 
        ? fetchedService.image 
        : fallback.image;

      const merged = {
        ...fallback,
        ...fetchedService,
        image: validImage,
        advantages: (fetchedService?.advantages && fetchedService.advantages.length > 0) ? fetchedService.advantages : fallback.advantages,
        availableProducts: (fetchedService?.availableProducts && fetchedService.availableProducts.length > 0) ? fetchedService.availableProducts : fallback.availableProducts,
        materialsUsed: (fetchedService?.materialsUsed && fetchedService.materialsUsed.length > 0) ? fetchedService.materialsUsed : fallback.materialsUsed,
        faqs: (fetchedService?.faqs && fetchedService.faqs.length > 0) ? fetchedService.faqs : fallback.faqs,
        features: (fetchedService?.features && fetchedService.features.length > 0) ? fetchedService.features : fallback.features,
      };

      setService(merged);

      // Fetch related projects
      try {
        const { data: projectsData } = await api.get(`/projects/service/${slug}`);
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          const { data: allProjects } = await api.get('/projects');
          setProjects(allProjects ? allProjects.slice(0, 3) : []);
        }
      } catch (err) {
        setProjects([]);
      }
      
    } catch (err) {
      console.error(err);
      setService(serviceFallbackMap[slug] || serviceFallbackMap['cctv']);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isDesign = service.division === 'Design & Printing';
  const ThemeIcon = isDesign ? Palette : ShieldCheck;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] selection:bg-[#C6A15B] selection:text-white">
      <Helmet>
        <title>{service.title} | JK Solutions</title>
        <meta name="description" content={service.description} />
      </Helmet>
      
      <Navbar />

      {/* Hero Header Section (Clean, Crisp Backdrop Without Background Image Clutter) */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 bg-[#FAF8F5] border-b border-[#C6A15B]/20 overflow-hidden">
        
        {/* Soft Ambient Light Glow Accents */}
        <div className="absolute top-0 right-0 w-[550px] h-[400px] bg-gradient-to-bl from-[#C6A15B]/10 via-amber-100/20 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-slate-200/40 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#9E8148] mb-6"
          >
            <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-[#111111] transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-[#111111] font-bold">{service.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Title, Division, Description & Feature Badges */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Division Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[#9E8148] font-extrabold tracking-[0.2em] text-[10px] sm:text-xs uppercase bg-[#C6A15B]/15 px-4 py-1.5 rounded-full border border-[#C6A15B]/35 mb-4 shadow-xs"
              >
                <ThemeIcon size={14} /> {service.division}
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] leading-[1.1] tracking-tight mb-4 font-[#Plus Jakarta Sans]"
              >
                {service.title}
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-lg text-slate-700 max-w-2xl leading-relaxed mb-6 font-normal"
              >
                {service.description}
              </motion.p>

              {/* Feature Chips */}
              {service.features && service.features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2.5"
                >
                  {service.features.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-slate-900 border border-slate-200 shadow-xs flex items-center gap-2"
                    >
                      <Sparkles size={13} className="text-[#C6A15B]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column: Hero Showcase Image Card (Sharp Corners, No Border Radius) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              {/* Sharp Edge Luxury Showcase Frame */}
              <div className="relative rounded-none border-l-4 border-t border-b border-r border-[#C6A15B] border-l-[#C6A15B] shadow-2xl overflow-hidden bg-slate-950 h-[340px] sm:h-[400px] group">
                <img 
                  src={service.image} 
                  alt={service.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1600';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#C6A15B]">
                      JK PREMIUM STANDARDS
                    </span>
                    <h4 className="text-base font-bold text-white font-heading truncate">
                      {service.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C6A15B] text-white flex items-center justify-center font-bold shadow-md shrink-0 ml-3">
                    ✓
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Main Content Details Section (Compact Spacing & Clean Grid) */}
      <section className="py-10 sm:py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            
            {/* Left Column: Advantages, Specifications & FAQs */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              
              {/* Key Advantages */}
              {service.advantages && service.advantages.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E8148] mb-1.5">
                    — KEY ADVANTAGES —
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-6 font-[#Plus Jakarta Sans]">
                    Why Choose Our {service.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.advantages.map((adv, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-4.5 rounded-xl border border-slate-200/90 hover:border-[#C6A15B]/80 transition-all shadow-xs hover:shadow-sm group flex items-start gap-3.5"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5 group-hover:bg-[#C6A15B] group-hover:text-white transition-colors">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {adv}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Products & Quality Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
                
                {/* Available Models */}
                {service.availableProducts && service.availableProducts.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                        <Layers size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-[#111111]">Available Models</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {service.availableProducts.map((prod, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <ChevronRight size={14} className="text-[#C6A15B] shrink-0" />
                          <span>{prod}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Technical / Material Specifications */}
                {service.materialsUsed && service.materialsUsed.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                        <Package size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-[#111111]">Quality Specifications</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {service.materialsUsed.map((mat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 size={14} className="text-[#C6A15B] shrink-0" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

              </div>

              {/* FAQs Accordion */}
              {service.faqs && service.faqs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#9E8148] mb-1.5">
                    — FREQUENTLY ASKED QUESTIONS —
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-6 font-[#Plus Jakarta Sans]">
                    Got Questions? We Have Answers.
                  </h2>

                  <div className="space-y-3">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div 
                          key={idx} 
                          className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden hover:border-[#C6A15B]/70 transition-colors"
                        >
                          <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-base text-[#111111] hover:text-[#C6A15B] transition-colors cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <div className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#C6A15B] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#C6A15B] text-white' : ''}`}>
                              <ChevronDown size={14} />
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Column: Sticky Quote Request Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 sm:top-36 space-y-5">
                
                {/* Main Quote Booking Card */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#C6A15B]/30 shadow-xl relative overflow-hidden text-slate-900">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A15B]/10 rounded-full blur-2xl pointer-events-none" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9E8148] block mb-1.5">
                    FREE CONSULTATION
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-2.5 font-[#Plus Jakarta Sans]">
                    Request a Custom Quote
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Get an instant estimate and free site evaluation from our certified engineering team.
                  </p>

                  <div className="space-y-3 mb-6">
                    <Link to="/contact">
                      <Button variant="primary" className="w-full justify-center py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#C6A15B] text-white hover:bg-[#B5904B] shadow-md shadow-[#C6A15B]/20 flex items-center gap-2">
                        <MessageSquare size={16} /> Request Free Quote <ArrowRight size={14} />
                      </Button>
                    </Link>
                    
                    <a 
                      href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20services"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={15} /> Instant WhatsApp Quote
                    </a>
                  </div>

                  <div className="pt-4 border-t border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">Direct Phone Hotline</span>
                    <a href="tel:+919876543210" className="text-base sm:text-lg font-black text-[#C6A15B] hover:text-[#111111] transition-colors">
                      +91 98765 43210
                    </a>
                  </div>

                </div>

                {/* Official Warranty & Support Badge */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#C6A15B]/15 text-[#C6A15B] flex items-center justify-center shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111111]">Official Warranty & Support</div>
                    <div className="text-[10px] text-slate-500 font-medium">100% Genuine Certified Equipment</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Recent Projects Portfolio Section */}
      {projects && projects.length > 0 && (
        <section className="py-12 sm:py-18 bg-[#FAF8F5] border-t border-[#C6A15B]/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9E8148] block mb-1">
                  — PORTFOLIO SHOWCASE —
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#111111] font-[#Plus Jakarta Sans]">
                  Recent Implementations
                </h2>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-extrabold text-[#C6A15B] uppercase tracking-wider hover:text-[#111111] transition-colors">
                View All Projects <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <motion.div 
                  key={project._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group block rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-[#C6A15B] transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <Link to={`/projects/${project.slug}`}>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#101312]">
                      <img 
                        src={project.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-widest bg-[#C6A15B] text-white px-2.5 py-1 rounded-full shadow-xs">
                        {project.category || 'Featured Project'}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-[#111111] group-hover:text-[#C6A15B] transition-colors mb-1.5 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetail;
