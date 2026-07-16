import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Project from './models/Project.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const servicesData = [
  // Security Solutions
  {
    title: 'CCTV Surveillance',
    slug: 'cctv',
    division: 'Security Solutions',
    description: 'High-definition security cameras with AI tracking and cloud backup to ensure your premises are safe 24/7.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2069&auto=format&fit=crop',
    features: ['24/7 Monitoring', 'AI Motion Detection', 'Cloud Storage', 'Night Vision'],
    advantages: ['Deters criminal activity', 'Provides clear evidence', 'Remote viewing from anywhere', 'Lower insurance premiums'],
    availableProducts: ['Bullet Cameras', 'Dome Cameras', 'PTZ Cameras', 'NVR/DVR Systems'],
    materialsUsed: ['Weatherproof housing', 'High-grade lenses', 'Cat6 Cabling'],
    faqs: [
      { question: 'How long is the footage stored?', answer: 'It depends on your storage capacity, but typically 30 to 90 days.' },
      { question: 'Can I view the cameras on my phone?', answer: 'Yes, our systems come with a secure mobile app for live viewing.' }
    ],
    isActive: true
  },
  {
    title: 'Home Automation',
    slug: 'home-automation',
    division: 'Security Solutions',
    description: 'Control lighting, climate, and entertainment from your smartphone for the ultimate luxury living experience.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop',
    features: ['Voice Control', 'Energy Management', 'Automated Lighting', 'Climate Control'],
    advantages: ['Unmatched convenience', 'Energy savings', 'Enhanced security', 'Increased home value'],
    availableProducts: ['Smart Hubs', 'Smart Switches', 'Automated Blinds', 'Smart Thermostats'],
    materialsUsed: ['Premium glass touch panels', 'Wireless mesh networking'],
    faqs: [
      { question: 'Do I need to rewire my house?', answer: 'Not necessarily. We offer both wired and wireless retrofittable solutions.' }
    ],
    isActive: true
  },
  {
    title: 'Gate Automation',
    slug: 'gate-automation',
    division: 'Security Solutions',
    description: 'Secure, motorized gates with remote access and intercom integration for residential and commercial properties.',
    image: 'https://images.unsplash.com/photo-1621877688204-74d420454378?q=80&w=2070&auto=format&fit=crop',
    features: ['Remote Access', 'Intercom Integration', 'Auto-close', 'Safety Sensors'],
    advantages: ['Enhanced perimeter security', 'Convenience', 'Aesthetic appeal'],
    availableProducts: ['Sliding Gate Motors', 'Swing Gate Motors', 'Boom Barriers'],
    materialsUsed: ['Heavy-duty steel', 'Weather-resistant motors'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Solar Systems',
    slug: 'solar',
    division: 'Security Solutions',
    description: 'Efficient, sustainable power solutions for modern luxury homes and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
    features: ['High Efficiency Panels', 'Battery Backup', 'Grid-Tie Options', 'Smart Monitoring'],
    advantages: ['Reduce electricity bills', 'Eco-friendly', 'Energy independence'],
    availableProducts: ['Monocrystalline Panels', 'Hybrid Inverters', 'Lithium Batteries'],
    materialsUsed: ['Tempered glass', 'Aluminum frames'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Smart Locks',
    slug: 'smart-locks',
    division: 'Security Solutions',
    description: 'Keyless entry with biometric and remote access capabilities for ultimate convenience and security.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?q=80&w=2064&auto=format&fit=crop',
    features: ['Fingerprint Access', 'Passcode Entry', 'App Control', 'Auto-lock'],
    advantages: ['No more lost keys', 'Temporary access for guests', 'Activity logs'],
    availableProducts: ['Mortise Locks', 'Rim Locks', 'Glass Door Locks'],
    materialsUsed: ['Zinc alloy', 'Tempered glass panels'],
    faqs: [],
    isActive: true
  },

  // Design & Printing
  {
    title: 'ID Cards',
    slug: 'id-cards',
    division: 'Design & Printing',
    description: 'Premium quality ID cards for corporates, hospitals, and educational institutions with smart card capabilities.',
    image: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=2080&auto=format&fit=crop',
    features: ['RFID/NFC Enabled', 'High Durability', 'Custom Lanyards', 'Anti-fade Printing'],
    advantages: ['Professional appearance', 'Access control integration', 'Durable design'],
    availableProducts: ['PVC Cards', 'Smart Cards', 'Proximity Cards'],
    materialsUsed: ['High-grade PVC', 'Thermal transfer ink'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Trophy & Mementos',
    slug: 'trophy-mementos',
    division: 'Design & Printing',
    description: 'Customized awards and mementos crafted from premium materials for special corporate and sporting events.',
    image: 'https://images.unsplash.com/photo-1589828131333-d7316973ba52?q=80&w=2070&auto=format&fit=crop',
    features: ['Custom Engraving', '3D Crystal', 'Wooden Plaques', 'Metal Trophies'],
    advantages: ['Memorable recognition', 'Premium feel', 'Fully customizable'],
    availableProducts: ['Crystal Trophies', 'Wooden Mementos', 'Acrylic Awards'],
    materialsUsed: ['Crystal', 'Premium Wood', 'Acrylic', 'Metal alloys'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Customized Gifts',
    slug: 'customized-gifts',
    division: 'Design & Printing',
    description: 'Personalized gifting solutions for clients and employees to enhance brand loyalty and appreciation.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9f24309dd0?q=80&w=2070&auto=format&fit=crop',
    features: ['Corporate Branding', 'Premium Packaging', 'Bulk Orders', 'Wide Variety'],
    advantages: ['Brand building', 'Employee retention', 'Client relationship management'],
    availableProducts: ['Diaries', 'Pens', 'Mugs', 'Apparel'],
    materialsUsed: ['Various premium materials'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Flex Printing',
    slug: 'flex-printing',
    division: 'Design & Printing',
    description: 'High-resolution flex and banner printing for outdoor marketing, hoardings, and event backdrops.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=2070&auto=format&fit=crop',
    features: ['Weatherproof', 'High Resolution', 'Large Format', 'Fast Turnaround'],
    advantages: ['High visibility', 'Cost-effective marketing', 'Durable for outdoors'],
    availableProducts: ['Frontlit Flex', 'Backlit Flex', 'Vinyl', 'Sunpack Boards'],
    materialsUsed: ['PVC Flex material', 'Solvent Inks'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Corporate Printing',
    slug: 'corporate-printing',
    division: 'Design & Printing',
    description: 'Professional letterheads, brochures, business cards, and corporate stationery printing.',
    image: 'https://images.unsplash.com/photo-1612015900186-b4130097a8e7?q=80&w=1964&auto=format&fit=crop',
    features: ['Premium Paper', 'Spot UV', 'Foil Stamping', 'Die Cutting'],
    advantages: ['Professional brand image', 'Tactile quality', 'Consistent branding'],
    availableProducts: ['Business Cards', 'Brochures', 'Letterheads', 'Envelopes'],
    materialsUsed: ['Textured paper', 'Matte/Glossy finishes'],
    faqs: [],
    isActive: true
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    division: 'Design & Printing',
    description: 'Creative logo design, social media posters, UI/UX, and comprehensive brand identity development.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    features: ['Logo Design', 'Brand Guidelines', 'Social Media Creatives', 'Print Design'],
    advantages: ['Unique brand identity', 'Professional aesthetics', 'Higher engagement'],
    availableProducts: ['Brand Kits', 'Social Media Templates', 'Vector Assets'],
    materialsUsed: ['Digital files (AI, PSD, EPS)'],
    faqs: [],
    isActive: true
  }
];

const projectsData = [
  {
    title: 'Luxury Villa Security Integration',
    slug: 'luxury-villa-cctv',
    division: 'Security Solutions',
    category: 'CCTV',
    serviceUsed: 'cctv',
    client: 'Private Residence, Calicut',
    location: 'Calicut',
    description: 'Complete perimeter and internal security integration for a 10,000 sq ft luxury villa. Included 32 IP cameras with AI human detection and 60 days of redundant cloud and NVR storage.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
    ],
    isFeatured: true
  },
  {
    title: 'TechPark Smart Access',
    slug: 'techpark-smart-access',
    division: 'Security Solutions',
    category: 'Smart Locks',
    serviceUsed: 'smart-locks',
    client: 'CyberSpace IT Park',
    location: 'Kochi',
    description: 'Implemented an enterprise-grade biometric and RFID access control system for a 5-story IT park, integrating with their existing HR attendance software.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    gallery: [],
    isFeatured: true
  },
  {
    title: 'Corporate Rebranding ID Cards',
    slug: 'corporate-id-rebrand',
    division: 'Design & Printing',
    category: 'ID Cards',
    serviceUsed: 'id-cards',
    client: 'Global Logistics Inc',
    location: 'Dubai',
    description: 'Designed and printed 2,500 NFC-enabled smart ID cards with premium custom lanyards for a major logistics company rebranding.',
    coverImage: 'https://images.unsplash.com/photo-1634034379073-f689b460a3fc?q=80&w=2080&auto=format&fit=crop',
    gallery: [],
    isFeatured: true
  },
  {
    title: 'Annual Sports Meet Trophies',
    slug: 'annual-sports-trophies',
    division: 'Design & Printing',
    category: 'Trophies',
    serviceUsed: 'trophy-mementos',
    client: 'St. Marys College',
    location: 'Thrissur',
    description: 'Manufactured 150 custom-designed crystal trophies and wooden mementos for the university annual sports meet.',
    coverImage: 'https://images.unsplash.com/photo-1589828131333-d7316973ba52?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    isFeatured: true
  },
  {
    title: 'Automated Swing Gates',
    slug: 'automated-swing-gates',
    division: 'Security Solutions',
    category: 'Gate Automation',
    serviceUsed: 'gate-automation',
    client: 'Emerald Apartments',
    location: 'Trivandrum',
    description: 'Installed heavy-duty dual swing gate motors with long-range remote access and video intercom for a premium apartment complex.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    isFeatured: false
  }
];

const importData = async () => {
  try {
    // Clear existing data if you want a clean slate, or just add. We'll clear to prevent duplicates for this seed.
    await Service.deleteMany();
    await Project.deleteMany();

    await Service.insertMany(servicesData);
    await Project.insertMany(projectsData);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with import: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  importData();
});
