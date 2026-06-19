"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function CTABand() {
  return (
    <section className="relative py-14 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-6 sm:rounded-[2rem] sm:p-10 lg:p-16"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-royal-400/30 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:text-xs sm:tracking-[0.2em]">
                Your next step
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Book a free 30-minute consultation with a senior counsellor.
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-navy-200 sm:mt-4 sm:text-base">
                No sales pitch. A clear assessment of your profile, target countries, and a six-step plan you can act on the same week.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-300 sm:mt-6 sm:text-[11px] sm:tracking-[0.14em]">
                <span className="rounded-full border border-gold-300/40 bg-white/5 px-3 py-1 backdrop-blur">
                  Up to ₹25L in scholarships
                </span>
                <span className="rounded-full border border-gold-300/40 bg-white/5 px-3 py-1 backdrop-blur">
                  Collateral-free loans up to ₹1 Cr
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="/#enquire"
                className={buttonVariants({ variant: "gold", size: "xl", className: "w-full sm:w-auto" })}
              >
                Book free consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="/#destinations"
                className={buttonVariants({ variant: "outline", size: "xl", className: "w-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/40 sm:w-auto" })}
              >
                Explore destinations
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
