// Lead-magnet guides. Each one is a thematic PDF delivered by email after the
// user submits the gated form. The actual PDF is sent via the email drip
// system (see /api/leads), not served directly — that's how real lead
// magnets work and lets us tag contacts for follow-up.

export type Guide = {
  slug: string;
  title: string;
  subtitle: string;          // hero subtitle
  description: string;        // SEO meta
  pages: number;
  tier: "Country" | "Funding" | "Visa" | "Planning";
  cover: { theme: "navy" | "gold" | "royal"; flag?: string };
  bullets: string[];          // what's inside
  tags: string[];             // for drip targeting
  relatedBlogSlug?: string;
};

export const guides: Guide[] = [
  {
    slug: "canada-study-guide-2026",
    title: "The 2026 Canada Study Guide for Indian Students",
    subtitle:
      "Everything from university shortlist to SDS pathway to PR pipeline — in one 28-page guide.",
    description:
      "Free 28-page guide to studying in Canada in 2026: universities, programmes, cost in INR, SDS visa pathway, scholarships, and post-study PR.",
    pages: 28,
    tier: "Country",
    cover: { theme: "navy", flag: "🇨🇦" },
    bullets: [
      "Top 12 universities Indian students should target",
      "Full INR cost breakdown including hidden costs",
      "SDS pathway: GIC, IELTS, document checklist",
      "PGWP → Express Entry → PR roadmap",
      "Scholarships you can realistically win",
      "Sample SOPs that worked",
    ],
    tags: ["country-canada", "interest-pr-pathway"],
    relatedBlogSlug: "best-countries-to-study-abroad-2026",
  },
  {
    slug: "uk-study-guide-2026",
    title: "The 2026 UK Study Guide for Indian Students",
    subtitle:
      "One-year master's, Graduate Route, Russell Group access — your end-to-end UK playbook.",
    description:
      "Free guide to UK study abroad in 2026: universities, costs, visa, Graduate Route, scholarships, and admit-rate honest shortlist.",
    pages: 24,
    tier: "Country",
    cover: { theme: "royal", flag: "🇬🇧" },
    bullets: [
      "Russell Group + global brand universities ranked",
      "1-year master's vs 2-year — when each makes sense",
      "Graduate Route: 2 years of unrestricted work",
      "Cost of London vs Manchester vs Edinburgh",
      "Chevening + Commonwealth scholarships",
      "CAS, UKVI portal, and visa do's and don'ts",
    ],
    tags: ["country-uk", "interest-fast-degree"],
    relatedBlogSlug: "best-countries-to-study-abroad-2026",
  },
  {
    slug: "education-loan-playbook-2026",
    title: "The 2026 Education Loan Planning Playbook",
    subtitle:
      "Collateral vs non-collateral, partner banks, EMI scenarios, and the 5 mistakes that get loans rejected.",
    description:
      "Free education-loan guide for Indian students going abroad: PSU banks vs NBFCs, EMI scenarios in INR, moratorium periods, and lender checklist.",
    pages: 22,
    tier: "Funding",
    cover: { theme: "gold" },
    bullets: [
      "PSU bank vs NBFC: when each makes sense",
      "Collateral vs non-collateral — true cost comparison",
      "EMI scenarios from ₹15L to ₹70L tenure 5-15 yrs",
      "Moratorium period interest calculations",
      "Partner banks we work with directly",
      "5 mistakes that get applications rejected",
    ],
    tags: ["interest-loan"],
    relatedBlogSlug: "study-abroad-cost-from-india-2026",
  },
  {
    slug: "student-visa-mistakes-guide",
    title: "Student Visa Mistakes: The 18 That Get Most Rejections",
    subtitle:
      "Country-by-country breakdown of what tips visa officers from approve to reject — and how to avoid every one.",
    description:
      "Free guide to common student-visa rejection mistakes across UK, USA, Canada, Australia, Ireland, Germany. Built from real consulate decisions.",
    pages: 18,
    tier: "Visa",
    cover: { theme: "royal" },
    bullets: [
      "The 4 most-common SOP red flags",
      "Financial proof: how consulates spot fake deposits",
      "Genuine-student narrative — what officers want to see",
      "Country-specific quirks (USA 221g, Australia GTE, UK CAS)",
      "How to disclose prior visa rejections",
      "Mock-interview question bank",
    ],
    tags: ["interest-visa"],
    relatedBlogSlug: "student-visa-process-2026",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
