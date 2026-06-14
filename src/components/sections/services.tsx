"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Plane,
  Trophy,
  PenLine,
  BookOpen,
  Landmark,
  Building2,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { services } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Plane,
  Trophy,
  PenLine,
  BookOpen,
  Landmark,
  Building2,
  Compass,
};

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Eight services. <br />
              One uninterrupted journey.
            </>
          }
          description="From the day you reach out to the day you land — a single dedicated counsellor and a senior team behind them."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col gap-5 bg-white p-8 transition-colors hover:bg-surface-muted"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-white transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-gold-300 group-hover:to-gold-500 group-hover:text-navy-900">
                  {Icon && <Icon size={20} />}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
