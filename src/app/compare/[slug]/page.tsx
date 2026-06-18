import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { ComparisonTable } from "@/components/compare/comparison-table";
import {
  SUPPORTED_PAIRS,
  getAllComparisonPairSlugs,
  parseComparisonPairSlug,
  getDestination,
} from "@/lib/comparator";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  // Prerender every C(N,2) pair so any combo the picker can produce resolves.
  return getAllComparisonPairSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseComparisonPairSlug(slug);
  if (!parsed) return {};
  const a = getDestination(parsed.a);
  const b = getDestination(parsed.b);
  if (!a || !b) return {};

  const title = `${a.country} vs ${b.country} for Indian Students — Cost, Visa & Stay-back`;
  const description = `${a.country} vs ${b.country} — cost in INR, student-visa bar, post-study work, top universities and graduate outcomes side-by-side, for Indian students.`;

  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/compare/${slug}`,
      type: "article",
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const parsed = parseComparisonPairSlug(slug);
  if (!parsed) notFound();
  const a = getDestination(parsed.a);
  const b = getDestination(parsed.b);
  if (!a || !b) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: `${a.country} vs ${b.country}` },
  ];

  const pair = SUPPORTED_PAIRS.find(
    (p) =>
      (p.a === parsed.a && p.b === parsed.b) ||
      (p.a === parsed.b && p.b === parsed.a),
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

        <Container className="mt-10">
          <SectionHeading
            eyebrow={pair?.intent ?? "Head-to-head"}
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                <span>{a.flag}</span> {a.country} vs {b.country} <span>{b.flag}</span>
              </>
            }
            description={`A side-by-side comparison for Indian students — cost, visa, post-study work, top universities, and outcomes. Built from the same dataset our senior counsellors use during shortlisting.`}
          />
        </Container>
      </section>

      <ComparisonTable slugs={[parsed.a, parsed.b]} />

      <CTABand />
    </>
  );
}
