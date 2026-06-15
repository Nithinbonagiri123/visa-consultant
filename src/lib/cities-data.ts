// City-level guides for Tier-2 SEO. Each city is tied to a parent destination
// (so we can link breadcrumbs + currency back into the country page).

export type City = {
  slug: string;
  name: string;
  countrySlug: string;
  flag: string;
  heroLede: string;
  whyHere: string[];
  topUniversities: string[];
  livingCostINR: { label: string; range: string }[];
  transport: string;
  culture: string;
  jobMarket: string;
  vibe: string;          // 3-4 short tags
  popularProgrammes: string[];
};

export const cities: City[] = [
  {
    slug: "dublin",
    name: "Dublin",
    countrySlug: "ireland",
    flag: "🇮🇪",
    heroLede:
      "Europe's tech capital with EU-recognised degrees, two-year stay-back, and Google, Meta, LinkedIn, Stripe and Pfizer all anchored within walking distance of the city centre.",
    whyHere: [
      "Tech & pharma HQs on your doorstep — easy internship pipelines",
      "Compact, walkable city with strong public transport",
      "Indian student community well-supported across all universities",
      "2-year Third Level Graduate Scheme after a master's",
    ],
    topUniversities: ["Trinity College Dublin", "University College Dublin", "Dublin City University"],
    livingCostINR: [
      { label: "Rent (1 BHK city centre)", range: "₹1.5–2.2L / month" },
      { label: "Rent (shared, suburbs)", range: "₹60–90K / month" },
      { label: "Groceries", range: "₹25–40K / month" },
      { label: "Transport (Leap card)", range: "₹4–7K / month" },
    ],
    transport: "Luas tram + Dublin Bus + DART rail. Most students walk or cycle.",
    culture: "Pub culture, live music, literary heritage, weekend trips to Galway and Cork.",
    jobMarket:
      "Software, cloud, AI, fintech, pharma — most global tech HQs hire international graduates directly from campus.",
    vibe: "Walkable · Tech-heavy · Literary",
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-cyber-security", "msc-finance"],
  },
  {
    slug: "london",
    name: "London",
    countrySlug: "uk",
    flag: "🇬🇧",
    heroLede:
      "Europe's #1 financial centre, the world's most international student city, and home to four global top-25 universities — all on the Tube.",
    whyHere: [
      "Russell Group + global brand universities in one city",
      "Financial services, AI, consulting and fintech hiring at scale",
      "Largest Indian diaspora outside India — food, festivals, support",
      "2-year Graduate Route stays open after your master's",
    ],
    topUniversities: ["Imperial College London", "University College London", "King's College London", "London School of Economics"],
    livingCostINR: [
      { label: "Rent (Zone 1-2, shared)", range: "₹1.0–1.6L / month" },
      { label: "Rent (Zone 3-4, shared)", range: "₹70K–1.0L / month" },
      { label: "Groceries", range: "₹25–40K / month" },
      { label: "Travelcard (Zones 1-3)", range: "₹16–18K / month" },
    ],
    transport: "Tube + Overground + buses + Lizzy line. Walk the central zones.",
    culture: "World-class museums, theatre, food from every continent.",
    jobMarket:
      "Investment banking, consulting (MBB, Big Four), AI, fintech, creative industries — global recruiting pipeline.",
    vibe: "Diverse · Expensive · World-class",
    popularProgrammes: ["mba", "msc-finance", "ms-artificial-intelligence", "ms-computer-science"],
  },
  {
    slug: "manchester",
    name: "Manchester",
    countrySlug: "uk",
    flag: "🇬🇧",
    heroLede:
      "A second-tier UK price point, a top Russell Group university, and Europe's fastest-growing tech corridor outside London.",
    whyHere: [
      "Roughly half the rent of London for a comparable lifestyle",
      "University of Manchester — global top-50, world-class engineering and business",
      "Strong Indian community, weekly direct flights to India",
      "Booming digital, media, and life-sciences cluster",
    ],
    topUniversities: ["University of Manchester", "Manchester Metropolitan University"],
    livingCostINR: [
      { label: "Rent (1 BHK)", range: "₹75K–1.1L / month" },
      { label: "Rent (shared)", range: "₹40–60K / month" },
      { label: "Groceries", range: "₹20–32K / month" },
      { label: "Bus pass", range: "₹6–8K / month" },
    ],
    transport: "Metrolink trams + extensive bus network. City is walkable.",
    culture: "Football, music heritage (Oasis, Stone Roses), cricket, curry-mile food.",
    jobMarket:
      "Digital, media, advanced manufacturing, life sciences — quietly excellent for graduates.",
    vibe: "Affordable · Cultural · Up-and-coming",
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science", "msc-finance"],
  },
  {
    slug: "toronto",
    name: "Toronto",
    countrySlug: "canada",
    flag: "🇨🇦",
    heroLede:
      "Canada's tech capital with a 3-year PGWP, the most direct route to PR, and Bay Street recruiting hard for international graduates.",
    whyHere: [
      "University of Toronto — Canada's #1, global top-25",
      "Toronto-Waterloo tech corridor: Shopify, Google, Meta, banks",
      "Largest Indian diaspora in Canada — community, food, support",
      "Express Entry PR pipeline well-trodden by Indian master's graduates",
    ],
    topUniversities: ["University of Toronto", "Toronto Metropolitan University", "York University"],
    livingCostINR: [
      { label: "Rent (1 BHK downtown)", range: "₹1.1–1.5L / month" },
      { label: "Rent (shared, midtown)", range: "₹55–80K / month" },
      { label: "Groceries", range: "₹22–32K / month" },
      { label: "TTC pass", range: "₹9–10K / month" },
    ],
    transport: "Streetcars + subway + buses on the TTC. Cycling is growing.",
    culture: "Multicultural to the core. Indian, Chinese, Caribbean, Italian quarters all distinct.",
    jobMarket:
      "Big tech (Shopify, RBC, TD), AI research (Vector Institute), finance on Bay Street, healthtech.",
    vibe: "Multicultural · PR-friendly · Tech-heavy",
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence", "mba"],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    countrySlug: "canada",
    flag: "🇨🇦",
    heroLede:
      "Canada's Pacific gateway — UBC, the most liveable city in North America by most rankings, and a clear BC PNP pathway to PR.",
    whyHere: [
      "UBC and SFU — both global top-300",
      "Mild climate (no harsh winters) and stunning natural surroundings",
      "BC Provincial Nominee Programme gives a clear PR fast-track",
      "Gaming, film, biotech and clean-energy clusters",
    ],
    topUniversities: ["University of British Columbia", "Simon Fraser University"],
    livingCostINR: [
      { label: "Rent (1 BHK)", range: "₹1.2–1.6L / month" },
      { label: "Rent (shared)", range: "₹60–85K / month" },
      { label: "Groceries", range: "₹22–32K / month" },
      { label: "Compass card", range: "₹6–8K / month" },
    ],
    transport: "SkyTrain + buses + SeaBus. Bikeable downtown.",
    culture: "Outdoorsy, multicultural, Asian-Pacific influences, mountain weekends.",
    jobMarket:
      "Tech (Microsoft, Amazon offices), film & VFX, biotech, clean energy.",
    vibe: "Outdoorsy · Liveable · PR-track",
    popularProgrammes: ["ms-computer-science", "ms-data-science", "mba"],
  },
  {
    slug: "melbourne",
    name: "Melbourne",
    countrySlug: "australia",
    flag: "🇦🇺",
    heroLede:
      "Australia's cultural capital, home to University of Melbourne and Monash, and consistently rated one of the world's most liveable cities.",
    whyHere: [
      "University of Melbourne — Group of Eight, global top-15",
      "Up to 4 years of post-study work depending on programme",
      "Coffee culture, arts, food — globally recognised liveability",
      "Strong Indian community across Carlton, Footscray, Clayton",
    ],
    topUniversities: ["University of Melbourne", "Monash University", "RMIT University"],
    livingCostINR: [
      { label: "Rent (1 BHK)", range: "₹1.0–1.4L / month" },
      { label: "Rent (shared)", range: "₹50–75K / month" },
      { label: "Groceries", range: "₹22–32K / month" },
      { label: "Myki pass", range: "₹8–10K / month" },
    ],
    transport: "Trams (world's largest network), trains, buses. Bike-friendly inner city.",
    culture: "Coffee shops, AFL footy, live music, world-class restaurants.",
    jobMarket:
      "Finance, big-four consulting, healthcare, IT, biotech, education.",
    vibe: "Liveable · Cultural · Group of Eight",
    popularProgrammes: ["ms-computer-science", "ms-data-science", "mba"],
  },
  {
    slug: "sydney",
    name: "Sydney",
    countrySlug: "australia",
    flag: "🇦🇺",
    heroLede:
      "Australia's largest city, Group of Eight access at University of Sydney and UNSW, and a beach-front lifestyle few global cities match.",
    whyHere: [
      "Two Group of Eight universities (Sydney + UNSW)",
      "Asia-Pacific financial centre — strong finance and consulting jobs",
      "Up to 4 years post-study work for STEM graduates",
      "Established Indian community across Parramatta and Harris Park",
    ],
    topUniversities: ["University of Sydney", "UNSW Sydney", "UTS Sydney"],
    livingCostINR: [
      { label: "Rent (1 BHK city)", range: "₹1.4–1.9L / month" },
      { label: "Rent (shared, suburbs)", range: "₹60–90K / month" },
      { label: "Groceries", range: "₹25–35K / month" },
      { label: "Opal card", range: "₹10–14K / month" },
    ],
    transport: "Trains, buses, ferries, light rail. Ferry commutes are a real perk.",
    culture: "Beaches, harbour, outdoor lifestyle, multicultural dining.",
    jobMarket:
      "Banking, finance, tech (Atlassian, Canva), media, consulting.",
    vibe: "Coastal · Premium · Finance-heavy",
    popularProgrammes: ["mba", "ms-computer-science", "ms-data-science"],
  },
  {
    slug: "berlin",
    name: "Berlin",
    countrySlug: "germany",
    flag: "🇩🇪",
    heroLede:
      "Europe's #2 startup hub, near-zero public tuition, and the easiest German city for English-only international students.",
    whyHere: [
      "Public universities charge zero tuition for international students",
      "English-taught master's programmes proliferating",
      "Booming startup scene — N26, Delivery Hero, Zalando, Tier",
      "Cheapest of the major European capitals to live in",
    ],
    topUniversities: ["TU Berlin", "Humboldt University", "Freie Universität Berlin"],
    livingCostINR: [
      { label: "Rent (1 BHK)", range: "₹60–95K / month" },
      { label: "Rent (shared WG)", range: "₹35–55K / month" },
      { label: "Groceries", range: "₹18–28K / month" },
      { label: "BVG monthly pass", range: "₹5–8K / month" },
    ],
    transport: "U-Bahn + S-Bahn + trams + buses. Bike-friendly to a fault.",
    culture: "Art, techno, history (Wall, Cold War sites), 24-hour city.",
    jobMarket:
      "Startups, fintech, enterprise software, media, climate tech.",
    vibe: "Affordable · Startup-y · English-friendly",
    popularProgrammes: ["ms-computer-science", "ms-data-science", "ms-artificial-intelligence"],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
