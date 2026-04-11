import { useState, useEffect } from 'react';
import { Save, Loader2, Image as ImageIcon, Instagram, Youtube, Linkedin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const ProfileEditor = ({ profile, onProfileUpdate, initialUsername }) => {
  const [formData, setFormData] = useState({
    username: initialUsername || '',
    fullName: '',
    bio: '',
    theme: 'light',
    socials: { instagram: '', youtube: '', linkedin: '' }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || initialUsername || '',
        fullName: profile.fullName || '',
        bio: profile.bio || '',
        theme: profile.theme || 'light',
        socials: {
          instagram: profile.socials?.instagram || '',
          youtube: profile.socials?.youtube || '',
          linkedin: profile.socials?.linkedin || ''
        }
      });
      setIsExist(true);
    }
  }, [profile, initialUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['instagram', 'youtube', 'linkedin'].includes(name)) {
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.fullName) {
      toast.error('Username and Full Name are required');
      return;
    }

    try {
      setIsSaving(true);
      let res;
      if (isExist && profile?.username) {
        // Update existing using original username in param to find it
        res = await api.put(`/profile/${profile.username}`, formData);
        toast.success('Profile updated successfully');
      } else {
        // Create new profile
        res = await api.post('/profile', { ...formData, profileImage: '' });
        setIsExist(true);
        toast.success('Profile created successfully');
      }
      onProfileUpdate(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-full">
      <h2 className="montserrat text-xl font-bold text-slate-800 mb-6">Profile Settings</h2>
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 mb-3 overflow-hidden">
          {profile?.profileImage ? (
            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={32} />
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">Image upload coming soon</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Username / Link</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 text-sm">linkin.bio/</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pr-4 pl-24 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans"
              placeholder="username"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans resize-none h-24"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Theme</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors w-1/2">
              <input type="radio" name="theme" value="light" checked={formData.theme === 'light'} onChange={handleChange} className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-slate-700 google-sans">Light Mode</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors w-1/2">
              <input type="radio" name="theme" value="dark" checked={formData.theme === 'dark'} onChange={handleChange} className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-slate-700 google-sans">Dark Mode</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="montserrat text-sm font-bold text-slate-700 mb-3">Social Handles</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                <Instagram size={20} />
              </div>
              <input
                type="url"
                name="instagram"
                value={formData.socials.instagram}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans"
                placeholder="https://instagram.com/username"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <Youtube size={20} />
              </div>
              <input
                type="url"
                name="youtube"
                value={formData.socials.youtube}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans"
                placeholder="https://youtube.com/@channel"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Linkedin size={20} />
              </div>
              <input
                type="url"
                name="linkedin"
                value={formData.socials.linkedin}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all google-sans"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full mt-6 bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 font-sans"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{isExist ? 'Save Changes' : 'Create Profile'}</span>
        </button>
      </form>
    </div>
  );
};

export default ProfileEditor;
