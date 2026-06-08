"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Universities", href: "#universities" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 pt-4 lg:pt-5"
    >
      <motion.nav
        animate={{
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`mx-auto max-w-7xl liquid-glass-strong rounded-full px-4 lg:px-6 flex items-center justify-between gap-4`}
      >
        {/* Logo */}
        <a
          href="#top"
          className="text-2xl font-semibold tracking-tighter text-white lowercase select-none pl-2"
        >
          aura
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3.5 py-2 text-xs text-white/70 hover:text-white transition-colors rounded-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:flex liquid-glass rounded-full pl-4 pr-1.5 py-1.5 items-center gap-3 text-xs text-white hover:bg-white/[0.04] transition-colors"
          >
            <span>Book a consult</span>
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden liquid-glass rounded-full w-10 h-10 flex items-center justify-center"
          >
            {open ? (
              <X className="w-4 h-4 text-white/85" strokeWidth={1.5} />
            ) : (
              <Menu className="w-4 h-4 text-white/85" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="md:hidden overflow-hidden mt-2 mx-auto max-w-7xl"
      >
        <div className="liquid-glass-strong rounded-3xl p-3 flex flex-col">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm text-white/85 hover:text-white hover:bg-white/[0.04] rounded-2xl transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 liquid-glass rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-white"
          >
            <span>Book a consult</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
