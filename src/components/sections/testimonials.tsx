"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="stories" className="relative py-16 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Success stories"
          title={
            <>
              The journey, told by <br />
              the students who <span className="gradient-text">lived it</span>.
            </>
          }
          description="Real outcomes from students Campus Meridian has guided to campuses across the world."
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-elevated sm:gap-6 sm:rounded-3xl sm:p-8"
            >
              <div className="absolute -right-6 -top-6 text-navy-100 transition-colors duration-300 group-hover:text-navy-200">
                <Quote size={96} strokeWidth={1} />
              </div>
              <blockquote className="relative font-display text-lg font-medium leading-snug tracking-tight text-navy-900 sm:text-xl lg:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="relative flex flex-wrap items-center gap-3 border-t border-navy-100 pt-4 sm:gap-4 sm:pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-navy-700 font-display text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy-900">{t.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                    {t.course} · {t.university}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-navy-50 px-3 py-1 text-[11px] font-medium text-navy-800 sm:text-xs">
                  {t.country}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
