export type DestinationDetail = {
  heroTitle: string;
  heroLede: string;
  whyPoints: { title: string; description: string }[];
  popularCourses: string[];
  costBreakdown: { label: string; range: string }[];
  postStudyWork: string;
  visaSnapshot: { label: string; value: string }[];
  scholarships: { name: string; description: string }[];
  careers: { sector: string; note: string }[];
  faq: { q: string; a: string }[];
};

export const destinationDetail: Record<string, DestinationDetail> = {
  ireland: {
    heroTitle: "Study in Ireland",
    heroLede:
      "An EU degree, two years of post-study work, and Europe's busiest tech corridor — Dublin to Cork — at your doorstep.",
    whyPoints: [
      { title: "EU recognised degrees", description: "Master's and bachelor's degrees recognised across 27 EU member states for further study and work." },
      { title: "2-year stay-back", description: "Graduates of master's programmes receive a Third Level Graduate Scheme to live and work for up to two years." },
      { title: "Global tech & pharma HQs", description: "Google, Meta, Pfizer, and J&J anchor a job market hungry for STEM and business graduates." },
      { title: "English-language teaching", description: "All programmes are taught in English with strong academic-support services for international students." },
    ],
    popularCourses: [
      "MSc Computer Science", "MSc Data Analytics", "MSc Cyber Security",
      "MSc Pharmaceutical Sciences", "MSc Business Analytics", "MSc International Business",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹18–28L / year" },
      { label: "Living costs", range: "₹8–11L / year" },
      { label: "Health insurance",  range: "₹40–60K / year" },
    ],
    postStudyWork:
      "Third Level Graduate Scheme: up to 24 months after a level-9 (master's) degree, 12 months after level-8.",
    visaSnapshot: [
      { label: "Visa type", value: "Type D Student Visa" },
      { label: "Processing", value: "4–8 weeks" },
      { label: "Financial proof", value: "€10,000 / year living + tuition" },
      { label: "Work allowance", value: "20 hrs/week term, 40 hrs/week breaks" },
    ],
    scholarships: [
      { name: "Government of Ireland International Scholarships", description: "Merit-based €10,000 stipend with a full fee waiver for one academic year." },
      { name: "University merit awards", description: "Most universities offer 10–50% tuition waivers based on academic strength." },
    ],
    careers: [
      { sector: "Software & cloud", note: "Hubs across Dublin, Galway, and Cork hiring across engineering and analytics." },
      { sector: "Pharma & medtech", note: "Nine of the top ten global pharma companies operate manufacturing in Ireland." },
      { sector: "Finance & fintech", note: "International Financial Services Centre houses banks, fintechs, and asset managers." },
    ],
    faq: [
      { q: "Is Ireland good for Indian students?", a: "Yes. Ireland combines EU-recognised degrees, a strong post-study work visa, and one of Europe's most active tech job markets for graduates." },
      { q: "What is the IELTS requirement for Ireland?", a: "Most master's programmes require IELTS 6.5 overall with no band below 6.0. PTE 63+ is also widely accepted." },
    ],
  },

  uk: {
    heroTitle: "Study in the United Kingdom",
    heroLede:
      "One-year master's, world-leading universities and the Graduate Route — two years of unrestricted work after you graduate.",
    whyPoints: [
      { title: "1-year master's", description: "Most UK postgraduate programmes are 12 months, accelerating ROI on your investment." },
      { title: "Graduate Route", description: "Two years of unrestricted post-study work (three for PhD graduates) for any role, any employer." },
      { title: "Russell Group access", description: "24 research-intensive universities including Oxford, Cambridge, Imperial, and Edinburgh." },
      { title: "Industry-linked teaching", description: "Strong placement, internship, and dissertation partnerships with global employers." },
    ],
    popularCourses: [
      "MSc Computer Science", "MSc Artificial Intelligence", "MSc Finance",
      "MSc Marketing", "MSc Data Science", "MBA",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹22–40L / year" },
      { label: "Living costs (outside London)", range: "₹10–14L / year" },
      { label: "Living costs (London)", range: "₹14–18L / year" },
    ],
    postStudyWork:
      "Graduate Route: 2 years after a bachelor's or master's degree, 3 years after a PhD. No employer sponsorship needed.",
    visaSnapshot: [
      { label: "Visa type", value: "Student Route (formerly Tier 4)" },
      { label: "Processing", value: "3 weeks (priority available)" },
      { label: "Financial proof", value: "£1,334/month London · £1,023/month elsewhere" },
      { label: "Work allowance", value: "20 hrs/week term, full-time breaks" },
    ],
    scholarships: [
      { name: "Chevening Scholarships", description: "Fully-funded one-year master's awards from the UK government." },
      { name: "Commonwealth Scholarships", description: "Tuition, stipend, and travel for master's and PhD study." },
      { name: "University-specific awards", description: "Most universities offer £2,000–£10,000 merit scholarships for Indian students." },
    ],
    careers: [
      { sector: "Finance & consulting", note: "London is Europe's #1 financial centre, hiring across investment banking, fintech, and Big Four." },
      { sector: "Technology", note: "Strong cluster across London, Cambridge, Manchester, and Edinburgh for SaaS, AI, and data." },
      { sector: "Creative & media", note: "Global hub for advertising, design, film, and game development." },
    ],
    faq: [
      { q: "Can I work in the UK after my master's?", a: "Yes — the Graduate Route allows two years of unrestricted work after a UK master's, with no employer sponsorship required." },
      { q: "Is GMAT/GRE required for UK master's?", a: "Most master's programmes do not require GMAT/GRE. Some top business schools (LBS, Oxford Saïd) require GMAT/GRE for MBAs." },
    ],
  },

  canada: {
    heroTitle: "Study in Canada",
    heroLede:
      "World-class education at half the US price, a three-year PGWP, and one of the world's clearest pathways to permanent residency.",
    whyPoints: [
      { title: "3-year PGWP", description: "Post-Graduation Work Permit valid for up to 3 years for graduates of 2-year programmes." },
      { title: "PR pathway", description: "Canadian work experience counts directly toward Express Entry Permanent Residency." },
      { title: "Co-op programmes", description: "Many universities embed paid co-op work terms into the degree." },
      { title: "Multicultural society", description: "Active and welcoming Indian diaspora across Toronto, Vancouver, and Calgary." },
    ],
    popularCourses: [
      "MS Computer Science", "MEng Data Science", "MBA",
      "MS Healthcare Administration", "MEng Civil Engineering", "PG Diploma in Business Analytics",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹16–32L / year" },
      { label: "Living costs", range: "₹8–13L / year" },
      { label: "Health insurance", range: "₹60–80K / year" },
    ],
    postStudyWork:
      "Post-Graduation Work Permit (PGWP): 1–3 years depending on programme length. Open work permit — any job, any province.",
    visaSnapshot: [
      { label: "Visa type", value: "Study Permit" },
      { label: "Processing", value: "8–12 weeks (SDS expedited)" },
      { label: "Financial proof", value: "CAD 20,635 / year living + tuition" },
      { label: "Work allowance", value: "24 hrs/week term, full-time breaks" },
    ],
    scholarships: [
      { name: "Vanier Canada Graduate Scholarships", description: "CAD 50,000/year for three years to top doctoral students." },
      { name: "Ontario Trillium Scholarship", description: "CAD 40,000/year for four years to international PhD students." },
      { name: "University entrance awards", description: "CAD 5,000–25,000 merit awards across most Canadian universities." },
    ],
    careers: [
      { sector: "Technology", note: "Toronto–Waterloo tech corridor, plus Vancouver and Montreal hubs hiring at scale." },
      { sector: "Banking & finance", note: "RBC, TD, Scotiabank and BMO actively hire international graduates." },
      { sector: "Healthcare", note: "Provincial nursing and allied-health pipelines with strong PR pathways." },
    ],
    faq: [
      { q: "How long is the Canadian post-study work permit?", a: "Up to 3 years for graduates of 2-year programmes, matching the programme length for shorter degrees." },
      { q: "Does Canadian study lead to PR?", a: "Yes — Canadian education and work experience are weighted heavily under Express Entry, the country's PR system." },
    ],
  },

  australia: {
    heroTitle: "Study in Australia",
    heroLede:
      "Group of Eight research excellence, world-class quality of life, and up to four years of post-study work for STEM graduates.",
    whyPoints: [
      { title: "Up to 4-year stay-back", description: "Post-Study Work Stream of 2–4 years depending on your qualification and city." },
      { title: "Group of Eight", description: "Eight elite research universities, all ranked in the global top 150." },
      { title: "High quality of life", description: "Australian cities consistently rank in the world's top 10 for liveability." },
      { title: "Strong diaspora", description: "Active Indian student community of 100,000+ across major universities." },
    ],
    popularCourses: [
      "Master of IT", "Master of Data Science", "Master of Engineering",
      "MBA", "Master of Public Health", "Master of Professional Accounting",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹22–38L / year" },
      { label: "Living costs", range: "₹12–16L / year" },
      { label: "Health insurance (OSHC)", range: "₹35–55K / year" },
    ],
    postStudyWork:
      "Temporary Graduate Visa (Subclass 485): 2 years for bachelor's, 3 for master's, 4 for PhD. Additional years for regional study.",
    visaSnapshot: [
      { label: "Visa type", value: "Subclass 500 Student Visa" },
      { label: "Processing", value: "4–6 weeks" },
      { label: "Financial proof", value: "AUD 29,710 / year living + tuition" },
      { label: "Work allowance", value: "48 hrs/fortnight term, unlimited breaks" },
    ],
    scholarships: [
      { name: "Australia Awards", description: "Fully-funded scholarships from the Australian government for postgraduate study." },
      { name: "Destination Australia", description: "AUD 15,000/year for studying at a regional Australian university." },
      { name: "University merit awards", description: "Most Go8 universities offer 10–50% tuition scholarships for Indian students." },
    ],
    careers: [
      { sector: "IT & engineering", note: "Listed on the skilled occupation list — strong PR pathways for graduates." },
      { sector: "Healthcare & nursing", note: "Acute shortage means fast hiring and skilled-migration support." },
      { sector: "Mining & energy", note: "Engineering and project graduates earn top global salaries in Perth and Brisbane." },
    ],
    faq: [
      { q: "Is Australia good for Indian students?", a: "Yes — Group of Eight universities, up to 4 years post-study work, and one of the world's clearest skilled-migration pathways." },
      { q: "What is OSHC?", a: "Overseas Student Health Cover is mandatory health insurance for the duration of your student visa." },
    ],
  },

  usa: {
    heroTitle: "Study in the USA",
    heroLede:
      "Ivy League prestige, cutting-edge research, and three years of STEM OPT after graduation — the world's most ambitious destination.",
    whyPoints: [
      { title: "3-year STEM OPT", description: "1 year of standard OPT + 24-month STEM extension lets you work for any US employer." },
      { title: "Ivy League & R1 access", description: "8 Ivies, 146 R1 research universities, and the world's deepest funding ecosystem." },
      { title: "Research dollars", description: "US universities invest US$90B+ annually in research — unmatched lab and grant access." },
      { title: "Career launchpad", description: "60% of Fortune 500 companies hire international STEM graduates directly from US campuses." },
    ],
    popularCourses: [
      "MS Computer Science", "MS Data Science", "MS Artificial Intelligence",
      "MS Electrical Engineering", "MBA", "MS Finance",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹30–60L / year" },
      { label: "Living costs", range: "₹12–18L / year" },
      { label: "Health insurance", range: "₹1.5–2.5L / year" },
    ],
    postStudyWork:
      "Optional Practical Training (OPT): 12 months for any degree, plus a 24-month STEM extension for eligible majors.",
    visaSnapshot: [
      { label: "Visa type", value: "F-1 Student Visa" },
      { label: "Processing", value: "2–6 weeks after consular interview" },
      { label: "Financial proof", value: "Full year of tuition + living shown via I-20" },
      { label: "Work allowance", value: "20 hrs/week on-campus, CPT/OPT off-campus" },
    ],
    scholarships: [
      { name: "Fulbright-Nehru Scholarships", description: "Fully-funded master's and PhD scholarships for Indian students." },
      { name: "University assistantships", description: "TA/RA roles at PhD/master's level often cover full tuition + stipend." },
      { name: "Need- and merit-based aid", description: "Most universities offer scholarships ranging from US$5,000–full-tuition waivers." },
    ],
    careers: [
      { sector: "Big Tech", note: "Google, Microsoft, Meta, Amazon, Apple all hire H1B-track international graduates." },
      { sector: "Investment banking & consulting", note: "MBB, Goldman, JP Morgan, and Morgan Stanley with formal international hiring tracks." },
      { sector: "Research & startups", note: "Silicon Valley and Boston biotech offer the deepest startup-equity opportunities globally." },
    ],
    faq: [
      { q: "What is STEM OPT?", a: "A 24-month extension to standard OPT, available to graduates of STEM-designated degrees, allowing up to 36 months of post-study work in the US." },
      { q: "Do I need GRE or GMAT for the US?", a: "Most STEM master's programmes require GRE (or accept waivers since COVID). MBA programmes typically require GMAT or GRE." },
    ],
  },

  germany: {
    heroTitle: "Study in Germany",
    heroLede:
      "Low-to-no tuition at public universities, Europe's strongest engineering job market, and an 18-month visa to find work after you graduate.",
    whyPoints: [
      { title: "Low tuition", description: "Most public universities charge €0 tuition for international students — only a semester contribution of €150–350." },
      { title: "Strong engineering", description: "Birthplace of the modern engineering degree — Mercedes, BMW, Bosch, Siemens recruit on campus." },
      { title: "18-month job seeker visa", description: "Post-graduation visa to live in Germany while you search for skilled employment." },
      { title: "English-taught programmes", description: "2,000+ international master's programmes taught entirely in English." },
    ],
    popularCourses: [
      "MS Mechanical Engineering", "MS Automotive Engineering", "MS Data Science",
      "MS Computer Science", "MS Renewable Energy", "MIM (Management)",
    ],
    costBreakdown: [
      { label: "Tuition (public)", range: "₹0–4L / year" },
      { label: "Tuition (private)", range: "₹14–22L / year" },
      { label: "Living costs", range: "₹8–11L / year" },
    ],
    postStudyWork:
      "18-month Job Seeker Visa after graduation. Once employed, transition to an EU Blue Card with a fast PR pathway.",
    visaSnapshot: [
      { label: "Visa type", value: "National (Type D) Student Visa" },
      { label: "Processing", value: "6–12 weeks" },
      { label: "Financial proof", value: "€11,904 / year via blocked account" },
      { label: "Work allowance", value: "120 full days or 240 half days / year" },
    ],
    scholarships: [
      { name: "DAAD Scholarships", description: "Comprehensive merit-based funding for master's and doctoral studies in Germany." },
      { name: "Deutschlandstipendium", description: "€300/month merit-based stipend across participating universities." },
      { name: "Erasmus+ joint master's", description: "EU-funded multi-country master's programmes with full scholarships." },
    ],
    careers: [
      { sector: "Automotive & engineering", note: "Stuttgart, Munich, Wolfsburg and Ingolstadt hire engineering graduates at scale." },
      { sector: "Pharma & chemicals", note: "BASF, Bayer, Boehringer Ingelheim — strong campus-to-corporate pipelines." },
      { sector: "Tech & startups", note: "Berlin is Europe's #2 startup hub; SAP, Siemens, and Allianz lead enterprise hiring." },
    ],
    faq: [
      { q: "Is Germany free for Indian students?", a: "Public universities in most German states charge zero tuition. You'll pay a semester contribution of €150–350 covering admin and transport." },
      { q: "Do I need to learn German?", a: "Not for English-taught programmes, but A2/B1 German dramatically improves part-time work and full-time hiring." },
    ],
  },

  france: {
    heroTitle: "Study in France",
    heroLede:
      "Grandes Écoles, world-leading business schools, and English-taught master's across Paris, Lyon, and the Riviera.",
    whyPoints: [
      { title: "Top business schools", description: "HEC Paris, INSEAD, ESSEC, and ESCP regularly rank in the global top 10 for management education." },
      { title: "English programmes", description: "1,700+ master's programmes taught entirely in English across all major disciplines." },
      { title: "2-year stay-back", description: "Post-study work visa allows two years to find skilled employment after graduation." },
      { title: "Affordable public tuition", description: "Public universities charge €2,770–3,770/year for non-EU master's students." },
    ],
    popularCourses: [
      "MIM (Management)", "MBA", "MSc Finance",
      "MSc Luxury Brand Management", "MS Data Science", "Master in International Business",
    ],
    costBreakdown: [
      { label: "Tuition (public)", range: "₹2.5–4L / year" },
      { label: "Tuition (Grandes Écoles)", range: "₹14–30L / year" },
      { label: "Living costs", range: "₹10–14L / year" },
    ],
    postStudyWork:
      "APS (Autorisation Provisoire de Séjour): 12 months after a master's, extendable to 24, to search for or start work.",
    visaSnapshot: [
      { label: "Visa type", value: "Long-stay VLS-TS Student Visa" },
      { label: "Processing", value: "4–8 weeks" },
      { label: "Financial proof", value: "€615 / month minimum" },
      { label: "Work allowance", value: "964 hrs / year (~20 hrs/week)" },
    ],
    scholarships: [
      { name: "Eiffel Excellence Scholarship", description: "€1,181/month stipend for master's, plus tuition, travel and insurance." },
      { name: "Charpak Scholarship", description: "Government-of-France merit scholarship dedicated to Indian master's students." },
      { name: "School-specific awards", description: "Grandes Écoles offer 10–50% tuition scholarships based on academic merit." },
    ],
    careers: [
      { sector: "Luxury & fashion", note: "LVMH, Kering, Hermès — France leads the global luxury industry." },
      { sector: "Finance & consulting", note: "Paris hosts La Défense, Europe's largest business district by office space." },
      { sector: "Aerospace & energy", note: "Airbus, Thales, TotalEnergies hire engineering and management graduates." },
    ],
    faq: [
      { q: "Are English-taught programmes available in France?", a: "Yes — 1,700+ master's programmes are taught entirely in English, particularly at business schools and Grandes Écoles." },
      { q: "How long is the French post-study work visa?", a: "Twelve months after a master's, extendable to 24 months under the APS scheme." },
    ],
  },

  "new-zealand": {
    heroTitle: "Study in New Zealand",
    heroLede:
      "All eight universities ranked in the global top 3% — safe cities, generous post-study work rights, and a world-class quality of life.",
    whyPoints: [
      { title: "3-year stay-back", description: "Post-Study Work Visa of up to 3 years after a master's or PhD." },
      { title: "Safe & welcoming", description: "One of the world's safest countries — consistently top 5 in the Global Peace Index." },
      { title: "All 8 universities top-ranked", description: "Every NZ university ranks in the global top 3% of QS World University Rankings." },
      { title: "Skills shortage list pathway", description: "Several programmes lead directly to skilled-migration and PR opportunities." },
    ],
    popularCourses: [
      "Master of IT", "Master of Engineering", "MBA",
      "Master of Tourism Management", "Master of Public Health", "PG Diploma in Business",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹16–26L / year" },
      { label: "Living costs", range: "₹10–14L / year" },
      { label: "Health insurance", range: "₹35–50K / year" },
    ],
    postStudyWork:
      "Post-Study Work Visa: up to 3 years after a master's, depending on level and field of study.",
    visaSnapshot: [
      { label: "Visa type", value: "Fee-Paying Student Visa" },
      { label: "Processing", value: "4–6 weeks" },
      { label: "Financial proof", value: "NZD 20,000 / year living + tuition" },
      { label: "Work allowance", value: "20 hrs/week term, full-time breaks" },
    ],
    scholarships: [
      { name: "New Zealand Excellence Awards", description: "NZD 5,000–10,000 awards for Indian undergraduate and postgraduate students." },
      { name: "Manaaki Scholarships", description: "Government scholarships covering full tuition, stipend, and travel." },
      { name: "University-specific awards", description: "Each of the eight universities offers merit-based scholarships of 25–50% tuition." },
    ],
    careers: [
      { sector: "Information technology", note: "Auckland and Wellington tech sectors growing 10%+ YoY with strong skilled-migration support." },
      { sector: "Engineering & construction", note: "Long-term infrastructure pipeline and a national skills shortage." },
      { sector: "Tourism & hospitality", note: "Hospitality management is on the green list, offering fast residence pathways." },
    ],
    faq: [
      { q: "Is New Zealand cheaper than Australia for Indian students?", a: "Tuition and living costs in New Zealand are typically 10–20% lower than equivalent programmes in Australia." },
      { q: "Can my partner come with me?", a: "Yes — partners of master's students are eligible for open work visas for the duration of your study." },
    ],
  },

  uae: {
    heroTitle: "Study in Dubai & the UAE",
    heroLede:
      "Branch campuses of global universities on your doorstep, tax-free careers, and unmatched proximity to home.",
    whyPoints: [
      { title: "Tax-free salaries", description: "Zero personal income tax — graduates keep 100% of their earnings." },
      { title: "Global campuses", description: "Branch campuses of UK, US and Australian universities operate fully in Dubai." },
      { title: "Close to home", description: "3-hour flight from major Indian cities, with daily direct connectivity." },
      { title: "Booming job market", description: "Dubai and Abu Dhabi growing across tech, AI, real estate, finance, and aviation." },
    ],
    popularCourses: [
      "MBA", "MSc Construction Management", "MSc Information Technology",
      "MSc Aviation Management", "MSc Finance", "MSc Hospitality Management",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹12–22L / year" },
      { label: "Living costs", range: "₹10–14L / year" },
      { label: "Health insurance", range: "₹40–60K / year" },
    ],
    postStudyWork:
      "Job Exploration Visa: 6 months to 1 year after graduation. UAE Golden Visa available for top graduates.",
    visaSnapshot: [
      { label: "Visa type", value: "Student Residence Visa" },
      { label: "Processing", value: "2–4 weeks" },
      { label: "Financial proof", value: "Tuition + AED 3,000/month living" },
      { label: "Work allowance", value: "Part-time work permitted with employer NOC" },
    ],
    scholarships: [
      { name: "University merit scholarships", description: "10–50% tuition waivers across most UAE universities for high-performing students." },
      { name: "Mohammed bin Rashid Awards", description: "Government-supported awards covering tuition and living for select programmes." },
    ],
    careers: [
      { sector: "Finance & consulting", note: "DIFC is the Middle East's largest financial centre — hiring across banking, fintech, and Big Four." },
      { sector: "Technology & AI", note: "UAE government is investing heavily in AI and Web3, with active visa pathways for tech talent." },
      { sector: "Hospitality & aviation", note: "Emirates, Etihad, and global hotel chains run dedicated international graduate programmes." },
    ],
    faq: [
      { q: "Are degrees from Dubai recognised globally?", a: "Yes — branch campuses award the same degree as the home institution (UK/US/AU), making them globally recognised." },
      { q: "Can I move to Europe or North America after studying in the UAE?", a: "Yes — UK, Australian and US branch-campus degrees are accepted for further study and skilled-migration applications in those countries." },
    ],
  },

  netherlands: {
    heroTitle: "Study in the Netherlands",
    heroLede:
      "Innovation-driven universities, EU-recognised English-taught degrees, and the Orientation Year — 12 months to find work after graduation.",
    whyPoints: [
      { title: "100% English programmes", description: "More than 2,100 master's programmes taught entirely in English at world-ranked Dutch universities." },
      { title: "12-month Orientation Year", description: "Zoekjaar (Orientation Year) gives every non-EU graduate 12 months to find skilled employment." },
      { title: "Strong tech & business", description: "ASML, Philips, ING, Booking.com and Shell anchor a job market that actively recruits international graduates." },
      { title: "Liveable cities", description: "Amsterdam, Utrecht, Eindhoven and Rotterdam consistently rank in Europe's top liveability scores." },
    ],
    popularCourses: [
      "MSc Computer Science", "MSc Artificial Intelligence", "MSc Data Science",
      "MSc Finance", "MSc International Business", "MSc Engineering & Policy Analysis",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹14–22L / year" },
      { label: "Living costs", range: "₹10–14L / year" },
      { label: "Health insurance", range: "₹50–80K / year" },
    ],
    postStudyWork:
      "Orientation Year (Zoekjaar): 12 months after graduation for non-EU graduates to look for work — once employed, the Highly Skilled Migrant route opens.",
    visaSnapshot: [
      { label: "Visa type", value: "MVV + residence permit" },
      { label: "Processing", value: "2–4 weeks" },
      { label: "Financial proof", value: "€16,000 / year living + tuition" },
      { label: "Work allowance", value: "16 hrs/week term, full-time breaks" },
    ],
    scholarships: [
      { name: "Holland Scholarship", description: "€5,000 one-time scholarship for non-EU students at participating universities." },
      { name: "Orange Knowledge Programme", description: "Government-funded master's scholarships for international students." },
      { name: "University excellence awards", description: "Most Dutch universities offer 25–100% tuition reductions for high-merit applicants." },
    ],
    careers: [
      { sector: "Tech & AI", note: "Amsterdam and Eindhoven are home to AI-first companies, semiconductor giants (ASML), and a thriving startup scene." },
      { sector: "Finance & consulting", note: "ING, Rabobank, ABN AMRO, McKinsey and Deloitte recruit international graduates each year." },
      { sector: "Engineering & manufacturing", note: "Philips, Shell, Stellantis lead a Netherlands-anchored hardware corridor." },
    ],
    faq: [
      { q: "Is the Netherlands cheap to study in?", a: "Tuition for non-EU students is typically €12,000–18,000/year — meaningfully cheaper than the UK or US, and English-taught programmes are abundant." },
      { q: "Do I need to speak Dutch?", a: "Not for English-taught programmes or for most international jobs. Learning basic Dutch helps with part-time work and integration." },
    ],
  },

  finland: {
    heroTitle: "Study in Finland",
    heroLede:
      "World's most innovative education system, low tuition for non-EU students, and a two-year residence permit to find work after graduation.",
    whyPoints: [
      { title: "Low tuition", description: "Non-EU master's tuition ranges €8,000–18,000/year — substantially less than other Nordic / English-speaking destinations." },
      { title: "2-year residence permit", description: "After graduation, non-EU students get a 2-year permit to find skilled employment in Finland." },
      { title: "World-class research", description: "Aalto, Helsinki, and Tampere rank in the global top 200 with deep partnerships across Nordic industry." },
      { title: "Nordic tech sector", description: "Nokia, Supercell, Wolt, KONE — Finland's tech and design sectors actively hire international talent." },
    ],
    popularCourses: [
      "MSc Computer Science", "MSc Data Science", "MSc Artificial Intelligence",
      "MSc Information Networks", "MSc Industrial Engineering", "MSc Environmental Engineering",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹8–18L / year" },
      { label: "Living costs", range: "₹8–11L / year" },
      { label: "Health insurance", range: "₹40–60K / year" },
    ],
    postStudyWork:
      "Two-year residence permit (extended from 1 year in 2022) for non-EU graduates to find skilled employment. Transition to a regular work permit once hired.",
    visaSnapshot: [
      { label: "Visa type", value: "Residence Permit for Studies" },
      { label: "Processing", value: "1–3 months" },
      { label: "Financial proof", value: "€800 / month minimum" },
      { label: "Work allowance", value: "30 hrs/week average across the year" },
    ],
    scholarships: [
      { name: "Finland Scholarship", description: "100% tuition waiver + €5,000 first-year stipend at most Finnish universities for top-performing non-EU applicants." },
      { name: "Aalto, Helsinki & Tampere merit awards", description: "Tuition reductions of 50–100% based on academic merit." },
    ],
    careers: [
      { sector: "Software & gaming", note: "Helsinki has Europe's densest concentration of gaming companies — Supercell, Rovio, Remedy." },
      { sector: "Industrial tech", note: "Nokia, KONE, Wärtsilä actively hire MSc graduates in industrial and IT engineering." },
      { sector: "Clean tech & energy", note: "Finland leads Europe on clean energy and climate tech — Neste, Fortum, and a strong startup pipeline." },
    ],
    faq: [
      { q: "Is Finland cold all year?", a: "Winters are cold (Nov–Mar) but summers are mild and bright. Cities are well-equipped — public transport runs year-round and student housing is heated to Nordic standards." },
      { q: "Are there scholarships I can realistically win?", a: "Yes — the Finland Scholarship covers 100% tuition + €5,000 for first-year applicants from non-EU countries. Each university handles its own selection." },
    ],
  },

  sweden: {
    heroTitle: "Study in Sweden",
    heroLede:
      "Innovation capital of Europe, English-taught master's at globally ranked universities, and a 12-month job seeker visa after graduation.",
    whyPoints: [
      { title: "Innovation-led economy", description: "Spotify, Klarna, IKEA, Ericsson and Volvo anchor one of the world's most productive innovation ecosystems." },
      { title: "12-month job seeker visa", description: "Non-EU graduates get a year to find skilled employment after graduating from a Swedish master's." },
      { title: "English programmes", description: "Over 1,000 master's programmes taught entirely in English at universities ranked in the global top 500." },
      { title: "Strong gender + work-life", description: "Sweden ranks at the top of every liveability index — flat hierarchies, work-life balance, generous social benefits." },
    ],
    popularCourses: [
      "MSc Computer Science", "MSc Data Science", "MSc Sustainable Energy",
      "MSc Industrial Engineering", "MSc Innovation Management", "MSc Finance",
    ],
    costBreakdown: [
      { label: "Tuition (master's)", range: "₹10–20L / year" },
      { label: "Living costs", range: "₹10–14L / year" },
      { label: "Health insurance", range: "₹50–70K / year" },
    ],
    postStudyWork:
      "Residence permit for job seeking: 12 months after graduation for non-EU graduates. Transition to a work permit once you have a job offer meeting the salary threshold.",
    visaSnapshot: [
      { label: "Visa type", value: "Residence Permit for Studies" },
      { label: "Processing", value: "1–3 months" },
      { label: "Financial proof", value: "SEK 9,750 / month" },
      { label: "Work allowance", value: "No formal cap — manage with study load" },
    ],
    scholarships: [
      { name: "Swedish Institute Scholarships", description: "Government-funded full tuition + living for master's — highly competitive." },
      { name: "University-specific scholarships", description: "Most Swedish universities offer 25–100% tuition reductions for non-EU students." },
    ],
    careers: [
      { sector: "Tech & startups", note: "Stockholm has produced more unicorns per capita than almost any city — Spotify, Klarna, King, Mojang." },
      { sector: "Industrial engineering", note: "Volvo, Scania, Ericsson, ABB recruit MSc graduates in engineering and industrial systems." },
      { sector: "Clean tech & sustainability", note: "Swedish industry is leading the global transition to green energy and circular manufacturing." },
    ],
    faq: [
      { q: "Is Sweden too expensive for Indian students?", a: "Tuition is moderate (€10,000–20,000/year) and the Swedish Institute Scholarship can fully fund top-tier candidates. Living costs are similar to Ireland." },
      { q: "Can I work in Sweden after my master's?", a: "Yes — the 12-month job seeker permit and clear conversion to a work permit make Sweden one of the easier Nordic destinations to stay long-term." },
    ],
  },
};
