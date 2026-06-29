import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { universities } from "@/lib/universities-data";
import { destinations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Top Universities for Indian Students — Country-by-country Guides",
  description:
    "Detailed guides for the universities Indian students apply to most — Trinity Dublin, Oxford, Imperial, Manchester, Toronto, Waterloo, Melbourne, Sydney, TU Munich.",
  alternates: { canonical: "/universities" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Universities" },
];

const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export default function UniversitiesIndex() {
  // Group by country
  const grouped = universities.reduce(
    (acc, u) => {
      (acc[u.countrySlug] ??= []).push(u);
      return acc;
    },
    {} as Record<string, typeof universities>,
  );

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
            eyebrow="Universities"
            title={
              <>
                Detailed <span className="gradient-text">guides</span> to the universities Indian students apply to most.
              </>
            }
            description="Per-university admission thresholds, scholarship notes, strongest programmes, and a starter shortlist for Indian applicants."
          />
        </Container>
      </section>

      <Container className="pb-14 sm:pb-24">
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([countrySlug, unis]) => (
            <div key={countrySlug}>
              <div className="flex items-end justify-between border-b border-navy-100 pb-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                  {countryName[countrySlug] ?? countrySlug}
                </h2>
                <Link
                  href={`/study-in-${countrySlug}`}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 hover:text-navy-900"
                >
                  Country guide →
                </Link>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {unis.map((u) => (
                  <Link
                    key={u.slug}
                    href={`/universities/${u.slug}`}
                    className="group rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 text-white">
                        <GraduationCap size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
                            {u.name}
                          </h3>
                          <span className="rounded-full bg-gold-300/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                            QS #{u.qsRanking}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {u.city} · founded {u.founded}
                        </p>
                        <p className="mt-3 line-clamp-2 text-sm text-navy-800">
                          {u.blurb}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {u.strengths.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[11px] font-medium text-navy-800"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CTABand />
    </>
  );
}
