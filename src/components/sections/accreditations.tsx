"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, GraduationCap, Globe2, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const ACCREDITATIONS = [
  { label: "MEA Licensed",         sub: "Govt. of India",      icon: ShieldCheck },
  { label: "British Council",       sub: "Certified counsellors", icon: Award },
  { label: "ICEF Agency",           sub: "International",         icon: Globe2 },
  { label: "AIRC",                  sub: "American Int. Rec.",   icon: BadgeCheck },
  { label: "PIER Trained",          sub: "Australia",            icon: GraduationCap },
] as const;

export function Accreditations() {
  return (
    <section className="border-y border-navy-100 bg-surface-muted py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-navy-500">
            Licensed · Certified · Trusted
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {ACCREDITATIONS.map((a) => (
              <li key={a.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-navy-900 shadow-[0_4px_12px_-4px_rgba(10,23,51,0.15)]">
                  <a.icon size={18} />
                </span>
                <div className="text-left">
                  <p className="font-display text-sm font-semibold tracking-tight text-navy-900">
                    {a.label}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
                    {a.sub}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
