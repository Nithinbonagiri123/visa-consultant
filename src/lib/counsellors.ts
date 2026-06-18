// Placeholder counsellor profiles for Campus Meridian.
// All data is illustrative — replace with real counsellor profiles, photos, and
// case-study details once the team is finalised.

export type Counsellor = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;        // 1-2 sentences for cards
  bio: string;             // 3-4 paragraphs for profile page
  yearsExperience: number;
  studentsPlaced: number;
  countries: string[];     // slugs of destinations they specialise in
  fields: string[];        // fields of expertise
  philosophy: string;      // pull quote
  successStories: {
    studentName: string;
    course: string;
    university: string;
    country: string;
    note: string;
  }[];
};

export const counsellors: Counsellor[] = [
  {
    slug: "arun-kumar",
    name: "Arun Kumar",
    role: "Founder & Principal Counsellor",
    shortBio:
      "Twelve years guiding Indian students into global universities — and the reason Campus Meridian exists.",
    bio: `Aarti founded Campus Meridian after a decade leading admissions counselling at one of India's largest education consultancies. She has personally walked over 600 students from first conversation to first day on campus across Ireland, the UK, Canada, the US, and Australia.

Her counselling style is direct, profile-honest, and unapologetic about telling students when a university or country isn't the right fit — even when it's not what they want to hear.

Aarti holds a Master's in Education from the University of Manchester and a Bachelor's in Economics from St. Stephen's College, Delhi. She speaks at IELTS prep centres and parent webinars across Hyderabad, Bengaluru, and Mumbai.

When she's not on a counselling call, she's running half-marathons and reading anything by Atul Gawande.`,
    yearsExperience: 12,
    studentsPlaced: 600,
    countries: ["uk", "ireland", "canada", "usa", "australia"],
    fields: ["Business Management", "Computer Science", "Data Science", "Engineering"],
    philosophy:
      "A great shortlist beats fifteen scattered applications. Pick four well-matched universities, and put your whole heart into each one.",
    successStories: [
      {
        studentName: "Aarav M.",
        course: "MS Computer Science",
        university: "University of Toronto",
        country: "Canada",
        note: "From a 7.4 CGPA profile to a fully-funded admit — built around a tight machine-learning research narrative.",
      },
      {
        studentName: "Sneha I.",
        course: "MSc Data Analytics",
        university: "Trinity College Dublin",
        country: "Ireland",
        note: "First Indian student from her engineering college to secure a Trinity admit + 30% tuition scholarship.",
      },
    ],
  },
  {
    slug: "ravi-narayanan",
    name: "Ravi Narayanan",
    role: "Senior Counsellor — Ireland, UK & Europe",
    shortBio:
      "Specialist in EU degrees, Russell Group access, and the one-year UK master's funnel.",
    bio: `Ravi has placed over 280 Indian students into UK and Irish universities over the last eight years — with a particular strength in finance, AI, and pharma master's programmes.

He worked as an international recruitment manager at a UK Russell Group university before moving into independent counselling, which gives him a rare consulate-side view of what makes an SOP land or fail.

Ravi's students consistently win 20-50% tuition scholarships through profile-matched university pairings and strong SOP narratives. His specialism is the messy middle: students with strong academics but unconventional career goals, or strong career goals but average academics.

He holds an MBA from the University of Warwick and a Bachelor's in Mechanical Engineering from IIT Madras.`,
    yearsExperience: 8,
    studentsPlaced: 280,
    countries: ["uk", "ireland", "germany", "france"],
    fields: ["Finance", "Business Management", "Artificial Intelligence", "Healthcare"],
    philosophy:
      "An SOP is a one-page argument for why this exact programme at this exact university will accelerate the career you already want.",
    successStories: [
      {
        studentName: "Rohan V.",
        course: "MBA",
        university: "University of Manchester",
        country: "United Kingdom",
        note: "Career-changer (engineer → product manager) — built the story around two side projects, won 30% scholarship.",
      },
      {
        studentName: "Priya N.",
        course: "MSc Cyber Security",
        university: "University College Dublin",
        country: "Ireland",
        note: "Government of Ireland scholarship recipient. Application turned around in 6 weeks.",
      },
    ],
  },
  {
    slug: "meera-pillai",
    name: "Meera Pillai",
    role: "Senior Counsellor — Canada, USA & PR Pathways",
    shortBio:
      "The team's go-to for Canada SDS, US STEM OPT, and any conversation that ends with 'I want to settle there'.",
    bio: `Meera has been counselling Indian students for nine years with a focus on long-term outcomes — not just admit letters, but graduate jobs, work permits, and permanent residency planning.

Her depth is in Canada's PR pipeline (Express Entry, PNPs) and the US STEM OPT-to-H-1B-to-green-card journey. She has placed 320+ students into Canadian and US universities, with a 96% visa success rate.

Meera holds a Master's in Education Counselling from McGill University and worked in Toronto's tech sector before returning to India. She's particularly strong for students who want to combine tech master's with PR planning.

Outside work, she runs a free monthly clinic for parents on financial planning for international education.`,
    yearsExperience: 9,
    studentsPlaced: 320,
    countries: ["canada", "usa"],
    fields: ["Computer Science", "Data Science", "Engineering", "Healthcare"],
    philosophy:
      "Pick the country where the next ten years of your life look right, not the one with the prettiest brochure.",
    successStories: [
      {
        studentName: "Karthik R.",
        course: "MEng Data Science",
        university: "University of Waterloo",
        country: "Canada",
        note: "Two co-op offers from Shopify and RBC before graduation. PR application filed within 9 months of master's completion.",
      },
      {
        studentName: "Anjali T.",
        course: "MS Electrical Engineering",
        university: "Georgia Tech",
        country: "United States",
        note: "Full TA-ship covering tuition + stipend. Three-year STEM OPT pathway mapped before she landed.",
      },
    ],
  },
  {
    slug: "nikhil-kapoor",
    name: "Nikhil Kapoor",
    role: "Senior Counsellor — Australia, New Zealand & UAE",
    shortBio:
      "Group of Eight admissions, skilled-migration planning, and the UAE corporate ladder.",
    bio: `Nikhil has worked Indian → Australia / NZ / UAE student flows for seven years, with deep specialism in skilled-migration occupations and post-study PR pathways.

He has placed 210+ students, including 90+ into Group of Eight Australian universities and 40+ into New Zealand's top eight. His Dubai pipeline has grown rapidly over the last three years as more Indian students pick branch-campus degrees for tax-free careers.

Nikhil's strength is helping students navigate the genuine-student visa interview, particularly for Australia where consulate scrutiny tightened in 2024-25.

He holds a Master's in International Education from the University of Melbourne and a Bachelor's in Commerce from Christ University, Bangalore.`,
    yearsExperience: 7,
    studentsPlaced: 210,
    countries: ["australia", "new-zealand", "uae"],
    fields: ["Healthcare", "Engineering", "Hospitality", "Business Management"],
    philosophy:
      "The genuine-student narrative is everything. Tell a clear story about why this country, why this degree, why now — and the visa follows.",
    successStories: [
      {
        studentName: "Tanvi S.",
        course: "Master of Nursing",
        university: "University of Sydney",
        country: "Australia",
        note: "Skilled-migration occupation; clear PR pathway. Visa cleared on first attempt with detailed SOP.",
      },
      {
        studentName: "Aman J.",
        course: "MBA",
        university: "University of Birmingham Dubai",
        country: "Dubai · UAE",
        note: "Tax-free first salary of AED 18K/month — recouped tuition within 18 months of graduation.",
      },
    ],
  },
];

export function getCounsellorBySlug(slug: string): Counsellor | undefined {
  return counsellors.find((c) => c.slug === slug);
}
