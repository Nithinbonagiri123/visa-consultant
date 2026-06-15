import type { Metadata } from "next";
import Link from "next/link";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import {
  SUPPORTED_PROGRAMME_PAIRS,
  buildProgrammePairSlug,
} from "@/lib/programme-comparator";
import { getProgramme } from "@/lib/programmes-data";

export const metadata: Metadata = {
  title: "Compare Master's Programmes — MS CS, AI, Data Science, MBA, Finance",
  description:
    "Side-by-side master's programme comparisons — MS CS vs MS Data Science, MBA vs MSc Finance, MS AI vs MS CS, and more — built for Indian students choosing what to study.",
  alternates: { canonical: "/compare-programmes" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Compare Programmes" },
];

export default function CompareProgrammesIndex() {
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
            eyebrow="Programme head-to-heads"
            title={
              <>
                Which <span className="gradient-text">master&apos;s</span> is right for you?
              </>
            }
            description="The five programme decisions Indian students wrestle with most. Compare curriculum, eligibility, careers and salary expectations side-by-side."
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {SUPPORTED_PROGRAMME_PAIRS.map(({ a, b, intent }) => {
            const pa = getProgramme(a);
            const pb = getProgramme(b);
            if (!pa || !pb) return null;
            return (
              <Link
                key={`${a}-${b}`}
                href={`/compare-programmes/${buildProgrammePairSlug(a, b)}`}
                className="group rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                  {intent}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-navy-900">
                  {pa.shortName} <span className="text-navy-400">vs</span> {pb.shortName}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Compare {pa.name} and {pb.name} side-by-side.
                </p>
              </Link>
            );
          })}
        </div>
      </Container>

      <CTABand />
    </>
  );
}
