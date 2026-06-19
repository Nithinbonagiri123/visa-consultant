"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { successFeed, eventLabel, timeAgo, type SuccessEvent } from "@/lib/success-feed";

// Floating live-activity ticker. Cycles through recent successes from the
// demo feed. Desktop only (≥md); dismissable for the session via sessionStorage.

const SHOW_FOR_MS = 6_000;
const HIDE_FOR_MS = 5_000;
const FIRST_SHOW_DELAY_MS = 8_000; // don't fire until the page has settled
const STORAGE_KEY = "cm-ticker-hidden";

const accent: Record<SuccessEvent["type"], string> = {
  admit:        "bg-emerald-50 text-emerald-700",
  visa:         "bg-royal-50 text-royal-700",
  scholarship:  "bg-gold-300/30 text-gold-500",
  registration: "bg-navy-50 text-navy-700",
};

export function SuccessTicker() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Read dismissed state on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
    }
  }, []);

  // Cycle through the feed.
  useEffect(() => {
    if (dismissed) return;

    let mounted = true;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const tick = (firstRun: boolean) => {
      if (!mounted) return;
      showTimer = setTimeout(() => {
        if (!mounted) return;
        setVisible(true);
        hideTimer = setTimeout(() => {
          if (!mounted) return;
          setVisible(false);
          setIndex((i) => (i + 1) % successFeed.length);
          tick(false);
        }, SHOW_FOR_MS);
      }, firstRun ? FIRST_SHOW_DELAY_MS : HIDE_FOR_MS);
    };
    tick(true);

    return () => {
      mounted = false;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [dismissed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }

  if (dismissed) return null;
  const item = successFeed[index];

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-[0_24px_48px_-12px_rgba(10,23,51,0.25)]"
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accent[item.type]}`}
              aria-hidden
            >
              <CheckCircle2 size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                <span className="text-gold-500">{eventLabel(item.type)}</span>
                <span className="text-navy-400">·</span>
                <span className="text-navy-500">{timeAgo(item.minutesAgo)}</span>
              </p>
              <p className="mt-1 text-sm leading-snug text-navy-900">
                <span className="font-semibold">{item.flag} {item.initials}</span>{" "}
                <span className="text-navy-700">{item.detail}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
