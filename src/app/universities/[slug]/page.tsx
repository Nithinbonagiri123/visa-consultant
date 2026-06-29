import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  ExternalLink,
  Trophy,
  Sparkles,
  Globe,
  ArrowUpRight,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

import { universities, getUniversity } from "@/lib/universities-data";
import { destinations, site } from "@/lib/site";
import { programmes, buildProgrammeSlug } from "@/lib/programmes-data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) return {};

  const title = `${u.name} — Admissions Guide for Indian Students`;
  const description = `${u.blurb} Academic + IELTS thresholds, popular programmes, scholarships, and a starter shortlist for Indian applicants.`;

  return {
    title,
    description,
    alternates: { canonical: `/universities/${u.slug}` },
    openGraph: { title, description, url: `${site.url}/universities/${u.slug}`, type: "article" },
  };
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const country = destinations.find((d) => d.slug === u.countrySlug);
  const matchedProgrammes = programmes.filter((p) =>
    u.popularProgrammes.includes(p.slug),
  );

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Universities", href: "/universities" },
    { label: u.name },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <CollegeJsonLd u={u} />

      <section className="relative isolate overflow-hidden pb-12 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-6 sm:mt-10">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-navy-800 backdrop-blur sm:gap-3 sm:text-xs">
                <span className="text-base leading-none">{u.flag}</span>
                {u.city} · {country?.country} · QS #{u.qsRanking}
              </div>
              <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-navy-900 sm:mt-6 sm:text-5xl lg:text-6xl">
                {u.name}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-base lg:text-lg">
                {u.blurb}
              </p>

              <dl className="mt-6 grid max-w-lg grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
                <Stat label="Founded" value={String(u.founded)} />
                <Stat label="QS World" value={`#${u.qsRanking}`} />
                <Stat label="Type" value={u.type === "public" ? "Public" : "Private"} />
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <a
                  href="#enquire"
                  className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
                >
                  Book free counselling <ArrowRight size={18} />
                </a>
                <a
                  href={u.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
                >
                  Visit university site <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div>
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Admission thresholds"
            title={
              <>
                Typical bars for <span className="gradient-text">Indian applicants</span>.
              </>
            }
            description="What the average successful applicant looks like. We don't pretend below-bar students can't get in — we plan around it."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-elevated sm:mt-12 sm:rounded-3xl">
            <table className="w-full divide-y divide-navy-100 text-sm">
              <thead className="bg-surface-muted text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-700 sm:text-xs sm:tracking-[0.16em]">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-4">Requirement</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4">Typical bar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                <Row label="Undergraduate %" value={`${u.thresholds.minAcademicPct}%+`} />
                <Row label="IELTS (overall)" value={`${u.thresholds.minIELTS}+`} />
                {u.thresholds.gre && (
                  <Row
                    label="GRE"
                    value={
                      u.thresholds.gre.required
                        ? `Required · target ${u.thresholds.gre.targetScore ?? 320}+`
                        : "Optional"
                    }
                  />
                )}
                {u.thresholds.gmat && (
                  <Row
                    label="GMAT"
                    value={
                      u.thresholds.gmat.required
                        ? `Required · target ${u.thresholds.gmat.targetScore ?? 650}+`
                        : "Optional"
                    }
                  />
                )}
                <Row label="Approximate admit rate" value={`~${u.thresholds.typicalAdmitRatePct}%`} />
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Numbers are approximate based on recent Indian admit cohorts. We map your profile to this bar during the free consultation.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Strongest at"
            title={
              <>
                What {u.abbr ?? u.name} is <span className="gradient-text">globally known for</span>.
              </>
            }
          />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {u.strengths.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded-3xl border border-navy-100 bg-white p-5 shadow-elevated"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                  <Sparkles size={16} />
                </span>
                <p className="text-sm font-semibold text-navy-900">{s}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {matchedProgrammes.length > 0 && country && (
        <section className="py-14 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Popular programmes"
              title={
                <>
                  What Indian students <span className="gradient-text">apply to most</span> here.
                </>
              }
            />
            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {matchedProgrammes.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programmes/${buildProgrammeSlug(p.slug, country.slug)}`}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
                      {p.category}
                    </p>
                    <p className="mt-1 font-display text-base font-semibold tracking-tight text-navy-900">
                      {p.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Full programme guide for {country.country}
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
      )}

      <section className="bg-navy-950 py-14 text-white sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Funding"
            title={
              <span className="text-white">
                Scholarships at <span className="gradient-text">{u.abbr ?? u.name}</span>.
              </span>
            }
          />
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:mt-10 sm:rounded-3xl sm:p-7">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900 sm:h-11 sm:w-11">
                <Trophy size={18} />
              </span>
              <p className="text-[15px] leading-relaxed text-navy-100 sm:text-base">{u.scholarshipNote}</p>
            </div>
            <Link
              href="/scholarships"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:underline"
            >
              See the full scholarship matcher <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-3 sm:rounded-2xl sm:p-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-500 sm:text-[11px] sm:tracking-[0.16em]">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[13px] font-semibold text-navy-900 sm:text-base">
        {value}
      </dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="px-4 py-3 text-[13px] font-medium text-navy-900 sm:px-6 sm:py-4 sm:text-sm">
        <span className="inline-flex items-center gap-2 sm:gap-3">
          <GraduationCap size={14} className="text-gold-400 sm:hidden" />
          <GraduationCap size={16} className="hidden text-gold-400 sm:inline" />
          {label}
        </span>
      </td>
      <td className="px-4 py-3 text-[13px] text-navy-800 sm:px-6 sm:py-4 sm:text-sm">{value}</td>
    </tr>
  );
}

function CollegeJsonLd({ u }: { u: (typeof universities)[number] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: u.name,
    url: u.websiteUrl,
    address: { "@type": "PostalAddress", addressLocality: u.city },
    foundingDate: String(u.founded),
    sameAs: u.websiteUrl,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
