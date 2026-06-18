import type { MetadataRoute } from "next";
import { site, destinations } from "@/lib/site";
import { getAllPostMeta } from "@/lib/blog";
import { counsellors } from "@/lib/counsellors";
import { getAllProgrammeRoutes, buildProgrammeSlug } from "@/lib/programmes-data";
import { SUPPORTED_PAIRS, buildComparisonPairSlug } from "@/lib/comparator";
import { cities } from "@/lib/cities-data";
import { universities } from "@/lib/universities-data";
import { guides } from "@/lib/guides-data";
import {
  SUPPORTED_PROGRAMME_PAIRS,
  buildProgrammePairSlug,
} from "@/lib/programme-comparator";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPostMeta();
  const programmeRoutes = getAllProgrammeRoutes();

  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },

    // Top-level tools
    { url: `${site.url}/find-your-destination`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/visa-eligibility`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/loan-emi-calculator`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/scholarships`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/compare`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/compare-programmes`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/admit-probability`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/glossary`,               lastModified: now, changeFrequency: "yearly",  priority: 0.7 },

    // Section landings (mirrored in top navbar)
    { url: `${site.url}/destinations`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/universities`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/programmes`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/services`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/how-it-works`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/stories`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/tools`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resources`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/counsellors`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/guides`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${site.url}/faq`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Destinations
    ...destinations.map((d) => ({
      url: `${site.url}/study-in-${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Programme combos
    ...programmeRoutes.map((r) => ({
      url: `${site.url}/programmes/${buildProgrammeSlug(r.programmeSlug, r.countrySlug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // City pages
    ...cities.map((c) => ({
      url: `${site.url}/study-in-${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // University pages
    ...universities.map((u) => ({
      url: `${site.url}/universities/${u.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Guide download pages
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Country comparison SEO pages
    ...SUPPORTED_PAIRS.map((p) => ({
      url: `${site.url}/compare/${buildComparisonPairSlug(p.a, p.b)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Programme comparison SEO pages
    ...SUPPORTED_PROGRAMME_PAIRS.map((p) => ({
      url: `${site.url}/compare-programmes/${buildProgrammePairSlug(p.a, p.b)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Counsellor profiles
    ...counsellors.map((c) => ({
      url: `${site.url}/counsellors/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Blog posts
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
