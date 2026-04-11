import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Image as ImageIcon, Instagram, Youtube, Linkedin } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/profile/${username}`);
        setProfile(res.data);
      } catch (error) {
        toast.error('Profile not found');
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const handleLinkClick = async (e, link) => {
    e.preventDefault();
    try {
      // Background click tracing
      api.patch(`/links/${link._id}/click`).catch(err => console.error('Failed to track click', err));
      // Open in new tab
      window.open(link.url, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="montserrat text-3xl font-bold text-slate-800 mb-2">Profile Not Found</h1>
        <p className="google-sans text-slate-500">The page you are looking for doesn't exist.</p>
      </div>
    );
  }

  const isDark = profile.theme === 'dark';

  return (
    <div className={`min-h-[100dvh] flex flex-col items-center py-16 px-4 sm:px-6 transition-colors duration-300 ${isDark ? 'bg-dark-900 text-slate-200' : 'bg-[#FAFAFA] text-slate-800'}`}>
      
      {/* Container - Mobile First Max Width */}
      <div className="w-full max-w-[600px] flex flex-col items-center text-center">
        
        {/* Profile Image */}
        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-6 flex items-center justify-center border-4 shadow-xl flex-shrink-0 ${isDark ? 'border-dark-700 bg-dark-800 shadow-black/40' : 'border-white bg-slate-100 shadow-slate-200/50'}`}>
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={profile.fullName} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={40} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
          )}
        </div>

        {/* Full Name & Bio */}
        <h1 className="montserrat text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {profile.fullName}
        </h1>
        {profile.bio && (
          <p className={`google-sans text-base sm:text-lg max-w-md mx-auto leading-relaxed font-light ${isDark ? 'text-slate-400' : 'text-slate-600'} ${profile.socials ? 'mb-6' : 'mb-10'}`}>
            {profile.bio}
          </p>
        )}

        {/* Social Icons Stack */}
        {profile.socials && (profile.socials.instagram || profile.socials.youtube || profile.socials.linkedin) && (
          <div className="flex items-center justify-center gap-4 mb-10">
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-dark-800 text-slate-300 hover:text-white hover:bg-pink-500/20' : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600'}`}>
                <Instagram size={20} />
              </a>
            )}
            {profile.socials.youtube && (
              <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-dark-800 text-slate-300 hover:text-white hover:bg-red-500/20' : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500'}`}>
                <Youtube size={20} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-dark-800 text-slate-300 hover:text-white hover:bg-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                <Linkedin size={20} />
              </a>
            )}
          </div>
        )}

        {/* Links List */}
        <div className="w-full flex flex-col gap-4 mb-16">
          {profile.links && profile.links.length > 0 ? (
            // Added explicit filter for safeguard, although backend already returns active ones, and sorted by createdAt
            profile.links
              .filter(link => link.isActive !== false)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((link) => (
              <a
                key={link._id}
                href={link.url}
                onClick={(e) => handleLinkClick(e, link)}
                className={`google-sans relative w-full block group overflow-hidden rounded-[2rem] py-4 sm:py-5 px-6 sm:px-8 border backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${
                  isDark 
                    ? 'bg-dark-800/80 border-dark-700/50 hover:bg-dark-700 text-slate-200 shadow-black/20 hover:border-primary-500/30 font-medium' 
                    : 'bg-white/80 border-slate-200 shadow-sm hover:border-primary-400 text-slate-800 font-semibold text-lg'
                }`}
              >
                {/* Dynamic gradient hover effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r from-transparent via-primary-500 to-transparent`} />
                <span className="relative z-10 w-full flex items-center justify-center text-center">{link.title}</span>
              </a>
            ))
          ) : (
            <p className={`google-sans font-medium text-sm mt-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No links to display yet.</p>
          )}
        </div>

        {/* Branding Footer */}
        <a href="/" target="_blank" rel="noopener noreferrer" className={`google-sans text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5 ${isDark ? 'text-primary-400' : 'text-primary-500'}`}>
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">m</span>
          </div>
          minilink
        </a>
      </div>
    </div>
  );
};

export default PublicProfile;
