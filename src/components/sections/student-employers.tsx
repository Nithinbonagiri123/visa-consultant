"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/container";

// Companies our Ireland alumni work at now. All Dublin- or Cork-anchored
// employers — chosen to evidence the "global tech & pharma corridor" claim
// elsewhere on the homepage. Demo data; swap with verified placements once the
// team confirms.
const EMPLOYERS = [
  "Google",     "Meta",        "Microsoft",   "LinkedIn",
  "Stripe",     "Workday",     "Salesforce",  "Intel",
  "Pfizer",     "Johnson & Johnson", "Eli Lilly",   "Medtronic",
  "Accenture",  "Mastercard",  "AIB",         "Bank of Ireland",
] as const;

export function StudentEmployers() {
  return (
    <section className="border-b border-navy-100 bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Where alumni land"
          align="center"
          className="mx-auto items-center text-center"
          title="Our Ireland alumni now work at these Dublin-anchored employers."
          description="A snapshot of the global tech, pharma and finance employers our students have joined after graduating from Irish universities."
        />

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-px border border-navy-100 bg-navy-100 sm:mt-14 sm:grid-cols-4"
        >
          {EMPLOYERS.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-20 items-center justify-center bg-white px-3 text-center font-display text-[13px] font-medium text-navy-800 sm:h-24 sm:text-[15px]"
            >
              {name}
            </motion.li>
          ))}
        </motion.ul>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
          Names shown are example Dublin / Cork-area employers across master&apos;s programmes we&apos;ve placed students into. Logo wall coming once placement permissions are confirmed.
        </p>
      </Container>
    </section>
  );
}
