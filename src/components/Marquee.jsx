"use client";

import { motion } from "framer-motion";

const UNIVERSITIES = [
  "Harvard",
  "Stanford",
  "MIT",
  "Oxford",
  "Cambridge",
  "Yale",
  "Princeton",
  "ETH Zürich",
  "Imperial College",
  "UC Berkeley",
  "Columbia",
  "U of Toronto",
  "NUS",
  "LSE",
  "UCL",
  "Carnegie Mellon",
];

export default function Marquee() {
  const doubled = [...UNIVERSITIES, ...UNIVERSITIES];

  return (
    <section className="relative w-full py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.32em] uppercase text-white/45 text-center mb-10"
        >
          412 students placed across 18 countries · 2014 — 2026
        </motion.p>

        <div className="liquid-glass-strong rounded-3xl overflow-hidden">
          <div
            className="relative py-8"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="aura-marquee-track flex gap-14 lg:gap-20 w-max">
              {doubled.map((u, i) => (
                <div
                  key={`${u}-${i}`}
                  className="flex items-center gap-3 shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-xl lg:text-2xl font-medium tracking-tight text-white/75 whitespace-nowrap">
                    {u}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
