"use client";

import { motion } from "framer-motion";
import { Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

const COLS = [
  {
    title: "Services",
    links: [
      "Profile Architecture",
      "Institutional Matching",
      "Dossier & SOP Atelier",
      "Visa & Liaison",
      "AI Profile Evaluator",
      "Scholarship Concierge",
    ],
  },
  {
    title: "Destinations",
    links: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "Singapore",
    ],
  },
  {
    title: "Company",
    links: ["About", "Specialists", "Press", "Careers", "Partners", "Contact"],
  },
  {
    title: "Resources",
    links: [
      "Roadmap guide",
      "SOP library",
      "Scholarship index",
      "Visa journal",
      "Student doubts",
      "Discovery call",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-10 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="liquid-glass-strong rounded-3xl p-8 lg:p-12"
        >
          {/* Top */}
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="text-3xl font-semibold tracking-tighter text-white lowercase">
                aura
              </p>
              <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-xs">
                A premium education consultancy for Bachelor's and Master's
                candidates targeting the world's most selective institutions.
              </p>

              <div className="mt-7 flex items-center gap-2">
                {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/75" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {COLS.map((col) => (
                <div key={col.title}>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-white/45 mb-5">
                    {col.title}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-xs text-white/75 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Inline newsletter */}
          <div className="mt-12 pt-8 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <p className="text-sm text-white/90 font-medium tracking-tight">
                The Aura Dispatch
              </p>
              <p className="text-xs text-white/55 mt-1">
                Monthly intelligence on admissions, scholarships and visa
                shifts — distilled to a 4-minute read.
              </p>
            </div>
            <form
              className="lg:col-span-7 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1 liquid-glass rounded-full px-5 py-1.5 flex items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent outline-none text-xs text-white placeholder:text-white/40 py-2.5"
                />
              </div>
              <button
                type="submit"
                className="liquid-glass rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-3 text-xs text-white"
              >
                <span>Subscribe</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Sub-footer */}
        <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 px-2 text-[11px] text-white/45">
          <p>© 2026 Aura Global Education. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/80 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Refund policy
            </a>
            <span className="hidden lg:inline-block text-white/30">·</span>
            <span className="text-white/45">
              Crafted in Bengaluru · Serving 18 countries
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
