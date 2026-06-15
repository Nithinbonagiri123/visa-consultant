import { destinations } from "@/lib/site";

const COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

const FALLBACK = "I'd like to know more about studying abroad.";

// Build a context-aware WhatsApp opener based on the current page path.
// Examples:
//   /study-in-canada                       → "I'm interested in studying in Canada."
//   /programmes/ms-computer-science-in-uk → "I'm interested in MS Computer Science in the UK."
//   /visa-eligibility?country=ireland     → "I'd like help with the Ireland student visa."
//   /find-your-destination                 → "I'd like help picking the right country."
//   /blog/student-visa-process-2026       → "I read your article on visa process and have questions."
//   /                                      → fallback
export function buildWhatsAppMessage(
  pathname: string,
  search?: URLSearchParams,
): string {
  // Country landing
  const studyMatch = pathname.match(/^\/study-in-([a-z-]+)(?:\/|$)/);
  if (studyMatch) {
    const country = COUNTRY_NAMES[studyMatch[1]];
    if (country) return `I'm interested in studying in ${country}.`;
  }

  // Programme combo: /programmes/{programme-slug}-in-{country-slug}
  const programmeMatch = pathname.match(/^\/programmes\/([a-z0-9-]+)-in-([a-z-]+)(?:\/|$)/);
  if (programmeMatch) {
    const country = COUNTRY_NAMES[programmeMatch[2]];
    const programmeLabel = humanisedProgramme(programmeMatch[1]);
    if (country) return `I'm interested in ${programmeLabel} in ${country}.`;
  }

  if (pathname.startsWith("/find-your-destination")) {
    return "I'd like help picking the right country for me.";
  }

  if (pathname.startsWith("/visa-eligibility")) {
    const c = search?.get("country");
    const country = c ? COUNTRY_NAMES[c] : null;
    return country
      ? `I'd like help with the ${country} student visa.`
      : "I'd like help with the student visa process.";
  }

  if (pathname.startsWith("/loan-emi-calculator")) {
    return "I'd like to discuss education-loan options.";
  }

  if (pathname.startsWith("/counsellors")) {
    return "I'd like to talk to a senior counsellor.";
  }

  if (pathname.startsWith("/scholarships")) {
    return "I'd like help finding scholarships I'm eligible for.";
  }

  if (pathname.startsWith("/compare")) {
    return "I'm comparing destinations and need help deciding.";
  }

  if (pathname.startsWith("/universities/")) {
    return "I'd like advice on applying to this university.";
  }

  if (pathname.startsWith("/universities")) {
    return "I'd like help shortlisting universities.";
  }

  if (pathname.startsWith("/admit-probability")) {
    return "I'd like a counsellor to validate my university shortlist.";
  }

  if (pathname.startsWith("/guides/")) {
    return "I just downloaded one of your guides and have a few questions.";
  }

  if (pathname.startsWith("/blog/")) {
    return "I just read your article and have a few questions.";
  }

  return FALLBACK;
}

function humanisedProgramme(slug: string): string {
  // ms-computer-science → MS Computer Science
  // mba → MBA
  // msc-finance → MSc Finance
  const parts = slug.split("-");
  return parts
    .map((p) => {
      if (p === "ms" || p === "mba") return p.toUpperCase();
      if (p === "msc") return "MSc";
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
}
