export const site = {
  name: "Campus Meridian",
  tagline: "India's trusted student visa partner for Ireland",
  description:
    "Specialist student visa and admissions consultants for Ireland — Trinity College Dublin, UCD, University of Galway and beyond.",
  url: "https://campusmeridian.com",

  // Replace with real brand assets / details
  contact: {
    phone: "+91 98765 43200",
    phoneIN: "+91 98765 43200",
    phoneIE: "+353 89 000 0000",
    whatsapp: "+919876543200",
    email: "hello@campusmeridian.com",
    address: "Hyderabad, India",
    addressIN: "Hyderabad, Telangana, India",
    addressIE: "Dublin, Ireland",
  },

  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const;

export const navLinks = [
  { label: "Destinations",  href: "/destinations" },
  { label: "Universities",  href: "/universities" },
  { label: "Programmes",    href: "/programmes" },
  { label: "Services",      href: "/services" },
  { label: "How It Works",  href: "/how-it-works" },
  { label: "Stories",       href: "/stories" },
  { label: "Tools",         href: "/tools" },
  { label: "Resources",     href: "/resources" },
] as const;

export type Destination = {
  slug: string;
  country: string;
  flag: string;
  blurb: string;
  highlights: string[];
  topUniversities: string[];
  intakes: string;
  costFromINR: string;
};

// IRELAND-ONLY SCOPE: only Ireland is active for now. The other destinations
// remain in source (commented) so we can re-enable them when expanding scope.
export const destinations: Destination[] = [
  {
    slug: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    blurb:
      "EU degrees, two-year post-study work visa, and a thriving tech ecosystem anchored by Dublin's global HQs.",
    highlights: ["2-year stay-back", "EU recognised degrees", "Tech & pharma hub"],
    topUniversities: ["Trinity College Dublin", "University College Dublin", "University of Galway"],
    intakes: "Sep · Jan",
    costFromINR: "₹18–28L / yr",
  },
  // {
  //   slug: "uk",
  //   country: "United Kingdom",
  //   flag: "🇬🇧",
  //   blurb:
  //     "World-renowned universities, one-year master's programmes and the Graduate Route post-study work visa.",
  //   highlights: ["1-year master's", "2-year stay-back", "Russell Group access"],
  //   topUniversities: ["University of Oxford", "Imperial College London", "University of Manchester"],
  //   intakes: "Sep · Jan",
  //   costFromINR: "₹22–40L / yr",
  // },
  // {
  //   slug: "canada",
  //   country: "Canada",
  //   flag: "🇨🇦",
  //   blurb:
  //     "Affordable world-class education, generous PGWP, and a clear pathway to permanent residency.",
  //   highlights: ["3-year PGWP", "PR pathway", "Co-op programmes"],
  //   topUniversities: ["University of Toronto", "University of Waterloo", "McGill University"],
  //   intakes: "Sep · Jan · May",
  //   costFromINR: "₹16–32L / yr",
  // },
  // {
  //   slug: "australia",
  //   country: "Australia",
  //   flag: "🇦🇺",
  //   blurb:
  //     "Group of Eight universities, sunny living and post-study work rights of up to four years.",
  //   highlights: ["Up to 4-yr stay-back", "Group of Eight", "High quality of life"],
  //   topUniversities: ["University of Melbourne", "University of Sydney", "ANU"],
  //   intakes: "Feb · Jul",
  //   costFromINR: "₹22–38L / yr",
  // },
  // {
  //   slug: "usa",
  //   country: "United States",
  //   flag: "🇺🇸",
  //   blurb:
  //     "Ivy League prestige, cutting-edge research, OPT and STEM extensions for global careers.",
  //   highlights: ["3-yr STEM OPT", "Ivy & R1 access", "Top research labs"],
  //   topUniversities: ["Harvard University", "MIT", "Stanford University"],
  //   intakes: "Aug · Jan",
  //   costFromINR: "₹30–60L / yr",
  // },
  // {
  //   slug: "germany",
  //   country: "Germany",
  //   flag: "🇩🇪",
  //   blurb:
  //     "Low-to-no tuition at public universities and Europe's strongest engineering job market.",
  //   highlights: ["Low tuition", "Strong engineering", "18-month job seeker visa"],
  //   topUniversities: ["TU Munich", "RWTH Aachen", "Heidelberg University"],
  //   intakes: "Oct · Apr",
  //   costFromINR: "₹6–14L / yr",
  // },
  // {
  //   slug: "france",
  //   country: "France",
  //   flag: "🇫🇷",
  //   blurb:
  //     "Grandes Écoles, world-leading business schools and English-taught master's across Paris and Lyon.",
  //   highlights: ["Top B-schools", "English programmes", "2-yr stay-back"],
  //   topUniversities: ["HEC Paris", "Sciences Po", "INSEAD"],
  //   intakes: "Sep · Jan",
  //   costFromINR: "₹14–30L / yr",
  // },
  // {
  //   slug: "new-zealand",
  //   country: "New Zealand",
  //   flag: "🇳🇿",
  //   blurb:
  //     "Eight government-funded universities, safe cities and up to three years of post-study work.",
  //   highlights: ["3-yr stay-back", "Safe & welcoming", "All 8 unis top-ranked"],
  //   topUniversities: ["University of Auckland", "Otago", "Victoria Wellington"],
  //   intakes: "Feb · Jul",
  //   costFromINR: "₹16–26L / yr",
  // },
  // {
  //   slug: "uae",
  //   country: "Dubai · UAE",
  //   flag: "🇦🇪",
  //   blurb:
  //     "Global campuses on your doorstep, tax-free careers and unmatched proximity to India.",
  //   highlights: ["Tax-free salaries", "Global campuses", "Close to home"],
  //   topUniversities: ["University of Birmingham Dubai", "Heriot-Watt Dubai", "Middlesex Dubai"],
  //   intakes: "Sep · Jan",
  //   costFromINR: "₹12–22L / yr",
  // },
  // {
  //   slug: "netherlands",
  //   country: "Netherlands",
  //   flag: "🇳🇱",
  //   blurb:
  //     "Innovation-driven universities, EU-recognised degrees taught entirely in English, and a 12-month orientation year for graduates.",
  //   highlights: ["12-mo orientation year", "100% English programmes", "Strong tech & business"],
  //   topUniversities: ["Delft University of Technology", "University of Amsterdam", "Erasmus University"],
  //   intakes: "Sep · Feb",
  //   costFromINR: "₹16–28L / yr",
  // },
  // {
  //   slug: "finland",
  //   country: "Finland",
  //   flag: "🇫🇮",
  //   blurb:
  //     "World-leading education systems, low tuition, two-year residence permit after graduation, and a thriving Nordic tech sector.",
  //   highlights: ["Low tuition", "2-yr stay-back", "World-class research"],
  //   topUniversities: ["University of Helsinki", "Aalto University", "University of Turku"],
  //   intakes: "Sep · Jan",
  //   costFromINR: "₹10–20L / yr",
  // },
  // {
  //   slug: "sweden",
  //   country: "Sweden",
  //   flag: "🇸🇪",
  //   blurb:
  //     "Innovation capital of Europe, English-taught master's at globally ranked universities, and a 12-month job seeker visa after graduation.",
  //   highlights: ["Innovation hub", "12-mo job seeker visa", "English programmes"],
  //   topUniversities: ["KTH Royal Institute", "Lund University", "Stockholm University"],
  //   intakes: "Sep · Jan",
  //   costFromINR: "₹14–24L / yr",
  // },
];

export const services = [
  {
    title: "University Admissions",
    description:
      "Profile-matched shortlisting, applications, and admission counselling for top-ranked universities worldwide.",
    icon: "GraduationCap",
  },
  {
    title: "Student Visa Assistance",
    description:
      "End-to-end documentation, financial planning, and mock interviews calibrated to each consulate.",
    icon: "Plane",
  },
  {
    title: "Scholarship Guidance",
    description:
      "Discover merit-, need- and country-specific scholarships and craft applications that win them.",
    icon: "Trophy",
  },
  {
    title: "SOP & LOR Crafting",
    description:
      "Senior counsellors shape your narrative with one-to-one drafting and admissions-grade editing.",
    icon: "PenLine",
  },
  {
    title: "IELTS & PTE Prep",
    description:
      "Diagnostic test, focused weak-area training, and unlimited mocks until your target band.",
    icon: "BookOpen",
  },
  {
    title: "Education Loans",
    description:
      "Compare collateral and non-collateral loans across our partner banks and NBFCs in one place.",
    icon: "Landmark",
  },
  {
    title: "Accommodation Support",
    description:
      "Verified university and private accommodation across cities, booked before you board your flight.",
    icon: "Building2",
  },
  {
    title: "Pre-Departure Briefing",
    description:
      "Forex, SIM, packing, culture and first-week playbooks so you land confident in a new country.",
    icon: "Compass",
  },
] as const;

export const journey = [
  {
    step: "01",
    title: "Free Consultation",
    description: "30-minute discovery call to map your goals, budget, and target intake.",
  },
  {
    step: "02",
    title: "Profile Assessment",
    description: "Senior counsellors benchmark your profile against successful past admits.",
  },
  {
    step: "03",
    title: "University Shortlisting",
    description: "Data-driven shortlist across ambitious, target, and safe universities.",
  },
  {
    step: "04",
    title: "Application Processing",
    description: "SOPs, LORs, transcripts, and submissions — managed end-to-end.",
  },
  {
    step: "05",
    title: "Visa Assistance",
    description: "Documentation, finances, and interview prep tuned to each consulate.",
  },
  {
    step: "06",
    title: "Fly Abroad",
    description: "Pre-departure briefing, forex, SIM, and on-ground support after you land.",
  },
] as const;

export const stats = [
  { value: 2400, suffix: "+", label: "Students Placed in Ireland" },
  { value: 18,   suffix: "",  label: "Partner Universities" },
  { value: 96,   suffix: "%", label: "Ireland Visa Success Rate" },
  { value: 12,   suffix: "+", label: "Years of Ireland Focus" },
] as const;

// IRELAND-ONLY: testimonials replaced with Ireland-focused stories.
// Non-Ireland originals preserved below (commented) for future expansion.
export const testimonials = [
  {
    name: "Sneha Iyer",
    course: "MSc Data Analytics",
    university: "Trinity College Dublin",
    country: "Ireland",
    quote:
      "Two consulate-ready interview rehearsals, a polished SOP, and zero stress on visa day. Worth every rupee.",
  },
  {
    name: "Aditya Reddy",
    course: "MSc Computer Science",
    university: "University College Dublin",
    country: "Ireland",
    quote:
      "From profile review to the Dublin airport pickup, every step was handled. The Ireland-specific SOP coaching was the difference.",
  },
  {
    name: "Meera Krishnan",
    course: "MSc Pharmaceutical Sciences",
    university: "University of Galway",
    country: "Ireland",
    quote:
      "Their counsellor knew exactly which Galway programmes match Indian pharma backgrounds. Admit + scholarship in eleven weeks.",
  },
  {
    name: "Karthik Rao",
    course: "MSc Business Analytics",
    university: "Dublin City University",
    country: "Ireland",
    quote:
      "Honest about what would and wouldn't get a visa approval. That filter alone saved me six months.",
  },
  // {
  //   name: "Aarav Mehta",
  //   course: "MS Computer Science",
  //   university: "University of Toronto",
  //   country: "Canada",
  //   quote:
  //     "From a confused shortlist to a fully-funded admit in five months. The team treated my application like their own.",
  // },
  // {
  //   name: "Rohan Verma",
  //   course: "MBA",
  //   university: "University of Melbourne",
  //   country: "Australia",
  //   quote:
  //     "Their scholarship guidance unlocked a 50% tuition waiver I would never have found on my own.",
  // },
  // {
  //   name: "Priya Nair",
  //   course: "MS Cyber Security",
  //   university: "University of Manchester",
  //   country: "United Kingdom",
  //   quote:
  //     "Honest counselling. They talked me out of two wrong-fit universities and into the one I now love.",
  // },
] as const;

// IRELAND-ONLY: only Irish institutions for now. Non-Irish entries preserved
// below (commented) for future expansion.
export const universities = [
  "Trinity College Dublin",
  "University College Dublin",
  "University of Galway",
  "University College Cork",
  "Dublin City University",
  "University of Limerick",
  "Maynooth University",
  "Technological University Dublin",
  // "University of Oxford",
  // "Imperial College London",
  // "University of Manchester",
  // "University of Toronto",
  // "University of Waterloo",
  // "McGill University",
  // "University of Melbourne",
  // "University of Sydney",
  // "ANU",
  // "Harvard University",
  // "MIT",
  // "Stanford University",
  // "TU Munich",
  // "RWTH Aachen",
  // "HEC Paris",
  // "University of Auckland",
] as const;

export const courseCategories = [
  "Computer Science",
  "Artificial Intelligence",
  "Data Science",
  "Engineering",
  "Business Management",
  "Healthcare",
  "Finance",
  "Cyber Security",
  "Hospitality",
] as const;

export const faqs = [
  {
    q: "Which is the best study abroad consultant in India?",
    a: "The best consultant is one with senior counsellors, transparent fees, and a measurable visa success track record. Campus Meridian pairs each student with a dedicated counsellor who owns the journey end-to-end — from shortlisting to landing.",
  },
  {
    q: "How can Indian students study abroad?",
    a: "Start 9–12 months before your intake. Choose a country, take IELTS or PTE, shortlist universities, prepare SOPs and LORs, secure admits, arrange finances, then apply for the student visa. Our six-step journey breaks this down session by session.",
  },
  {
    q: "Which documents are required for a student visa?",
    a: "Typically: passport, university offer letter, financial statements, academic transcripts, English proficiency results, SOP, and country-specific forms. Exact requirements vary — we share a country-specific checklist on day one.",
  },
  {
    q: "Why should Indian students choose Ireland?",
    a: "Ireland combines EU-recognised degrees, a two-year post-study work visa for master's graduates, and Europe's most active tech and pharma job market for international graduates — all in English-language teaching.",
  },
  {
    q: "How much does studying in Ireland cost from India?",
    a: "Master's tuition in Ireland typically ranges ₹18–28L per year, with living costs of ₹8–11L per year and health insurance ₹40–60K per year. We build a complete cost sheet and an education-loan plan during your first session.",
  },
  {
    q: "How do I choose the right university?",
    a: "Match the programme curriculum to your target career, then weigh ranking, location, fees, scholarships, and post-study work rights. Our shortlists balance one ambitious, two target, and one safe university.",
  },
] as const;
