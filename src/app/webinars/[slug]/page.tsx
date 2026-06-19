import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Users, Video, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { WebinarRegisterForm } from "@/components/forms/webinar-register-form";
import { webinars, getWebinar, formatWebinarTime } from "@/lib/webinars-data";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) return {};
  return {
    title: `${w.title} — Free Webinar`,
    description: w.blurb,
    alternates: { canonical: `/webinars/${w.slug}` },
    openGraph: {
      title: w.title,
      description: w.blurb,
      url: `${site.url}/webinars/${w.slug}`,
      type: "article",
    },
  };
}

export default async function WebinarPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) notFound();

  const t = formatWebinarTime(w.startAt);
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Webinars", href: "/webinars" },
    { label: w.title },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <EventJsonLd webinar={w} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold-300/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                  {w.tier} · {w.format}
                </span>
                {w.status === "upcoming" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
                    Upcoming
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
                {w.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {w.blurb}
              </p>

              <dl className="mt-8 grid max-w-lg grid-cols-2 gap-4">
                <Stat icon={<Calendar size={14} />} label="When" value={t.full} />
                <Stat icon={<Clock size={14} />} label="Length" value={`${w.durationMinutes} min`} />
                <Stat icon={<Users size={14} />} label="Registered" value={`${w.registrationsExpected}+`} />
                <Stat icon={<Video size={14} />} label="Format" value={`${w.format} · Q&A at end`} />
              </dl>

              <div className="mt-8 flex flex-col gap-2 rounded-3xl border border-navy-100 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                  Hosted by
                </p>
                <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                  {w.speaker}
                </p>
                <p className="text-xs font-medium text-royal-600">{w.speakerRole}</p>
                <p className="mt-1 text-sm text-muted-foreground">{w.speakerBio}</p>
              </div>
            </div>

            <div>
              {w.status === "upcoming" ? (
                <WebinarRegisterForm webinarSlug={w.slug} webinarTitle={w.title} />
              ) : (
                <PastRecording w={w} />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            What we&apos;ll cover
          </h2>
          <ul className="mt-8 flex flex-col gap-3">
            {w.agenda.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-3xl border border-navy-100 bg-white p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-900 text-xs font-semibold text-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-navy-800">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-navy-100 bg-surface-muted p-5">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
            <p className="text-sm text-navy-800">
              <strong>Best fit for:</strong> {w.audience}
            </p>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}

function PastRecording({ w }: { w: (typeof webinars)[number] }) {
  if (!w.recordingUrl) {
    return (
      <div className="rounded-3xl border border-navy-100 bg-white p-8 text-center text-sm text-muted-foreground">
        Recording will be available shortly.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-elevated">
      <div className="aspect-video bg-navy-50">
        <iframe
          src={w.recordingUrl}
          title={w.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
          Recording · free to watch
        </p>
        <Link
          href="/#enquire"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Book a consultation <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon, label, value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4">
      <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-500">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-navy-900">{value}</dd>
    </div>
  );
}

function EventJsonLd({ webinar }: { webinar: (typeof webinars)[number] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: webinar.title,
    description: webinar.blurb,
    startDate: webinar.startAt,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${site.url}/webinars/${webinar.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    performer: {
      "@type": "Person",
      name: webinar.speaker,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/webinars/${webinar.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
