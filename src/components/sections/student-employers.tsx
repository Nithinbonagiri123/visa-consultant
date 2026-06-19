"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/container";

// Companies where Campus Meridian alumni work now. Demo data — swap with
// verified placements once the team confirms.
const EMPLOYERS = [
  "Google",      "Microsoft",     "Amazon",        "Meta",
  "Apple",       "Goldman Sachs", "JP Morgan",     "McKinsey",
  "Deloitte",    "Accenture",     "Shopify",       "Stripe",
  "Spotify",     "Booking.com",   "Klarna",        "ASML",
  "Ericsson",    "Atlassian",     "Canva",         "Wolt",
  "Cohere",      "Bain",          "Boston Consulting", "PwC",
] as const;

export function StudentEmployers() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Where alumni land"
          align="center"
          className="mx-auto items-center text-center"
          title={
            <>
              Campus Meridian students now work at <span className="gradient-text">these companies</span>.
            </>
          }
          description="A snapshot of the 600+ global employers our alumni have joined after graduating from partner universities."
        />

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-navy-100 bg-navy-100 sm:grid-cols-3 lg:grid-cols-4"
        >
          {EMPLOYERS.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-20 items-center justify-center bg-white text-center font-display text-base font-semibold tracking-tight text-navy-700 transition-colors hover:bg-surface-muted hover:text-navy-900"
            >
              {name}
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Names shown are example employers across master&apos;s and MBA programmes we&apos;ve placed students into.
        </p>
      </Container>
    </section>
  );
}
