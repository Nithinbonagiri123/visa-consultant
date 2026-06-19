"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, Sparkles } from "lucide-react";

import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WebinarRegisterForm({
  webinarSlug,
  webinarTitle,
}: {
  webinarSlug: string;
  webinarTitle: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setState("loading");
    try {
      const res = await fetch("/api/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, webinarSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.issues?.[0]?.message ?? data?.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/85 p-7 shadow-elevated backdrop-blur-xl sm:p-8">
      <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-300/30 via-royal-400/20 to-transparent blur-2xl" />

      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-navy-900">
                You&apos;re registered.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ve emailed you a calendar invite for{" "}
                <strong className="text-navy-900">{webinarTitle}</strong>.
                A reminder goes out 24 hours before, and again an hour before.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={submit}
            className="flex flex-col gap-4"
          >
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
                <Sparkles size={12} /> Free · Register
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-navy-900">
                Save your seat.
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Live Q&amp;A at the end. Recording sent to all registrants.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-name">Full name</Label>
              <Input
                id="reg-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sneha Iyer"
                required
                disabled={state === "loading"}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                disabled={state === "loading"}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-phone">Phone (optional)</Label>
              <Input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9XXXXXXXXX"
                disabled={state === "loading"}
              />
            </div>

            {error && (
              <p className="rounded-xl bg-rose-50 px-4 py-2 text-xs text-rose-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="mt-2 w-full"
              disabled={state === "loading"}
            >
              {state === "loading" ? "Saving your seat..." : "Save my seat"}
              <ArrowRight size={16} />
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Calendar size={11} />
              You&apos;ll get a calendar invite + 2 reminders + recording link
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
