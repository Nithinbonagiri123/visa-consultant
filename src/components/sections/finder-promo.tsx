"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function FinderPromo() {
  return (
    <section className="relative py-14 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-elevated sm:rounded-[2rem] sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-gold-300/30 to-royal-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-royal-500/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300 sm:text-[11px] sm:tracking-[0.18em]">
                <Sparkles size={12} /> Free · 60 seconds
              </div>
              <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-navy-900 sm:mt-4 sm:text-4xl lg:text-5xl">
                Not sure which country fits? <br />
                <span className="gradient-text">Let our finder rank them for you.</span>
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                Answer five quick questions about budget, field, and priorities — we&apos;ll score all nine destinations against your goals using the same framework our senior counsellors use in person.
              </p>
            </div>

            <Link
              href="/find-your-destination"
              className={buttonVariants({ variant: "gold", size: "xl", className: "w-full sm:w-auto" })}
            >
              Start the finder <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
