"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatCostString,
  formatFromINRLakhs,
  getCurrency,
  type Currency,
  type CurrencyCode,
} from "@/lib/currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrencyCode: (code: CurrencyCode) => void;
  /** Format an INR string like "₹18–28L / yr" in the active currency. */
  formatCost: (inrString: string) => string;
  /** Format an INR amount in lakhs in the active currency. */
  formatLakhs: (lakhs: number) => string;
  /** All available currencies for switcher UIs. */
  options: Currency[];
};

const STORAGE_KEY = "cm-currency";

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // SSR + first hydration starts at INR so server and client markup match.
  // After mount we read localStorage and switch if the user previously chose
  // another currency.
  const [code, setCode] = useState<CurrencyCode>(DEFAULT_CURRENCY.code);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && CURRENCIES.some((c) => c.code === stored)) {
      setCode(stored);
    }
  }, []);

  const currency = useMemo(() => getCurrency(code), [code]);

  const setCurrencyCode = useCallback((next: CurrencyCode) => {
    setCode(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrencyCode,
      formatCost: (s) => formatCostString(s, currency),
      formatLakhs: (n) => formatFromINRLakhs(n, currency),
      options: CURRENCIES,
    }),
    [currency, setCurrencyCode],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
