import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GraduationCap, MapPin, Bus, Heart, Briefcase } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Cost } from "@/components/ui/cost";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

import { cities, getCity } from "@/lib/cities-data";
import { destinations, site } from "@/lib/site";
import {
  programmes,
  buildProgrammeSlug,
} from "@/lib/programmes-data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const title = `Study in ${city.name} — Universities, Cost & Visa for Indian Students`;
  const description = `${city.heroLede} Universities, INR cost of living, transport, jobs and student-visa guidance for Indians studying in ${city.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/study-in-${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/study-in-${city.slug}`,
      type: "article",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const country = destinations.find((d) => d.slug === city.countrySlug);
  if (!country) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: country.country, href: `/study-in-${country.slug}` },
    { label: `Study in ${city.name}` },
  ];

  const matchedProgrammes = programmes.filter((p) =>
    city.popularProgrammes.includes(p.slug),
  );

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative isolate overflow-hidden pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white/70 px-3 py-1.5 text-xs font-medium text-navy-800 backdrop-blur">
                <span className="text-base leading-none">{city.flag}</span>
                {country.country} · {city.vibe}
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-navy-900 sm:text-6xl">
                Study in <span className="gradient-text">{city.name}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {city.heroLede}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#enquire"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Book free consultation <ArrowRight size={18} />
                </a>
                <Link
                  href={`/study-in-${country.slug}`}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  See {country.country} overview
                </Link>
              </div>
            </div>

            <div>
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Why this city"
            title={
              <>
                Reasons Indian students <span className="gradient-text">pick {city.name}</span>.
              </>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {city.whyHere.map((reason, i) => (
              <div
                key={reason}
                className="flex items-start gap-4 rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-900 text-xs font-semibold text-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-navy-900">{reason}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Top universities"
            title={
              <>
                Where to <span className="gradient-text">study</span> in {city.name}.
              </>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {city.topUniversities.map((u) => (
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

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Cost of living"
            title={
              <>
                What life in {city.name} <span className="gradient-text">actually costs</span>.
              </>
            }
            description={`Realistic INR bands for a typical Indian student in ${city.name}. Costs vary by neighbourhood and lifestyle.`}
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
                {city.livingCostINR.map((c) => (
                  <tr key={c.label}>
                    <td className="px-6 py-4 text-sm font-medium text-navy-900">
                      <span className="inline-flex items-center gap-3">
                        <MapPin size={16} className="text-gold-400" />
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

      <section className="bg-navy-950 py-24 text-white">
        <Container>
          <SectionHeading
            eyebrow="Day-to-day"
            title={
              <span className="text-white">
                Getting around, fitting in, <span className="gradient-text">finding work</span>.
              </span>
            }
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <DayCard icon={<Bus size={18} />} label="Transport" value={city.transport} />
            <DayCard icon={<Heart size={18} />} label="Culture" value={city.culture} />
            <DayCard icon={<Briefcase size={18} />} label="Job market" value={city.jobMarket} />
          </div>
        </Container>
      </section>

      {matchedProgrammes.length > 0 && (
        <section className="py-24">
          <Container>
            <SectionHeading
              eyebrow="Popular programmes"
              title={
                <>
                  What Indian students <span className="gradient-text">study here</span>.
                </>
              }
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matchedProgrammes.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programmes/${buildProgrammeSlug(p.slug, country.slug)}`}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated transition-shadow hover:shadow-[0_24px_48px_-20px_rgba(10,23,51,0.2)]"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
                      {p.category}
                    </p>
                    <p className="mt-1 font-display text-base font-semibold tracking-tight text-navy-900">
                      {p.name} in {country.country}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand />
    </>
  );
}

function DayCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
          {icon}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
          {label}
        </p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-navy-100">{value}</p>
    </div>
  );
}
