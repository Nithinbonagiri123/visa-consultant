import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Library,
  Users,
  HelpCircle,
  Video,
  type LucideIcon,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

import { counsellors } from "@/lib/counsellors";
import { glossary } from "@/lib/glossary-data";
import { guides } from "@/lib/guides-data";
import { getAllPostMeta } from "@/lib/blog";
import { getUpcomingWebinars } from "@/lib/webinars-data";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources — Blog, Guides, Glossary & Counsellor Profiles",
  description:
    "Every Campus Meridian resource in one place — senior-counsellor blog, free downloadable PDF guides, study-abroad glossary, counsellor profiles and FAQ.",
  alternates: { canonical: "/resources" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Resources" },
];

type Resource = {
  href: string;
  title: string;
  blurb: string;
  count: string;
  icon: LucideIcon;
};

export default async function ResourcesPage() {
  const posts = await getAllPostMeta();
  const upcomingWebinars = getUpcomingWebinars();

  const resources: Resource[] = [
    {
      href: "/blog",
      title: "Blog",
      blurb: "Senior-counsellor articles on countries, costs, visas, scholarships and university shortlists.",
      count: `${posts.length} articles`,
      icon: BookOpen,
    },
    {
      href: "/guides",
      title: "Free Guides",
      blurb: "Free downloadable PDFs — country guides, education-loan playbook and visa-mistake checklists.",
      count: `${guides.length} PDFs`,
      icon: FileText,
    },
    {
      href: "/webinars",
      title: "Webinars",
      blurb: "Live sessions with our senior counsellors — country intake guides, visa rule updates, SOP clinics. Recordings always shared.",
      count: `${upcomingWebinars.length} upcoming`,
      icon: Video,
    },
    {
      href: "/glossary",
      title: "Glossary",
      blurb: "Plain-English definitions for every study-abroad term — SOP, OPT, PGWP, IELTS, GIC, CAS and more.",
      count: `${glossary.length} terms`,
      icon: Library,
    },
    {
      href: "/counsellors",
      title: "Counsellors",
      blurb: "Senior Campus Meridian counsellors with country-specialist depth, success stories and philosophy.",
      count: `${counsellors.length} counsellors`,
      icon: Users,
    },
    {
      href: "/faq",
      title: "FAQ",
      blurb: "Direct, senior-counsellor answers to the six questions most students arrive with.",
      count: `${faqs.length} answers`,
      icon: HelpCircle,
    },
  ];

  const featuredPost = posts[0];

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
            eyebrow="Resources"
            title={
              <>
                Everything you need to <span className="gradient-text">research</span> your move.
              </>
            }
            description="Articles, guides, definitions and the team behind every recommendation — built from the conversations our counsellors actually have."
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                    <r.icon size={20} />
                  </div>
                  <span className="rounded-full bg-gold-300/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                    {r.count}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-navy-900">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 group-hover:text-navy-900">
                  Open <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {featuredPost && (
          <section className="mt-20 rounded-[2rem] border border-navy-100 bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-8 text-white shadow-elevated sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                  Featured · From the blog
                </p>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {featuredPost.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
                  {featuredPost.description}
                </p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-900"
                >
                  Read the article <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}
      </Container>

      <CTABand />
    </>
  );
}
