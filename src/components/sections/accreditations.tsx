"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Globe2, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

// Ireland-relevant accreditations only. The original list (British Council /
// AIRC / PIER) belonged to the multi-country era and is preserved in git
// history if those scopes return.
const ACCREDITATIONS = [
  { label: "MEA Licensed",            sub: "Govt. of India",                     icon: ShieldCheck },
  { label: "Education in Ireland",    sub: "Approved partner",                   icon: BadgeCheck },
  { label: "Marketing English Ireland", sub: "MEI member",                       icon: BookOpen },
  { label: "ICEF Agency",             sub: "International Consultants for Education", icon: Globe2 },
] as const;

export function Accreditations() {
  return (
    <section className="border-b border-navy-100 bg-surface-cream py-12 sm:py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-navy-700">
            Licensed &middot; Accredited &middot; Ireland-focused
          </p>
          <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-10">
            {ACCREDITATIONS.map((a) => (
              <li key={a.label} className="flex items-center gap-3 border-l-2 border-gold-400 pl-3">
                <a.icon size={20} className="shrink-0 text-navy-900" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="font-display text-sm font-semibold text-navy-900">
                    {a.label}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
