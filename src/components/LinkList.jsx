import { useState } from 'react';
import { Link as LinkIcon, Edit2, Trash2, GripVertical, MousePointerClick, Save, X } from 'lucide-react';

const LinkList = ({ links, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', url: '' });

  const handleToggle = (id) => {
    onToggle(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      onDelete(id);
    }
  };

  const startEdit = (link) => {
    setEditingId(link._id);
    setEditForm({ title: link.title, url: link.url });
  };

  const handleSaveEdit = (id) => {
    if (!editForm.title || !editForm.url) return;
    if (onEdit) {
      onEdit(id, editForm);
    }
    setEditingId(null);
  };

  if (!links || links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-200 border-dashed rounded-xl mt-4">
        <LinkIcon size={32} className="text-slate-300 mb-3" />
        <p className="text-sm text-slate-500 font-medium google-sans">No links added yet.</p>
        <p className="text-xs text-slate-400 mt-1 google-sans">Start building your profile by adding a link above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link) => {
        if (editingId === link._id) {
          // Edit Mode
          return (
            <div key={link._id} className="bg-white border border-primary-300 rounded-xl p-4 shadow-md flex items-center gap-4 animate-in fade-in zoom-in duration-200">
              <div className="flex-1 space-y-3 min-w-0">
                <input 
                  type="text" 
                  value={editForm.title} 
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 google-sans"
                  placeholder="Link Title"
                />
                <input 
                  type="url" 
                  value={editForm.url} 
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 google-sans"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex flex-col gap-2 ml-auto shrink-0">
                <button 
                  onClick={() => handleSaveEdit(link._id)}
                  className="p-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold google-sans"
                >
                  <Save size={14} /> Save
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  className="p-2 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold google-sans"
                >
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          );
        }

        // View Mode
        return (
          <div key={link._id} className={`bg-white border ${link.isActive ? 'border-l-4 border-primary-500' : 'border-l-4 border-slate-300 opacity-75'} border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md group`}>
            <div className="cursor-grab text-slate-300 hover:text-slate-500 hidden sm:block">
              <GripVertical size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold truncate ${link.isActive ? 'text-slate-800' : 'text-slate-500'} google-sans`}>{link.title}</h4>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="google-sans text-xs text-teal-500 hover:text-teal-600 hover:underline truncate block mt-0.5 max-w-[200px] sm:max-w-xs">{link.url}</a>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                <MousePointerClick size={14} className="text-slate-500" />
                <span className="text-xs font-semibold text-slate-600 google-sans">{link.clicks || 0}</span>
              </div>

              {/* Toggle Switch */}
              <button 
                onClick={() => handleToggle(link._id)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shrink-0 ${link.isActive ? 'bg-teal-500' : 'bg-slate-300'}`}
                role="switch"
                aria-checked={link.isActive}
              >
                <span className={`inline-block w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out mt-1 ${link.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => startEdit(link)}
                  className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Edit Link"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(link._id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LinkList;
