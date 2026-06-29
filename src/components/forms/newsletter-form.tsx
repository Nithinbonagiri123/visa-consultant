"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  variant = "dark",
}: {
  variant?: "dark" | "light";
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
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const issue = data?.issues?.[0]?.message;
        setError(issue ?? data?.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("success");
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  const onDark = variant === "dark";

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
              onDark ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-800",
            )}
          >
            <CheckCircle2 size={16} className={onDark ? "text-gold-300" : "text-emerald-600"} />
            You&apos;re subscribed. Watch your inbox.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={submit}
            className="flex flex-col gap-2"
          >
            <div
              className={cn(
                "flex w-full max-w-md items-center gap-1 rounded-full border p-1.5",
                onDark
                  ? "border-white/10 bg-white/5"
                  : "border-navy-100 bg-white",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full",
                  onDark ? "bg-white/10 text-gold-300" : "bg-navy-50 text-navy-700",
                )}
              >
                <Mail size={14} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={state === "loading"}
                aria-label="Email address"
                className={cn(
                  "h-9 min-w-0 flex-1 bg-transparent text-base placeholder:text-current/40 focus:outline-none sm:text-sm",
                  onDark
                    ? "text-white placeholder:text-navy-300"
                    : "text-navy-900 placeholder:text-navy-400",
                )}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-full px-4 text-xs font-semibold transition-opacity disabled:opacity-50",
                  onDark
                    ? "bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900"
                    : "bg-navy-900 text-white",
                )}
              >
                {state === "loading" ? "Sending..." : "Subscribe"}
                <ArrowRight size={12} />
              </button>
            </div>
            {error && (
              <p
                className={cn(
                  "text-xs",
                  onDark ? "text-amber-300" : "text-rose-600",
                )}
              >
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
