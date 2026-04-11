export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Main Copyright Text */}
        <p className="font-['Google_Sans',_sans-serif] text-sm font-semibold tracking-wide text-slate-600">
          © {new Date().getFullYear()} Mini Link In Bio SaaS. All rights reserved.
        </p>
        
        {/* Secondary Text */}
        <p className="font-['Google_Sans',_sans-serif] mt-2 text-xs font-medium text-slate-400">
          Developed with a focus on modern minimalism and clean aesthetics.
        </p>

        {/* Optional: Simple Footer Links */}
        <div className="font-['Google_Sans',_sans-serif] mt-6 flex justify-center gap-6 text-xs text-slate-400">
          <a href="#" className="transition-colors hover:text-teal-600">Privacy Policy</a>
          <a href="#" className="transition-colors hover:text-teal-600">Terms of Service</a>
          <a href="#" className="transition-colors hover:text-teal-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}