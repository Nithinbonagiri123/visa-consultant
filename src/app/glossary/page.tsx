import type { Metadata } from "next";
import Link from "next/link";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { buttonVariants } from "@/components/ui/button";
import { glossary, glossaryCategories } from "@/lib/glossary-data";
import { site } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Abroad Glossary — Visa, Test, and Application Terms Explained",
  description:
    "Short, accurate definitions of every study-abroad term Indian students run into — SOP, OPT, SDS, PGWP, IELTS, GIC, CAS, F-1, blocked account and more.",
  alternates: { canonical: "/glossary" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Glossary" },
];

export default function GlossaryPage() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <GlossaryJsonLd />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[40vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <SectionHeading
            eyebrow="Glossary"
            title={
              <>
                Every study-abroad term, <span className="gradient-text">in plain English</span>.
              </>
            }
            description={`${glossary.length} definitions across visas, tests, applications, funding, post-study work, and university systems. Jump to any term using the categories below.`}
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
          {/* Sticky category nav */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
              Categories
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              {glossaryCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href={`#${slugifyCategory(cat)}`}
                    className="inline-flex w-full rounded-full bg-navy-50 px-4 py-2 text-xs font-medium text-navy-800 transition-colors hover:bg-navy-900 hover:text-white"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Glossary content */}
          <div className="flex flex-col gap-16">
            {glossaryCategories.map((cat) => {
              const items = glossary.filter((g) => g.category === cat);
              if (items.length === 0) return null;
              return (
                <section key={cat} id={slugifyCategory(cat)} className="scroll-mt-28">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                    {cat}
                  </h2>
                  <dl className="mt-8 grid gap-5">
                    {items.map((g) => (
                      <div
                        key={g.slug}
                        id={g.slug}
                        className="scroll-mt-28 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated"
                      >
                        <dt className="flex items-baseline gap-3">
                          <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
                            {g.term}
                          </span>
                          {g.abbr && (
                            <span className="rounded-full bg-gold-300/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                              {g.abbr}
                            </span>
                          )}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-navy-800">
                          {g.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#enquire"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Book free consultation <ArrowRight size={18} />
              </Link>
              <Link
                href="/blog"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Read the blog
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <CTABand />
    </>
  );
}

function slugifyCategory(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function GlossaryJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `${site.name} Study Abroad Glossary`,
    url: `${site.url}/glossary`,
    hasDefinedTerm: glossary.map((g) => ({
      "@type": "DefinedTerm",
      "@id": `${site.url}/glossary#${g.slug}`,
      name: g.term,
      alternateName: g.abbr,
      description: g.definition,
      inDefinedTermSet: `${site.url}/glossary`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
