import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, ShieldCheck, Mail, Lock, Key, AlertCircle, CheckCircle, Eye, EyeOff, Trash2, Award } from 'lucide-react';
import api from '../../api';
import { useToast } from '../components/Toast';

const ManageSettings = () => {
  const { toast } = useToast();
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
      toast.success('Founder profile photo uploaded! Remember to click "Save All Settings".');
    } catch (error) {
      toast.error('Error uploading image. Please check file format.');
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
      toast.success('All settings, founder profile, and contact details saved successfully!');
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating settings');
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
      const errText = 'Please enter your current password to authorize changes.';
      setSecurityMessage({ type: 'error', text: errText });
      toast.error(errText);
      return;
    }

    if (securityData.newPassword) {
      if (securityData.newPassword.length < 6) {
        const errText = 'New password must be at least 6 characters long.';
        setSecurityMessage({ type: 'error', text: errText });
        toast.error(errText);
        return;
      }
      if (securityData.newPassword !== securityData.confirmPassword) {
        const errText = 'New password and confirmation do not match.';
        setSecurityMessage({ type: 'error', text: errText });
        toast.error(errText);
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

      const successText = data.message || 'Admin credentials updated successfully!';
      setSecurityMessage({ type: 'success', text: successText });
      toast.success(successText);
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      console.error('Update credentials error:', err);
      const errMsg = err.response?.status === 401 
        ? (err.response?.data?.message || 'Current password incorrect or session expired.')
        : (err.response?.data?.message || err.message || 'Failed to update credentials.');
      setSecurityMessage({ type: 'error', text: errMsg });
      toast.error(errMsg);
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
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Founder / Contact Page Profile</h2>
              <p className="text-gray-400 text-xs mt-1">Portrait photos, transparent PNGs, or 3D avatars will be seamlessly framed without head/hand cropping.</p>
            </div>
            {formData.founderImage && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, founderImage: '' });
                  toast.info('Founder photo removed. Click "Save All Settings" to apply.');
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 size={14} />
                Remove Photo
              </button>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Portrait Image Uploader with Matching Frame */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Executive Portrait
              </label>
              
              <div className="relative w-36 h-48 sm:w-40 sm:h-52 bg-gradient-to-b from-[#161a19] via-[#0b0e0d] to-[#040605] border-2 border-accent/50 rounded-2xl flex items-end justify-center p-2 relative overflow-hidden group shadow-2xl">
                {/* Ambient Radial Spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,91,0.25),transparent_70%)] pointer-events-none" />
                
                {formData.founderImage ? (
                  <img 
                    src={formData.founderImage} 
                    alt="Founder" 
                    className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]" 
                  />
                ) : (
                  <div className="relative z-10 text-center pb-8">
                    <Upload size={32} className="mx-auto text-gray-500 mb-2" />
                    <span className="text-gray-400 text-xs font-medium">Click to Upload Photo</span>
                  </div>
                )}
                
                {/* Hover overlay with button */}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer z-20 backdrop-blur-xs">
                  <Upload size={24} className="text-accent mb-1 animate-bounce" />
                  <span className="text-xs font-bold text-white">
                    {formData.founderImage ? 'Change Image' : 'Select Photo'}
                  </span>
                  <span className="text-[10px] text-gray-300 mt-0.5">PNG, JPG, or WEBP</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileUpload} 
                    disabled={uploading} 
                  />
                </label>
              </div>

              {uploading && (
                <div className="flex items-center gap-1.5 text-accent text-xs font-semibold mt-3 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  Uploading to Cloudinary...
                </div>
              )}
            </div>

            {/* Inputs & Live Mini Preview */}
            <div className="flex-grow space-y-5 w-full">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Founder Name</label>
                  <input 
                    type="text" 
                    value={formData.founderName}
                    placeholder="e.g. Jasim Kdr"
                    onChange={(e) => setFormData({...formData, founderName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Founder Role</label>
                  <input 
                    type="text" 
                    value={formData.founderRole}
                    placeholder="e.g. Chief Designer & Founder"
                    onChange={(e) => setFormData({...formData, founderRole: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
                  />
                </div>
              </div>

              {/* Live Preview of Contact Page Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[11px] font-bold text-[#C6A15B] tracking-wider uppercase block mb-3">
                  Live Preview on Contact Page:
                </span>
                <div className="bg-white rounded-2xl p-4 border border-[#C6A15B]/40 shadow-xl flex items-center gap-4 max-w-md">
                  <div className="relative w-16 h-20 rounded-xl bg-gradient-to-b from-[#161a19] to-[#040605] border border-[#C6A15B] overflow-hidden flex items-end justify-center p-1 shrink-0">
                    {formData.founderImage ? (
                      <img src={formData.founderImage} alt="Preview" className="w-full h-full object-contain object-bottom drop-shadow" />
                    ) : (
                      <span className="text-[10px] text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#C6A15B]/15 text-[#9E8148] text-[9px] font-extrabold uppercase">
                      <Award size={10} />
                      {formData.founderRole || 'Founder Role'}
                    </span>
                    <h4 className="font-extrabold text-base text-[#111] truncate mt-0.5">
                      {formData.founderName || 'Founder Name'}
                    </h4>
                    <p className="text-[11px] text-[#C6A15B] font-bold">JK Solutions Executive Leadership</p>
                  </div>
                </div>
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
