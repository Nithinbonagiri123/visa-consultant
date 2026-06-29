"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function CTABand() {
  return (
    <section className="bg-surface-cream py-16 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="border border-navy-100 bg-white px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
        >
          <div className="border-t-2 border-gold-400 pt-8 sm:pt-10">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-500 sm:text-[11px]">
                  Your next step
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
                  Book a free 30-minute Ireland consultation with a senior counsellor.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  No sales pitch. A clear assessment of your profile, Irish university shortlist, and a step-by-step plan you can act on the same week.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em] text-navy-700">
                  <li>&middot; Up to &euro;10,000 scholarships</li>
                  <li>&middot; Collateral-free loans up to &#8377;1 Cr</li>
                  <li>&middot; Type D visa documentation</li>
                </ul>
              </div>

              <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
                <a
                  href="/#enquire"
                  className={buttonVariants({ variant: "primary", size: "lg", className: "w-full lg:w-auto" })}
                >
                  Book free consultation
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/study-in-ireland"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "w-full lg:w-auto" })}
                >
                  Read the Ireland guide
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
