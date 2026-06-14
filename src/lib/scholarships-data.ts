// Curated scholarship catalogue for the Scholarship Match tool.
//
// Each entry has structured eligibility tags (countries, levels, fields,
// fundingType) so the matcher in scholarships/page can filter them
// deterministically without an LLM.

export type ScholarshipLevel =
  | "ug"           // undergraduate
  | "pg"           // master's / postgraduate
  | "phd";

export type ScholarshipFundingType =
  | "full-tuition"
  | "tuition-waiver"
  | "stipend"
  | "fee-waiver";

export type ScholarshipField =
  | "any"
  | "stem"
  | "business"
  | "engineering"
  | "computer-science"
  | "social-sciences"
  | "research";

export type Scholarship = {
  slug: string;
  name: string;
  countries: string[];          // destination slugs; ['any'] for cross-country
  levels: ScholarshipLevel[];
  fundingType: ScholarshipFundingType;
  fields: ScholarshipField[];
  amount: string;                // human-readable
  blurb: string;
  competitiveness: "high" | "moderate" | "auto";
};

// `any` is used as a wildcard for cross-country / cross-field eligibility.
export const scholarships: Scholarship[] = [
  // ----- UK ---------------------------------------------------------------
  {
    slug: "chevening",
    name: "Chevening Scholarships",
    countries: ["uk"],
    levels: ["pg"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + £1,300/month stipend + travel",
    blurb:
      "UK government's flagship fully-funded scholarship for one-year master's. ~1,500 awarded globally; needs strong leadership story.",
    competitiveness: "high",
  },
  {
    slug: "commonwealth",
    name: "Commonwealth Scholarships",
    countries: ["uk"],
    levels: ["pg", "phd"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + stipend + travel",
    blurb:
      "Commonwealth-funded master's and PhD awards with a developmental focus. ~200 awarded to Indians annually.",
    competitiveness: "high",
  },
  // ----- USA --------------------------------------------------------------
  {
    slug: "fulbright-nehru",
    name: "Fulbright-Nehru Master's Fellowships",
    countries: ["usa"],
    levels: ["pg", "phd"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + stipend + travel + health insurance",
    blurb:
      "Government-funded fully-paid US master's and PhD. Highly selective — fewer than 100 per year.",
    competitiveness: "high",
  },
  {
    slug: "university-assistantships",
    name: "University Teaching / Research Assistantships",
    countries: ["usa"],
    levels: ["pg", "phd"],
    fundingType: "stipend",
    fields: ["stem", "research", "computer-science", "engineering"],
    amount: "Tuition waiver + US$20K-30K annual stipend",
    blurb:
      "Common at PhD-track US programmes; covers full tuition and a living stipend in exchange for teaching or research duties.",
    competitiveness: "moderate",
  },
  // ----- Canada -----------------------------------------------------------
  {
    slug: "vanier",
    name: "Vanier Canada Graduate Scholarships",
    countries: ["canada"],
    levels: ["phd"],
    fundingType: "stipend",
    fields: ["any", "research"],
    amount: "CAD 50,000/year for 3 years",
    blurb:
      "Doctoral-only; one of the most competitive funding awards in Canada. ~166 awarded globally each year.",
    competitiveness: "high",
  },
  {
    slug: "ontario-trillium",
    name: "Ontario Trillium Scholarship",
    countries: ["canada"],
    levels: ["phd"],
    fundingType: "stipend",
    fields: ["any"],
    amount: "CAD 40,000/year for up to 4 years",
    blurb: "Doctoral funding for international PhD students in Ontario.",
    competitiveness: "high",
  },
  // ----- Germany ----------------------------------------------------------
  {
    slug: "daad",
    name: "DAAD Scholarships",
    countries: ["germany"],
    levels: ["pg", "phd"],
    fundingType: "stipend",
    fields: ["engineering", "computer-science", "stem", "social-sciences", "research"],
    amount: "€861-1,300/month + tuition + travel + health",
    blurb:
      "Germany's marquee scholarship for international master's and doctoral students. Strong fit for STEM applicants.",
    competitiveness: "moderate",
  },
  {
    slug: "deutschlandstipendium",
    name: "Deutschlandstipendium",
    countries: ["germany"],
    levels: ["ug", "pg"],
    fundingType: "stipend",
    fields: ["any"],
    amount: "€300/month",
    blurb:
      "Merit-based monthly stipend co-funded by the state and industry partners at participating universities.",
    competitiveness: "moderate",
  },
  // ----- France ------------------------------------------------------------
  {
    slug: "eiffel-excellence",
    name: "Eiffel Excellence Scholarship",
    countries: ["france"],
    levels: ["pg", "phd"],
    fundingType: "stipend",
    fields: ["engineering", "business", "social-sciences"],
    amount: "€1,181/month + tuition + travel + insurance",
    blurb:
      "Government of France scholarship for international master's and PhD students. Strong cohort funding.",
    competitiveness: "moderate",
  },
  {
    slug: "charpak",
    name: "Charpak Scholarship",
    countries: ["france"],
    levels: ["pg"],
    fundingType: "stipend",
    fields: ["any"],
    amount: "€5,000-7,000 + visa fee waiver",
    blurb:
      "Government of France merit award dedicated to Indian master's students.",
    competitiveness: "moderate",
  },
  // ----- Ireland -----------------------------------------------------------
  {
    slug: "government-of-ireland",
    name: "Government of Ireland International Scholarships",
    countries: ["ireland"],
    levels: ["pg"],
    fundingType: "stipend",
    fields: ["any"],
    amount: "€10,000 stipend + full fee waiver (one year)",
    blurb:
      "Merit-based award covering tuition and a stipend for one academic year at any Irish university.",
    competitiveness: "high",
  },
  // ----- Australia ---------------------------------------------------------
  {
    slug: "australia-awards",
    name: "Australia Awards",
    countries: ["australia"],
    levels: ["pg", "phd"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + stipend + travel + health",
    blurb:
      "Fully-funded Australian government scholarships with a developmental focus.",
    competitiveness: "high",
  },
  {
    slug: "destination-australia",
    name: "Destination Australia Scholarship",
    countries: ["australia"],
    levels: ["ug", "pg"],
    fundingType: "stipend",
    fields: ["any"],
    amount: "AUD 15,000/year",
    blurb:
      "Awarded to international students who study at a regional Australian university.",
    competitiveness: "moderate",
  },
  // ----- New Zealand -------------------------------------------------------
  {
    slug: "manaaki-nz",
    name: "Manaaki New Zealand Scholarships",
    countries: ["new-zealand"],
    levels: ["pg", "phd"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + stipend + travel",
    blurb:
      "Government-funded NZ master's and PhD awards focused on selected disciplines.",
    competitiveness: "high",
  },
  {
    slug: "nz-excellence-awards",
    name: "New Zealand Excellence Awards",
    countries: ["new-zealand"],
    levels: ["ug", "pg"],
    fundingType: "tuition-waiver",
    fields: ["any"],
    amount: "NZD 5,000-10,000",
    blurb:
      "Tuition awards for Indian undergraduate and postgraduate students at NZ universities.",
    competitiveness: "moderate",
  },
  // ----- UAE ---------------------------------------------------------------
  {
    slug: "mbr-awards",
    name: "Mohammed bin Rashid Awards",
    countries: ["uae"],
    levels: ["ug", "pg"],
    fundingType: "tuition-waiver",
    fields: ["any"],
    amount: "Variable tuition waivers",
    blurb:
      "Government-supported UAE awards covering partial tuition and living for select programmes.",
    competitiveness: "moderate",
  },
  // ----- Cross-country -----------------------------------------------------
  {
    slug: "erasmus-mundus",
    name: "Erasmus Mundus Joint Master's",
    countries: ["france", "germany", "ireland"],
    levels: ["pg"],
    fundingType: "full-tuition",
    fields: ["any"],
    amount: "Full tuition + €1,400/month + travel + insurance",
    blurb:
      "EU-funded multi-country master's. Study across 2-3 European universities under one scholarship.",
    competitiveness: "high",
  },
  {
    slug: "university-merit",
    name: "University-specific Merit Scholarships",
    countries: ["ireland", "uk", "canada", "australia", "usa", "germany", "france", "new-zealand", "uae"],
    levels: ["ug", "pg"],
    fundingType: "tuition-waiver",
    fields: ["any"],
    amount: "10-50% tuition waiver",
    blurb:
      "Automatic merit awards offered by most universities. Highest-conversion source — no separate application required.",
    competitiveness: "auto",
  },
];

// ---------- Filter options ----------

export const fieldFilterOptions: { value: ScholarshipField; label: string }[] = [
  { value: "any",              label: "Any field" },
  { value: "stem",             label: "STEM" },
  { value: "computer-science", label: "Computer Science / IT" },
  { value: "engineering",      label: "Engineering" },
  { value: "business",         label: "Business / Finance" },
  { value: "social-sciences",  label: "Social Sciences / Policy" },
  { value: "research",         label: "Research-track" },
];

export const levelFilterOptions: { value: ScholarshipLevel; label: string }[] = [
  { value: "ug",  label: "Undergraduate" },
  { value: "pg",  label: "Master's" },
  { value: "phd", label: "PhD" },
];
