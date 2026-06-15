import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { guides } from "@/lib/guides-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Study Abroad Guides — Country, Loan, and Visa PDFs",
  description:
    "Free downloadable guides for Indian students — Canada, UK, education loan planning, and student-visa mistakes — emailed instantly to your inbox.",
  alternates: { canonical: "/guides" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Guides" },
];

const themeStyles = {
  navy: "from-navy-900 via-navy-800 to-royal-600",
  royal: "from-royal-600 via-navy-800 to-navy-900",
  gold: "from-navy-900 via-navy-700 to-gold-500",
} as const;

export default function GuidesIndex() {
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
            eyebrow="Free guides"
            title={
              <>
                Free <span className="gradient-text">PDFs</span> built from the conversations our counsellors actually have.
              </>
            }
            description="Honest, country-specific, written for Indian students. Email-delivered, no signup, unsubscribe with one click."
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
            >
              <div
                className={cn(
                  "relative h-44 bg-gradient-to-br p-7 text-white",
                  themeStyles[g.cover.theme],
                )}
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-royal-500/30 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                    <BookOpen size={12} />
                    {g.tier} guide · {g.pages} pages
                  </div>
                  {g.cover.flag && (
                    <div className="text-5xl leading-none">{g.cover.flag}</div>
                  )}
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                  {g.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {g.subtitle}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                    Get free PDF
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <CTABand />
    </>
  );
}
