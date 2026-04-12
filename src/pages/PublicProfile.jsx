import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, Image as ImageIcon } from 'lucide-react';
// import { Save, Loader2, Image as ImageIcon, Instagram, Youtube, Linkedin } from 'lucide-react';
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
    <div className={`min-h-dvh flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6 transition-colors duration-500 ${isDark ? 'bg-dark-950 text-slate-100' : 'bg-gradient-to-b from-slate-50 to-white text-slate-900'}`}>
  
      {/* Ambient Background Glow */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-30' : 'opacity-20'}`}>
        <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl ${isDark ? 'bg-primary-500/20' : 'bg-primary-300/30'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-72 h-72 rounded-full blur-3xl ${isDark ? 'bg-purple-500/15' : 'bg-purple-300/20'}`} />
      </div>

      {/* Container - Mobile First Max Width */}
      <div className="relative w-full max-w-[600px] flex flex-col items-center text-center z-10">
        
        {/* Profile Image with Modern Ring & Animation */}
        <div className={`relative group mb-8 transition-transform duration-300 hover:scale-[1.02]`}>
          <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 ${isDark ? 'bg-gradient-to-br from-primary-500/80 via-purple-500/60 to-pink-500/80' : 'bg-gradient-to-br from-primary-400 via-purple-400 to-pink-400'}`}>
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center border-4 ${isDark ? 'border-dark-950 bg-dark-900' : 'border-white bg-white'}`}>
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                />
              ) : (
                <div className={`flex items-center justify-center ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
                  <ImageIcon size={44} strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
          {/* Online Status Indicator (optional enhancement) */}
          <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 ${isDark ? 'border-dark-950 bg-emerald-500' : 'border-white bg-emerald-400'} animate-pulse`} />
        </div>

        {/* Full Name & Bio - Enhanced Typography */}
        <h1 className="montserrat text-3xl sm:text-4xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          {profile.fullName}
        </h1>
        
        {profile.bio && (
          <p className={`google-sans text-base sm:text-lg max-w-md mx-auto leading-relaxed font-light transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-slate-600'} ${profile.socials ? 'mb-7' : 'mb-12'}`}>
            {profile.bio}
          </p>
        )}

        {/* Social Icons - Modern Floating Cards */}
        {profile.socials && (profile.socials.instagram || profile.socials.youtube || profile.socials.linkedin) && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
            {[
              { key: 'instagram', icon: 'fa-brands fa-instagram', color: 'hover:bg-[#E1306C]/15 hover:text-[#E1306C]', label: 'Instagram' },
              { key: 'youtube', icon: 'fa-brands fa-youtube', color: 'hover:bg-[#FF0000]/15 hover:text-[#FF0000]', label: 'YouTube' },
              { key: 'linkedin', icon: 'fa-brands fa-linkedin', color: 'hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]', label: 'LinkedIn' }
            ].map((social) => (
              profile.socials[social.key] && (
                <a
                  key={social.key}
                  href={profile.socials[social.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    isDark 
                      ? 'bg-dark-800/60 text-slate-400 hover:text-white hover:bg-dark-700/80 border border-dark-700/50' 
                      : 'bg-white/70 text-slate-500 hover:text-slate-900 hover:bg-white border border-slate-200 shadow-sm'
                  } ${social.color} backdrop-blur-sm`}
                >
                  <i className={`${social.icon} text-lg transition-transform duration-300 group-hover:scale-110`}></i>
                  {/* Subtle tooltip */}
                  <span className={`absolute -top-9 px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none ${
                    isDark ? 'bg-dark-800 text-slate-200 border border-dark-700' : 'bg-slate-900 text-white'
                  }`}>
                    {social.label}
                  </span>
                </a>
              )
            ))}
          </div>
        )}

        {/* Links List - Modern Card Design */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4 mb-20">
          {profile.links && profile.links.length > 0 ? (
            profile.links
              .filter(link => link.isActive !== false)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((link, index) => (
                <a
                  key={link._id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`google-sans group relative w-full block overflow-hidden rounded-[1.75rem] py-4.5 sm:py-5.5 px-6 sm:px-8 border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-dark-800/60 border-dark-700/40 hover:bg-dark-750/80 text-slate-100 shadow-black/30 hover:border-primary-500/40 backdrop-blur-md' 
                      : 'bg-white/80 border-slate-200/80 hover:bg-white text-slate-800 shadow-sm hover:shadow-primary-500/10 hover:border-primary-300/60 backdrop-blur-md'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Animated gradient shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent animate-shine`} />
                  </div>
                  
                  {/* Subtle background pulse on hover */}
                  <div className={`absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark ? 'bg-primary-500/5' : 'bg-primary-500/3'
                  }`} />
                  
                  <span className="relative z-10 w-full flex items-center justify-center text-center font-medium text-base sm:text-lg tracking-tight">
                    {link.title}
                    {/* Arrow icon that slides in on hover */}
                    <svg 
                      className={`ml-2.5 w-4 h-4 transition-transform duration-300 ${isDark ? 'text-slate-500' : 'text-slate-400'} group-hover:translate-x-1 group-hover:text-primary-500`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))
          ) : (
            <div className={`google-sans flex flex-col items-center justify-center py-12 px-6 rounded-2xl border-2 border-dashed ${
              isDark ? 'border-dark-700/60 text-slate-500' : 'border-slate-200 text-slate-400'
            }`}>
              <svg className="w-10 h-10 mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p className="font-medium text-sm">No links added yet</p>
              <p className="text-xs mt-1 opacity-70">Add your first link to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Footer Logo */}
      <Link 
        to="/" 
        className={`relative z-10 flex items-center gap-2.5 group py-3 px-4 rounded-xl transition-all duration-300 ${
          isDark 
            ? 'hover:bg-dark-800/60' 
            : 'hover:bg-slate-100/80'
        }`}
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
          isDark 
            ? 'bg-gradient-to-br from-primary-500 to-purple-600 shadow-lg shadow-primary-500/25' 
            : 'bg-gradient-to-br from-primary-500 to-purple-500 shadow-lg shadow-primary-500/20'
        }`}>
          <span className="text-white font-bold text-lg leading-none">Y</span>
        </div>
        <span className={`font-semibold tracking-tight text-sm sm:text-base transition-colors duration-300 ${
          isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
        }`}>
          Mini Link
        </span>
      </Link>

      {/* CSS for custom animations - add to your global CSS or style tag */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shine {
          animation: shine 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PublicProfile;
