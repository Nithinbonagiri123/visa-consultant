import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { destinations } from "@/lib/site";
import { programmes, countryProgrammeFit, buildProgrammeSlug } from "@/lib/programmes-data";

export const metadata: Metadata = {
  title: "Master's Programmes for Indian Students — Country-by-country",
  description:
    "Explore master's programmes — MS Computer Science, Data Science, AI, MBA, MSc Finance, Cyber Security — across the world's top study-abroad destinations.",
  alternates: { canonical: "/programmes" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Programmes" },
];

export default function ProgrammesIndexPage() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-6 sm:mt-10">
          <SectionHeading
            eyebrow="Programmes"
            title={
              <>
                Pick a <span className="gradient-text">programme</span>, pick a country.
              </>
            }
            description="Specialist guides for the master's programmes Indian students choose most — written around the real job market and graduate outcomes in each country."
          />
        </Container>
      </section>

      <Container className="pb-14 sm:pb-24">
        <div className="grid gap-6 sm:gap-10">
          {programmes.map((p) => {
            const availableCountries = destinations.filter((d) =>
              (countryProgrammeFit[d.slug] ?? []).includes(p.slug),
            );
            if (availableCountries.length === 0) return null;

            return (
              <div
                key={p.slug}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-elevated sm:rounded-3xl"
              >
                <div className="border-b border-navy-100 bg-surface-muted p-5 sm:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-500 sm:text-xs sm:tracking-[0.18em]">
                    {p.category}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                    {p.name}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[13px] text-muted-foreground sm:text-sm">
                    {p.blurb}
                  </p>
                </div>

                <ul className="grid gap-px bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
                  {availableCountries.map((d) => (
                    <li key={d.slug} className="bg-white">
                      <Link
                        href={`/programmes/${buildProgrammeSlug(p.slug, d.slug)}`}
                        className="group flex items-center justify-between gap-3 p-5 transition-colors hover:bg-surface-muted"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl leading-none">{d.flag}</span>
                          <div>
                            <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                              {p.shortName} in {d.country}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Intakes · {d.intakes}
                            </p>
                          </div>
                        </div>
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                          <ArrowUpRight size={14} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>

      <CTABand />
    </>
  );
}
