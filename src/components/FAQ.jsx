"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const FAQS = [
  {
    q: "What makes Aura Global different from a standard study-abroad agency?",
    a: "Most agencies are paid commission by universities, which biases their shortlist. Aura is fully student-paid — we work for you, not the institutions. Every recommendation is filtered through your ambition, finances and long-term trajectory, not partner kickbacks.",
  },
  {
    q: "How early should I start engaging with a consultant?",
    a: "For Master's applicants: 9–14 months before your intended intake. For Bachelor's: ideally end of Grade 10 or start of Grade 11. For Ivy / Oxbridge candidacies: we recommend a 24-month build through our Concierge tier so research, olympiads and extracurriculars compound.",
  },
  {
    q: "Will I actually be writing my own SOP, or does someone else write it?",
    a: "You write the seed — your story, your why. Our editorial atelier then shapes it into an institutional-grade SOP across three drafts. Final voice, ideas and authorship remain yours. We never submit anything you haven't read, edited and signed off on.",
  },
  {
    q: "What if I don't get into any of the universities on my shortlist?",
    a: "It rarely happens — our 11-year top-choice admit rate is 94%. If it does, we restructure your candidacy for the next cycle at no additional fee, including SOP rewrites and new shortlist construction. The promise is the outcome.",
  },
  {
    q: "Do you handle the visa filing personally, or is it outsourced?",
    a: "In-house, end to end. A dedicated visa specialist owns your file from documentation to interview prep to embassy-day support. We've filed across 18 country consulates and maintain a 99.2% first-attempt approval rate.",
  },
  {
    q: "Can I switch tiers mid-engagement?",
    a: "Yes — upgrades are prorated and processed within 48 hours. Downgrades are honoured at the next billing cycle. Every engagement also includes a 14-day exit window with full refund, no questions asked.",
  },
  {
    q: "Do you support PhD or research-track applicants?",
    a: "Yes, through our Concierge tier. PhD candidacy requires faculty connect, publication strategy and statement of research drafting — all of which are bespoke retainer engagements, scoped after a discovery call.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative w-full py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <SectionHeading
          align="center"
          eyebrow="Frequently asked"
          title="Questions we hear"
          italic="every day."
          description="Can't find what you're looking for? The Student Doubts Registry — or a 20-minute discovery call — is one click away."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-14 flex flex-col gap-3"
        >
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                layout
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="liquid-glass-strong rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full px-7 py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <div className="flex items-start gap-5 flex-1">
                    <span className="text-[11px] text-white/45 tabular-nums mt-1 tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-base lg:text-lg font-medium tracking-tight transition-colors ${
                        isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {item.q}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-white/85" strokeWidth={1.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 pl-[60px] lg:pl-[68px]">
                        <p className="text-sm text-white/65 leading-relaxed max-w-2xl">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
