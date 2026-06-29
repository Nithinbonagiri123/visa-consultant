"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { Cost } from "@/components/ui/cost";
import { destinations } from "@/lib/site";

export function Destinations() {
  return (
    <section id="destinations" className="relative py-16 sm:py-32">
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

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <MotionLink
              key={d.slug}
              href={`/study-in-${d.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)] sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-150" />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl leading-none sm:text-4xl">{d.flag}</span>
                  <div>
                    <p className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                      {d.country}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-navy-500 sm:text-xs sm:tracking-[0.14em]">
                      Intakes · {d.intakes}
                    </p>
                  </div>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
                {d.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {d.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-navy-50 px-3 py-1 text-[11px] font-medium text-navy-800 sm:text-xs"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-100 pt-4 sm:mt-6 sm:pt-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:text-[11px] sm:tracking-[0.16em]">
                    Tuition from
                  </p>
                  <p className="font-display text-base font-semibold text-navy-900 sm:text-lg">
                    <Cost inr={d.costFromINR} />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:text-[11px] sm:tracking-[0.16em]">
                    Top university
                  </p>
                  <p className="text-[13px] font-medium text-navy-900 sm:text-sm">
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
