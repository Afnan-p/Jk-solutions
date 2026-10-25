import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, ShieldCheck, Mail, Lock, Key, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
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

  const [securityData, setSecurityData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      if (data && data.email) {
        setSecurityData((prev) => ({ ...prev, email: data.email }));
      }
    } catch (err) {
      const stored = localStorage.getItem('adminInfo');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.email) setSecurityData((prev) => ({ ...prev, email: parsed.email }));
        } catch (_) {}
      }
    }
  };

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

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setSecurityMessage({ type: '', text: '' });

    if (!securityData.currentPassword) {
      setSecurityMessage({ type: 'error', text: 'Please enter your current password to authorize changes.' });
      return;
    }

    if (securityData.newPassword) {
      if (securityData.newPassword.length < 6) {
        setSecurityMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
        return;
      }
      if (securityData.newPassword !== securityData.confirmPassword) {
        setSecurityMessage({ type: 'error', text: 'New password and confirmation do not match.' });
        return;
      }
    }

    setSecurityLoading(true);
    try {
      const { data } = await api.put('/auth/update-credentials', {
        email: securityData.email,
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword || undefined,
      });

      // Update stored admin session with fresh token and email
      const stored = JSON.parse(localStorage.getItem('adminInfo') || '{}');
      localStorage.setItem('adminInfo', JSON.stringify({ ...stored, ...data }));

      setSecurityMessage({ type: 'success', text: data.message || 'Admin credentials updated successfully!' });
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      console.error('Update credentials error:', err);
      if (err.response?.status === 401) {
        setSecurityMessage({
          type: 'error',
          text: err.response?.data?.message || 'Your session has expired. Please log out from the bottom-left menu and log in again.'
        });
      } else {
        setSecurityMessage({
          type: 'error',
          text: err.response?.data?.message || err.message || 'Failed to update credentials. Please check your current password.',
        });
      }
    } finally {
      setSecurityLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <h1 className="text-2xl font-bold text-white mb-1">Platform Settings</h1>
        <p className="text-gray-400 text-sm">Manage admin login security, global contact details, map location, and founder profile.</p>
      </div>

      {/* 1. Admin Login Credentials & Security Card */}
      <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <ShieldCheck className="text-accent" size={22} />
              Admin Login Credentials & Security
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Reset or update the login email and password used to access this Admin Dashboard.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-accent/90 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full w-fit">
            Account Security
          </span>
        </div>

        {securityMessage.text && (
          <div className={`p-4 rounded-xl text-sm flex items-center gap-2.5 ${
            securityMessage.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {securityMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {securityMessage.text}
          </div>
        )}

        <form onSubmit={handleSecuritySubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Admin Login Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={securityData.email}
                  onChange={(e) => setSecurityData({ ...securityData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-accent outline-none"
                  placeholder="admin@jksecurity.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Current Password <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Key size={16} />
                </div>
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white focus:border-accent outline-none"
                  placeholder="Enter current password to authorize"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Required to authorize any credential changes</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                New Password <span className="text-gray-500 text-xs font-normal">(leave blank to keep current)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock size={16} />
                </div>
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white focus:border-accent outline-none"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock size={16} />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white focus:border-accent outline-none"
                  placeholder="Re-type new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={securityLoading} 
              className="bg-accent text-black font-bold px-6 py-3.5 rounded-xl hover:bg-[#e5a013] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(253,181,21,0.25)] disabled:opacity-50 cursor-pointer text-sm"
            >
              <ShieldCheck size={18} />
              {securityLoading ? 'Updating Credentials...' : 'Save New Credentials'}
            </button>
          </div>
        </form>
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
