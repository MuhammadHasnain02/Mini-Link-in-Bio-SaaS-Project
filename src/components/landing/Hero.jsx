import Button from './Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white">
      {/* High-end minimalist background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-50 rounded-full blur-3xl -z-10 opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header Block */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Elevate Your Workflow with <span className="text-slate-300">Precision</span>.
        </h1>
        
        <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          PROJECT_TAGLINE. Experience a radically clean interface designed to maximize your focus and unlock unprecedented productivity without the clutter.
        </p>
        
        {/* CTA Stack */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" className="gap-2 px-8 py-3.5 text-base">
            Start Building Free <ArrowRight size={18} strokeWidth={2} />
          </Button>
          <Button variant="outline" className="px-8 py-3.5 text-base">
            View Documentation
          </Button>
        </div>
        
        {/* Extravagant Placeholder UI Image */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5 hover:-translate-y-1 transition-transform duration-500">
            <div className="w-full h-[600px] bg-slate-50 flex flex-col items-center justify-center">
               <span className="text-slate-400 font-mono text-sm tracking-widest mb-4">/assets/placeholder.png</span>
               <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                  <span className="text-slate-300">+</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
