import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-slate-100 selection:text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
      </main>
      
      {/* Minimal Footer Spacer */}
      <footer className="border-t border-slate-100 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm font-light">
            © {new Date().getFullYear()} YOUR_BRAND. Developed with a focus on absolute minimalism.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
