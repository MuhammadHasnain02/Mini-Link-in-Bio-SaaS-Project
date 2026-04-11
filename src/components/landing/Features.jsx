import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  TrendingUp,
  Palette,
  Zap,
  Briefcase,
  Video,
  Store,
  Sparkles,
} from "lucide-react";

const featureItems = [
  {
    title: "Unlimited Links",
    description:
      "Add all your social profiles, videos, music, and stores in one clean, unified profile page.",
    icon: LinkIcon,
    metric: "Infinite",
  },
  {
    title: "Real-time Analytics",
    description:
      "Track profile views, individual link clicks, and audience engagement right from your dashboard.",
    icon: TrendingUp,
    metric: "Live stats",
  },
  {
    title: "Custom Themes",
    description:
      "Make it yours. Choose between high-end light and dark themes to match your personal brand.",
    icon: Palette,
    metric: "Aesthetic",
  },
  {
    title: "Lightning Fast",
    description:
      "Built for mobile performance. Your page loads instantly so you never lose a single follower.",
    icon: Zap,
    metric: "Zero lag",
  },
];

const useCaseItems = [
  {
    role: "Creators",
    description: "Share your latest videos, streams, and content easily.",
    icon: Video,
  },
  {
    role: "Freelancers",
    description: "Showcase your portfolio and let clients book you.",
    icon: Briefcase,
  },
  {
    role: "Businesses",
    description: "Drive traffic directly to your products and campaigns.",
    icon: Store,
  },
  {
    role: "Influencers",
    description: "Monetize your audience with clean affiliate links.",
    icon: Sparkles,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-slate-200 bg-slate-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          {/* Cyan/Violet ko hata kar sleek Slate/Teal use kiya hai */}
          <p className="google-sans text-xs font-bold uppercase tracking-wider text-slate-500">
            Why Choose Us
          </p>
          <h2 className="montserrat mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you are. In one simple link.
          </h2>
          <p className="google-sans mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Stop pasting multiple URLs. Share your entire digital presence with 
            a single, beautiful page designed for maximum conversion.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
                <feature.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="montserrat text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="google-sans mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
              <p className="google-sans mt-5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                {feature.metric}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="google-sans text-xs font-bold uppercase tracking-wider text-teal-600">
            Built for everyone
          </p>
          <h3 className="montserrat mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            One platform, endless possibilities
          </h3>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCaseItems.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-500/30 hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h4 className="montserrat font-bold text-slate-900">
                  {item.role}
                </h4>
                <p className="google-sans mt-1 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}