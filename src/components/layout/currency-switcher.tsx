"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/contexts/currency-context";

export function CurrencySwitcher({
  className,
  align = "right",
}: {
  className?: string;
  align?: "left" | "right";
}) {
  const { currency, setCurrencyCode, options } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-navy-100 bg-white/70 px-3 text-xs font-semibold text-navy-900 backdrop-blur transition-colors hover:bg-white"
      >
        <span className="text-sm leading-none">{currency.symbol}</span>
        <span>{currency.code}</span>
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className={cn(
              "absolute z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-elevated",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            {options.map((c) => {
              const active = c.code === currency.code;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setCurrencyCode(c.code);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-navy-50 text-navy-900"
                        : "text-navy-800 hover:bg-navy-50",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-5 text-base leading-none text-navy-700">
                        {c.symbol}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium leading-none">{c.code}</span>
                        <span className="mt-0.5 text-[11px] text-muted-foreground">
                          {c.label}
                        </span>
                      </span>
                    </span>
                    {active && <Check size={14} className="text-gold-500" />}
                  </button>
                </li>
              );
            })}
            <li className="mt-1 border-t border-navy-100 px-3 pt-2 pb-1 text-[10px] text-muted-foreground">
              Indicative conversion · INR is the source of truth
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
