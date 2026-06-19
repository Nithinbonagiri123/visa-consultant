import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Video, Users } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import {
  getUpcomingWebinars,
  getPastWebinars,
  formatWebinarTime,
} from "@/lib/webinars-data";

export const metadata: Metadata = {
  title: "Free Webinars — Study Abroad, Visa, Funding & Career Sessions",
  description:
    "Free live webinars from Campus Meridian senior counsellors — country intake guides, visa rule updates, education loan deep-dives, SOP clinics. Register or watch the recording.",
  alternates: { canonical: "/webinars" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Webinars" },
];

const tierStyles: Record<string, string> = {
  Country:     "bg-royal-500/10 text-royal-600 border-royal-500/20",
  Application: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Funding:     "bg-gold-300/30 text-gold-500 border-gold-400/30",
  Visa:        "bg-amber-50 text-amber-700 border-amber-200",
  Career:      "bg-navy-50 text-navy-900 border-navy-100",
};

export default function WebinarsPage() {
  const upcoming = getUpcomingWebinars();
  const past = getPastWebinars();

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
            eyebrow="Webinars"
            title={
              <>
                Free sessions with our <span className="gradient-text">senior counsellors</span>.
              </>
            }
            description="Live, structured, with Q&A at the end. Country intake guides, visa updates, education-loan math, SOP clinics — all free, recordings always shared."
          />
        </Container>
      </section>

      <Container className="pb-24">
        {/* Upcoming */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
            Upcoming · {upcoming.length} session{upcoming.length === 1 ? "" : "s"}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {upcoming.map((w) => {
              const t = formatWebinarTime(w.startAt);
              return (
                <Link
                  key={w.slug}
                  href={`/webinars/${w.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${tierStyles[w.tier]}`}
                      >
                        {w.tier}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                        <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
                        Live
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-navy-900">
                      {w.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {w.blurb}
                    </p>

                    <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                      <Meta icon={<Calendar size={11} />} value={t.date} />
                      <Meta icon={<Clock size={11} />} value={`${t.time} IST · ${w.durationMinutes}m`} />
                      <Meta icon={<Users size={11} />} value={`${w.registrationsExpected}+ registered`} />
                      <Meta icon={<Video size={11} />} value={w.speaker} />
                    </dl>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 group-hover:text-navy-900">
                      Register free <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Past — recordings */}
        {past.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
              Past sessions · Recordings available
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {past.map((w) => {
                const t = formatWebinarTime(w.startAt);
                return (
                  <Link
                    key={w.slug}
                    href={`/webinars/${w.slug}`}
                    className="group flex items-start gap-4 rounded-3xl border border-navy-100 bg-white p-6 transition-shadow hover:shadow-elevated"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-900">
                      <Video size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-500">
                        {t.date}
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold tracking-tight text-navy-900">
                        {w.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                        {w.blurb}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-royal-600 group-hover:text-navy-900">
                        Watch recording <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </Container>

      <CTABand />
    </>
  );
}

function Meta({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-navy-700">
      <span className="text-gold-500">{icon}</span>
      <span>{value}</span>
    </div>
  );
}
