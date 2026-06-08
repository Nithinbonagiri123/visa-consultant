"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import MagnetButton from "./ui/MagnetButton";
import TiltCard from "./ui/TiltCard";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3200);
  };

  return (
    <section id="contact" className="relative w-full py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <TiltCard
          max={3}
          className="liquid-glass-strong rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          <div style={{ transform: "translateZ(40px)" }} className="relative">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.32em] uppercase text-white/55 mb-6"
            >
              Begin your journey · 20-minute discovery call
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.04] text-white max-w-3xl"
            >
              Hand us the paperwork.{" "}
              <em className="font-serif italic font-normal text-white/95">
                Keep your weekends.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-base text-white/65 max-w-xl leading-relaxed"
            >
              Drop your email — a senior strategist responds within six business
              hours with a tailored roadmap and a no-pressure call invite.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl"
            >
              <div className="flex-1 liquid-glass rounded-full px-6 py-1.5 flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitted}
                  placeholder="you@yourdomain.com"
                  className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40 py-2.5"
                />
              </div>

              <MagnetButton strength={0.25} className="sm:shrink-0">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="liquid-glass-strong rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-sm text-white w-full sm:w-auto justify-between"
                >
                  <span className="font-medium tracking-tight">
                    {submitted ? "Request received" : "Begin Journey"}
                  </span>
                  <motion.span
                    animate={{ rotate: submitted ? 0 : 0 }}
                    className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"
                  >
                    {submitted ? (
                      <CheckCircle className="w-4 h-4 text-white" strokeWidth={2} />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    )}
                  </motion.span>
                </motion.button>
              </MagnetButton>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 pt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-white/55 tracking-wider"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" strokeWidth={1.5} />
                Free profile snapshot
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3" strokeWidth={1.5} />
                No payment until tier-fit
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3" strokeWidth={1.5} />
                Response within 6 hours
              </span>
            </motion.div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
