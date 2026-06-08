"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MagnetButton from "./ui/MagnetButton";

const TIERS = [
  {
    id: "essentials",
    name: "Essentials",
    tagline: "For self-driven applicants who need editorial firepower.",
    price: { masters: "₹85,000", bachelors: "₹95,000" },
    cadence: "one-time · 4-month engagement",
    cta: "Begin Essentials",
    highlights: [
      "Profile diagnostic & blueprint",
      "Shortlist of 6 universities",
      "SOP + 3 LOR drafts",
      "Application filing assistance",
      "Email-based specialist support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Our flagship roadmap — the zero-stress promise.",
    price: { masters: "₹1,75,000", bachelors: "₹2,10,000" },
    cadence: "one-time · 9-month engagement",
    cta: "Begin Premium",
    featured: true,
    highlights: [
      "Everything in Essentials",
      "Shortlist of 12 universities",
      "Unlimited SOP & essay revisions",
      "Visa filing & mock interview",
      "Dedicated WhatsApp specialist",
      "Scholarship concierge",
      "Pre-departure briefing",
    ],
  },
  {
    id: "ivy",
    name: "Ivy Concierge",
    tagline: "Two-year candidacy build for Ivy / Oxbridge / MIT-tier ambition.",
    price: { masters: "₹4,50,000", bachelors: "₹5,25,000" },
    cadence: "retainer · 24-month engagement",
    cta: "Apply for Concierge",
    highlights: [
      "Everything in Premium",
      "Research internship pipeline",
      "Olympiad & extracurricular strategy",
      "Faculty connect & rec strategy",
      "Mock alumni interviews",
      "Founder-level oversight",
      "Arrival-day liaison & first-month support",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Pricing() {
  const [degree, setDegree] = useState("masters");

  return (
    <section id="pricing" className="relative w-full py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <SectionHeading
          align="center"
          eyebrow="Investment · transparent pricing"
          title="Three tiers."
          italic="One promise."
          description="No hourly billing. No surprise add-ons. Pick the engagement that matches your ambition — we'll match it with a specialist."
        />

        {/* Degree toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex liquid-glass rounded-full p-1.5 gap-1">
            {[
              { id: "masters", label: "Master's" },
              { id: "bachelors", label: "Bachelor's" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDegree(opt.id)}
                className="relative px-6 py-2.5 text-xs text-white/80 hover:text-white transition-colors rounded-full"
              >
                {degree === opt.id && (
                  <motion.div
                    layoutId="pricingDegreePill"
                    className="absolute inset-0 rounded-full bg-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              className={`relative liquid-glass-strong rounded-3xl p-8 flex flex-col ${
                tier.featured ? "lg:scale-[1.03] lg:-translate-y-2" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="liquid-glass-strong rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-white" strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white">
                      Most chosen
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {tier.name}
                  </h3>
                  <p className="text-[11px] text-white/55 mt-1 max-w-[20ch] leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <motion.p
                  key={`${tier.id}-${degree}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-white"
                >
                  {tier.price[degree]}
                </motion.p>
                <p className="text-[10px] text-white/45 uppercase tracking-wider mt-2">
                  {tier.cadence}
                </p>
              </div>

              <div className="mt-7 pt-7">
                <ul className="space-y-3">
                  {tier.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-white/80 leading-relaxed">
                      <CheckCircle
                        className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <MagnetButton strength={0.2}>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className={`w-full liquid-glass rounded-full pl-5 pr-1.5 py-2 flex items-center justify-between gap-4 text-sm ${
                      tier.featured ? "text-white" : "text-white/85"
                    }`}
                  >
                    <span className="font-medium tracking-tight">{tier.cta}</span>
                    <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    </span>
                  </motion.a>
                </MagnetButton>
              </div>
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
          All engagements include a 14-day exit window · No questions asked
        </motion.p>
      </div>
    </section>
  );
}
