"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  BookOpen,
  Download,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  Plus,
} from "lucide-react";
import MagnetButton from "./ui/MagnetButton";
import TiltCard from "./ui/TiltCard";

const DEGREE_TIERS = [
  { id: "masters", label: "Master's Pathway" },
  { id: "bachelors", label: "Bachelor's Elite" },
  { id: "ivy", label: "Global Ivy Tier" },
];

const ROADMAP_STEPS = [
  {
    id: 1,
    title: "Profile Architecture",
    subtitle: "Step 01 — Foundation",
    icon: Wand2,
    description:
      "We deconstruct your academic narrative and rebuild it into an institutional-grade applicant blueprint — no guesswork, no late nights.",
    deliverables: [
      "Academic transcript audit & GPA conversion",
      "Strength & gap diagnostic mapping",
      "Personalised candidacy blueprint",
    ],
  },
  {
    id: 2,
    title: "Institutional Matching",
    subtitle: "Step 02 — Selection",
    icon: BookOpen,
    description:
      "A curated shortlist of programmes engineered around your ambition, budget, and long-term trajectory across 18 countries.",
    deliverables: [
      "Ranked university shortlist (Reach / Match / Safe)",
      "Tuition, scholarship & ROI modelling",
      "Faculty fit & research alignment notes",
    ],
  },
  {
    id: 3,
    title: "Elite Dossier & SOP",
    subtitle: "Step 03 — Composition",
    icon: Download,
    description:
      "Our editorial specialists handcraft every essay, SOP and LOR. You sit back, review, and approve the final draft.",
    deliverables: [
      "Statement of Purpose composition",
      "Letter of Recommendation strategy",
      "CV, portfolio & video essay polish",
    ],
  },
  {
    id: 4,
    title: "Stress-Free Visa & Liaison",
    subtitle: "Step 04 — Departure",
    icon: CheckCircle,
    description:
      "From visa filing to landing — every appointment, document and follow-up is handled end-to-end by a dedicated liaison.",
    deliverables: [
      "Visa documentation & mock interview",
      "Accommodation & forex coordination",
      "Pre-departure briefing & arrival liaison",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Hero() {
  const [activeTier, setActiveTier] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [doubtsOpen, setDoubtsOpen] = useState(false);

  const progress = ((activeStep + 1) / ROADMAP_STEPS.length) * 100;
  const ActiveIcon = ROADMAP_STEPS[activeStep].icon;

  return (
    <section id="top" className="relative w-full min-h-screen pt-24 lg:pt-28">
      <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-6rem)]">

        {/* ============ LEFT PANEL (52%) ============ */}
        <div className="relative w-full lg:w-[52%] min-h-[80vh] lg:min-h-[calc(100vh-6rem)] p-4 lg:p-6">
          {/* Glass wrapper overlay */}
          <div
            style={{ position: "absolute" }}
            className="inset-4 lg:inset-6 rounded-3xl liquid-glass-strong pointer-events-none"
          />

          <div className="relative h-full w-full flex flex-col">
            {/* HERO */}
            <div className="flex-1 flex flex-col justify-center px-6 lg:px-10 py-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              >
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] tracking-[0.32em] uppercase text-white/50 mb-7"
                >
                  Global Education Architects · Est. 2014
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.05em] leading-[1.02] text-white max-w-2xl"
                >
                  Navigating the{" "}
                  <em className="font-serif italic font-normal text-white/95">
                    spirit of global
                  </em>{" "}
                  ambition
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 text-base text-white/60 max-w-md leading-relaxed"
                >
                  Bespoke admissions strategy for Bachelor's and Master's candidates
                  targeting the world's most selective institutions — handled, end to end.
                </motion.p>

                {/* DEGREE PILLS */}
                <motion.div
                  variants={fadeUp}
                  className="mt-10 inline-flex liquid-glass rounded-full p-1.5 gap-1"
                >
                  {DEGREE_TIERS.map((tier, i) => (
                    <button
                      key={tier.id}
                      onClick={() => setActiveTier(i)}
                      className="relative px-5 py-2.5 text-xs text-white/80 hover:text-white transition-colors rounded-full"
                    >
                      {activeTier === i && (
                        <motion.div
                          layoutId="activeTierPill"
                          className="absolute inset-0 rounded-full bg-white/15"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{tier.label}</span>
                    </button>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="mt-10">
                  <MagnetButton strength={0.3} className="inline-block">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="liquid-glass-strong rounded-full pl-7 pr-2 py-2 flex items-center gap-4 text-sm text-white group"
                    >
                      <span className="font-medium tracking-tight">Begin Journey</span>
                      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      </span>
                    </motion.button>
                  </MagnetButton>
                </motion.div>
              </motion.div>
            </div>

            {/* BOTTOM QUOTE */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 lg:px-10 pb-8 lg:pb-10"
            >
              <div className="flex items-end justify-between gap-6">
                <div className="max-w-sm">
                  <p className="text-lg lg:text-xl font-medium tracking-tight leading-snug text-white/90">
                    "We imagined a realm with{" "}
                    <em className="font-serif italic font-normal">no boundaries</em>."
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-[10px] uppercase tracking-wider text-white/80">
                    AB
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/85">Aanya Bhattacharya</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">
                      Founder · Aura Global
                    </p>
                  </div>
                </div>
              </div>
            </motion.footer>
          </div>
        </div>

        {/* ============ RIGHT PANEL (48%) ============ */}
        <div className="hidden lg:flex relative w-[48%] min-h-[calc(100vh-6rem)] p-6 flex-col">
          {/* PROGRESS RAIL */}
          <div className="absolute left-1 top-12 bottom-12 w-[2px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              animate={{ height: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full bg-gradient-to-b from-white/80 via-white/40 to-white/10 aura-glow"
            />
          </div>

          <div className="relative h-full flex flex-col gap-4 pl-4">
            {/* TOP BAR */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex items-center justify-between gap-3"
            >
              <div className="liquid-glass rounded-full px-1.5 py-1.5 flex items-center gap-0.5">
                {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                    aria-label="social"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/75" strokeWidth={1.5} />
                  </button>
                ))}
              </div>

              <MagnetButton strength={0.22}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="liquid-glass-strong rounded-full pl-4 pr-5 py-2.5 flex items-center gap-2 text-xs text-white"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white/95" strokeWidth={1.5} />
                  <span className="font-medium tracking-tight">AI Profile Evaluator</span>
                </motion.button>
              </MagnetButton>
            </motion.div>

            {/* ROADMAP HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-end justify-between mt-2 px-1"
            >
              <div>
                <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">
                  The Zero-Stress Roadmap
                </p>
                <h2 className="text-2xl font-medium tracking-[-0.02em] mt-1.5 text-white">
                  Four steps.{" "}
                  <em className="font-serif italic font-normal">Zero overwhelm.</em>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Stage</p>
                <p className="text-sm text-white/95 tabular-nums">
                  0{activeStep + 1}{" "}
                  <span className="text-white/40">/ 0{ROADMAP_STEPS.length}</span>
                </p>
              </div>
            </motion.div>

            {/* STEP SELECTORS */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
              className="grid grid-cols-4 gap-2"
            >
              {ROADMAP_STEPS.map((step, i) => (
                <motion.button
                  key={step.id}
                  variants={fadeUp}
                  onClick={() => setActiveStep(i)}
                  className="relative liquid-glass rounded-2xl px-3 py-3.5 text-left group overflow-hidden"
                >
                  {activeStep === i && (
                    <motion.div
                      layoutId="activeStepBg"
                      className="absolute inset-0 rounded-2xl bg-white/[0.09]"
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/50 tabular-nums">
                        0{step.id}
                      </span>
                      {activeStep === i && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                        />
                      )}
                    </div>
                    <p
                      className={`text-[11px] leading-tight font-medium tracking-tight transition-colors ${
                        activeStep === i
                          ? "text-white"
                          : "text-white/55 group-hover:text-white/80"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* ACTIVE STEP — MORPHING DETAIL CARD */}
            <div className="flex-1 min-h-0 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)", scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, y: -16, filter: "blur(10px)", scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute inset-0"
                >
                  <TiltCard className="liquid-glass-strong rounded-3xl h-full w-full p-6 flex flex-col">
                    <div
                      style={{ transform: "translateZ(40px)" }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                            {ROADMAP_STEPS[activeStep].subtitle}
                          </p>
                          <h3 className="text-3xl font-medium tracking-[-0.03em] mt-2 text-white">
                            {ROADMAP_STEPS[activeStep].title}
                          </h3>
                        </div>
                        <div className="liquid-glass rounded-2xl w-11 h-11 flex items-center justify-center shrink-0">
                          <ActiveIcon className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                        </div>
                      </div>

                      <p className="text-sm text-white/70 leading-relaxed mt-5 max-w-md">
                        {ROADMAP_STEPS[activeStep].description}
                      </p>

                      <div className="mt-6 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.26em] text-white/40 mb-3">
                          We handle, end to end
                        </p>
                        <motion.ul
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                          }}
                          className="space-y-2"
                        >
                          {ROADMAP_STEPS[activeStep].deliverables.map((d, i) => (
                            <motion.li
                              key={i}
                              variants={fadeUp}
                              className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3"
                            >
                              <CheckCircle
                                className="w-3.5 h-3.5 text-white/70 shrink-0"
                                strokeWidth={1.5}
                              />
                              <span className="text-xs text-white/85 leading-snug">
                                {d}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      <div className="mt-5 pt-5 flex items-center justify-between">
                        <p className="text-[10px] text-white/50 uppercase tracking-wider">
                          Specialist assigned within 24h
                        </p>
                        <button className="text-[11px] text-white/85 hover:text-white flex items-center gap-1.5 transition-colors group">
                          View handover deck
                          <ArrowRight
                            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STUDENT DOUBTS REGISTRY */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="liquid-glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setDoubtsOpen(!doubtsOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center">
                    <span className="text-xs text-white/80 font-serif italic">?</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/95 font-medium tracking-tight">
                      Student Doubts Registry
                    </p>
                    <p className="text-[10px] text-white/50 mt-0.5">
                      Log a question — a counsellor responds within 6 hours
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: doubtsOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-white/85" strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {doubtsOpen && (
                  <motion.div
                    key="doubts-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className="liquid-glass rounded-xl p-4">
                        <p className="text-[11px] text-white/55 leading-relaxed">
                          <span className="font-serif italic text-white/75">
                            Reserved
                          </span>{" "}
                          — this module wires into the live doubt-stream service.
                          Counsellor responses, status badges and resolution timelines
                          will render here.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
