"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "Singapore", "Ireland", "Switzerland"];

const FEATURED = [
  { name: "Harvard University", country: "USA", placements: "06", rank: "#03 QS" },
  { name: "Stanford University", country: "USA", placements: "11", rank: "#06 QS" },
  { name: "MIT", country: "USA", placements: "08", rank: "#01 QS" },
  { name: "University of Oxford", country: "UK", placements: "14", rank: "#04 QS" },
  { name: "University of Cambridge", country: "UK", placements: "12", rank: "#05 QS" },
  { name: "Imperial College London", country: "UK", placements: "18", rank: "#02 QS" },
  { name: "ETH Zürich", country: "Switzerland", placements: "07", rank: "#07 QS" },
  { name: "National University of Singapore", country: "Singapore", placements: "22", rank: "#08 QS" },
  { name: "University of Toronto", country: "Canada", placements: "31", rank: "#21 QS" },
  { name: "Columbia University", country: "USA", placements: "09", rank: "#23 QS" },
  { name: "London School of Economics", country: "UK", placements: "16", rank: "#50 QS" },
  { name: "Technical University of Munich", country: "Germany", placements: "12", rank: "#28 QS" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Universities() {
  return (
    <section id="universities" className="relative w-full py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <SectionHeading
          eyebrow="Where our students go · 412 admits"
          title="A passport to the world's"
          italic="most selective institutions."
          description="Twelve flagship destinations from a network of 200+ partner universities across 18 countries."
        />

        {/* Country chips */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {COUNTRIES.map((c) => (
            <motion.span
              key={c}
              variants={fadeIn}
              className="liquid-glass rounded-full px-4 py-2 text-[11px] text-white/75"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {FEATURED.map((u, i) => (
            <motion.div key={u.name} variants={fadeIn}>
              <TiltCard
                max={5}
                className="liquid-glass-strong rounded-3xl p-6 h-full flex flex-col group"
              >
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[10px] text-white/50 tabular-nums tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="liquid-glass rounded-full px-2.5 py-1 text-[9px] tracking-wider text-white/80">
                      {u.rank}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium tracking-[-0.02em] text-white leading-tight">
                    {u.name}
                  </h3>
                  <p className="text-[11px] text-white/55 mt-1.5 tracking-wide uppercase">
                    {u.country}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/45 uppercase tracking-wider">
                        Aura placements
                      </p>
                      <p className="text-base font-medium text-white tabular-nums mt-0.5">
                        {u.placements}
                      </p>
                    </div>
                    <div className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                      <ArrowRight
                        className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-white/50 text-center mt-12"
        >
          + 188 partner institutions ·{" "}
          <a href="#contact" className="text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline">
            request the full catalogue
          </a>
        </motion.p>
      </div>
    </section>
  );
}
