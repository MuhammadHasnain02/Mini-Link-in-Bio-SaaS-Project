import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo Placeholder */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-95">
            <span className="text-white font-bold text-xl leading-none">Y</span>
          </div>
          <span className="font-semibold text-slate-900 tracking-tight text-lg">Mini Link In Bio SaaS</span>
        </Link>
        
        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Non-functional Aesthetic Theme Toggle */}
          <button 
            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" 
            aria-label="Light theme active"
          >
            <Sun size={20} strokeWidth={1.5} />
          </button>
          
          <div className="h-4 w-px bg-slate-200"></div>
          
          {/* Auth Actions linking to existing MERN Routes */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-2">
              Sign In
            </Link>
            <Link to="/register">
              <Button variant="primary" className="px-5 py-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
