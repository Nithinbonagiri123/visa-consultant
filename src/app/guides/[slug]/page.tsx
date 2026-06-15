import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { GuideDownloadForm } from "@/components/forms/guide-download-form";

import { guides, getGuide } from "@/lib/guides-data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const themeStyles = {
  navy: "from-navy-900 via-navy-800 to-royal-600",
  royal: "from-royal-600 via-navy-800 to-navy-900",
  gold: "from-navy-900 via-navy-700 to-gold-500",
} as const;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: `${g.title} — Free PDF`,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      title: g.title,
      description: g.description,
      url: `${site.url}/guides/${g.slug}`,
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: g.title },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative isolate overflow-hidden pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            {/* LEFT — cover + bullets */}
            <div>
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl bg-gradient-to-br p-10 text-white shadow-elevated",
                  themeStyles[g.cover.theme],
                )}
              >
                <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-gold-400/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-royal-500/30 blur-3xl" />
                <div className="relative flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                    <BookOpen size={12} />
                    {g.tier} guide · {g.pages} pages
                  </div>
                  {g.cover.flag && (
                    <div className="text-7xl leading-none">{g.cover.flag}</div>
                  )}
                  <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {g.title}
                  </h1>
                  <p className="text-sm leading-relaxed text-navy-200">
                    {g.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                  Inside the guide
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {g.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-navy-900"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {g.relatedBlogSlug && (
                <p className="mt-8 text-sm">
                  <Link
                    href={`/blog/${g.relatedBlogSlug}`}
                    className="text-royal-600 hover:underline"
                  >
                    Or read the related article →
                  </Link>
                </p>
              )}
            </div>

            {/* RIGHT — download form */}
            <div>
              <GuideDownloadForm guideSlug={g.slug} guideTitle={g.title} />
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
