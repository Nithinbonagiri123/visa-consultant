import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Award, Quote, Trophy, Users } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { Avatar } from "@/components/counsellors/avatar";
import { counsellors, getCounsellorBySlug } from "@/lib/counsellors";
import { destinations, site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return counsellors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCounsellorBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.role} · Campus Meridian`,
    description: c.shortBio,
    alternates: { canonical: `/counsellors/${c.slug}` },
    openGraph: {
      title: `${c.name} — Senior Counsellor at Campus Meridian`,
      description: c.shortBio,
      url: `${site.url}/counsellors/${c.slug}`,
      type: "profile",
    },
  };
}

const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export default async function CounsellorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getCounsellorBySlug(slug);
  if (!c) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Counsellors", href: "/counsellors" },
    { label: c.name },
  ];

  const others = counsellors.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <PersonJsonLd c={c} />

      <section className="relative isolate overflow-hidden pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[40vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="flex flex-col items-start gap-6">
              <Avatar name={c.name} size="xl" className="h-32 w-32 text-3xl" />
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-3 py-1 text-xs font-medium text-navy-800 backdrop-blur">
                  <Award size={12} className="text-gold-500" /> Senior counsellor
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
                  {c.name}
                </h1>
                <p className="mt-3 text-base font-medium text-royal-600">
                  {c.role}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/#enquire"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Book with {c.name.split(" ")[0]} <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-elevated">
              <Quote
                size={96}
                strokeWidth={1}
                className="absolute -right-6 -top-6 text-navy-100"
              />
              <p className="relative font-display text-xl font-medium leading-snug tracking-tight text-navy-900 sm:text-2xl">
                &ldquo;{c.philosophy}&rdquo;
              </p>
              <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
                Counselling philosophy
              </p>

              <dl className="relative mt-8 grid grid-cols-2 gap-6 border-t border-navy-100 pt-6">
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    <Users size={12} className="text-gold-500" /> Experience
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-navy-900">
                    {c.yearsExperience}+ <span className="text-sm font-normal text-muted-foreground">years</span>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    <Trophy size={12} className="text-gold-500" /> Students placed
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-navy-900">
                    {c.studentsPlaced}+
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <article className="prose-brand max-w-none">
            <h2>Background</h2>
            {c.bio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-navy-100 bg-surface-muted p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
                Country specialism
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.countries.map((slug) => (
                  <Link
                    key={slug}
                    href={`/study-in-${slug}`}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy-800 transition-colors hover:bg-navy-900 hover:text-white"
                  >
                    {countryName[slug] ?? slug}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-navy-100 bg-surface-muted p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
                Field expertise
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.fields.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <section className="border-t border-navy-100 bg-surface-muted py-20">
        <Container>
          <SectionHeading
            eyebrow="Recent placements"
            title={
              <>
                Real students, real <span className="gradient-text">outcomes</span>.
              </>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {c.successStories.map((s) => (
              <div
                key={s.studentName}
                className="rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">
                  {s.country}
                </p>
                <p className="mt-3 font-display text-xl font-semibold tracking-tight text-navy-900">
                  {s.studentName} → {s.university}
                </p>
                <p className="text-xs text-muted-foreground">{s.course}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy-800">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Meet the rest of the team"
              title={<>Other senior counsellors</>}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/counsellors/${o.slug}`}
                  className="group flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-elevated"
                >
                  <Avatar name={o.name} size="lg" />
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                      {o.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {o.role}
                    </p>
                  </div>
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

function PersonJsonLd({ c }: { c: typeof counsellors[number] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.name,
    jobTitle: c.role,
    worksFor: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.url,
    },
    description: c.shortBio,
    url: `${site.url}/counsellors/${c.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
