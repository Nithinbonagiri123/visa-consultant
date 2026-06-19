// Programme catalogue + per-country availability for the /programmes/[slug] route.
//
// URL format: /programmes/{programme-slug}-in-{country-slug}
// e.g. /programmes/ms-computer-science-in-canada
//
// The page template combines programme content (universal) with destination content
// (country-specific) so we get ~35 unique SEO-target pages from one template.

export type Programme = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  blurb: string;
  whoFor: string;
  coreCurriculum: string[];
  careerPaths: string[];
  typicalRequirements: {
    undergrad: string;
    ielts: number;
    gre?: string;
    gmat?: string;
    experience?: string;
  };
  avgGraduateSalaryNote: string;
};

export const programmes: Programme[] = [
  {
    slug: "ms-computer-science",
    name: "MS Computer Science",
    shortName: "MS CS",
    category: "Technology",
    blurb:
      "A research-led master's that goes deep on algorithms, distributed systems, and the modern AI stack — the most chosen overseas master's by Indian engineers.",
    whoFor:
      "Engineering, CS, or strong-mathematics graduates aiming for software, data, or research-track careers at global tech employers.",
    coreCurriculum: [
      "Advanced algorithms & data structures",
      "Distributed systems & cloud architecture",
      "Machine learning & deep learning",
      "Software engineering practices",
      "Capstone or thesis project",
    ],
    careerPaths: [
      "Software Engineer (Big Tech, fintech, healthtech)",
      "Machine Learning Engineer",
      "Backend / Platform Engineer",
      "Research Engineer",
      "PhD pathway",
    ],
    typicalRequirements: {
      undergrad: "BE/BTech in CS/IT/related engineering, 65%+",
      ielts: 6.5,
      gre: "Required for most US programmes; optional elsewhere",
    },
    avgGraduateSalaryNote:
      "Top-tier offers commonly cross USD 90K-120K in the US, CAD 75-100K in Canada, GBP 45-65K in the UK.",
  },
  {
    slug: "ms-data-science",
    name: "MS Data Science",
    shortName: "MS DS",
    category: "Technology",
    blurb:
      "A hands-on, industry-aligned master's at the intersection of statistics, ML, and engineering — built around real-world data products.",
    whoFor:
      "Strong-mathematics graduates from engineering, statistics, or economics backgrounds aiming for data science, analytics, or research roles.",
    coreCurriculum: [
      "Statistical learning & inference",
      "Machine learning at scale",
      "Data engineering pipelines",
      "Visualisation & storytelling",
      "Capstone with industry partner",
    ],
    careerPaths: [
      "Data Scientist (product, growth, marketing)",
      "ML Engineer",
      "Analytics Engineer",
      "Research Scientist",
      "Quant / Risk Analyst",
    ],
    typicalRequirements: {
      undergrad: "Engineering, statistics, mathematics, or economics — 65%+",
      ielts: 6.5,
      gre: "Required for US R1 programmes",
    },
    avgGraduateSalaryNote:
      "Typical starting salaries: USD 95K+ (US), CAD 80K+ (Canada), GBP 50K+ (UK).",
  },
  {
    slug: "ms-artificial-intelligence",
    name: "MS Artificial Intelligence",
    shortName: "MS AI",
    category: "Technology",
    blurb:
      "Research-grade master's covering deep learning, NLP, reinforcement learning, and applied AI systems — for graduates targeting research labs or AI engineering.",
    whoFor:
      "Computer science or strong-mathematics graduates aiming for AI research roles, ML engineering, or PhD pathways at leading labs.",
    coreCurriculum: [
      "Deep learning foundations",
      "Natural language processing",
      "Reinforcement learning",
      "Computer vision",
      "Research thesis or applied capstone",
    ],
    careerPaths: [
      "AI / ML Research Engineer",
      "Applied Scientist",
      "NLP Engineer",
      "Computer Vision Engineer",
      "AI Product Engineer",
      "PhD pathway",
    ],
    typicalRequirements: {
      undergrad: "CS / mathematics / engineering with strong linear algebra and probability",
      ielts: 6.5,
      gre: "Required for most US labs",
    },
    avgGraduateSalaryNote:
      "AI specialism commands a 10–20% premium over CS — frequently USD 110K+ at US labs.",
  },
  {
    slug: "ms-cyber-security",
    name: "MS Cyber Security",
    shortName: "MS Cyber",
    category: "Technology",
    blurb:
      "A practical, lab-heavy master's covering offensive security, defence engineering, cryptography, and security operations — built for an industry with no shortage of jobs.",
    whoFor:
      "Computer science, IT, or engineering graduates targeting roles in SOC, AppSec, GRC, or penetration testing across regulated industries.",
    coreCurriculum: [
      "Network & systems security",
      "Applied cryptography",
      "Secure software engineering",
      "Digital forensics & incident response",
      "Security architecture capstone",
    ],
    careerPaths: [
      "Security Engineer",
      "Application Security Engineer",
      "Penetration Tester",
      "Security Architect",
      "GRC / Risk Consultant",
    ],
    typicalRequirements: {
      undergrad: "CS / IT / Engineering",
      ielts: 6.5,
      experience: "Industry certifications (CEH, OSCP) strengthen applications",
    },
    avgGraduateSalaryNote:
      "Cyber roles routinely match or beat CS salaries given persistent industry demand.",
  },
  {
    slug: "mba",
    name: "MBA",
    shortName: "MBA",
    category: "Business",
    blurb:
      "A career-accelerating one or two-year master's at the world's leading business schools — for professionals targeting consulting, banking, product, or general-management roles.",
    whoFor:
      "Working professionals with 2–6 years of experience aiming to switch industries, geographies, or function — or accelerate within their current track.",
    coreCurriculum: [
      "Strategy, finance, marketing, operations",
      "Leadership & people management",
      "Capstone consulting project",
      "International immersion / exchange",
      "Career strategy & coaching",
    ],
    careerPaths: [
      "Management Consultant (MBB, Big Four, boutique)",
      "Investment Banking Associate",
      "Product Manager (tech)",
      "Brand / Category Manager",
      "Operations / GM track",
    ],
    typicalRequirements: {
      undergrad: "Any discipline, 60%+",
      ielts: 6.5,
      gmat: "Required at most top schools (waivers increasingly common)",
      experience: "Typically 2–6 years of full-time work",
    },
    avgGraduateSalaryNote:
      "Top US/UK MBA salaries clear USD 150K total comp; Indian-school MBA averages USD 30-45K starting.",
  },
  {
    slug: "msc-finance",
    name: "MSc Finance",
    shortName: "MSc Finance",
    category: "Business",
    blurb:
      "A pre-experience or one-year specialised master's in corporate finance, asset management, or financial engineering — the fastest route into investment banking and PE.",
    whoFor:
      "Finance, economics, or strong-mathematics graduates aiming for analyst roles in investment banking, asset management, fintech, or PE.",
    coreCurriculum: [
      "Corporate finance & valuation",
      "Derivatives & risk management",
      "Portfolio theory",
      "Financial econometrics",
      "Live deal / equity research project",
    ],
    careerPaths: [
      "Investment Banking Analyst",
      "Equity Research",
      "Asset Management",
      "Private Equity",
      "Fintech / Risk Analytics",
    ],
    typicalRequirements: {
      undergrad: "Finance / economics / engineering with quantitative coursework",
      ielts: 6.5,
      gmat: "Required by select top schools (LSE, LBS, HEC)",
    },
    avgGraduateSalaryNote:
      "London IB analyst comp starts at GBP 55-75K; US bulge-bracket roles cross USD 110K.",
  },
];

