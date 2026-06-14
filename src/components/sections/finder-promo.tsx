"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function FinderPromo() {
  return (
    <section className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-8 shadow-elevated sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-gold-300/30 to-royal-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-royal-500/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                <Sparkles size={12} /> Free · 60 seconds
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-navy-900 sm:text-5xl">
                Not sure which country fits? <br />
                <span className="gradient-text">Let our finder rank them for you.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Answer five quick questions about budget, field, and priorities — we&apos;ll score all nine destinations against your goals using the same framework our senior counsellors use in person.
              </p>
            </div>

            <Link
              href="/find-your-destination"
              className={buttonVariants({ variant: "gold", size: "xl" })}
            >
              Start the finder <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
