// University catalogue — 10 of the most-searched institutions among Indian
// students. Each entry is a SEO landing page + a data row for the admit
// probability calculator.

export type University = {
  slug: string;
  name: string;
  abbr?: string;
  countrySlug: string;
  city: string;
  flag: string;
  founded: number;
  qsRanking: number;
  type: "public" | "private";
  blurb: string;
  strengths: string[];
  popularProgrammes: string[];   // programme slugs
  // Admit thresholds — used by the admit-probability calculator.
  thresholds: {
    minAcademicPct: number;       // typical undergraduate %
    minIELTS: number;
    gre?: { required: boolean; targetScore?: number };  // out of 340
    gmat?: { required: boolean; targetScore?: number };  // out of 800
    minWorkYears?: number;        // for MBA
    typicalAdmitRatePct: number;   // % of applicants accepted (approx)
  };
  scholarshipNote: string;
  websiteUrl: string;
};

export const universities: University[] = [
  {
    slug: "trinity-college-dublin",
    name: "Trinity College Dublin",
    abbr: "TCD",
    countrySlug: "ireland",
    city: "Dublin",
    flag: "🇮🇪",
    founded: 1592,
    qsRanking: 87,
    type: "public",
    blurb:
      "Ireland's oldest university — a 430-year tradition of research excellence in the heart of Dublin, anchoring the country's tech and life-sciences ecosystem.",
    strengths: ["Computer Science", "Pharmacy & Biotech", "Business", "Engineering"],
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-cyber-security", "msc-finance"],
    thresholds: {
      minAcademicPct: 65,
      minIELTS: 6.5,
      gre: { required: false },
      typicalAdmitRatePct: 30,
    },
    scholarshipNote:
      "Government of Ireland International Scholarships available. Trinity also offers 10–50% tuition merit awards.",
    websiteUrl: "https://www.tcd.ie",
  },
  {
    slug: "university-college-dublin",
    name: "University College Dublin",
    abbr: "UCD",
    countrySlug: "ireland",
    city: "Dublin",
    flag: "🇮🇪",
    founded: 1854,
    qsRanking: 126,
    type: "public",
    blurb:
      "Ireland's largest international student community — strong for engineering, business, and life sciences with deep industry partnerships.",
    strengths: ["Business", "Engineering", "Pharma", "Computer Science"],
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science", "msc-finance"],
    thresholds: {
      minAcademicPct: 60,
      minIELTS: 6.5,
      typicalAdmitRatePct: 40,
    },
    scholarshipNote:
      "UCD Global Excellence Scholarships of €5,000–€10,000 + university merit waivers up to 50%.",
    websiteUrl: "https://www.ucd.ie",
  },
  {
    slug: "university-of-oxford",
    name: "University of Oxford",
    abbr: "Oxford",
    countrySlug: "uk",
    city: "Oxford",
    flag: "🇬🇧",
    founded: 1096,
    qsRanking: 3,
    type: "public",
    blurb:
      "The English-speaking world's oldest university — Oxford's master's programmes are competitive globally, with admissions weighted heavily on academic depth and research alignment.",
    strengths: ["PPE & Economics", "Computer Science", "AI", "Mathematics", "Medicine"],
    popularProgrammes: ["mba", "ms-computer-science", "ms-artificial-intelligence", "msc-finance"],
    thresholds: {
      minAcademicPct: 85,
      minIELTS: 7.5,
      gre: { required: true, targetScore: 325 },
      gmat: { required: true, targetScore: 680 },
      typicalAdmitRatePct: 12,
    },
    scholarshipNote:
      "Rhodes Scholarship (fully funded), Clarendon Fund, Reach Oxford for Indians.",
    websiteUrl: "https://www.ox.ac.uk",
  },
  {
    slug: "imperial-college-london",
    name: "Imperial College London",
    abbr: "Imperial",
    countrySlug: "uk",
    city: "London",
    flag: "🇬🇧",
    founded: 1907,
    qsRanking: 6,
    type: "public",
    blurb:
      "STEM-only Russell Group, central London. One of the strongest engineering and AI master's offerings in Europe with intense industry hiring.",
    strengths: ["Engineering", "AI", "Computer Science", "Medicine", "Business"],
    popularProgrammes: ["ms-computer-science", "ms-artificial-intelligence", "ms-data-science", "msc-finance"],
    thresholds: {
      minAcademicPct: 75,
      minIELTS: 7.0,
      gre: { required: false },
      typicalAdmitRatePct: 18,
    },
    scholarshipNote:
      "President's Scholarships, Imperial College PhD Scholarships, departmental awards.",
    websiteUrl: "https://www.imperial.ac.uk",
  },
  {
    slug: "university-of-manchester",
    name: "University of Manchester",
    abbr: "Manchester",
    countrySlug: "uk",
    city: "Manchester",
    flag: "🇬🇧",
    founded: 1824,
    qsRanking: 34,
    type: "public",
    blurb:
      "Russell Group, globally top-50, with Alliance Manchester Business School and strong engineering. The most cost-effective premier UK option.",
    strengths: ["MBA", "Engineering", "Computer Science", "Materials Science"],
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science", "msc-finance"],
    thresholds: {
      minAcademicPct: 65,
      minIELTS: 6.5,
      gmat: { required: true, targetScore: 600 },
      typicalAdmitRatePct: 30,
    },
    scholarshipNote:
      "Global Futures, Alliance MBS Scholarships, school-level awards of £3,000–£15,000.",
    websiteUrl: "https://www.manchester.ac.uk",
  },
  {
    slug: "university-of-toronto",
    name: "University of Toronto",
    abbr: "UofT",
    countrySlug: "canada",
    city: "Toronto",
    flag: "🇨🇦",
    founded: 1827,
    qsRanking: 25,
    type: "public",
    blurb:
      "Canada's top-ranked university — known globally for CS, ML, business, and medicine. Toronto's location gives unmatched tech and finance recruiting access.",
    strengths: ["Computer Science", "AI", "Business", "Engineering", "Medicine"],
    popularProgrammes: ["ms-computer-science", "ms-artificial-intelligence", "ms-data-science", "mba"],
    thresholds: {
      minAcademicPct: 75,
      minIELTS: 7.0,
      gre: { required: true, targetScore: 320 },
      typicalAdmitRatePct: 20,
    },
    scholarshipNote:
      "Lester B. Pearson International Scholarship (full), Vector Scholarship in AI, graduate merit awards.",
    websiteUrl: "https://www.utoronto.ca",
  },
  {
    slug: "university-of-waterloo",
    name: "University of Waterloo",
    abbr: "Waterloo",
    countrySlug: "canada",
    city: "Waterloo",
    flag: "🇨🇦",
    founded: 1957,
    qsRanking: 112,
    type: "public",
    blurb:
      "Canada's strongest engineering and CS university with the country's largest co-op programme — paid work terms embedded into every degree.",
    strengths: ["Computer Science", "Software Engineering", "Mathematics", "Engineering"],
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-cyber-security"],
    thresholds: {
      minAcademicPct: 78,
      minIELTS: 7.0,
      gre: { required: true, targetScore: 315 },
      typicalAdmitRatePct: 22,
    },
    scholarshipNote:
      "Cheriton School awards, Waterloo Engineering Scholarships, departmental merit-based.",
    websiteUrl: "https://uwaterloo.ca",
  },
  {
    slug: "university-of-melbourne",
    name: "University of Melbourne",
    abbr: "UniMelb",
    countrySlug: "australia",
    city: "Melbourne",
    flag: "🇦🇺",
    founded: 1853,
    qsRanking: 14,
    type: "public",
    blurb:
      "Group of Eight flagship — globally top-15, with leading programmes across engineering, business, and health sciences. Melbourne's liveability is a real perk.",
    strengths: ["Engineering", "Business", "Medicine", "Computer Science"],
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science"],
    thresholds: {
      minAcademicPct: 70,
      minIELTS: 6.5,
      gmat: { required: true, targetScore: 650 },
      typicalAdmitRatePct: 28,
    },
    scholarshipNote:
      "Melbourne International Scholarships, MBS Scholarships, faculty-level merit awards.",
    websiteUrl: "https://www.unimelb.edu.au",
  },
  {
    slug: "university-of-sydney",
    name: "University of Sydney",
    abbr: "USyd",
    countrySlug: "australia",
    city: "Sydney",
    flag: "🇦🇺",
    founded: 1850,
    qsRanking: 18,
    type: "public",
    blurb:
      "Australia's oldest university — strong for business, IT, and architecture. Sydney's harbour-side campus is among the most beautiful in the southern hemisphere.",
    strengths: ["Business", "IT", "Engineering", "Health Sciences"],
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science"],
    thresholds: {
      minAcademicPct: 70,
      minIELTS: 6.5,
      typicalAdmitRatePct: 35,
    },
    scholarshipNote:
      "Sydney Scholars Awards, Vice-Chancellor's International Scholarships, business school merit awards.",
    websiteUrl: "https://www.sydney.edu.au",
  },
  {
    slug: "tu-munich",
    name: "Technical University of Munich",
    abbr: "TUM",
    countrySlug: "germany",
    city: "Munich",
    flag: "🇩🇪",
    founded: 1868,
    qsRanking: 28,
    type: "public",
    blurb:
      "Germany's premier technical university — global top-30, ~zero tuition (semester fee only), and deep industry pipelines into BMW, Siemens, Allianz, and Munich's startup ecosystem.",
    strengths: ["Engineering", "Computer Science", "AI", "Physics"],
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "ms-cyber-security"],
    thresholds: {
      minAcademicPct: 75,
      minIELTS: 6.5,
      gre: { required: false },
      typicalAdmitRatePct: 25,
    },
    scholarshipNote:
      "DAAD Scholarships, Deutschlandstipendium, Erasmus+ Joint Master's funding.",
    websiteUrl: "https://www.tum.de",
  },
];

export function getUniversity(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug);
}
