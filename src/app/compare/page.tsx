import type { Metadata } from "next";
import Link from "next/link";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { ComparatorPicker } from "@/components/compare/comparator-picker";
import { SUPPORTED_PAIRS, buildComparisonPairSlug } from "@/lib/comparator";
import { destinations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Study Abroad Destinations — Side-by-side for Indians",
  description:
    "Compare up to three study-abroad destinations side-by-side — costs in INR, visa requirements, stay-back, top universities, and graduate outcomes.",
  alternates: { canonical: "/compare" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Compare" },
];

const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export default function ComparePage() {
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
            eyebrow="Side-by-side"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Compare <span className="gradient-text">destinations</span> in one view.
              </>
            }
            description="Cost, visa, stay-back, post-study work, and top universities — side-by-side. Pick the two or three countries you're stuck between."
          />
        </Container>
      </section>

      <ComparatorPicker />

      <section className="border-t border-navy-100 bg-surface-muted py-20">
        <Container>
          <SectionHeading
            eyebrow="Popular comparisons"
            title={
              <>
                The <span className="gradient-text">decisions</span> most Indian students wrestle with.
              </>
            }
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTED_PAIRS.map(({ a, b, intent }) => (
              <Link
                key={`${a}-${b}`}
                href={`/compare/${buildComparisonPairSlug(a, b)}`}
                className="group rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-elevated"
              >
                <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                  {countryName[a]} vs {countryName[b]}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{intent}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
