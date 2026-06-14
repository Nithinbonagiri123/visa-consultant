"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <BackgroundLayers />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-3 py-1.5 text-xs font-medium text-navy-800 backdrop-blur"
            >
              <ShieldCheck size={14} className="text-royal-500" />
              India&apos;s trusted global education partner
              <span className="mx-1 h-1 w-1 rounded-full bg-navy-200" />
              <span className="text-navy-500">2026 intake open</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl"
            >
              {["Your gateway", "to a", <span key="g" className="gradient-text">world-class</span>, "education."].map((piece, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
                  }}
                  className="mr-3 inline-block"
                >
                  {piece}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Senior overseas-education counsellors guiding Indian students to
              admission, scholarship, and visa success at leading universities in
              <span className="text-navy-900"> 25+ countries</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#enquire" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book free consultation
                <ArrowRight size={18} />
              </a>
              <a href="/visa-eligibility" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Check visa eligibility
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-navy-700"
            >
              <Bullet label="10,000+ students guided" />
              <Bullet label="500+ partner universities" />
              <Bullet label="95% visa success" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
          >
            <EnquiryForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Bullet({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Sparkles size={14} className="text-gold-400" />
      <span className="font-medium">{label}</span>
    </span>
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
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: [0, 18, 0] }}
        transition={{
          opacity: { duration: 1.4, delay: 0.4 },
          x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-1/3 bottom-0 -z-10 h-80 w-80 rounded-full bg-navy-200/40 blur-3xl"
      />
    </>
  );
}
