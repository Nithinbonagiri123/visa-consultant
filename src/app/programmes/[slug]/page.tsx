import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Plane,
  Wallet,
  Sparkles,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Cost } from "@/components/ui/cost";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { destinations, site } from "@/lib/site";
import { destinationDetail } from "@/lib/destinations-detail";
import {
  getAllProgrammeRoutes,
  parseProgrammeSlug,
  getProgramme,
  buildProgrammeSlug,
  type Programme,
} from "@/lib/programmes-data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllProgrammeRoutes().map((r) => ({
    slug: buildProgrammeSlug(r.programmeSlug, r.countrySlug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = parseProgrammeSlug(slug);
  if (!route) return {};
  const programme = getProgramme(route.programmeSlug);
  const country = destinations.find((d) => d.slug === route.countrySlug);
  if (!programme || !country) return {};

  const title = `${programme.name} in ${country.country} — Guide for Indian Students`;
  const description = `${programme.name} in ${country.country}: universities, tuition in INR, scholarships, post-study work, and student-visa guidance from Campus Meridian.`;

  return {
    title,
    description,
    alternates: { canonical: `/programmes/${slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/programmes/${slug}`,
      type: "article",
    },
  };
}

export default async function ProgrammeComboPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const route = parseProgrammeSlug(slug);
  if (!route) notFound();
  const programme = getProgramme(route.programmeSlug);
  const country = destinations.find((d) => d.slug === route.countrySlug);
  const detail = destinationDetail[route.countrySlug];
  if (!programme || !country || !detail) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Programmes", href: "/programmes" },
    { label: `${programme.shortName} in ${country.country}` },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <CourseJsonLd programme={programme} country={country} slug={slug} />

      <Hero programme={programme} country={country} crumbs={crumbs} />
      <Overview programme={programme} country={country} />
      <Universities country={country} programme={programme} />
      <Curriculum programme={programme} />
      <Requirements programme={programme} />
      <Costs detail={detail} />
      <Careers programme={programme} country={country} />
      <PostStudyWork detail={detail} country={country} />
      <CTABand />
    </>
  );
}

// ----- sections -------------------------------------------------------------

