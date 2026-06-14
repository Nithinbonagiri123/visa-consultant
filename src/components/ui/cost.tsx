"use client";

import { useCurrency } from "@/contexts/currency-context";

/**
 * Renders an INR cost string in the currently-selected currency.
 *
 * SSR + first hydration render the INR string verbatim (matching the data),
 * then the client switches to the user's preferred currency after mount.
 */
export function Cost({ inr }: { inr: string }) {
  const { formatCost } = useCurrency();
  return <>{formatCost(inr)}</>;
}

/** Same as Cost but accepts an INR amount given in lakhs. */
export function CostLakhs({ lakhs }: { lakhs: number }) {
  const { formatLakhs } = useCurrency();
  return <>{formatLakhs(lakhs)}</>;
}
