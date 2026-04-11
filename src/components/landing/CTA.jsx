import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (

    <section
      id="cta"
      className="border-t border-slate-200 bg-linear-to-b from-white to-slate-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/40 md:p-12"
        >
          {/* Montserrat for Bold Headings */}
          <h2 className="montserrat text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ready to claim your <span className="text-teal-500">unique link?</span>
          </h2>
          
          {/* Google Sans for readable content */}
          <p className="google-sans mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Join thousands of creators and professionals. Build your personalized 
            page, track your growth, and share everything in one place.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="google-sans inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="google-sans inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-transparent px-8 py-4 text-sm font-semibold text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
          
          <p className="google-sans mt-6 text-xs font-medium tracking-wide text-slate-400 uppercase">
            Start for free • No credit card required • Unlimited links
          </p>
        </motion.div>
      </div>
    </section>

  );
}