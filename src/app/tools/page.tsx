import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  ShieldCheck,
  GraduationCap,
  Calculator,
  Scale,
  Trophy,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Free Study Abroad Tools — Calculators, Finders & Eligibility Checks",
  description:
    "Seven free tools for Indian students planning study abroad — destination finder, visa eligibility, admit probability, EMI calculator, scholarship match, country and programme comparator.",
  alternates: { canonical: "/tools" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools" },
];

type Tool = {
  href: string;
  title: string;
  blurb: string;
  category: "Planning" | "Eligibility" | "Funding" | "Comparison";
  icon: LucideIcon;
  cta: string;
};

const tools: Tool[] = [
  {
    href: "/find-your-destination",
    title: "Destination Finder",
    blurb:
      "Five quick questions rank all nine destinations against your budget, field, priorities, and English readiness.",
    category: "Planning",
    icon: Compass,
    cta: "Find your destination",
  },
  {
    href: "/visa-eligibility",
    title: "Visa Eligibility Check",
    blurb:
      "Six questions. Country-specific scoring against the same bar consulates use — with concrete next steps for every gap.",
    category: "Eligibility",
    icon: ShieldCheck,
    cta: "Check eligibility",
  },
  {
    href: "/admit-probability",
    title: "Admit Probability Calculator",
    blurb:
      "Drag the sliders to see which of 10 leading universities are Safe, Target, or Reach for your profile.",
    category: "Eligibility",
    icon: GraduationCap,
    cta: "Build my shortlist",
  },
  {
    href: "/loan-emi-calculator",
    title: "Education Loan EMI Calculator",
    blurb:
      "Real-time EMI math with principal-vs-interest split. Adjust loan amount, rate and tenure to model your funding plan.",
    category: "Funding",
    icon: Calculator,
    cta: "Calculate EMI",
  },
  {
    href: "/scholarships",
    title: "Scholarship Match",
    blurb:
      "Filter scholarships by destination, field and study level — from fully-funded marquee awards to high-conversion merit waivers.",
    category: "Funding",
    icon: Trophy,
    cta: "Find scholarships",
  },
  {
    href: "/compare",
    title: "Country Comparator",
    blurb:
      "Side-by-side cost, visa, stay-back and university comparison for any two destinations.",
    category: "Comparison",
    icon: Scale,
    cta: "Compare countries",
  },
  {
    href: "/compare-programmes",
    title: "Programme Comparator",
    blurb:
      "MS CS vs MS DS, MBA vs MSc Finance — pick the master's that matches your strengths and career goals.",
    category: "Comparison",
    icon: Layers,
    cta: "Compare programmes",
  },
];

const categories: Tool["category"][] = ["Planning", "Eligibility", "Funding", "Comparison"];

export default function ToolsPage() {
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
            eyebrow="Tools"
            title={
              <>
                Seven free <span className="gradient-text">tools</span> to plan your study abroad.
              </>
            }
            description="Every tool runs in your browser, in seconds, on the same data our senior counsellors use during your free consultation. No email required."
          />
        </Container>
      </section>

      <Container className="pb-24">
        {categories.map((cat) => {
          const inCat = tools.filter((t) => t.category === cat);
          if (inCat.length === 0) return null;
          return (
            <section key={cat} className="mt-12 first:mt-0">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                {cat}
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {inCat.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-royal-500/10 to-gold-400/10 blur-2xl" />
                    <div className="relative flex items-start gap-5">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                        <t.icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                          {t.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {t.blurb}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600 group-hover:text-navy-900">
                          {t.cta} <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </Container>

      <CTABand />
    </>
  );
}
