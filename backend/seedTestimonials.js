import mongoose from 'mongoose';
import Testimonial from './models/Testimonial.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/jk-security';

const dummyData = [
  {
    name: 'Rajesh Kumar',
    role: 'Homeowner, Luxury Villa',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'JK Security completely transformed our home. The home automation and security systems are incredibly seamless and reliable. Highly recommend their premium services.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Anita Desai',
    role: 'CEO, TechSpace India',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The CCTV and access control installation at our corporate office was executed with utmost professionalism. Their team is knowledgeable and uses only top-tier equipment.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Mohammed Ali',
    role: 'Architect',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
    text: 'As an architect, I appreciate their clean installations and attention to aesthetic details. They integrate smart solutions without ruining the design of the space.',
    rating: 4,
    isActive: true
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(dummyData);
    console.log('Testimonials seeded');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
