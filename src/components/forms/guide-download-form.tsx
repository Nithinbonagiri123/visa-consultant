"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export function GuideDownloadForm({
  guideSlug,
  guideTitle,
}: {
  guideSlug: string;
  guideTitle: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guideSlug }),
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
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-navy-900">
                On its way to your inbox.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-navy-900">{guideTitle}</strong> — check
                your email (including spam). A senior counsellor will follow up
                within one working day.
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
                <Mail size={12} /> Free PDF
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-navy-900">
                Get the guide in your inbox.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                One email. No spam. You can unsubscribe with a single click.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="guide-email"
                className="text-xs font-medium uppercase tracking-wider text-navy-700"
              >
                Email
              </label>
              <input
                id="guide-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={state === "loading"}
                className="h-11 w-full rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 transition-colors focus-visible:outline-none focus-visible:border-royal-500 focus-visible:ring-2 focus-visible:ring-royal-500/15"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-rose-50 px-4 py-2 text-xs text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-6 text-sm font-semibold text-navy-900 shadow-glow-gold transition-opacity disabled:opacity-50"
            >
              {state === "loading" ? "Sending..." : "Send me the guide"}
              <ArrowRight size={16} />
            </button>

            <p className="text-center text-[11px] text-muted-foreground">
              We store your email securely. No third parties.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
