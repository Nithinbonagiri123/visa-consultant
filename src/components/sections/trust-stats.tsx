"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { stats } from "@/lib/site";
import { useCountUp } from "@/hooks/use-count-up";

export function TrustStats() {
  return (
    <section className="relative py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-elevated">
          <div className="absolute inset-0 bg-grid opacity-[0.04]" />
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-royal-500/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

          <div className="relative grid divide-navy-100 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {stats.map((s, i) => (
              <Stat
                key={s.label}
                index={i}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  index,
  value,
  suffix,
  label,
}: {
  index: number;
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: v } = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-2 border-t border-navy-100 px-6 py-8 sm:border-t-0 sm:px-8 sm:py-10 [&:nth-child(-n+2)]:sm:border-t-0 [&:nth-child(n+3)]:sm:border-t [&:nth-child(n+3)]:lg:border-t-0"
    >
      <p className="font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
        <span ref={ref}>{v.toLocaleString()}</span>
        <span className="text-gold-400">{suffix}</span>
      </p>
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-navy-700">
        {label}
      </p>
    </motion.div>
  );
}
