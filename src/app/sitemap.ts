import type { MetadataRoute } from "next";
import { site, destinations } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/find-your-destination`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...destinations.map((d) => ({
      url: `${site.url}/study-in-${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
