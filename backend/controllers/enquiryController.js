import Enquiry from '../models/Enquiry.js';

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new enquiry (Public route usually)
export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, serviceInterest, message } = req.body;
    const enquiry = await Enquiry.create({ name, phone, email, serviceInterest, message });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    
    enquiry.status = status;
    const updatedEnquiry = await enquiry.save();
    
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    
    await Enquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Enquiry removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
