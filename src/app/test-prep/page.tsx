import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Target, Sparkles, BookOpen } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { tests } from "@/lib/test-prep-data";

export const metadata: Metadata = {
  title: "Test Prep — IELTS, TOEFL, GRE, GMAT, PTE, DET Coaching",
  description:
    "Senior-trainer test prep for IELTS, TOEFL, GRE, GMAT, PTE and DET. Free diagnostic, live + recorded sessions, score guarantee. Designed for Indian students aiming abroad.",
  alternates: { canonical: "/test-prep" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Test Prep" },
];

export default function TestPrepPage() {
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
            eyebrow="Test prep"
            title={
              <>
                Live coaching for every exam <br />
                <span className="gradient-text">your master&apos;s requires</span>.
              </>
            }
            description="Senior trainers, mock-test infrastructure, and a score guarantee on every batch. Free 30-minute diagnostic on every test — no commitment."
          />

          {/* Quick trust strip */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Stat n="5,000+" label="Students scored Band 7+" />
            <Stat n="60+ hrs" label="Live coaching per batch" />
            <Stat n="✓ Free demo" label="On every test" />
          </div>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {tests.map((t) => (
            <article
              key={t.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)] sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">
                      {t.fullName}
                    </p>
                    <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-navy-900">
                      {t.name}
                    </h2>
                  </div>
                  {t.freeDemo && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      Free demo
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  Accepted in {t.for}.
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-navy-100 py-5">
                  <Detail icon={<BookOpen size={12} />} label="Format" value={t.format} />
                  <Detail icon={<Clock size={12} />} label="Duration" value={t.duration} />
                  <Detail icon={<Sparkles size={12} />} label="Coaching" value={t.trainingHours} />
                  <Detail icon={<Target size={12} />} label="Target" value={t.targetScore} />
                </dl>

                <ul className="mt-5 flex flex-col gap-2">
                  {t.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-navy-800"
                    >
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                      Course from
                    </p>
                    <p className="font-display text-xl font-semibold text-navy-900">
                      {t.feeFromINR}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="/#enquire"
                      className={buttonVariants({ variant: "primary", size: "md" })}
                    >
                      Book free demo <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-6 text-white shadow-elevated sm:mt-12 sm:rounded-3xl sm:p-12">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                Score guarantee
              </p>
              <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Don&apos;t hit your target band? Retake the full batch — free.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
                Every Campus Meridian batch comes with a written score guarantee.
                Miss your target on test day, attend the next batch at no cost.
                We&apos;ve never had to invoke it more than a handful of times — but
                the safety net is there.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/#enquire"
                className={buttonVariants({ variant: "gold", size: "lg" })}
              >
                Book free diagnostic <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <CTABand />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 text-center shadow-elevated">
      <p className="font-display text-3xl font-semibold tracking-tight text-navy-900">
        {n}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-navy-500">
        {label}
      </p>
    </div>
  );
}

function Detail({
  icon, label, value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-500">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-navy-800">{value}</dd>
    </div>
  );
}
