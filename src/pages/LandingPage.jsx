import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Footer from '../components/landing/Footer';
import CTA from '../components/landing/CTA.jsx';
import Features from '../components/landing/Features.jsx';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-slate-100 selection:text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <CTA />
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
