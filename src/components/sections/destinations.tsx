"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { destinations } from "@/lib/site";

export function Destinations() {
  return (
    <section id="destinations" className="relative py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Destinations"
            title={
              <>
                Study where your <span className="gradient-text">ambition</span><br />
                meets opportunity.
              </>
            }
            description="Nine globally trusted destinations. Real graduate outcomes, transparent costs, and consulate-tuned visa strategy for each one."
          />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <MotionLink
              key={d.slug}
              href={`/study-in-${d.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-150" />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl leading-none">{d.flag}</span>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-navy-900">
                      {d.country}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-500">
                      Intakes · {d.intakes}
                    </p>
                  </div>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {d.blurb}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Tuition from
                  </p>
                  <p className="font-display text-lg font-semibold text-navy-900">
                    {d.costFromINR}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Top university
                  </p>
                  <p className="text-sm font-medium text-navy-900">
                    {d.topUniversities[0]}
                  </p>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

const MotionLink = motion(Link);
