import { programmes, getProgramme, type Programme } from "@/lib/programmes-data";

// Curated programme pairs that Indian students actually wrestle with —
// each becomes a static SEO page at /compare-programmes/{slug-a}-vs-{slug-b}.
//
// Pairs are stored alphabetically (slug-A < slug-B) to keep one canonical URL.

export const SUPPORTED_PROGRAMME_PAIRS: {
  a: string;
  b: string;
  intent: string;
}[] = [
  {
    a: "mba",
    b: "msc-finance",
    intent: "Career switch vs. specialist finance track",
  },
  {
    a: "ms-artificial-intelligence",
    b: "ms-computer-science",
    intent: "Research depth vs. broad employability",
  },
  {
    a: "ms-artificial-intelligence",
    b: "ms-data-science",
    intent: "Frontier research vs. industry analytics",
  },
  {
    a: "ms-computer-science",
    b: "ms-cyber-security",
    intent: "Broad CS career vs. high-demand niche",
  },
  {
    a: "ms-computer-science",
    b: "ms-data-science",
    intent: "Engineering breadth vs. data depth",
  },
];

export function buildProgrammePairSlug(a: string, b: string): string {
  const [x, y] = [a, b].sort();
  return `${x}-vs-${y}`;
}

export function parseProgrammePairSlug(
  slug: string,
): { a: string; b: string } | null {
  // We need the last "-vs-" because programme slugs themselves don't contain
  // "vs". Parse left → right: split at first "-vs-".
  const idx = slug.indexOf("-vs-");
  if (idx === -1) return null;
  const a = slug.slice(0, idx);
  const b = slug.slice(idx + 4);
  return { a, b };
}

export type ProgrammeComparisonRow = {
  label: string;
  group: "Overview" | "Requirements" | "Outcomes";
  values: [string, string];
};

export function buildProgrammeComparison(
  a: Programme,
  b: Programme,
): ProgrammeComparisonRow[] {
  return [
    {
      label: "Category",
      group: "Overview",
      values: [a.category, b.category],
    },
    {
      label: "Who it's for",
      group: "Overview",
      values: [a.whoFor, b.whoFor],
    },
    {
      label: "Undergrad background",
      group: "Requirements",
      values: [
        a.typicalRequirements.undergrad,
        b.typicalRequirements.undergrad,
      ],
    },
    {
      label: "IELTS",
      group: "Requirements",
      values: [
        `${a.typicalRequirements.ielts}+`,
        `${b.typicalRequirements.ielts}+`,
      ],
    },
    {
      label: "GRE",
      group: "Requirements",
      values: [
        a.typicalRequirements.gre ?? "Not required",
        b.typicalRequirements.gre ?? "Not required",
      ],
    },
    {
      label: "GMAT",
      group: "Requirements",
      values: [
        a.typicalRequirements.gmat ?? "Not required",
        b.typicalRequirements.gmat ?? "Not required",
      ],
    },
    {
      label: "Work experience",
      group: "Requirements",
      values: [
        a.typicalRequirements.experience ?? "Not required",
        b.typicalRequirements.experience ?? "Not required",
      ],
    },
    {
      label: "Career paths",
      group: "Outcomes",
      values: [a.careerPaths.join(" · "), b.careerPaths.join(" · ")],
    },
    {
      label: "Graduate salary note",
      group: "Outcomes",
      values: [a.avgGraduateSalaryNote, b.avgGraduateSalaryNote],
    },
  ];
}

export function getProgrammeFromCompareSlug(slug: string): Programme | undefined {
  return getProgramme(slug);
}

export function getAllSupportedProgrammes() {
  return programmes;
}
