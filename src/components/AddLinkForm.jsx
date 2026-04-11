import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const AddLinkForm = ({ onAddLink, isAdding }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    
    await onAddLink({ title, url });
    // Reset form after successful addition
    setTitle('');
    setUrl('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="montserrat text-lg font-semibold text-slate-800 mb-4">Add New Link</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:flex-1 space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-sans"
            placeholder="e.g. My Portfolio"
            required
          />
        </div>
        <div className="w-full md:flex-1 space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-sans"
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="w-full md:w-auto self-end">
          <button
            type="submit"
            disabled={isAdding || !title || !url}
            className="w-full md:w-auto h-[48px] px-6 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg shadow-md shadow-primary-500/10 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 font-sans"
          >
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            <span>Add Link</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkForm;
