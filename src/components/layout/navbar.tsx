"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { site, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border border-transparent px-4 py-2 transition-all duration-300",
          scrolled
            ? "border-navy-100/70 bg-white/80 shadow-elevated backdrop-blur-xl"
            : "bg-white/30 backdrop-blur-md",
        )}
      >
        <Link href="/" className="flex items-center gap-2 pl-2">
          <BrandMark />
          <span className="font-display text-base font-semibold tracking-tight text-navy-900">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <CurrencySwitcher />
          <a
            href="/#enquire"
            className={buttonVariants({ size: "sm", variant: "gold" })}
          >
            Book Consultation
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-900 xl:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-20 rounded-3xl border border-navy-100 bg-white p-4 shadow-elevated xl:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-navy-800 hover:bg-navy-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-navy-50 px-4 py-3">
                <span className="text-xs font-medium uppercase tracking-wider text-navy-700">
                  Currency
                </span>
                <CurrencySwitcher align="left" />
              </div>
              <a
                href="/#enquire"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-sm font-medium text-navy-900"
              >
                Book Consultation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function BrandMark() {
  return (
    <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 text-white shadow-elevated">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7l9 5 9-5-9-5z" />
        <path d="M3 13l9 5 9-5" />
        <path d="M3 18l9 5 9-5" />
      </svg>
      <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-gold-400 ring-2 ring-white" />
    </div>
  );
}
