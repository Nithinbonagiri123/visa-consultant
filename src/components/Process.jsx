"use client";

import { motion } from "framer-motion";
import { Wand2, BookOpen, Download, CheckCircle, ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    icon: Wand2,
    eyebrow: "Week 1 — 2",
    title: "Profile Architecture",
    body:
      "A diagnostic session, transcript audit and candidacy blueprint. Within seven days you receive a 22-page positioning report.",
    handles: [
      "Academic transcript audit & GPA conversion",
      "Strength & gap diagnostic mapping",
      "Personalised candidacy blueprint",
      "Programme typology recommendation",
    ],
  },
  {
    n: "02",
    icon: BookOpen,
    eyebrow: "Week 3 — 5",
    title: "Institutional Matching",
    body:
      "We model 200+ programmes against your blueprint. You receive a Reach / Match / Safe shortlist with ROI commentary.",
    handles: [
      "Ranked shortlist with rationale",
      "Tuition, scholarship & ROI modelling",
      "Faculty fit & research alignment notes",
      "Country & post-study work overlay",
    ],
  },
  {
    n: "03",
    icon: Download,
    eyebrow: "Week 6 — 12",
    title: "Elite Dossier & SOP",
    body:
      "Our editorial atelier composes every essay, SOP and LOR. You sit back, review three drafts, approve the final.",
    handles: [
      "Statement of Purpose composition",
      "Letter of Recommendation strategy",
      "CV, portfolio & video essay polish",
      "Application form filing across portals",
    ],
  },
  {
    n: "04",
    icon: CheckCircle,
    eyebrow: "Post-admit",
    title: "Stress-Free Visa & Liaison",
    body:
      "From visa filing to arrival-day liaison. Forex, accommodation, sim cards — every appointment owned by a dedicated specialist.",
    handles: [
      "Visa documentation & mock interview",
      "Accommodation & forex coordination",
      "Pre-departure briefing & arrival liaison",
      "First-month settlement check-ins",
    ],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative w-full py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <SectionHeading
          align="center"
          eyebrow="The Aura Process · 12 — 16 weeks"
          title="A roadmap engineered for"
          italic="zero overwhelm."
          description="Four phases. One dedicated specialist. Every backend task — handled — so you can stay focused on the next chapter of your life."
        />

        <div className="relative mt-20">
          {/* Center spine */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <div className="flex flex-col gap-16 lg:gap-24">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={`relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Numbered node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                    <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center">
                      <span className="text-xs text-white/90 font-medium tabular-nums">
                        {step.n}
                      </span>
                    </div>
                  </div>

                  {/* Text column */}
                  <div className={`${flip ? "lg:text-right lg:pl-16" : "lg:pr-16"}`}>
                    <p className="text-[11px] tracking-[0.32em] uppercase text-white/45 mb-3">
                      {step.eyebrow}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white leading-[1.05]">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-sm lg:text-base text-white/65 leading-relaxed max-w-md lg:max-w-none">
                      {step.body}
                    </p>
                  </div>

                  {/* Card column */}
                  <div className={`${flip ? "lg:pr-16" : "lg:pl-16"}`}>
                    <div className="liquid-glass-strong rounded-3xl p-7">
                      <div className="flex items-center justify-between mb-6">
                        <div className="liquid-glass rounded-2xl w-12 h-12 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                          We handle
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {step.handles.map((h, k) => (
                          <li
                            key={k}
                            className="flex items-start gap-3 text-xs text-white/80 leading-relaxed"
                          >
                            <CheckCircle
                              className="w-3.5 h-3.5 text-white/65 shrink-0 mt-0.5"
                              strokeWidth={1.5}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="#contact"
            className="liquid-glass-strong rounded-full pl-7 pr-2 py-2 flex items-center gap-4 text-sm text-white hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span className="font-medium tracking-tight">Start your roadmap</span>
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
