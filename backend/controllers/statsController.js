import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Enquiry from '../models/Enquiry.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [totalProjects, totalServices, totalEnquiries, recentEnquiries] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      totalProjects,
      totalServices,
      totalEnquiries,
      recentEnquiries
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
