"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      <BackgroundLayers />

      <Container className="relative">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-navy-800 backdrop-blur sm:text-xs"
            >
              <ShieldCheck size={12} className="text-royal-500 sm:hidden" />
              <ShieldCheck size={14} className="hidden text-royal-500 sm:inline" />
              India&apos;s trusted global education partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
              className="mt-5 font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-navy-900 sm:mt-6 sm:text-5xl lg:text-7xl"
            >
              Your gateway to a{" "}
              <span className="gradient-text">world-class</span> education.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:mt-7 sm:text-base lg:text-lg"
            >
              Senior overseas-education counsellors guiding Indian students to
              admission, scholarship, and visa success at leading universities in
              <span className="text-navy-900"> 25+ countries</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
              className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#enquire"
                className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
              >
                Book free consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="/visa-eligibility"
                className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
              >
                Check visa eligibility
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-7 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-700"
            >
              <span className="rounded-full bg-gold-300/30 px-3 py-1 text-gold-500">
                ✦ Up to ₹25L in scholarships
              </span>
              <span className="rounded-full bg-royal-500/10 px-3 py-1 text-royal-600">
                ✦ Loans up to ₹1 Cr
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
          >
            <EnquiryForm />
          </motion.div>
        </div>

        <ScrollCue />
      </Container>
    </section>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.1 }}
      className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-navy-500"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">
          Scroll
        </span>
        <ChevronDown size={14} />
      </motion.div>
    </motion.div>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade" />
      <FloatingOrbs />
    </>
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -18, 0] }}
        transition={{
          opacity: { duration: 1.2 },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-24 top-24 -z-10 h-80 w-80 rounded-full bg-royal-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 22, 0] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.2 },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-gold-400/15 blur-3xl"
      />
    </>
  );
}
