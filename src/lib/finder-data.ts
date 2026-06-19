// Per-country profile used by the rule-based Study Destination Finder.
//
// All scoring is deterministic — no LLM calls. The engine in finder-engine.ts
// weighs each profile field against the student's answers to produce a 0-100
// match score plus human-readable reasons.

export type BudgetTier = "low" | "mid" | "high" | "premium";
export type StayBackTier = "short" | "medium" | "long";
export type PaceTier = "fast" | "standard";
export type PrTier = "weak" | "medium" | "strong";
export type IeltsTier = "easy" | "standard" | "strict";

export type Field =
  | "Computer Science"
  | "Artificial Intelligence"
  | "Data Science"
  | "Engineering"
  | "Business Management"
  | "Healthcare"
  | "Finance"
  | "Cyber Security"
  | "Hospitality";

export type Priority =
  | "stay-back"
  | "low-cost"
  | "fast-degree"
  | "pr-pathway"
  | "prestige"
  | "english-only";

export type FinderProfile = {
  slug: string;
  costAllInINR: { min: number; max: number }; // lakhs per year, tuition + living
  budgetTier: BudgetTier;
  fieldStrengths: Field[];
  stayBackTier: StayBackTier;
  stayBackYears: number;
  ieltsTier: IeltsTier;
  pace: PaceTier;
  prPathway: PrTier;
  englishTaught: boolean;
};

export const finderProfiles: Record<string, FinderProfile> = {
  ireland: {
    slug: "ireland",
    costAllInINR: { min: 26, max: 39 },
    budgetTier: "mid",
    fieldStrengths: ["Computer Science", "Data Science", "Cyber Security", "Healthcare", "Business Management"],
    stayBackTier: "medium",
    stayBackYears: 2,
    ieltsTier: "standard",
    pace: "fast",
    prPathway: "medium",
    englishTaught: true,
  },
  uk: {
    slug: "uk",
    costAllInINR: { min: 32, max: 58 },
    budgetTier: "high",
    fieldStrengths: ["Finance", "Business Management", "Artificial Intelligence", "Computer Science", "Data Science"],
    stayBackTier: "medium",
    stayBackYears: 2,
    ieltsTier: "standard",
    pace: "fast",
    prPathway: "weak",
    englishTaught: true,
  },
  canada: {
    slug: "canada",
    costAllInINR: { min: 24, max: 45 },
    budgetTier: "mid",
    fieldStrengths: ["Computer Science", "Data Science", "Engineering", "Healthcare", "Business Management"],
    stayBackTier: "long",
    stayBackYears: 3,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "strong",
    englishTaught: true,
  },
  australia: {
    slug: "australia",
    costAllInINR: { min: 34, max: 54 },
    budgetTier: "high",
    fieldStrengths: ["Engineering", "Healthcare", "Business Management", "Hospitality", "Data Science"],
    stayBackTier: "long",
    stayBackYears: 4,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "strong",
    englishTaught: true,
  },
  usa: {
    slug: "usa",
    costAllInINR: { min: 42, max: 78 },
    budgetTier: "premium",
    fieldStrengths: ["Computer Science", "Artificial Intelligence", "Data Science", "Finance", "Engineering"],
    stayBackTier: "long",
    stayBackYears: 3,
    ieltsTier: "strict",
    pace: "standard",
    prPathway: "medium",
    englishTaught: true,
  },
  germany: {
    slug: "germany",
    costAllInINR: { min: 6, max: 25 },
    budgetTier: "low",
    fieldStrengths: ["Engineering", "Computer Science", "Data Science", "Artificial Intelligence"],
    stayBackTier: "medium",
    stayBackYears: 1.5,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "strong",
    englishTaught: true,
  },
  france: {
    slug: "france",
    costAllInINR: { min: 14, max: 44 },
    budgetTier: "mid",
    fieldStrengths: ["Business Management", "Finance", "Hospitality", "Engineering"],
    stayBackTier: "medium",
    stayBackYears: 2,
    ieltsTier: "standard",
    pace: "fast",
    prPathway: "weak",
    englishTaught: true,
  },
  "new-zealand": {
    slug: "new-zealand",
    costAllInINR: { min: 26, max: 40 },
    budgetTier: "mid",
    fieldStrengths: ["Engineering", "Healthcare", "Hospitality", "Business Management", "Computer Science"],
    stayBackTier: "long",
    stayBackYears: 3,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "strong",
    englishTaught: true,
  },
  uae: {
    slug: "uae",
    costAllInINR: { min: 22, max: 36 },
    budgetTier: "mid",
    fieldStrengths: ["Business Management", "Finance", "Hospitality", "Engineering"],
    stayBackTier: "short",
    stayBackYears: 1,
    ieltsTier: "easy",
    pace: "standard",
    prPathway: "weak",
    englishTaught: true,
  },
  netherlands: {
    slug: "netherlands",
    costAllInINR: { min: 24, max: 36 },
    budgetTier: "mid",
    fieldStrengths: ["Computer Science", "Data Science", "Artificial Intelligence", "Business Management", "Finance", "Engineering"],
    stayBackTier: "medium",
    stayBackYears: 1,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "medium",
    englishTaught: true,
  },
  finland: {
    slug: "finland",
    costAllInINR: { min: 18, max: 31 },
    budgetTier: "low",
    fieldStrengths: ["Computer Science", "Data Science", "Artificial Intelligence", "Engineering"],
    stayBackTier: "long",
    stayBackYears: 2,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "medium",
    englishTaught: true,
  },
  sweden: {
    slug: "sweden",
    costAllInINR: { min: 20, max: 34 },
    budgetTier: "mid",
    fieldStrengths: ["Computer Science", "Data Science", "Engineering", "Finance"],
    stayBackTier: "medium",
    stayBackYears: 1,
    ieltsTier: "standard",
    pace: "standard",
    prPathway: "medium",
    englishTaught: true,
  },
};

