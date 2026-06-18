import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { Testimonials } from "@/components/sections/testimonials";
import { Avatar } from "@/components/counsellors/avatar";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { counsellors } from "@/lib/counsellors";

export const metadata: Metadata = {
  title: "Success Stories — Real Students, Real Outcomes",
  description:
    "Real Campus Meridian student outcomes — admissions, scholarships, and post-study work success stories across Ireland, UK, Canada, Australia, USA, Germany, France and beyond.",
  alternates: { canonical: "/stories" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Stories" },
];

export default function StoriesPage() {
  // Flatten every counsellor's success stories into one feed.
  const counsellorStories = counsellors.flatMap((c) =>
    c.successStories.map((s) => ({ ...s, counsellor: c })),
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
            eyebrow="Success stories"
            title={
              <>
                The journey, told by <br />
                the students who <span className="gradient-text">lived it</span>.
              </>
            }
            description="Real outcomes from students Campus Meridian has guided to campuses across the world. Every story is anchored to a senior counsellor who owned the journey end-to-end."
          />
        </Container>
      </section>

      <Testimonials />

      <section className="border-t border-navy-100 bg-surface-muted py-24">
        <Container>
          <SectionHeading
            eyebrow="Recent placements"
            title={
              <>
                The shortlist that <span className="gradient-text">actually landed</span>.
              </>
            }
            description="Recent students placed by our counsellor team, with notes on what worked in each application."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {counsellorStories.map((s) => (
              <div
                key={`${s.studentName}-${s.university}`}
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
                <Link
                  href={`/counsellors/${s.counsellor.slug}`}
                  className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-5"
                >
                  <Avatar name={s.counsellor.name} size="sm" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-navy-900">
                      {s.counsellor.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.counsellor.role}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-navy-500" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#enquire"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Start your own story <ArrowRight size={18} />
            </Link>
            <Link
              href="/counsellors"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Meet the counsellors
            </Link>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
