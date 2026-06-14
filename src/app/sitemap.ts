import type { MetadataRoute } from "next";
import { site, destinations } from "@/lib/site";
import { getAllPostMeta } from "@/lib/blog";
import { counsellors } from "@/lib/counsellors";
import { getAllProgrammeRoutes, buildProgrammeSlug } from "@/lib/programmes-data";
import { SUPPORTED_PAIRS, buildComparisonPairSlug } from "@/lib/comparator";

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
    { url: `${site.url}/glossary`,               lastModified: now, changeFrequency: "yearly",  priority: 0.7 },

    // Section landings
    { url: `${site.url}/programmes`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/counsellors`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.9 },

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

    // Comparison SEO pages
    ...SUPPORTED_PAIRS.map((p) => ({
      url: `${site.url}/compare/${buildComparisonPairSlug(p.a, p.b)}`,
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
