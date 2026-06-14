export type GlossaryCategory =
  | "Application"
  | "Tests"
  | "Visa"
  | "Funding"
  | "Post-study"
  | "Universities";

export type GlossaryEntry = {
  slug: string;          // used as URL anchor
  term: string;
  abbr?: string;
  category: GlossaryCategory;
  definition: string;
};

export const glossaryCategories: GlossaryCategory[] = [
  "Application",
  "Tests",
  "Visa",
  "Funding",
  "Post-study",
  "Universities",
];

export const glossary: GlossaryEntry[] = [
  // ----- Application ------------------------------------------------------
  {
    slug: "sop",
    term: "Statement of Purpose",
    abbr: "SOP",
    category: "Application",
    definition:
      "A 1-2 page essay submitted with every university application explaining who you are, why this programme, why this university, and what you'll do after. The single biggest lever for borderline admits.",
  },
  {
    slug: "lor",
    term: "Letter of Recommendation",
    abbr: "LOR",
    category: "Application",
    definition:
      "A reference letter from a professor or manager vouching for your academic or professional ability. Most master's applications require 2-3 LORs.",
  },
  {
    slug: "cv",
    term: "CV / Resume",
    category: "Application",
    definition:
      "A one-page summary of education, work experience, projects, and awards. Universities expect an academic CV — light on design, heavy on substance.",
  },
  {
    slug: "transcript",
    term: "Academic Transcript",
    category: "Application",
    definition:
      "Official, sealed mark sheet from your school or university listing all courses taken and grades earned. Most universities require both 10th + 12th + bachelor's transcripts.",
  },
  {
    slug: "wes",
    term: "WES Evaluation",
    abbr: "WES",
    category: "Application",
    definition:
      "World Education Services credential evaluation that converts Indian grades into a North American GPA-equivalent. Required by many Canadian and US universities.",
  },
  {
    slug: "conditional-offer",
    term: "Conditional Offer",
    category: "Application",
    definition:
      "A university acceptance subject to clearing one or more conditions — usually IELTS, financial proof, or graduating from your current degree.",
  },
  {
    slug: "unconditional-offer",
    term: "Unconditional Offer",
    category: "Application",
    definition:
      "Final acceptance with no further conditions. Required before applying for a student visa in most countries.",
  },
  {
    slug: "cas",
    term: "Confirmation of Acceptance for Studies",
    abbr: "CAS",
    category: "Application",
    definition:
      "A reference number issued by UK universities once you've accepted your offer. Needed to submit the UK Student Visa application.",
  },
  {
    slug: "coe",
    term: "Confirmation of Enrolment",
    abbr: "CoE",
    category: "Application",
    definition:
      "Australia's equivalent of the CAS — issued by the university after you accept and pay the OSHC/deposit. Required for the Subclass 500 visa.",
  },
  {
    slug: "i-20",
    term: "I-20 Form",
    abbr: "I-20",
    category: "Application",
    definition:
      "US universities issue an I-20 once you've accepted the offer. It certifies your eligibility for the F-1 visa and lists tuition + funding shown.",
  },

  // ----- Tests -----------------------------------------------------------
  {
    slug: "ielts",
    term: "IELTS",
    abbr: "IELTS",
    category: "Tests",
    definition:
      "International English Language Testing System — the most widely accepted English-language test for student-visa countries. Bands 0-9. Most master's programmes want 6.5+.",
  },
  {
    slug: "pte",
    term: "PTE Academic",
    abbr: "PTE",
    category: "Tests",
    definition:
      "Pearson Test of English — fully computer-based, faster results than IELTS, accepted across UK / Australia / Canada / NZ / Ireland for student visas.",
  },
  {
    slug: "toefl",
    term: "TOEFL iBT",
    abbr: "TOEFL",
    category: "Tests",
    definition:
      "Test of English as a Foreign Language — internet-based test most common for US applications. Scored 0-120; competitive applicants score 100+.",
  },
  {
    slug: "gre",
    term: "GRE",
    abbr: "GRE",
    category: "Tests",
    definition:
      "Graduate Record Examinations — standardised test required for most US STEM master's and PhD programmes. Scored 260-340. Top schools expect 320+.",
  },
  {
    slug: "gmat",
    term: "GMAT",
    abbr: "GMAT",
    category: "Tests",
    definition:
      "Graduate Management Admission Test — required by most top MBA programmes. Scored 200-800. Top schools expect 700+.",
  },

  // ----- Visa -------------------------------------------------------------
  {
    slug: "f-1",
    term: "F-1 Visa",
    abbr: "F-1",
    category: "Visa",
    definition:
      "Non-immigrant student visa for full-time academic study in the United States. Allows 20 hrs/week on-campus work and CPT/OPT off-campus options.",
  },
  {
    slug: "study-permit",
    term: "Canadian Study Permit",
    category: "Visa",
    definition:
      "Canada's student-visa equivalent. Allows you to study and work 24 hours/week during term. SDS pathway expedites processing for eligible Indians.",
  },
  {
    slug: "sds",
    term: "Student Direct Stream",
    abbr: "SDS",
    category: "Visa",
    definition:
      "Canada's expedited study-permit pathway for Indian students. Requires upfront GIC, paid first-year tuition, and IELTS 6.0+. Processes in 3-4 weeks vs. 8-12.",
  },
  {
    slug: "gic",
    term: "Guaranteed Investment Certificate",
    abbr: "GIC",
    category: "Visa",
    definition:
      "A locked-in deposit (CAD 20,635 in 2026) with a Canadian bank required for the SDS pathway. Released to you in monthly instalments after you land.",
  },
  {
    slug: "subclass-500",
    term: "Subclass 500 Visa",
    category: "Visa",
    definition:
      "Australia's student visa, valid for the duration of your course + 2-4 months. Allows 48 hours/fortnight of work during term.",
  },
  {
    slug: "uk-student-route",
    term: "UK Student Route",
    category: "Visa",
    definition:
      "Formerly Tier 4 — the UK's standard student visa. Issued for the duration of the course; allows 20 hours/week work during term.",
  },
  {
    slug: "biometrics",
    term: "Biometrics",
    category: "Visa",
    definition:
      "Fingerprint + photo collection done at a VFS Global centre as part of student-visa applications for the UK, Canada, Australia, Schengen, and others.",
  },
  {
    slug: "221g",
    term: "221(g)",
    category: "Visa",
    definition:
      "A US visa response indicating additional administrative processing is needed. Common when documents don't match the I-20 or further checks are required.",
  },
  {
    slug: "blocked-account",
    term: "Blocked Account (Sperrkonto)",
    category: "Visa",
    definition:
      "Germany's mandatory financial proof — €11,904 deposited into a special account, released to you in monthly instalments throughout your study.",
  },
  {
    slug: "campus-france",
    term: "Études en France",
    category: "Visa",
    definition:
      "France's mandatory pre-application platform managed by Campus France. Required before applying for the French long-stay student visa.",
  },
  {
    slug: "aps",
    term: "APS Certificate (Germany)",
    abbr: "APS",
    category: "Visa",
    definition:
      "Academic Evaluation Centre verification issued by the German embassy in New Delhi. Required for most German university applications.",
  },

  // ----- Funding ---------------------------------------------------------
  {
    slug: "ta-ra",
    term: "Teaching / Research Assistantship",
    abbr: "TA / RA",
    category: "Funding",
    definition:
      "Paid roles common in US PhD and master's programmes — usually waiving full tuition plus a US$20-30K annual stipend.",
  },
  {
    slug: "merit-scholarship",
    term: "Merit Scholarship",
    category: "Funding",
    definition:
      "Tuition waiver from a university based on academic performance. Often auto-applied; sometimes requires a separate essay.",
  },
  {
    slug: "education-loan",
    term: "Education Loan",
    category: "Funding",
    definition:
      "Loans available from Indian PSU banks (collateral, 9-11% interest) or NBFCs (non-collateral, 11-14%). Most students fund 40-60% of total cost via loan.",
  },
  {
    slug: "moratorium",
    term: "Moratorium Period",
    category: "Funding",
    definition:
      "The grace period during which you don't repay your education loan — usually the course duration plus 6-12 months. Interest typically accrues.",
  },

  // ----- Post-study ------------------------------------------------------
  {
    slug: "opt",
    term: "Optional Practical Training",
    abbr: "OPT",
    category: "Post-study",
    definition:
      "US post-study work authorisation — 12 months for any F-1 graduate, plus 24-month STEM extension if your major is STEM-designated.",
  },
  {
    slug: "stem-opt",
    term: "STEM OPT Extension",
    category: "Post-study",
    definition:
      "An additional 24 months of OPT for graduates of STEM-designated degrees in the US, taking total post-study work up to 3 years.",
  },
  {
    slug: "cpt",
    term: "Curricular Practical Training",
    abbr: "CPT",
    category: "Post-study",
    definition:
      "US authorisation to work in a course-required internship while still studying. Can be used part-time during term or full-time during breaks.",
  },
  {
    slug: "pgwp",
    term: "Post-Graduation Work Permit",
    abbr: "PGWP",
    category: "Post-study",
    definition:
      "Canada's open work permit issued after a master's or eligible undergraduate degree. Valid 1-3 years; open to any employer, any province.",
  },
  {
    slug: "graduate-route",
    term: "UK Graduate Route",
    category: "Post-study",
    definition:
      "UK post-study work visa allowing two years (three for PhD) of unrestricted work after graduating. No employer sponsorship required.",
  },
  {
    slug: "subclass-485",
    term: "Subclass 485 Visa",
    category: "Post-study",
    definition:
      "Australia's Temporary Graduate Visa — 2 years for bachelor's, 3 for master's, 4 for PhD. Extra year for regional study.",
  },
  {
    slug: "express-entry",
    term: "Express Entry",
    category: "Post-study",
    definition:
      "Canada's points-based permanent-residency system. Canadian education and work experience score heavily — the most common PR pathway for master's graduates.",
  },
  {
    slug: "blue-card",
    term: "EU Blue Card",
    category: "Post-study",
    definition:
      "An EU-wide work and residence permit for skilled workers — common pathway for German master's graduates with a job offer above the salary threshold.",
  },

  // ----- Universities ----------------------------------------------------
  {
    slug: "russell-group",
    term: "Russell Group",
    category: "Universities",
    definition:
      "A self-selected group of 24 UK research-intensive universities — includes Oxford, Cambridge, Imperial, UCL, Manchester, Edinburgh.",
  },
  {
    slug: "group-of-eight",
    term: "Group of Eight",
    category: "Universities",
    definition:
      "Australia's eight leading research-intensive universities — Melbourne, Sydney, ANU, UNSW, Monash, UQ, UWA, Adelaide.",
  },
  {
    slug: "ivy-league",
    term: "Ivy League",
    category: "Universities",
    definition:
      "Eight private US universities: Harvard, Yale, Princeton, Columbia, UPenn, Brown, Dartmouth, Cornell. Highly selective; need-blind aid for international students at the top.",
  },
  {
    slug: "r1-university",
    term: "R1 University",
    category: "Universities",
    definition:
      "Carnegie Classification for US universities with the highest research activity — 146 institutions where master's and PhD students get the deepest funding and lab access.",
  },
  {
    slug: "grandes-ecoles",
    term: "Grandes Écoles",
    category: "Universities",
    definition:
      "Elite French higher-education institutions outside the public-university system — includes HEC, INSEAD, École Polytechnique, Sciences Po.",
  },
];
