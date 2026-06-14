// Per-country visa requirement thresholds used by the Visa Eligibility Checker.
//
// Figures are conservative estimates from publicly available consulate guidance
// (as of 2026) — they describe what a student needs to clear, not what guarantees
// approval. The engine in visa-engine.ts compares user answers to these and
// produces a 0-100 readiness score with concrete next steps.

export type VisaProfile = {
  slug: string;
  countryLabel: string;
  visaType: string;
  thresholds: {
    minAcademicPct: number;       // typical minimum academic %
    minIELTS: number;             // typical minimum IELTS overall
    firstYearFundsINR: number;    // tuition + living for first year in lakhs
    gapToleranceYears: number;    // max academic gap that's well-tolerated
  };
  notes: {
    expedited?: string;            // e.g. "Canada SDS"
    rejectionTolerance: "low" | "medium" | "high";
    needsBiometrics?: boolean;
  };
};

export const visaProfiles: Record<string, VisaProfile> = {
  ireland: {
    slug: "ireland",
    countryLabel: "Ireland",
    visaType: "Type D Student Visa",
    thresholds: {
      minAcademicPct: 60,
      minIELTS: 6.0,
      firstYearFundsINR: 26,
      gapToleranceYears: 3,
    },
    notes: {
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  uk: {
    slug: "uk",
    countryLabel: "United Kingdom",
    visaType: "Student Route",
    thresholds: {
      minAcademicPct: 55,
      minIELTS: 6.5,
      firstYearFundsINR: 32,
      gapToleranceYears: 3,
    },
    notes: {
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  canada: {
    slug: "canada",
    countryLabel: "Canada",
    visaType: "Study Permit",
    thresholds: {
      minAcademicPct: 55,
      minIELTS: 6.0,
      firstYearFundsINR: 24,
      gapToleranceYears: 2,
    },
    notes: {
      expedited: "SDS (Student Direct Stream) for fastest processing",
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  australia: {
    slug: "australia",
    countryLabel: "Australia",
    visaType: "Subclass 500 Student Visa",
    thresholds: {
      minAcademicPct: 65,
      minIELTS: 6.5,
      firstYearFundsINR: 30,
      gapToleranceYears: 2,
    },
    notes: {
      rejectionTolerance: "low",
      needsBiometrics: true,
    },
  },
  usa: {
    slug: "usa",
    countryLabel: "United States",
    visaType: "F-1 Student Visa",
    thresholds: {
      minAcademicPct: 70,
      minIELTS: 7.0,
      firstYearFundsINR: 42,
      gapToleranceYears: 2,
    },
    notes: {
      rejectionTolerance: "low",
      needsBiometrics: false,
    },
  },
  germany: {
    slug: "germany",
    countryLabel: "Germany",
    visaType: "National (Type D) Student Visa",
    thresholds: {
      minAcademicPct: 70,
      minIELTS: 6.0,
      firstYearFundsINR: 12,
      gapToleranceYears: 2,
    },
    notes: {
      expedited: "Blocked account (Sperrkonto) for fastest processing",
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  france: {
    slug: "france",
    countryLabel: "France",
    visaType: "Long-stay VLS-TS Student Visa",
    thresholds: {
      minAcademicPct: 60,
      minIELTS: 6.0,
      firstYearFundsINR: 14,
      gapToleranceYears: 2,
    },
    notes: {
      expedited: "Études en France (Campus France) mandatory step",
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  "new-zealand": {
    slug: "new-zealand",
    countryLabel: "New Zealand",
    visaType: "Fee-Paying Student Visa",
    thresholds: {
      minAcademicPct: 60,
      minIELTS: 6.0,
      firstYearFundsINR: 18,
      gapToleranceYears: 3,
    },
    notes: {
      rejectionTolerance: "medium",
      needsBiometrics: true,
    },
  },
  uae: {
    slug: "uae",
    countryLabel: "Dubai · UAE",
    visaType: "Student Residence Visa",
    thresholds: {
      minAcademicPct: 50,
      minIELTS: 5.5,
      firstYearFundsINR: 16,
      gapToleranceYears: 5,
    },
    notes: {
      rejectionTolerance: "high",
      needsBiometrics: false,
    },
  },
};

// ---------------- Form options ----------------

export const academicBuckets = [
  { value: "below-55",  label: "Below 55%",   midpoint: 50 },
  { value: "55-65",     label: "55% – 65%",   midpoint: 60 },
  { value: "65-75",     label: "65% – 75%",   midpoint: 70 },
  { value: "75-85",     label: "75% – 85%",   midpoint: 80 },
  { value: "above-85",  label: "Above 85%",   midpoint: 90 },
] as const;

export const ieltsBuckets = [
  { value: "none",  label: "Not yet taken",      band: 0 },
  { value: "5.5",   label: "IELTS 5.5",          band: 5.5 },
  { value: "6.0",   label: "IELTS 6.0",          band: 6.0 },
  { value: "6.5",   label: "IELTS 6.5",          band: 6.5 },
  { value: "7.0",   label: "IELTS 7.0",          band: 7.0 },
  { value: "7.5",   label: "IELTS 7.5 or above", band: 7.5 },
] as const;

export const fundsBuckets = [
  { value: "below-10",  label: "Below ₹10L",            midpointINR: 8 },
  { value: "10-20",     label: "₹10L – ₹20L",            midpointINR: 15 },
  { value: "20-30",     label: "₹20L – ₹30L",            midpointINR: 25 },
  { value: "30-45",     label: "₹30L – ₹45L",            midpointINR: 38 },
  { value: "above-45",  label: "Above ₹45L",            midpointINR: 55 },
] as const;

export const gapBuckets = [
  { value: "none",    label: "No gap",        years: 0 },
  { value: "1y",      label: "Less than 1 year", years: 0.5 },
  { value: "1-2y",    label: "1 – 2 years",       years: 1.5 },
  { value: "2-4y",    label: "2 – 4 years",       years: 3 },
  { value: "above-4y", label: "More than 4 years", years: 5 },
] as const;
