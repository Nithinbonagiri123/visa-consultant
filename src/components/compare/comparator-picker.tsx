"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/site";
import { buildComparisonPairSlug } from "@/lib/comparator";

// Only 2-country pairs are prerendered; the picker enforces that here.
const MAX = 2;

export function ComparatorPicker() {
  const [selected, setSelected] = useState<string[]>([]);

  const compareHref = useMemo(() => {
    if (selected.length === 2) {
      return `/compare/${buildComparisonPairSlug(selected[0], selected[1])}`;
    }
    return null;
  }, [selected]);

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < MAX
          ? [...prev, slug]
          : prev,
    );
  }

  return (
    <Container className="pb-12">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {destinations.map((d) => {
            const active = selected.includes(d.slug);
            const full = !active && selected.length >= MAX;
            return (
              <button
                key={d.slug}
                type="button"
                disabled={full}
                onClick={() => toggle(d.slug)}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                  active
                    ? "border-navy-900 bg-navy-900 text-white shadow-elevated"
                    : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50",
                  full && "opacity-40",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{d.flag}</span>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight">
                      {d.country}
                    </p>
                    <p
                      className={cn(
                        "text-[11px]",
                        active ? "text-navy-200" : "text-navy-500",
                      )}
                    >
                      {d.intakes}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border",
                    active
                      ? "border-gold-300 bg-gold-300"
                      : "border-navy-200",
                  )}
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected.length === 2 && compareHref && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Link
                href={compareHref}
                className={buttonVariants({ variant: "gold", size: "xl" })}
              >
                Compare these countries <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {selected.length < 2 && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pick 2 countries to compare side-by-side.
          </p>
        )}
      </div>
    </Container>
  );
}
