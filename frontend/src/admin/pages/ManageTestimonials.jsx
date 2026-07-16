import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Star, Upload, MessageSquareQuote, ChevronDown } from 'lucide-react';
import api from '../../api';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    text: '',
    rating: 5,
    isActive: true
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials');
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        image: testimonial.image || '',
        text: testimonial.text,
        rating: testimonial.rating,
        isActive: testimonial.isActive
      });
    } else {
      setEditingTestimonial(null);
      setFormData({ name: '', role: '', image: '', text: '', rating: 5, isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
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
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, formData);
      } else {
        await api.post('/testimonials', formData);
      }
      handleCloseModal();
      fetchTestimonials();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        alert('Error deleting testimonial');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Testimonials</h1>
          <p className="text-gray-400 text-sm">Add, edit, or remove client reviews from the homepage.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-accent text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#e5a013] transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <MessageSquareQuote size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No testimonials found.</p>
            <p className="text-gray-500 text-sm mt-1">Click the Add Review button to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Client</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Rating</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300 hidden md:table-cell">Review snippet</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {testimonials.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image || `https://ui-avatars.com/api/?name=${item.name}&background=random`} 
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex text-accent">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <p className="text-sm text-gray-400 line-clamp-1 max-w-xs">{item.text}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {item.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(item)} className="p-2 text-gray-400 hover:text-accent transition-colors bg-white/5 rounded-lg hover:bg-accent/10">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-lg hover:bg-red-400/10">
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
              className="bg-[#101010] border border-white/10 p-6 rounded-2xl w-full max-w-lg my-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{editingTestimonial ? 'Edit Review' : 'Add New Review'}</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Client Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Role / Company</label>
                    <input 
                      type="text" 
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                      placeholder="e.g. CEO, TechSpace"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Review Text</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Client Photo (Optional)</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 hover:border-accent hover:text-accent text-gray-400 rounded-lg px-4 py-2 cursor-pointer transition-colors w-full">
                        <Upload size={16} />
                        <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                      {formData.image && (
                        <img src={formData.image} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Star Rating</label>
                    <div className="relative">
                      <select 
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none appearance-none"
                      >
                        <option value={5} className="bg-[#101010] text-white">5 Stars (Excellent)</option>
                        <option value={4} className="bg-[#101010] text-white">4 Stars (Very Good)</option>
                        <option value={3} className="bg-[#101010] text-white">3 Stars (Good)</option>
                        <option value={2} className="bg-[#101010] text-white">2 Stars (Fair)</option>
                        <option value={1} className="bg-[#101010] text-white">1 Star (Poor)</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-300">Show on Homepage</label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={uploading} className="bg-accent text-black font-semibold px-6 py-2.5 rounded-xl hover:bg-[#e5a013] transition-colors disabled:opacity-50">
                    {editingTestimonial ? 'Update Review' : 'Save Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTestimonials;
