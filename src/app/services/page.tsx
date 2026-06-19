import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { Services } from "@/components/sections/services";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Our Services — End-to-End Study Abroad Support",
  description:
    "Eight services that make Campus Meridian an end-to-end study-abroad partner — university admissions, student visa, scholarships, SOP/LOR, IELTS/PTE, education loans, accommodation and pre-departure support.",
  alternates: { canonical: "/services" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Services" },
];

export default function ServicesPage() {
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
            eyebrow="What we do"
            title={
              <>
                Eight services. <br />
                One uninterrupted <span className="gradient-text">journey</span>.
              </>
            }
            description="From the day you reach out to the day you land — a single dedicated counsellor and a senior team behind them. Every service is included in our single, transparent fee."
          />
        </Container>
      </section>

      <Services />

      {/* Specialist services — Test Prep + Post-Study */}
      <section className="border-t border-navy-100 bg-surface-muted py-24">
        <Container>
          <SectionHeading
            eyebrow="Specialist services"
            title={
              <>
                Plus <span className="gradient-text">specialist support</span> we run as standalone tracks.
              </>
            }
            description="Test prep and post-study services run as dedicated tracks with their own batches, trainers, and timelines."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <Link
              href="/test-prep"
              className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />
              <div className="relative flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                    Test Prep
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    IELTS, TOEFL, GRE, GMAT, PTE, DET — live coaching with a written score guarantee. Free 30-min diagnostic on every test.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 group-hover:text-navy-900">
                    See all 6 tests <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/post-study-services"
              className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />
              <div className="relative flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                  <Briefcase size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                    Post-Study Services
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Work permits, PR pathways, dependent visas, renewals, citizenship — six services that take you from graduation to settled status.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 group-hover:text-navy-900">
                    See all services <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
