// Currency catalogue + rate table + INR-string converter.
//
// All cost figures in the codebase are stored in INR (₹). When a non-INR
// currency is selected, components wrap their cost strings in <Cost /> which
// parses the INR string ("₹18–28L / yr"), converts via fixed rates, and
// re-formats in the chosen currency.
//
// Rates are approximate 2026 spot rates. Replace with a live FX feed
// (e.g. exchangerate.host) when revenue scale justifies the dependency.

export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR" | "AUD" | "CAD";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  label: string;        // human label
  prefix: string;        // displayed before the number (₹, $, £, €, "AUD ", "CAD ")
  rateInINR: number;     // 1 unit of this currency ≈ how many INR
};

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹",  label: "Indian Rupee",       prefix: "₹",     rateInINR: 1 },
  { code: "USD", symbol: "$",  label: "US Dollar",          prefix: "$",     rateInINR: 84 },
  { code: "GBP", symbol: "£",  label: "British Pound",      prefix: "£",     rateInINR: 105 },
  { code: "EUR", symbol: "€",  label: "Euro",               prefix: "€",     rateInINR: 91 },
  { code: "AUD", symbol: "A$", label: "Australian Dollar",  prefix: "A$",    rateInINR: 56 },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar",    prefix: "C$",    rateInINR: 62 },
];

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0];

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCY;
}

// ---- INR cost-string parsing + formatting ----------------------------------

type ParsedRange = {
  /** Lower bound, normalised to whole INR. */
  minINR: number;
  /** Upper bound, normalised to whole INR. May equal min if no range. */
  maxINR: number;
  /** Trailing modifier (e.g. " / yr", " / year") kept verbatim. */
  trailing: string;
};

// Examples we parse (units may differ per bound, e.g. London rent ranges):
//   "₹18–28L / yr"          → both 1.8M / 2.8M
//   "₹6–14L / yr"
//   "₹2.5–4L / year"
//   "₹35–55K / year"         (K = thousands)
//   "₹70K–1.0L / month"      (mixed K-L — each bound has its own unit)
//   "₹0–4L / year"
//   "₹18L"                   (single value, no range)
//   "₹1.5–2.5L / year"
//
// Returns null if we don't recognise the shape — in which case the caller
// should display the string verbatim.
export function parseINRRangeString(s: string): ParsedRange | null {
  // Normalise dashes
  const normalised = s.replace(/[–—‒−]/g, "-");
  // Capture optional unit after EACH bound so mixed-unit ranges (K..L) work.
  const match = normalised.match(
    /₹\s*(\d+(?:\.\d+)?)\s*([LK])?\s*(?:-\s*(\d+(?:\.\d+)?)\s*([LK])?)?\s*(.*)$/i,
  );
  if (!match) return null;
  const [, minStr, minUnitRaw, maxStr, maxUnitRaw, trailing] = match;

  // Unit resolution: if only one side specifies a unit, the other inherits it.
  // If neither does, default to L (most common in our cost data).
  const minUnit = (minUnitRaw ?? maxUnitRaw ?? "L").toUpperCase();
  const maxUnit = (maxUnitRaw ?? minUnitRaw ?? "L").toUpperCase();
  if ((minUnit !== "L" && minUnit !== "K") || (maxUnit !== "L" && maxUnit !== "K")) {
    return null;
  }

  // We need at least *something* recognisably L/K or we're probably not looking
  // at a cost string at all.
  if (!minUnitRaw && !maxUnitRaw) return null;

  const unitMul = (u: string) => (u === "L" ? 100_000 : 1_000);
  const min = parseFloat(minStr) * unitMul(minUnit);
  const max = maxStr ? parseFloat(maxStr) * unitMul(maxUnit) : min;
  return { minINR: min, maxINR: max, trailing: trailing || "" };
}

export function formatRangeInCurrency(
  range: ParsedRange,
  currency: Currency,
): string {
  if (currency.code === "INR") {
    return formatINRFromRange(range);
  }
  const minFx = range.minINR / currency.rateInINR;
  const maxFx = range.maxINR / currency.rateInINR;
  const min = formatFxAmount(minFx);
  const max = formatFxAmount(maxFx);
  const num = min === max ? min : `${min}–${max}`;
  return `${currency.prefix}${num}${range.trailing}`;
}

function formatINRFromRange(r: ParsedRange): string {
  // Re-render the INR form using the most compact unit (L or K) that fits.
  const useLakhs = r.maxINR >= 100_000;
  const unit = useLakhs ? 100_000 : 1_000;
  const suffix = useLakhs ? "L" : "K";
  const min = niceNumber(r.minINR / unit);
  const max = niceNumber(r.maxINR / unit);
  const num = min === max ? min : `${min}–${max}`;
  return `₹${num}${suffix}${r.trailing}`;
}

function formatFxAmount(n: number): string {
  if (n >= 1_000) {
    // Show as e.g. "21K" or "1.2M"
    if (n >= 1_000_000) {
      return `${niceNumber(n / 1_000_000)}M`;
    }
    return `${niceNumber(n / 1_000)}K`;
  }
  // Sub-thousand: round to nearest 10
  return `${Math.round(n / 10) * 10}`;
}

function niceNumber(n: number): string {
  if (n >= 100) return `${Math.round(n)}`;
  if (n >= 10) return `${Math.round(n)}`;
  // Below 10, allow one decimal if it adds info
  const rounded = Math.round(n * 10) / 10;
  return rounded % 1 === 0 ? `${rounded}` : `${rounded.toFixed(1)}`;
}

// ---- Public formatters used by components ---------------------------------

/** Format any INR cost string in the target currency. If unparseable, returns input. */
export function formatCostString(
  s: string,
  currency: Currency,
): string {
  if (currency.code === "INR") return s;
  const parsed = parseINRRangeString(s);
  if (!parsed) return s;
  return formatRangeInCurrency(parsed, currency);
}

/** Format an INR amount given in lakhs (e.g. `26` → "₹26L" or "$31K"). */
export function formatFromINRLakhs(
  lakhs: number,
  currency: Currency,
): string {
  const inr = lakhs * 100_000;
  return formatRangeInCurrency(
    { minINR: inr, maxINR: inr, trailing: "" },
    currency,
  );
}
