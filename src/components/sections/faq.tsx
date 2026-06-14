"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { faqs } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Everything you wanted to ask <span className="gradient-text">before</span> we talked.
              </>
            }
            description="Most students arrive here with the same six questions. Here are direct, senior-counsellor answers."
          />

          <ul className="flex flex-col divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy-100 text-navy-700"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
