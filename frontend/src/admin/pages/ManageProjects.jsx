import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Star, X, Upload, ChevronDown } from 'lucide-react';
import api from '../../api';
import Button from '../../components/Button';

const ManageProjects = () => {
  const { division } = useParams();
  const divisionName = division === 'design' ? 'Design & Printing' : 'Security Solutions';

  const [projects, setProjects] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    division: divisionName,
    category: '',
    serviceUsed: '',
    client: '',
    location: '',
    description: '',
    coverImage: '',
    isFeatured: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, [division]);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      setAvailableServices(data);
    } catch (err) {
      console.error('Failed to fetch services');
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        slug: project.slug || '',
        division: project.division || 'Security Solutions',
        category: project.category,
        serviceUsed: project.serviceUsed || '',
        client: project.client || '',
        location: project.location || '',
        description: project.description,
        coverImage: project.coverImage,
        isFeatured: project.isFeatured
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', slug: '', division: divisionName, category: '', serviceUsed: '', client: '', location: '', description: '', coverImage: '', isFeatured: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setUploading(true);
      const { data } = await api.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, coverImage: data.url });
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      
      handleCloseModal();
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        alert('Error deleting project');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage {divisionName} Projects</h1>
          <p className="text-sm text-gray-400">Add, update, or remove projects from your portfolio.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 text-sm !px-4 !py-2 !rounded-lg">
          <Plus size={18} /> Add New Project
        </Button>
      </div>

      <div className="bg-[#050505] p-6 rounded-2xl border border-white/5">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 bg-red-400/10 rounded-xl">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <div className="text-gray-400 mb-4">No projects found in the database.</div>
            <Button variant="secondary" onClick={() => handleOpenModal()} className="mx-auto !px-4 !py-2 !rounded-lg text-sm">Create Your First Project</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Project Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Featured</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(p => p.division === divisionName || (!p.division && divisionName === 'Security Solutions')).map((project) => (
                  <tr key={project._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {project.coverImage ? (
                          <img src={project.coverImage} alt={project.title} className="w-12 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                        ) : (
                          <div className="w-12 h-10 rounded-lg bg-white/10 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{project.client || 'Internal'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-300">
                      {project.category}
                    </td>
                    <td className="py-4">
                      {project.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                          <Star size={12} fill="currentColor" /> Featured
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(project)} className="p-2 text-gray-400 hover:text-accent transition-colors bg-white/5 rounded-lg hover:bg-accent/10">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-lg hover:bg-red-400/10">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" data-lenis-prevent="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#101010] border border-white/10 p-6 rounded-2xl w-full max-w-2xl my-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setFormData({...formData, title, slug});
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Division</label>
                    <div className="relative">
                      <select 
                        value={formData.division}
                        onChange={(e) => setFormData({...formData, division: e.target.value, category: '', serviceUsed: ''})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none appearance-none"
                      >
                        <option value="Security Solutions" className="bg-[#101010] text-white">Security Solutions</option>
                        <option value="Design & Printing" className="bg-[#101010] text-white">Design & Printing</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Service Category</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.serviceUsed}
                        onChange={(e) => {
                          const selectedService = availableServices.find(s => s.slug === e.target.value);
                          setFormData({
                            ...formData, 
                            serviceUsed: e.target.value,
                            category: selectedService ? selectedService.title : ''
                          });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none appearance-none"
                      >
                        <option value="" disabled className="bg-[#101010] text-gray-500">Select a Service</option>
                        {availableServices
                          .filter(s => s.division === formData.division)
                          .map(service => (
                            <option key={service._id} value={service.slug} className="bg-[#101010] text-white">{service.title}</option>
                          ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Client (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.client}
                      onChange={(e) => setFormData({...formData, client: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea 
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 hover:border-accent hover:text-accent text-gray-400 rounded-lg px-4 py-3 cursor-pointer transition-colors w-full md:w-auto">
                      <Upload size={18} />
                      <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                    {formData.coverImage && (
                      <div className="w-16 h-10 rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                        <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input 
                    type="checkbox" 
                    id="isFeatured" 
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor="isFeatured" className="text-sm text-gray-300">Feature this project on the homepage</label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button type="button" variant="secondary" onClick={handleCloseModal} className="!px-6 !py-2 text-sm !rounded-lg">
                    Cancel
                  </Button>
                  <Button type="submit" className="!px-6 !py-2 text-sm !rounded-lg" disabled={uploading}>
                    {editingProject ? 'Save Changes' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProjects;
