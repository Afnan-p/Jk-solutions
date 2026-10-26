import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, CheckCircle, XCircle, X, Upload, ChevronDown } from 'lucide-react';
import api from '../../api';
import Button from '../../components/Button';
import { useToast } from '../components/Toast';

const ManageServices = () => {
  const { toast } = useToast();
  const { division } = useParams();
  const divisionName = division === 'design' ? 'Design & Printing' : 'Security Solutions';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    features: '', 
    division: divisionName,
    advantages: '',
    availableProducts: '',
    materialsUsed: '',
    faqs: [],
    isActive: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [division]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/services');
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        slug: service.slug,
        description: service.description,
        image: service.image,
        features: service.features ? service.features.join(', ') : '',
        division: service.division || 'Security Solutions',
        advantages: service.advantages ? service.advantages.join(', ') : '',
        availableProducts: service.availableProducts ? service.availableProducts.join(', ') : '',
        materialsUsed: service.materialsUsed ? service.materialsUsed.join(', ') : '',
        faqs: service.faqs ? service.faqs : [],
        isActive: service.isActive !== undefined ? service.isActive : true
      });
    } else {
      setEditingService(null);
      setFormData({ 
        title: '', slug: '', description: '', image: '', features: '', 
        division: divisionName, advantages: '', availableProducts: '', materialsUsed: '', faqs: [], isActive: true 
      });
    }
    setIsModalOpen(true);
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }]
    });
  };

  const handleRemoveFaq = (index) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index)
    });
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData({ ...formData, faqs: updated });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
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
      setFormData({ ...formData, image: data.url });
      toast.success('Service image uploaded successfully');
    } catch (error) {
      toast.error('Error uploading service image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()).filter(f => f) : formData.features,
        advantages: typeof formData.advantages === 'string' ? formData.advantages.split(',').map(f => f.trim()).filter(f => f) : formData.advantages,
        availableProducts: typeof formData.availableProducts === 'string' ? formData.availableProducts.split(',').map(f => f.trim()).filter(f => f) : formData.availableProducts,
        materialsUsed: typeof formData.materialsUsed === 'string' ? formData.materialsUsed.split(',').map(f => f.trim()).filter(f => f) : formData.materialsUsed,
        faqs: formData.faqs.filter(f => f.question && f.answer)
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
        toast.success('Service updated successfully');
      } else {
        await api.post('/services', payload);
        toast.success('Service created successfully');
      }
      
      handleCloseModal();
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
        toast.success('Service deleted successfully');
      } catch (error) {
        toast.error('Error deleting service');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage {divisionName} Services</h1>
          <p className="text-sm text-gray-400">Add, update, or remove services offered to clients.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 text-sm !px-4 !py-2 !rounded-lg">
          <Plus size={18} /> Add New Service
        </Button>
      </div>

      <div className="bg-[#050505] p-6 rounded-2xl border border-white/5">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading services...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 bg-red-400/10 rounded-xl">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <div className="text-gray-400 mb-4">No services found in the database.</div>
            <Button variant="secondary" onClick={() => handleOpenModal()} className="mx-auto !px-4 !py-2 !rounded-lg text-sm">Create Your First Service</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Service Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Created At</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.filter(s => s.division === divisionName || (!s.division && divisionName === 'Security Solutions')).map((service) => (
                  <tr key={service._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=200';
                            }}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" 
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-white font-medium">{service.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                          <CheckCircle size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-400/10 px-2 py-1 rounded-full">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-sm text-gray-400">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(service)} className="p-2 text-gray-400 hover:text-accent transition-colors bg-white/5 rounded-lg hover:bg-accent/10">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(service._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-lg hover:bg-red-400/10">
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
                <h2 className="text-xl font-bold text-white">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Division</label>
                  <div className="relative">
                    <select 
                      value={formData.division}
                      onChange={(e) => setFormData({...formData, division: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none appearance-none"
                    >
                      <option value="Security Solutions" className="bg-[#101010] text-white">Security Solutions</option>
                      <option value="Design & Printing" className="bg-[#101010] text-white">Design & Printing</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
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
                  <label className="block text-sm font-medium text-gray-400 mb-1">Features (Comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.features}
                    placeholder="e.g. 24/7 Monitoring, AI Detection"
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Advantages (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formData.advantages}
                      onChange={(e) => setFormData({...formData, advantages: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Products (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formData.availableProducts}
                      onChange={(e) => setFormData({...formData, availableProducts: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Materials (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formData.materialsUsed}
                      onChange={(e) => setFormData({...formData, materialsUsed: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* FAQs Section Builder */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-400">Frequently Asked Questions (FAQs)</label>
                    <button 
                      type="button" 
                      onClick={handleAddFaq} 
                      className="text-xs text-[#C6A15B] hover:underline flex items-center gap-1 font-bold"
                    >
                      + Add FAQ Item
                    </button>
                  </div>
                  
                  {formData.faqs.length === 0 ? (
                    <div className="text-xs text-gray-500 italic p-2 border border-dashed border-white/10 rounded-lg">No FAQs added. Click "+ Add FAQ Item" above to add custom questions and answers.</div>
                  ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {formData.faqs.map((faq, idx) => (
                        <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#C6A15B] font-bold">FAQ #{idx + 1}</span>
                            <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                          </div>
                          <input 
                            type="text" 
                            placeholder="Question" 
                            value={faq.question}
                            onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white outline-none"
                          />
                          <textarea 
                            placeholder="Answer" 
                            rows="2"
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white outline-none resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Service Image</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 hover:border-accent hover:text-accent text-gray-400 rounded-lg px-4 py-3 cursor-pointer transition-colors w-full md:w-auto">
                      <Upload size={18} />
                      <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                    {formData.image && (
                      <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-300">Service is Active</label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button type="button" variant="secondary" onClick={handleCloseModal} className="!px-6 !py-2 text-sm !rounded-lg">
                    Cancel
                  </Button>
                  <Button type="submit" className="!px-6 !py-2 text-sm !rounded-lg" disabled={uploading}>
                    {editingService ? 'Save Changes' : 'Create Service'}
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

export default ManageServices;
