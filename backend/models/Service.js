import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  division: { 
    type: String, 
    enum: ['Security Solutions', 'Design & Printing'], 
    default: 'Security Solutions' 
  },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL
  features: [{ type: String }],
  
  // Rich Content for Dedicated Pages
  advantages: [{ type: String }],
  availableProducts: [{ type: String }],
  materialsUsed: [{ type: String }],
  faqs: [{ 
    question: { type: String },
    answer: { type: String }
  }],

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
