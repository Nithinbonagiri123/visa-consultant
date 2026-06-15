import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

import {
  SUPPORTED_PROGRAMME_PAIRS,
  buildProgrammePairSlug,
  parseProgrammePairSlug,
  buildProgrammeComparison,
  type ProgrammeComparisonRow,
} from "@/lib/programme-comparator";
import { getProgramme } from "@/lib/programmes-data";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return SUPPORTED_PROGRAMME_PAIRS.map((p) => ({
    slug: buildProgrammePairSlug(p.a, p.b),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseProgrammePairSlug(slug);
  if (!parsed) return {};
  const a = getProgramme(parsed.a);
  const b = getProgramme(parsed.b);
  if (!a || !b) return {};

  const title = `${a.shortName} vs ${b.shortName} — Which Master's is Right for You?`;
  const description = `${a.shortName} vs ${b.shortName} — curriculum, careers, salary, eligibility, and which programme matches your goals. Built for Indian students choosing a study-abroad master's.`;

  return {
    title,
    description,
    alternates: { canonical: `/compare-programmes/${slug}` },
    openGraph: { title, description, url: `${site.url}/compare-programmes/${slug}`, type: "article" },
  };
}

const GROUPS: ProgrammeComparisonRow["group"][] = [
  "Overview",
  "Requirements",
  "Outcomes",
];

export default async function ProgrammeCompareDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const parsed = parseProgrammePairSlug(slug);
  if (!parsed) notFound();
  const a = getProgramme(parsed.a);
  const b = getProgramme(parsed.b);
  if (!a || !b) notFound();

  const pair = SUPPORTED_PROGRAMME_PAIRS.find(
    (p) =>
      (p.a === parsed.a && p.b === parsed.b) ||
      (p.a === parsed.b && p.b === parsed.a),
  );

  const rows = buildProgrammeComparison(a, b);

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Programmes", href: "/programmes" },
    { label: `${a.shortName} vs ${b.shortName}` },
  ];

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
            eyebrow={pair?.intent ?? "Programme head-to-head"}
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                {a.shortName} <span className="text-navy-400">vs</span>{" "}
                <span className="gradient-text">{b.shortName}</span>
              </>
            }
            description="Side-by-side comparison of curriculum focus, eligibility, careers and salaries. We help you pick which one matches your existing skills and goals."
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="overflow-x-auto rounded-[2rem] border border-navy-100 bg-white shadow-elevated">
          <table className="w-full min-w-[640px] divide-y divide-navy-100 text-sm">
            <thead className="bg-surface-muted">
              <tr>
                <th className="w-56 px-6 py-5" />
                {[a, b].map((p) => (
                  <th key={p.slug} className="px-6 py-5 text-left">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
                        {p.category}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold tracking-tight text-navy-900">
                        {p.name}
                      </p>
                      <Link
                        href="/programmes"
                        className="text-xs text-royal-600 hover:underline"
                      >
                        See country combos →
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {GROUPS.map((group) => (
                <GroupRows
                  key={group}
                  group={group}
                  rows={rows.filter((r) => r.group === group)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            href="/#enquire"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Discuss with a counsellor <ArrowRight size={18} />
          </Link>
          <Link
            href="/find-your-destination"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Find your destination
          </Link>
        </div>
      </Container>

      <CTABand />
    </>
  );
}

function GroupRows({
  group,
  rows,
}: {
  group: ProgrammeComparisonRow["group"];
  rows: ProgrammeComparisonRow[];
}) {
  return (
    <>
      <tr className="bg-surface-muted/40">
        <td
          colSpan={3}
          className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.label}>
          <td className="px-6 py-5 align-top text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-700">
            {r.label}
          </td>
          {r.values.map((v, i) => (
            <td
              key={i}
              className="px-6 py-5 align-top text-sm leading-relaxed text-navy-800"
            >
              {v}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
