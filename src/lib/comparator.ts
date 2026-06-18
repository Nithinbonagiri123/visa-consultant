import { destinations, type Destination } from "@/lib/site";
import { destinationDetail } from "@/lib/destinations-detail";
import { visaProfiles } from "@/lib/visa-data";

export type ComparisonRow = {
  label: string;
  group: "Overview" | "Visa" | "Costs" | "Outcomes";
  values: string[];        // one per country, in user-supplied order
  best?: boolean[];        // optional highlight (same length as values)
  /** When true, values are INR-denominated and the table should run them
      through the currency formatter. */
  isCost?: boolean;
};

export type CountrySnapshot = {
  slug: string;
  country: string;
  flag: string;
};

export const SUPPORTED_PAIRS: { a: string; b: string; intent: string }[] = [
  { a: "canada", b: "australia", intent: "PR-pathway + post-study work" },
  { a: "canada", b: "uk", intent: "PGWP vs Graduate Route" },
  { a: "canada", b: "usa", intent: "Affordability vs ceiling" },
  { a: "uk", b: "usa", intent: "1-year master's vs STEM OPT" },
  { a: "uk", b: "ireland", intent: "EU vs Brexit-era UK" },
  { a: "ireland", b: "canada", intent: "Tech hub vs PR pathway" },
  { a: "australia", b: "new-zealand", intent: "Group of Eight vs lower-cost NZ" },
  { a: "germany", b: "canada", intent: "Low tuition vs PR pipeline" },
  { a: "germany", b: "usa", intent: "Free public vs research ceiling" },
  { a: "france", b: "uk", intent: "Grandes Écoles vs Russell Group" },
  { a: "uae", b: "canada", intent: "Tax-free salaries vs PR" },
  { a: "uk", b: "australia", intent: "Master's pace vs stay-back" },
];

export function buildComparisonPairSlug(a: string, b: string): string {
  const [x, y] = [a, b].sort();
  return `${x}-vs-${y}`;
}

export function parseComparisonPairSlug(
  slug: string,
): { a: string; b: string } | null {
  const idx = slug.indexOf("-vs-");
  if (idx === -1) return null;
  const a = slug.slice(0, idx);
  const b = slug.slice(idx + 4);
  // Reject 3+ country slugs (`a-vs-b-vs-c`) — only pairs are supported.
  if (!a || !b || b.includes("-vs-")) return null;
  return { a, b };
}

/** All C(N,2) country pair combinations as canonical slugs. Used to drive
    generateStaticParams so any pair the picker can produce is prerendered. */
export function getAllComparisonPairSlugs(): string[] {
  const slugs = destinations.map((d) => d.slug);
  const pairs: string[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push(buildComparisonPairSlug(slugs[i], slugs[j]));
    }
  }
  return pairs;
}

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function buildComparison(slugs: string[]): {
  countries: CountrySnapshot[];
  rows: ComparisonRow[];
} {
  const countries: CountrySnapshot[] = slugs
    .map((s) => destinations.find((d) => d.slug === s))
    .filter((d): d is Destination => Boolean(d))
    .map((d) => ({ slug: d.slug, country: d.country, flag: d.flag }));

  const get = (s: string) => destinations.find((d) => d.slug === s);
  const detail = (s: string) => destinationDetail[s];
  const visa = (s: string) => visaProfiles[s];

  const rows: ComparisonRow[] = [
    {
      label: "Intakes",
      group: "Overview",
      values: slugs.map((s) => get(s)?.intakes ?? "—"),
    },
    {
      label: "All-in tuition (annual)",
      group: "Costs",
      isCost: true,
      values: slugs.map((s) => get(s)?.costFromINR ?? "—"),
    },
    {
      label: "First-year funds required for visa",
      group: "Costs",
      isCost: true,
      values: slugs.map((s) => {
        const v = visa(s);
        return v ? `₹${v.thresholds.firstYearFundsINR}L` : "—";
      }),
    },
    {
      label: "Student visa",
      group: "Visa",
      values: slugs.map((s) => visa(s)?.visaType ?? "—"),
    },
    {
      label: "Minimum IELTS",
      group: "Visa",
      values: slugs.map((s) => {
        const v = visa(s);
        return v ? `${v.thresholds.minIELTS}+ overall` : "—";
      }),
    },
    {
      label: "Academic floor",
      group: "Visa",
      values: slugs.map((s) => {
        const v = visa(s);
        return v ? `${v.thresholds.minAcademicPct}%+ in UG` : "—";
      }),
    },
    {
      label: "Post-study work",
      group: "Outcomes",
      values: slugs.map((s) => detail(s)?.postStudyWork ?? "—"),
    },
    {
      label: "Stay-back duration",
      group: "Outcomes",
      values: slugs.map((s) => get(s)?.highlights[0] ?? "—"),
    },
    {
      label: "Top universities",
      group: "Outcomes",
      values: slugs.map((s) => (get(s)?.topUniversities ?? []).slice(0, 3).join(" · ")),
    },
  ];

  return { countries, rows };
}
