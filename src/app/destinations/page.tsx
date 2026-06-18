import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { Destinations } from "@/components/sections/destinations";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { cities } from "@/lib/cities-data";
import { destinations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Study Abroad Destinations — Country & City Guides for Indian Students",
  description:
    "Explore study-abroad destinations: country guides for Ireland, UK, Canada, Australia, USA, Germany, France, New Zealand and the UAE, plus city-level guides for Dublin, London, Toronto and more.",
  alternates: { canonical: "/destinations" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Destinations" },
];

const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export default function DestinationsIndex() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <SectionHeading
            eyebrow="Destinations"
            title={
              <>
                <span className="gradient-text">9 countries</span> · 8 cities · one journey.
              </>
            }
            description="Every destination guide for Indian students — cost in INR, visa requirements, stay-back, top universities and graduate outcomes for each country and major student city."
          />
        </Container>
      </section>

      <Destinations />

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="City guides"
            title={
              <>
                Or drill into a <span className="gradient-text">specific city</span>.
              </>
            }
            description="Cost of living, transport, culture, jobs and top universities for the 8 cities Indian students choose most."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/study-in-${c.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-5 shadow-elevated transition-shadow hover:shadow-[0_24px_48px_-20px_rgba(10,23,51,0.2)]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-2xl">
                  {c.flag}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                    {c.name}
                  </p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin size={10} /> {countryName[c.countrySlug] ?? c.countrySlug}
                  </p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
