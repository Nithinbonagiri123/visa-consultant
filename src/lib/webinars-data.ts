// Upcoming + past webinars. Replace dates/speakers with real schedule when
// hosts are confirmed.

export type Webinar = {
  slug: string;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerBio: string;          // 1-line
  startAt: string;             // ISO datetime
  durationMinutes: number;
  format: "Live" | "Recorded";
  tier: "Country" | "Application" | "Funding" | "Visa" | "Career";
  blurb: string;
  agenda: string[];
  audience: string;            // who should attend
  registrationsExpected: number;
  status: "upcoming" | "past";
  recordingUrl?: string;       // YouTube/Vimeo for past webinars
};

export const webinars: Webinar[] = [
  // ---- Upcoming -------------------------------------------------------
  {
    slug: "canada-sep-2027-intake-deadlines",
    title: "Canada Sep 2027 Intake — Deadlines, Documents, and Decisions",
    speaker: "Meera Pillai",
    speakerRole: "Senior Counsellor · Canada, USA, PR Pathways",
    speakerBio: "9 years guiding Indian students into Canadian master's + PR — 320+ placements.",
    startAt: "2026-07-10T13:30:00Z",
    durationMinutes: 60,
    format: "Live",
    tier: "Country",
    blurb:
      "What you need to do — every month from July through application — to land a Sep 2027 admit at U of Toronto, Waterloo, McGill or UBC. Live Q&A at the end.",
    agenda: [
      "Month-by-month timeline (July 2026 → August 2027)",
      "Document checklist — what to gather now",
      "SDS pathway: GIC + financial proof",
      "Scholarship calendar — which to apply for, when",
      "Live Q&A (30 min)",
    ],
    audience: "Students targeting Sep 2027 Canada master's; parents welcome.",
    registrationsExpected: 320,
    status: "upcoming",
  },
  {
    slug: "uk-graduate-route-2026",
    title: "UK Graduate Route 2026 — What Stays, What's Changing, What to Do",
    speaker: "Ravi Narayanan",
    speakerRole: "Senior Counsellor · Ireland, UK & Europe",
    speakerBio: "Ex-international recruitment manager at a UK Russell Group; 280+ placements.",
    startAt: "2026-07-17T13:30:00Z",
    durationMinutes: 45,
    format: "Live",
    tier: "Visa",
    blurb:
      "The 2-year post-study Graduate Route after a UK master's — confirmed for 2026 but tightened. Exactly what to prepare so you stay on the right side of every rule change.",
    agenda: [
      "Graduate Route — 2026 rules in plain English",
      "What changed since 2023 (sponsorship, dependents, etc.)",
      "Job-search timeline + when to switch to a work visa",
      "Live Q&A (15 min)",
    ],
    audience: "Students applying to UK universities Sep 2026 / Jan 2027.",
    registrationsExpected: 220,
    status: "upcoming",
  },
  {
    slug: "education-loans-collateral-or-not",
    title: "Education Loans Demystified — Collateral, NBFCs, and ₹1 Cr ceilings",
    speaker: "Arun Kumar",
    speakerRole: "Founder & Principal Counsellor",
    speakerBio: "12 years helping Indian families fund overseas education.",
    startAt: "2026-07-24T13:30:00Z",
    durationMinutes: 60,
    format: "Live",
    tier: "Funding",
    blurb:
      "PSU banks vs. NBFCs. Collateral vs. non-collateral. Moratorium periods that catch families off-guard. We walk through 4 actual loan scenarios with the math.",
    agenda: [
      "Bank vs. NBFC — true cost comparison",
      "Collateral asks (and how to avoid them)",
      "EMI math from ₹15L → ₹70L",
      "Moratorium period interest — the hidden tax",
      "Live Q&A — bring your specific numbers",
    ],
    audience: "Students + parents planning Sep 2026 / Jan 2027 intakes.",
    registrationsExpected: 410,
    status: "upcoming",
  },
  {
    slug: "ireland-tech-job-market-2026",
    title: "Ireland's Tech Job Market — Cybersecurity, Data, AI roles in Dublin",
    speaker: "Ravi Narayanan",
    speakerRole: "Senior Counsellor · Ireland, UK & Europe",
    speakerBio: "8 years placing Indian students into Irish tech roles.",
    startAt: "2026-07-31T13:30:00Z",
    durationMinutes: 45,
    format: "Live",
    tier: "Career",
    blurb:
      "Why Ireland's tech job market is the easiest to break into post-master's. Real salary ranges, real visa pathways, real hiring pipelines at Google, Meta, Stripe, and Pfizer.",
    agenda: [
      "Salary bands by role (2026 numbers)",
      "Visa → work permit → Stamp 4 pipeline",
      "Cybersecurity vs. AI vs. Data — where the demand actually is",
      "Live Q&A (15 min)",
    ],
    audience: "Students aiming for Irish master's + post-study work.",
    registrationsExpected: 280,
    status: "upcoming",
  },

  // ---- Past (recorded) ------------------------------------------------
  {
    slug: "sop-clinic-march-2026",
    title: "SOP Clinic — Live Edits on 5 Real Statements of Purpose",
    speaker: "Aarti Senior + Meera Pillai",
    speakerRole: "Senior Counsellor team",
    speakerBio: "Live SOP rewrite session.",
    startAt: "2026-03-15T13:30:00Z",
    durationMinutes: 90,
    format: "Recorded",
    tier: "Application",
    blurb:
      "We rewrote 5 real student SOPs in 90 minutes — Canada, UK, USA, Ireland, Germany. The before-and-after will change how you write yours.",
    agenda: [
      "5 SOPs, before and after",
      "The 3 most common opening mistakes",
      "How to talk about gap years honestly",
      "Country-specific SOP nuances",
    ],
    audience: "Anyone drafting their first SOP.",
    registrationsExpected: 540,
    status: "past",
    recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "visa-rejection-recovery-feb-2026",
    title: "After a Visa Rejection — How to Recover and Re-apply",
    speaker: "Nikhil Kapoor",
    speakerRole: "Senior Counsellor · Australia, NZ, UAE",
    speakerBio: "7 years; 210+ placements; visa rejection recovery specialist.",
    startAt: "2026-02-22T13:30:00Z",
    durationMinutes: 60,
    format: "Recorded",
    tier: "Visa",
    blurb:
      "What to do in the first 48 hours after a visa rejection. What goes in the appeal letter. How to strengthen the next application so it lands.",
    agenda: [
      "Why visas get rejected — the 4 patterns",
      "The 48-hour playbook",
      "Appeal vs. fresh application — when to do which",
      "How to address the rejection in the next SOP",
    ],
    audience: "Anyone who's had a visa rejected (any country).",
    registrationsExpected: 380,
    status: "past",
    recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function getWebinar(slug: string): Webinar | undefined {
  return webinars.find((w) => w.slug === slug);
}

export function getUpcomingWebinars(): Webinar[] {
  return webinars
    .filter((w) => w.status === "upcoming")
    .sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt));
}

export function getPastWebinars(): Webinar[] {
  return webinars
    .filter((w) => w.status === "past")
    .sort((a, b) => +new Date(b.startAt) - +new Date(a.startAt));
}

/** Format an ISO datetime as IST-friendly display. */
export function formatWebinarTime(iso: string): {
  date: string;
  time: string;
  full: string;
} {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  return { date, time, full: `${date} · ${time} IST` };
}
