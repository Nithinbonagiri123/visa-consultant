"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// A small "Email me this report" CTA used on every tool's result panel.
// Two states: collapsed (just the button) → expanded (email input).
// On submit, posts to /api/save-result with a tool tag + the structured
// payload so the drip platform can render and send the email.

export function EmailResultButton({
  tool,
  payload,
  label = "Email me this report",
  className,
}: {
  tool: "visa-eligibility" | "loan-emi" | "destination-finder" | "admit-probability";
  payload?: Record<string, unknown>;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setState("loading");
    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool, payload }),
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
    <div className={cn("rounded-2xl border border-navy-100 bg-navy-50/60 p-4", className)}>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 text-sm"
          >
            <CheckCircle2 className="text-emerald-600" size={18} />
            <span className="text-navy-900">
              On its way to <strong>{email}</strong> — check your inbox shortly.
            </span>
          </motion.div>
        ) : !open ? (
          <motion.div
            key="closed"
            initial={false}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-gold-300">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{label}</p>
                <p className="text-[11px] text-muted-foreground">
                  We&apos;ll email a polished summary for your records.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-800"
            >
              Email me <ArrowRight size={12} />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={submit}
            className="flex flex-col gap-3"
          >
            <label
              htmlFor={`email-${tool}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-700"
            >
              Email me a copy
            </label>
            <div className="flex gap-2">
              <input
                id={`email-${tool}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={state === "loading"}
                autoFocus
                className="h-11 flex-1 rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:outline-none focus-visible:border-royal-500 focus-visible:ring-2 focus-visible:ring-royal-500/15"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-5 text-xs font-semibold text-navy-900 disabled:opacity-50"
              >
                {state === "loading" ? "Sending..." : "Send"}
                <ArrowRight size={12} />
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-700">{error}</p>
            )}
            <p className="text-[10px] text-muted-foreground">
              No spam — we&apos;ll only email the report and a single follow-up.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