// Per-country list of programme slugs that are well-supported by leading
// universities. Generates the route's static params.
export const countryProgrammeFit: Record<string, string[]> = {
  ireland: ["ms-computer-science", "ms-data-science", "ms-cyber-security", "msc-finance"],
  uk: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "mba", "msc-finance", "ms-cyber-security"],
  canada: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "mba", "ms-cyber-security"],
  australia: ["ms-computer-science", "ms-data-science", "mba"],
  usa: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "mba", "msc-finance", "ms-cyber-security"],
  germany: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "ms-cyber-security"],
  france: ["mba", "msc-finance", "ms-data-science"],
  "new-zealand": ["ms-computer-science", "ms-data-science", "mba"],
  uae: ["mba", "msc-finance"],
  netherlands: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "msc-finance", "mba"],
  finland: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence"],
  sweden: ["ms-computer-science", "ms-data-science", "msc-finance"],
};

export type ProgrammeRoute = { programmeSlug: string; countrySlug: string };

export function getAllProgrammeRoutes(): ProgrammeRoute[] {
  const routes: ProgrammeRoute[] = [];
  for (const [countrySlug, programmeSlugs] of Object.entries(countryProgrammeFit)) {
    for (const programmeSlug of programmeSlugs) {
      routes.push({ programmeSlug, countrySlug });
    }
  }
  return routes;
}

// Build / parse the URL slug for a programme combo.
export function buildProgrammeSlug(programmeSlug: string, countrySlug: string): string {
  return `${programmeSlug}-in-${countrySlug}`;
}

export function parseProgrammeSlug(slug: string): ProgrammeRoute | null {
  const idx = slug.lastIndexOf("-in-");
  if (idx === -1) return null;
  const programmeSlug = slug.slice(0, idx);
  const countrySlug = slug.slice(idx + 4);
  if (!programmeSlug || !countrySlug) return null;
  return { programmeSlug, countrySlug };
}

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}
