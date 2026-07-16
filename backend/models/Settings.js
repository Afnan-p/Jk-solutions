import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  phoneMain: { type: String, default: '+91 98765 43210' },
  phoneSupport: { type: String, default: '+91 98765 09876' },
  emailSales: { type: String, default: 'sales@jksecurity.com' },
  emailSupport: { type: String, default: 'support@jksecurity.com' },
  address: { type: String, default: '123 Corporate Tower, MG Road, Ernakulam, Kerala, India - 682001' },
  businessHoursWeekdays: { type: String, default: '9:00 AM - 6:00 PM' },
  businessHoursSaturday: { type: String, default: '10:00 AM - 4:00 PM' },
  googleMapUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3929.35105658632!2d76.3142718747926!3d9.987823573254924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d50756778f7%3A0xc66c1b359f138bf5!2sMG%20Road%2C%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin' },
  founderName: { type: String, default: 'Jaseel Kumar' },
  founderRole: { type: String, default: 'Chief Designer & Founder' },
  founderImage: { type: String, default: 'https://pngimg.com/uploads/businessman/businessman_PNG6566.png' },
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
