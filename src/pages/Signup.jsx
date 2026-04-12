import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Mail, Lock, UserPlus, Loader2, LogIn } from 'lucide-react';
import api from '../services/api';
import Footer from '../components/landing/Footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      // We pass the "user" role silently as per backend requirement (though default is also 'user')
      const res = await api.post('/auth/register', { 
        email, 
        password,
        role: 'user'
      });
      
      login(res.data.user, res.data.accessToken);
      toast.success('Registration successful! Welcome email sent.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {/* Modern Minimal Navbar */}
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-md border-b border-slate-200">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-95 shadow-sm">
          <span className="text-white font-bold text-lg leading-none">Y</span>
        </div>
        <span className="font-bold text-slate-900 tracking-tight text-md montserrat hidden sm:block">
          Link In Bio SaaS
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors google-sans">
          Back to Home
        </Link>
        <Link to="/support" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors google-sans">
          Need Help?
        </Link>
      </div>
    </nav>
    
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-26 pb-20 relative">

      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200/40 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-md shadow-primary-500/20">
            <UserPlus size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 montserrat">Create Account</h2>
          <p className="text-slate-500 mt-2 font-medium google-sans">Join the secure user portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1 google-sans">Email Details</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 google-sans"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1 google-sans">Secure Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 google-sans"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 google-sans"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 mt-8 w-full rounded-xl py-3 text-white font-medium google-sans cursor-pointer transition-all duration-300 ease-in-out"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Register Now'}
          </button>
        </form>

        {/* Footer text color slightly updated to slate-500 for better visibility on white bg */}
        <p className="text-center text-slate-500 mt-8 text-sm google-sans">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-500 hover:text-teal-400 transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>

    </div>
    
    <Footer />
    </>
  );
};

export default Signup;
