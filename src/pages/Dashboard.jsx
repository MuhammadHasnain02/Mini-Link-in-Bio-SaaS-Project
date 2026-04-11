import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, LogOut, Loader2, ExternalLink, Link as LinkIcon, Activity, MousePointerClick, Copy } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

import ProfileEditor from '../components/ProfileEditor';
import AddLinkForm from '../components/AddLinkForm';
import LinkList from '../components/LinkList';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingLink, setIsAddingLink] = useState(false);

  // Generate initial username from email if available
  const initialUsername = user?.email?.split('@')[0] || '';

  useEffect(() => {
    // We assume the username might be the initialUsername if no profile returned yet.
    // However, if the user changed it previously, we wouldn't know it unless we search by userId.
    // Wait, since we don't have a userId on Profile, we are strictly tying profiles to username.
    // If they changed their username, we can't find them here. 
    // In a real app we'd fetch GET /api/me/profile. For now, we try initialUsername.
    const fetchData = async () => {
      try {
        setIsLoading(true);
        try {
          const profileRes = await api.get(`/profile/${initialUsername}`);
          setProfile(profileRes.data);
          
          if (profileRes.data?._id) {
            const linksRes = await api.get(`/links/${profileRes.data._id}`);
            // Sorting links from newest to oldest
            setLinks(linksRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          }
        } catch (error) {
          if (error.response?.status === 404) {
            // Profile doesn't exist yet, that's fine.
            setProfile(null);
          } else {
            throw error;
          }
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, initialUsername]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleCopyLink = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(`${window.location.origin}/u/${profile.username}`);
      toast.success('Copied!');
    } else {
      toast.error('Please create your profile first');
    }
  };

  const totalLinks = links.length;
  const activeLinks = links.filter(l => l.isActive).length;
  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0);

  const handleAddLink = async (linkData) => {
    if (!profile?._id) {
      toast.error('Please create your profile first');
      return;
    }

    try {
      setIsAddingLink(true);
      const res = await api.post('/links', {
        profileId: profile._id,
        ...linkData
      });
      // Update local state
      setLinks([res.data, ...links]);
      toast.success('Link added');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add link');
    } finally {
      setIsAddingLink(false);
    }
  };

  const handleToggleLink = async (id) => {
    // Optimistic Update
    const originalLinks = [...links];
    setLinks(links.map(link => link._id === id ? { ...link, isActive: !link.isActive } : link));

    try {
      await api.patch(`/links/${id}/toggle`);
    } catch (error) {
      // Revert on failure
      setLinks(originalLinks);
      toast.error('Failed to toggle link');
    }
  };

  const handleEditLink = async (id, updatedData) => {
    try {
      const res = await api.put(`/links/${id}`, updatedData);
      setLinks(links.map(l => l._id === id ? res.data : l));
      toast.success('Link updated successfully');
    } catch (error) {
      toast.error('Failed to update link');
    }
  };

  const handleDeleteLink = async (id) => {
    // Optimistic Update
    const originalLinks = [...links];
    setLinks(links.filter(link => link._id !== id));

    try {
      await api.delete(`/links/${id}`);
      toast.success('Link deleted');
    } catch (error) {
      // Revert on failure
      setLinks(originalLinks);
      toast.error('Failed to delete link');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans text-slate-800">
      
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 text-slate-800 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20">
                <LayoutDashboard size={18} className="text-white" />
              </div>
              <span className="montserrat font-bold text-xl tracking-tight hidden sm:block">Dashboard</span>
            </div>

            <div className="flex items-center gap-4 overflow-hidden">
              {profile?.username && (
                <a 
                  href={`/u/${profile.username}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  <ExternalLink size={14} />
                  linkin.bio/u/{profile.username}
                </a>
              )}
              
              <div className="h-4 w-px bg-slate-200 hidden sm:block mx-1"></div>
              
              <span className="text-sm text-slate-500 hidden md:block max-w-[150px] truncate">{user?.email}</span>
              
              <button 
                onClick={logout} 
                className="text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors px-2 py-1 flex-shrink-0"
              >
                <span className="text-sm font-medium hidden sm:block">Log Out</span>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1 google-sans">Total Links</p>
              <h3 className="montserrat font-bold text-3xl text-slate-800">{totalLinks}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <LinkIcon size={24} />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1 google-sans">Active Links</p>
              <h3 className="montserrat font-bold text-3xl text-slate-800">{activeLinks}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Activity size={24} />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1 google-sans">Total Clicks</p>
              <h3 className="montserrat font-bold text-3xl text-slate-800">{totalClicks}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <MousePointerClick size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Profile Settings (4 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)]">
            <ProfileEditor 
              profile={profile} 
              onProfileUpdate={handleProfileUpdate} 
              initialUsername={initialUsername}
            />
          </div>
          
          {/* Right Column - Links Management (8 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="montserrat text-2xl font-bold text-slate-800">Your Links</h2>
                <p className="text-slate-500 font-medium google-sans">Add, edit, and organize your links below.</p>
              </div>
              <button 
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-colors google-sans focus:outline-none focus:ring-2 focus:ring-slate-900/50"
              >
                <Copy size={18} />
                <span>Copy My Link</span>
              </button>
            </div>

            <AddLinkForm onAddLink={handleAddLink} isAdding={isAddingLink} />
            
            <LinkList 
              links={links} 
              onToggle={handleToggleLink} 
              onDelete={handleDeleteLink} 
              onEdit={handleEditLink}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
