import Project from '../models/Project.js';

// Get all projects (with optional pagination)
export const getProjects = async (req, res) => {
  try {
    const { page, limit, division } = req.query;
    
    // Build query
    let query = {};
    if (division) {
      query.division = division;
    }

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const totalItems = await Project.countDocuments(query);
      const projects = await Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

      return res.json({
        data: projects,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalItems / limitNum),
          totalItems,
          hasNextPage: pageNum * limitNum < totalItems
        }
      });
    }

    // Default: return all (for backward compatibility / Admin)
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get projects by service used (for dynamic service page)
export const getProjectsByService = async (req, res) => {
  try {
    const projects = await Project.find({ serviceUsed: req.params.serviceSlug }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by slug
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, slug, division, category, serviceUsed, client, location, description, coverImage, gallery, isFeatured } = req.body;
    const project = await Project.create({ 
      title, slug, division, category, serviceUsed, client, location, description, coverImage, gallery, isFeatured 
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const { title, slug, division, category, serviceUsed, client, location, description, coverImage, gallery, isFeatured } = req.body;
    
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (title) project.title = title;
    if (slug) project.slug = slug;
    if (division) project.division = division;
    if (category) project.category = category;
    if (serviceUsed !== undefined) project.serviceUsed = serviceUsed;
    if (client !== undefined) project.client = client;
    if (location !== undefined) project.location = location;
    if (description) project.description = description;
    if (coverImage) project.coverImage = coverImage;
    if (gallery) project.gallery = gallery;
    if (isFeatured !== undefined) project.isFeatured = isFeatured;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
