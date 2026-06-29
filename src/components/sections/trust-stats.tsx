"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { stats } from "@/lib/site";
import { useCountUp } from "@/hooks/use-count-up";

export function TrustStats() {
  return (
    <section className="border-y border-navy-100 bg-white py-16 sm:py-20">
      <Container>
        <div className="grid divide-navy-100 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-3 border-t border-navy-100 px-6 py-8 sm:border-t-0 sm:px-10 sm:py-4 [&:nth-child(-n+2)]:sm:border-t-0 [&:nth-child(n+3)]:sm:border-t [&:nth-child(n+3)]:lg:border-t-0"
    >
      <p className="font-display text-5xl font-semibold leading-none tracking-tight text-navy-900 sm:text-6xl">
        <span ref={ref}>{v.toLocaleString()}</span>
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-700">
        {label}
      </p>
    </motion.div>
  );
}