function Hero({
  programme,
  country,
  crumbs,
}: {
  programme: Programme;
  country: (typeof destinations)[number];
  crumbs: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade" />

      <Breadcrumb items={crumbs} />

      <Container className="mt-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white/70 px-3 py-1.5 text-xs font-medium text-navy-800 backdrop-blur">
              <span className="text-base leading-none">{country.flag}</span>
              {programme.category} · {country.country} · {country.intakes}
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl">
              {programme.name} <br />
              <span className="text-3xl font-medium text-navy-600 sm:text-4xl">in </span>
              <span className="gradient-text">{country.country}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {programme.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#enquire"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Book free counselling <ArrowRight size={18} />
              </a>
              <Link
                href={`/study-in-${country.slug}`}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Study in {country.country} overview
              </Link>
            </div>
          </div>

          <div>
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Overview({
  programme,
  country,
}: {
  programme: Programme;
  country: (typeof destinations)[number];
}) {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              <Sparkles size={12} className="text-gold-500" /> Who this is for
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-900 sm:text-4xl">
              Is {programme.shortName} in {country.country} the right fit for you?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {programme.whoFor}
            </p>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
              Why {country.country} for {programme.shortName}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {country.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-navy-800"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{h}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm text-navy-800">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                <span>{country.blurb}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Universities({
  country,
  programme,
}: {
  country: (typeof destinations)[number];
  programme: Programme;
}) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Where to study"
          title={
            <>
              Leading universities for <span className="gradient-text">{programme.shortName}</span> in {country.country}.
            </>
          }
          description={`Below is our starter shortlist for ${programme.shortName} in ${country.country}. We tailor it to your academic profile, target intake, and budget during the free consultation.`}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {country.topUniversities.map((u) => (
            <div
              key={u}
              className="flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 text-white">
                <GraduationCap size={20} />
              </div>
              <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                {u}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Curriculum({ programme }: { programme: Programme }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Curriculum"
          title={
            <>
              What you&apos;ll <span className="gradient-text">actually learn</span>.
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programme.coreCurriculum.map((c, i) => (
            <div
              key={c}
              className="rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-xs font-semibold text-gold-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-display text-base font-semibold tracking-tight text-navy-900">
                {c}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Requirements({ programme }: { programme: Programme }) {
  const rows: { label: string; value: string }[] = [
    { label: "Undergraduate background", value: programme.typicalRequirements.undergrad },
    { label: "English (IELTS overall)", value: `${programme.typicalRequirements.ielts}+` },
    ...(programme.typicalRequirements.gre
      ? [{ label: "GRE", value: programme.typicalRequirements.gre }]
      : []),
    ...(programme.typicalRequirements.gmat
      ? [{ label: "GMAT", value: programme.typicalRequirements.gmat }]
      : []),
    ...(programme.typicalRequirements.experience
      ? [{ label: "Work experience", value: programme.typicalRequirements.experience }]
      : []),
  ];

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Eligibility"
          title={
            <>
              Typical <span className="gradient-text">admission</span> requirements.
            </>
          }
          description="Most universities work close to these bars. We map your profile and identify universities where you're a strong, target, or stretch applicant."
        />
        <div className="mt-12 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-elevated">
          <table className="w-full divide-y divide-navy-100">
            <thead className="bg-surface-muted text-left text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
              <tr>
                <th className="px-6 py-4">Requirement</th>
                <th className="px-6 py-4">Typical bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {rows.map((r) => (
                <tr key={r.label}>
                  <td className="px-6 py-4 text-sm font-medium text-navy-900">
                    <span className="inline-flex items-center gap-3">
                      <BookOpen size={16} className="text-gold-400" />
                      {r.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-800">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function Costs({ detail }: { detail: (typeof destinationDetail)[string] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Costs in INR"
          title={
            <>
              Tuition + living, <span className="gradient-text">all-in</span>.
            </>
          }
          description="Realistic country bands for an Indian master's student. We build a personalised cost sheet during your free consultation."
        />
        <div className="mt-12 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-elevated">
          <table className="w-full divide-y divide-navy-100">
            <thead className="bg-surface-muted text-left text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
              <tr>
                <th className="px-6 py-4">Component</th>
                <th className="px-6 py-4 text-right">Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {detail.costBreakdown.map((c) => (
                <tr key={c.label}>
                  <td className="px-6 py-4 text-sm font-medium text-navy-900">
                    <span className="inline-flex items-center gap-3">
                      <Wallet size={16} className="text-gold-400" />
                      {c.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-display text-base font-semibold text-navy-900">
                    <Cost inr={c.range} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          See the live <Link href="/loan-emi-calculator" className="text-royal-600 underline underline-offset-2 hover:text-navy-900">education loan EMI calculator</Link> to model your funding plan.
        </p>
      </Container>
    </section>
  );
}

function Careers({
  programme,
  country,
}: {
  programme: Programme;
  country: (typeof destinations)[number];
}) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Careers"
          title={
            <>
              Where graduates of {programme.shortName} <span className="gradient-text">land</span>.
            </>
          }
          description={programme.avgGraduateSalaryNote}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programme.careerPaths.map((c) => (
            <div
              key={c}
              className="flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-white">
                <Briefcase size={18} />
              </div>
              <p className="text-sm font-semibold text-navy-900">{c}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {country.country} hires {programme.shortName} graduates particularly into roles aligned with the country&apos;s strongest sectors. See the <Link href={`/study-in-${country.slug}`} className="text-royal-600 underline underline-offset-2 hover:text-navy-900">{country.country} careers section</Link> for the local picture.
        </p>
      </Container>
    </section>
  );
}

function PostStudyWork({
  detail,
  country,
}: {
  detail: (typeof destinationDetail)[string];
  country: (typeof destinations)[number];
}) {
  return (
    <section className="bg-navy-950 py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow="Post-study work"
          title={
            <span className="text-white">
              Your time in {country.country} <span className="gradient-text">after</span> graduating.
            </span>
          }
          description={
            <span className="text-navy-200">
              The post-study work pathway is a key part of your ROI plan. Get the visa right and you set up the next 3-5 years.
            </span>
          }
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-royal-600/40 to-navy-800 p-7 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
              {country.country} post-study work
            </p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">
              {detail.postStudyWork}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                <Plane size={18} />
              </span>
              <h3 className="font-display text-lg font-semibold text-white">
                Check your {country.country} visa eligibility
              </h3>
            </div>
            <p className="text-sm text-navy-200">
              Six questions. We benchmark your profile against the {country.country} student-visa bar.
            </p>
            <Link
              href={`/visa-eligibility?country=${country.slug}`}
              className={buttonVariants({ variant: "gold", size: "lg" })}
            >
              Start eligibility check <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ----- structured data ------------------------------------------------------

function CourseJsonLd({
  programme,
  country,
  slug,
}: {
  programme: Programme;
  country: (typeof destinations)[number];
  slug: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${programme.name} in ${country.country}`,
    description: programme.blurb,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.url,
    },
    educationalLevel: "Postgraduate",
    inLanguage: "en",
    url: `${site.url}/programmes/${slug}`,
    about: programme.category,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
