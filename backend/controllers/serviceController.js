import Service from '../models/Service.js';

// Get all active services (with optional pagination)
export const getServices = async (req, res) => {
  try {
    const { page, limit, division } = req.query;
    
    // Build query
    let query = { isActive: true };
    if (division) {
      query.division = division;
    }

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const totalItems = await Service.countDocuments(query);
      const services = await Service.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

      return res.json({
        data: services,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalItems / limitNum),
          totalItems,
          hasNextPage: pageNum * limitNum < totalItems
        }
      });
    }

    // Default: return all
    const services = await Service.find(query).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by slug (for frontend dynamic pages)
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const { 
      title, slug, division, description, image, features,
      advantages, availableProducts, materialsUsed, faqs 
    } = req.body;
    
    const service = await Service.create({ 
      title, slug, division, description, image, features,
      advantages, availableProducts, materialsUsed, faqs 
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing service
export const updateService = async (req, res) => {
  try {
    const { 
      title, slug, division, description, image, features, isActive,
      advantages, availableProducts, materialsUsed, faqs 
    } = req.body;
    
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (title) service.title = title;
    if (slug) service.slug = slug;
    if (division) service.division = division;
    if (description) service.description = description;
    if (image) service.image = image;
    if (features) service.features = features;
    if (advantages) service.advantages = advantages;
    if (availableProducts) service.availableProducts = availableProducts;
    if (materialsUsed) service.materialsUsed = materialsUsed;
    if (faqs) service.faqs = faqs;
    if (isActive !== undefined) service.isActive = isActive;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
