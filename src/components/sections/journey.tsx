"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container, SectionHeading } from "@/components/ui/container";
import { journey } from "@/lib/site";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative bg-navy-950 py-32 text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-royal-500/15 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="The journey"
          align="center"
          title={
            <span className="text-white">
              Six steps. One <span className="gradient-text">life-defining</span> outcome.
            </span>
          }
          description={
            <span className="text-navy-200">
              A clear, measurable path from the first conversation to your flight abroad.
            </span>
          }
          className="mx-auto items-center text-center"
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-6 top-2 w-px bg-gradient-to-b from-gold-300 via-gold-400 to-royal-500 sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-12">
            {journey.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex gap-6 sm:items-center ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden flex-1 sm:block" />

                  <div className="absolute left-6 -translate-x-1/2 sm:left-1/2">
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-navy-900 text-xs font-semibold tracking-wider text-gold-300 shadow-[0_0_0_6px_rgba(10,23,51,1)]">
                      {step.step}
                    </div>
                  </div>

                  <div
                    className={`ml-16 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:ml-0 ${
                      isLeft ? "sm:mr-12 sm:text-right" : "sm:ml-12"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                      Step {step.step}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-200">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
