"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="stories" className="relative py-32">
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-elevated"
            >
              <div className="absolute -right-6 -top-6 text-navy-100 transition-colors duration-300 group-hover:text-navy-200">
                <Quote size={96} strokeWidth={1} />
              </div>
              <blockquote className="relative font-display text-xl font-medium leading-snug tracking-tight text-navy-900 sm:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="relative flex items-center gap-4 border-t border-navy-100 pt-5">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-navy-700 font-display text-sm font-semibold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-navy-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.course} · {t.university}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800">
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
