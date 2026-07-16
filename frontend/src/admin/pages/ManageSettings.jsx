import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import api from '../../api';

const ManageSettings = () => {
  const [formData, setFormData] = useState({
    phoneMain: '',
    phoneSupport: '',
    emailSales: '',
    emailSupport: '',
    address: '',
    businessHoursWeekdays: '',
    businessHoursSaturday: '',
    googleMapUrl: '',
    founderName: '',
    founderRole: '',
    founderImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      if (data) {
        setFormData({
          phoneMain: data.phoneMain || '',
          phoneSupport: data.phoneSupport || '',
          emailSales: data.emailSales || '',
          emailSupport: data.emailSupport || '',
          address: data.address || '',
          businessHoursWeekdays: data.businessHoursWeekdays || '',
          businessHoursSaturday: data.businessHoursSaturday || '',
          googleMapUrl: data.googleMapUrl || '',
          founderName: data.founderName || '',
          founderRole: data.founderRole || '',
          founderImage: data.founderImage || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
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
      setFormData({ ...formData, founderImage: data.url });
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.put('/settings', formData);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const handleMapUrlChange = (e) => {
    let value = e.target.value;
    // If the user pastes the full iframe code, automatically extract just the src URL
    if (value.includes('<iframe') && value.includes('src="')) {
      const match = value.match(/src="([^"]+)"/);
      if (match && match[1]) {
        value = match[1];
      }
    }
    setFormData({...formData, googleMapUrl: value});
  };

  if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <h1 className="text-2xl font-bold text-white mb-1">Platform Settings</h1>
        <p className="text-gray-400 text-sm">Manage global contact details, map location, and founder profile.</p>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Founder Profile Section */}
        <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Founder / Contact Page Profile</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-400 mb-2">Profile Image (Transparent PNG)</label>
              <div className="w-32 h-40 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                {formData.founderImage ? (
                  <img src={formData.founderImage} alt="Founder" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm">No Image</span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Upload size={24} className="text-white" />
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                </div>
              </div>
              {uploading && <p className="text-accent text-xs mt-2 text-center">Uploading...</p>}
            </div>

            <div className="flex-grow space-y-4 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Founder Name</label>
                <input 
                  type="text" 
                  value={formData.founderName}
                  onChange={(e) => setFormData({...formData, founderName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Founder Role</label>
                <input 
                  type="text" 
                  value={formData.founderRole}
                  onChange={(e) => setFormData({...formData, founderRole: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Contact Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Main Phone Number</label>
              <input 
                type="text" 
                value={formData.phoneMain}
                onChange={(e) => setFormData({...formData, phoneMain: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Support Phone Number</label>
              <input 
                type="text" 
                value={formData.phoneSupport}
                onChange={(e) => setFormData({...formData, phoneSupport: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Sales Email</label>
              <input 
                type="email" 
                value={formData.emailSales}
                onChange={(e) => setFormData({...formData, emailSales: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Support Email</label>
              <input 
                type="email" 
                value={formData.emailSupport}
                onChange={(e) => setFormData({...formData, emailSupport: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Office Address</label>
            <textarea 
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Weekday Hours (Mon-Fri)</label>
              <input 
                type="text" 
                value={formData.businessHoursWeekdays}
                onChange={(e) => setFormData({...formData, businessHoursWeekdays: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Weekend Hours (Saturday)</label>
              <input 
                type="text" 
                value={formData.businessHoursSaturday}
                onChange={(e) => setFormData({...formData, businessHoursSaturday: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Google Maps Iframe Embed URL</label>
            <input 
              type="text" 
              value={formData.googleMapUrl}
              onChange={handleMapUrlChange}
              placeholder="Paste the full <iframe...> code from Google Maps here"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none font-mono text-xs"
            />
            <p className="text-gray-500 text-xs mt-2">Just go to Google Maps {'>'} Share {'>'} Embed a map {'>'} Copy HTML, and paste it all here. We will extract the link for you automatically!</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={saving || uploading} 
            className="bg-accent text-black font-bold px-8 py-4 rounded-xl hover:bg-[#e5a013] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(253,181,21,0.3)] disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ManageSettings;
