import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  division: { 
    type: String, 
    enum: ['Security Solutions', 'Design & Printing'], 
    default: 'Security Solutions' 
  },
  category: { type: String, required: true }, // e.g. Home Automation, ID Cards
  serviceUsed: { type: String }, // Which specific service this project relates to
  client: { type: String },
  location: { type: String },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  gallery: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
