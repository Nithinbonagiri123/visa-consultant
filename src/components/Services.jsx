"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  BookOpen,
  Download,
  CheckCircle,
  Sparkles,
  Plus,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const SERVICES = [
  {
    icon: Wand2,
    tag: "Strategy",
    title: "Profile Architecture",
    body:
      "We audit your academic story and rebuild it into an applicant blueprint engineered for the world's top admit committees.",
    points: ["Transcript & GPA audit", "Gap analysis", "Positioning strategy"],
  },
  {
    icon: BookOpen,
    tag: "Selection",
    title: "Institutional Matching",
    body:
      "A bespoke shortlist of Reach, Match and Safe institutions modelled around ambition, ROI and faculty alignment.",
    points: ["Curated shortlist", "ROI modelling", "Faculty alignment"],
  },
  {
    icon: Download,
    tag: "Composition",
    title: "Dossier & SOP Atelier",
    body:
      "An editorial team handcrafts every SOP, LOR and supplemental essay. You review. You approve. We file.",
    points: ["SOP composition", "LOR strategy", "Portfolio polish"],
  },
  {
    icon: CheckCircle,
    tag: "Departure",
    title: "Visa & Liaison",
    body:
      "Filing, biometric, interview prep, accommodation, forex and arrival liaison — every appointment handled.",
    points: ["Visa documentation", "Mock interviews", "Pre-departure briefs"],
  },
  {
    icon: Sparkles,
    tag: "Diagnostic",
    title: "AI Profile Evaluator",
    body:
      "Upload transcripts and test scores. Receive an institutional-grade probability map across 200+ programmes in 90 seconds.",
    points: ["Score normalisation", "Probability map", "Programme heat-map"],
  },
  {
    icon: Plus,
    tag: "Long arc",
    title: "Scholarship Concierge",
    body:
      "We scout, qualify and apply on your behalf to merit, need-based and institutional aid pools across geographies.",
    points: ["Eligibility scan", "Application drafting", "Award negotiation"],
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative w-full py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-end justify-between gap-10 mb-14">
          <SectionHeading
            eyebrow="What we do · Six pillars"
            title="Every backend task,"
            italic="lifted off your desk."
            description="From the first transcript audit to your arrival-day SIM card. Six service pillars, one dedicated specialist."
          />
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#process"
            className="hidden lg:flex liquid-glass rounded-full pl-5 pr-1.5 py-1.5 items-center gap-3 text-xs text-white hover:bg-white/[0.04] transition-colors shrink-0"
          >
            <span>See the full process</span>
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </span>
          </motion.a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={itemVariant}>
                <TiltCard
                  max={5}
                  className="liquid-glass-strong rounded-3xl p-7 h-full flex flex-col group"
                >
                  <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className="liquid-glass rounded-2xl w-12 h-12 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">
                        {s.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-[-0.02em] text-white">
                      {s.title}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed mt-3 flex-1">
                      {s.body}
                    </p>

                    <ul className="mt-6 space-y-1.5">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="text-[11px] text-white/55 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 pt-5 flex items-center justify-between">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider tabular-nums">
                        0{i + 1} / 0{SERVICES.length}
                      </span>
                      <button className="text-[11px] text-white/80 hover:text-white flex items-center gap-1.5 transition-colors">
                        Learn more
                        <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
