"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "I came in with a 7.4 CGPA and zero idea where to apply. Aura mapped my profile, fixed my SOP and got me into LSE with a £14k scholarship. They handled everything down to my forex.",
    name: "Ananya Krishnamurthy",
    role: "MSc Finance · LSE · 2025",
    initials: "AK",
  },
  {
    quote:
      "The roadmap was almost too good to be true. Specialist on Slack within 24h, three SOP drafts in two weeks, visa filing without me lifting a finger. Stress-free is not a marketing word for them.",
    name: "Rohan Subramaniam",
    role: "MS CS · Carnegie Mellon · 2025",
    initials: "RS",
  },
  {
    quote:
      "Applied to nine universities. Admitted to seven. Aura didn't just edit my essays — they reframed my entire candidacy. The AI evaluator predicted my MIT admit to within 4%.",
    name: "Meera Devanathan",
    role: "BS EECS · MIT · 2026",
    initials: "MD",
  },
  {
    quote:
      "My family wanted Oxford or nothing. Aura's team built me a candidacy strategy across two years, including a research internship pipeline. Oxford PPE, here I come.",
    name: "Ishaan Mahadevan",
    role: "BA PPE · Oxford · 2026",
    initials: "IM",
  },
  {
    quote:
      "I'm a working professional with a 6-year gap. Every other consultant told me to lower expectations. Aura got me into ETH Zürich with full assistantship. They saw what others missed.",
    name: "Priya Venkataraman",
    role: "MSc Robotics · ETH Zürich · 2025",
    initials: "PV",
  },
  {
    quote:
      "The visa felt like the scariest part. My specialist did three mock interviews with me, prepared a 40-page documentation file and showed up on the embassy day on call. I cried after the approval.",
    name: "Aarav Balakrishnan",
    role: "MS Data Science · Columbia · 2025",
    initials: "AB",
  },
];

const STATS = [
  { value: "412", label: "Students placed" },
  { value: "94%", label: "Top-choice admit rate" },
  { value: "18", label: "Countries served" },
  { value: "₹6.2cr", label: "Scholarships secured · '25" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <SectionHeading
          align="center"
          eyebrow="412 voices · 11 years"
          title="Stories from the"
          italic="other side of the journey."
          description="Every admit below was earned with an Aura specialist on call. No filters, no edits — just the people who lived it."
        />

        {/* Stat strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="liquid-glass-strong rounded-3xl p-6 lg:p-8"
            >
              <p className="text-3xl lg:text-4xl font-medium tracking-[-0.04em] text-white tabular-nums">
                {s.value}
              </p>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/55 mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="liquid-glass-strong rounded-3xl p-7 flex flex-col"
            >
              <blockquote className="text-sm text-white/85 leading-relaxed flex-1">
                <span className="font-serif italic text-2xl text-white/40 leading-none mr-1">
                  &ldquo;
                </span>
                {t.quote}
              </blockquote>

              <figcaption className="mt-7 pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-[10px] uppercase tracking-wider text-white/80">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs text-white/95 font-medium">{t.name}</p>
                  <p className="text-[10px] text-white/55 uppercase tracking-wider mt-0.5">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
