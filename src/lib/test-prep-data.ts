// Test prep service catalogue — IELTS, TOEFL, GRE, GMAT, PTE, DET.
// Pricing is illustrative; replace once batches and trainers are finalised.

export type TestPrep = {
  slug: string;
  name: string;          // short
  fullName: string;       // full
  for: string;            // where it's accepted
  format: string;
  duration: string;
  trainingHours: string;
  targetScore: string;
  feeFromINR: string;
  highlights: string[];
  freeDemo: boolean;
};

export const tests: TestPrep[] = [
  {
    slug: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    for: "UK, Australia, Canada, Ireland, New Zealand and most universities globally",
    format: "Listening, Reading, Writing, Speaking · 2h 45m",
    duration: "4-week to 12-week batches",
    trainingHours: "60+ hours of live coaching",
    targetScore: "Band 7.0+ overall",
    feeFromINR: "₹12,000",
    highlights: [
      "Live + recorded sessions with band-9 trainers",
      "10+ full-length mock tests, individually scored",
      "Speaking practice with 1-on-1 examiner-style feedback",
      "Score guarantee: free retake batch if target not met",
    ],
    freeDemo: true,
  },
  {
    slug: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    for: "USA universities (most), Canada, several European programmes",
    format: "Reading, Listening, Speaking, Writing · 1h 56m (iBT)",
    duration: "2-week intensive or 6-week regular",
    trainingHours: "40+ hours of live coaching",
    targetScore: "100+ overall",
    feeFromINR: "₹13,000",
    highlights: [
      "Computer-based mock tests in actual interface",
      "AI-scored writing and speaking feedback",
      "Strategies tuned to integrated tasks (the hardest section)",
      "Unlimited test-day Q&A clinics",
    ],
    freeDemo: true,
  },
  {
    slug: "gre",
    name: "GRE",
    fullName: "Graduate Record Examinations",
    for: "STEM master's and PhD programmes in the US, Canada, and Germany",
    format: "Verbal · Quant · Analytical Writing · 1h 58m",
    duration: "8-week to 16-week batches",
    trainingHours: "80+ hours of live coaching",
    targetScore: "325+ (165+ Quant, 160+ Verbal)",
    feeFromINR: "₹18,000",
    highlights: [
      "Quant taught by IIT-grade math trainers",
      "Vocabulary modules with spaced repetition",
      "12+ full-length adaptive mocks",
      "Personal performance dashboard with weekly review",
    ],
    freeDemo: true,
  },
  {
    slug: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    for: "MBA and management programmes globally — top business schools",
    format: "Data Insights, Quant, Verbal · 2h 15m (Focus Edition)",
    duration: "8-week to 12-week batches",
    trainingHours: "80+ hours of live coaching",
    targetScore: "700+ on the Focus Edition",
    feeFromINR: "₹22,000",
    highlights: [
      "Section adaptive strategy from former b-school admits",
      "Data Insights module — the new GMAT differentiator",
      "Application-aligned mock cycle (3-month plan)",
      "MBA-counsellor review of score-to-school fit",
    ],
    freeDemo: true,
  },
  {
    slug: "pte",
    name: "PTE",
    fullName: "Pearson Test of English Academic",
    for: "UK, Australia, New Zealand, Canada, Ireland visa applications",
    format: "Speaking & Writing, Reading, Listening · 2h",
    duration: "3-week to 6-week batches",
    trainingHours: "40+ hours of live coaching",
    targetScore: "PTE 79+ (IELTS 7.0+ equivalent)",
    feeFromINR: "₹10,000",
    highlights: [
      "AI scoring — practise daily with the same algorithm",
      "Pronunciation calibration sessions with native trainers",
      "Speed reading and listening drills",
      "Faster path to score: 2-3 weeks possible for prepared candidates",
    ],
    freeDemo: true,
  },
  {
    slug: "det",
    name: "DET",
    fullName: "Duolingo English Test",
    for: "Accepted at 5,000+ universities globally; cheaper and faster than IELTS",
    format: "Adaptive · 1 hour total · take from home",
    duration: "2-week express batches",
    trainingHours: "20+ hours of live coaching",
    targetScore: "120+ (≈ IELTS 7.0)",
    feeFromINR: "₹6,000",
    highlights: [
      "From-home test format coaching",
      "Adaptive section strategy",
      "Most cost-effective English certificate",
      "Score in 48 hours — perfect for last-minute deadlines",
    ],
    freeDemo: true,
  },
];

export function getTest(slug: string): TestPrep | undefined {
  return tests.find((t) => t.slug === slug);
}
