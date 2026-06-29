import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { Avatar } from "@/components/counsellors/avatar";
import { counsellors } from "@/lib/counsellors";
import { destinations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet Our Senior Counsellors — Campus Meridian Team",
  description:
    "Senior Campus Meridian counsellors with country-specialist depth across Ireland, UK, Canada, USA, Australia, New Zealand, Germany, France, and the UAE.",
  alternates: { canonical: "/counsellors" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Our Counsellors" },
];

const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export default function CounsellorsPage() {
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
            eyebrow="Meet the team"
            title={
              <>
                Senior counsellors with <span className="gradient-text">country-specialist</span> depth.
              </>
            }
            description="Every student we work with gets a dedicated counsellor who owns the journey end-to-end. Below — the people who'll actually do the work."
          />
        </Container>
      </section>

      <Container className="pb-14 sm:pb-24">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {counsellors.map((c) => (
            <Link
              key={c.slug}
              href={`/counsellors/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)] sm:rounded-3xl sm:p-7"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <Avatar name={c.name} size="xl" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-[13px] font-medium text-royal-600 sm:text-sm">
                    {c.role}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                    {c.shortBio}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-navy-100 pt-4 sm:mt-6 sm:pt-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Experience
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-navy-900">
                    {c.yearsExperience}+ years
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Students placed
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-navy-900">
                    {c.studentsPlaced}+
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                  Country specialism
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.countries.map((slug) => (
                    <span
                      key={slug}
                      className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800"
                    >
                      {countryName[slug] ?? slug}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                  Read profile
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <CTABand />
    </>
  );
}