// ---------------- Form options ----------------

export const budgetOptions = [
  { value: "low",     label: "Under ₹15L / year", tier: "low" as const,     budgetMaxINR: 15 },
  { value: "mid",     label: "₹15L – ₹30L / year", tier: "mid" as const,    budgetMaxINR: 30 },
  { value: "high",    label: "₹30L – ₹50L / year", tier: "high" as const,   budgetMaxINR: 50 },
  { value: "premium", label: "Above ₹50L / year",  tier: "premium" as const, budgetMaxINR: 999 },
] as const;

export const fieldOptions: Field[] = [
  "Computer Science",
  "Artificial Intelligence",
  "Data Science",
  "Engineering",
  "Business Management",
  "Healthcare",
  "Finance",
  "Cyber Security",
  "Hospitality",
];

export const priorityOptions: { value: Priority; label: string; hint: string }[] = [
  { value: "stay-back",    label: "Long post-study work",  hint: "Time to find a job and stay back after graduating." },
  { value: "low-cost",     label: "Lowest cost",            hint: "Minimise total tuition + living cost." },
  { value: "fast-degree",  label: "Fastest 1-year master's", hint: "Get your degree and ROI as quickly as possible." },
  { value: "pr-pathway",   label: "Pathway to PR",          hint: "Clear route from study → work → permanent residency." },
  { value: "prestige",     label: "Top-ranked universities",  hint: "Aim for global top-100 institutions." },
  { value: "english-only", label: "Taught entirely in English", hint: "Avoid programmes that require a second language." },
];

export const ieltsOptions = [
  { value: "none",      label: "Not yet taken",        ieltsBand: 0 },
  { value: "preparing", label: "Currently preparing",   ieltsBand: 0 },
  { value: "6.0",       label: "IELTS 6.0",             ieltsBand: 6.0 },
  { value: "6.5",       label: "IELTS 6.5 – 7.0",       ieltsBand: 6.5 },
  { value: "7.5",       label: "IELTS 7.5+",            ieltsBand: 7.5 },
] as const;

export const academicOptions = [
  { value: "ug-progress", label: "Currently in undergrad" },
  { value: "ug-done",     label: "Bachelor's complete" },
  { value: "pg-done",     label: "Master's complete" },
  { value: "professional", label: "Working professional" },
] as const;
