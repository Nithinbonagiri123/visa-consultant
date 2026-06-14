import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GraduationCap, Wallet, Plane, Trophy, Briefcase } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Cost } from "@/components/ui/cost";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CTABand } from "@/components/sections/cta-band";

import { destinations, site } from "@/lib/site";
import { destinationDetail } from "@/lib/destinations-detail";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};

  const detail = destinationDetail[slug];
  const title = `${detail?.heroTitle ?? `Study in ${dest.country}`} — Consultants for Indian Students`;
  const description = `${detail?.heroLede ?? dest.blurb} Universities, courses, tuition, scholarships and student-visa guidance from Campus Meridian.`;

  return {
    title,
    description,
    alternates: { canonical: `/study-in-${dest.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/study-in-${dest.slug}`,
      type: "article",
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  const detail = destinationDetail[slug];
  if (!dest || !detail) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/#destinations" },
    { label: `Study in ${dest.country}` },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <CountryFaqJsonLd detail={detail} />

      <DestinationHero dest={dest} detail={detail} crumbs={crumbs} />

      <WhyStudy detail={detail} />
      <UniversitiesGrid dest={dest} />
      <Courses detail={detail} />
      <Costs detail={detail} />
      <Visa detail={detail} dest={dest} />
      <Scholarships detail={detail} />
      <Careers detail={detail} />
      <CountryFAQ detail={detail} dest={dest} />
      <CTABand />
    </>
  );
}

// --- sections ---------------------------------------------------------------

function DestinationHero({
  dest,
  detail,
  crumbs,
}: {
  dest: (typeof destinations)[number];
  detail: (typeof destinationDetail)[string];
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
              <span className="text-base leading-none">{dest.flag}</span>
              {dest.country} · {dest.intakes}
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl">
              {detail.heroTitle}<br />
              <span className="gradient-text">From India.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {detail.heroLede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book free consultation <ArrowRight size={18} />
              </a>
              <a href="#visa" className={buttonVariants({ variant: "outline", size: "lg" })}>
                See visa requirements
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <Stat label="Tuition" value={<Cost inr={dest.costFromINR} />} />
              <Stat label="Intakes" value={dest.intakes} />
              <Stat label="Stay-back" value={dest.highlights[0]} />
            </dl>
          </div>

          <div>
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
        {label}
      </dt>
      <dd className="mt-1 font-display text-base font-semibold text-navy-900">
        {value}
      </dd>
    </div>
  );
}

function WhyStudy({ detail }: { detail: (typeof destinationDetail)[string] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Why study here"
          title={
            <>
              Four reasons it&apos;s worth <span className="gradient-text">the move</span>.
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {detail.whyPoints.map((p, i) => (
            <div
              key={p.title}
              className="group rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-xs font-semibold text-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function UniversitiesGrid({ dest }: { dest: (typeof destinations)[number] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Top universities"
          title={
            <>
              Where Campus Meridian students <span className="gradient-text">graduate</span>.
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dest.topUniversities.map((u) => (
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

function Courses({ detail }: { detail: (typeof destinationDetail)[string] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Popular courses"
          title={
            <>
              The programmes Indian students <span className="gradient-text">choose most</span>.
            </>
          }
        />
        <div className="mt-12 flex flex-wrap gap-3">
          {detail.popularCourses.map((c) => (
            <span
              key={c}
              className="rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-medium text-navy-800"
            >
              {c}
            </span>
          ))}
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
          eyebrow="Tuition & living"
          title={
            <>
              A clear cost picture <span className="gradient-text">in INR</span>.
            </>
          }
          description="Budget bands for a typical Indian master's student. We build a personalised cost sheet during your free consultation."
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
      </Container>
    </section>
  );
}

function Visa({
  detail,
  dest,
}: {
  detail: (typeof destinationDetail)[string];
  dest: (typeof destinations)[number];
}) {
  return (
    <section id="visa" className="bg-navy-950 py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow="Student visa"
          title={
            <span className="text-white">
              Your <span className="gradient-text">{dest.country}</span> visa, in plain English.
            </span>
          }
          description={
            <span className="text-navy-200">
              Campus Meridian counsellors handle documentation, financial planning and consulate-tuned interview prep.
            </span>
          }
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                <Plane size={18} />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                Visa snapshot
              </h3>
            </div>
            <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {detail.visaSnapshot.map((v) => (
                <div key={v.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
                    {v.label}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{v.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-royal-600/40 to-navy-800 p-7 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
              Post-study work
            </p>
            <p className="mt-3 font-display text-lg font-semibold leading-snug text-white">
              {detail.postStudyWork}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Check your {dest.country} visa eligibility in 90 seconds.
            </p>
            <p className="mt-1 text-sm text-navy-200">
              Six questions. Country-specific scoring against the same bar consulates use.
            </p>
          </div>
          <Link
            href={`/visa-eligibility?country=${dest.slug}`}
            className={buttonVariants({ variant: "gold", size: "lg" })}
          >
            Start eligibility check <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function Scholarships({ detail }: { detail: (typeof destinationDetail)[string] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Scholarships"
          title={
            <>
              Funding that <span className="gradient-text">moves the needle</span>.
            </>
          }
          description="Major scholarships available for Indian students. Our counsellors map your profile to every award you're eligible for."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {detail.scholarships.map((s) => (
            <div
              key={s.name}
              className="rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                  <Trophy size={18} />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
                  {s.name}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Careers({ detail }: { detail: (typeof destinationDetail)[string] }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Careers"
          title={
            <>
              Where graduates <span className="gradient-text">land</span>.
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {detail.careers.map((c) => (
            <div
              key={c.sector}
              className="flex flex-col gap-4 rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">
                <Briefcase size={18} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                  {c.sector}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CountryFAQ({
  detail,
  dest,
}: {
  detail: (typeof destinationDetail)[string];
  dest: (typeof destinations)[number];
}) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow={`${dest.country} FAQ`}
          title={
            <>
              Top questions about <span className="gradient-text">{dest.country}</span>.
            </>
          }
        />
        <ul className="mt-12 flex flex-col divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white">
          {detail.faq.map((f) => (
            <li key={f.q} className="p-6">
              <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                {f.q}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="mt-10 text-sm">
        <Link href="/#faq" className="text-royal-600 hover:underline">
          See all study-abroad FAQs →
        </Link>
      </Container>
    </section>
  );
}

function CountryFaqJsonLd({
  detail,
}: {
  detail: (typeof destinationDetail)[string];
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

