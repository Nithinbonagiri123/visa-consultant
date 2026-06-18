"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function CTABand() {
  return (
    <section className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-10 sm:p-16"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-royal-400/30 blur-3xl" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                Your next step
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Book a free 30-minute consultation with a senior counsellor.
              </h2>
              <p className="mt-4 max-w-xl text-base text-navy-200">
                No sales pitch. A clear assessment of your profile, target countries, and a six-step plan you can act on the same week.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/#enquire" className={buttonVariants({ variant: "gold", size: "xl" })}>
                Book free consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="/#destinations"
                className={buttonVariants({ variant: "outline", size: "xl", className: "border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/40" })}
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
