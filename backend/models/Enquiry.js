import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  serviceInterest: { type: String },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Completed', 'Rejected'], 
    default: 'New' 
  },
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
