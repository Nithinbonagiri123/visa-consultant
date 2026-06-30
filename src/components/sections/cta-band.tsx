"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { stockImages, stockSrc } from "@/lib/images";

export function CTABand() {
  return (
    <section className="bg-surface-cream py-16 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden border border-navy-900"
        >
          <Image
            src={stockSrc(stockImages.graduation, 1800)}
            alt={stockImages.graduation.alt}
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(95deg, rgba(10,23,51,0.94) 0%, rgba(10,23,51,0.82) 55%, rgba(10,23,51,0.45) 100%)",
            }}
          />

          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="border-t-2 border-gold-400 pt-8 sm:pt-10">
              <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-300 sm:text-[11px]">
                    Your next step
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Book a free 30-minute Ireland consultation with a senior counsellor.
                  </h2>
                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-navy-100">
                    No sales pitch. A clear assessment of your profile, Irish university shortlist, and a step-by-step plan you can act on the same week.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gold-300">
                    <li>&middot; Up to &euro;10,000 scholarships</li>
                    <li>&middot; Collateral-free loans up to &#8377;1 Cr</li>
                    <li>&middot; Type D visa documentation</li>
                  </ul>
                </div>

                <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
                  <a
                    href="/#enquire"
                    className={buttonVariants({ variant: "gold", size: "lg", className: "w-full lg:w-auto" })}
                  >
                    Book free consultation
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="/study-in-ireland"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "w-full border-white/40 bg-transparent text-white hover:border-white lg:w-auto",
                    })}
                  >
                    Read the Ireland guide
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
