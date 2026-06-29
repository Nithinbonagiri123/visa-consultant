import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Users,
  Home,
  PenLine,
  Globe2,
  type LucideIcon,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Post-Study Services — Work Permits, PR Pathways & Dependent Visas",
  description:
    "After your degree, Campus Meridian guides you through work permits, post-study work visas, PR pathways (Canada, Australia), dependent visas, and permit renewals — end-to-end.",
  alternates: { canonical: "/post-study-services" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Post-Study Services" },
];

type Service = {
  title: string;
  icon: LucideIcon;
  blurb: string;
  covers: string[];
  countries: string;
};

const services: Service[] = [
  {
    title: "Post-Study Work Permits",
    icon: Briefcase,
    blurb:
      "Application and renewal support for every major post-study work visa — so you can start working without paperwork stress in your final semester.",
    covers: [
      "Canada PGWP — application, renewal, transition to work permit",
      "UK Graduate Route — application + extension",
      "Australia 485 (Temporary Graduate)",
      "Ireland Third Level Graduate Scheme",
      "Germany 18-month Job Seeker Visa",
      "Netherlands Orientation Year (Zoekjaar)",
    ],
    countries: "Canada · UK · Australia · Ireland · Germany · NL",
  },
  {
    title: "PR & Immigration Pathways",
    icon: ShieldCheck,
    blurb:
      "Permanent residency consultation tuned to your destination — what to score, when to apply, and how your master's + post-study work credits feed in.",
    covers: [
      "Canada Express Entry — CRS score planning",
      "Canada Provincial Nominee Programmes (PNPs)",
      "Australia Skilled Migration (189 / 190 / 491)",
      "New Zealand Skilled Migrant Category",
      "Germany EU Blue Card to PR pathway",
      "Ireland Stamp 4 + citizenship by naturalisation",
    ],
    countries: "Canada · Australia · NZ · Germany · Ireland",
  },
  {
    title: "Dependent & Spouse Visas",
    icon: Users,
    blurb:
      "Get your family with you. We file dependent, spouse, and de-facto partner visas alongside your main application — joint timing, joint paperwork.",
    covers: [
      "Spouse / partner visa filing",
      "Dependent child visa",
      "De-facto partner (Australia, NZ)",
      "Civil partnership (Ireland, UK)",
      "Schengen family reunification",
      "Bringing parents — visit visa support",
    ],
    countries: "All destinations",
  },
  {
    title: "Permit Renewals & Extensions",
    icon: PenLine,
    blurb:
      "Visas expire. Permits change category. We track every deadline and handle every renewal so you stay legal and employed without a gap.",
    covers: [
      "Student visa extensions",
      "Stamp 1G extensions (Ireland)",
      "Work permit renewals",
      "Category changes (student → graduate → work)",
      "Bridging visas (Australia)",
      "Status restoration (UK, Canada)",
    ],
    countries: "All destinations",
  },
  {
    title: "Relocation Support",
    icon: Home,
    blurb:
      "Pre-departure briefing and on-the-ground first-month help — accommodation, banking, SIM, transit pass, and city-by-city playbooks.",
    covers: [
      "Verified university and private accommodation",
      "Bank account setup before you fly",
      "Forex strategy and remittance",
      "Pre-departure cultural briefing",
      "Airport pickup + first-week orientation",
      "City-specific transit + tax + healthcare guidance",
    ],
    countries: "All destinations",
  },
  {
    title: "Citizenship Consultation",
    icon: Globe2,
    blurb:
      "For students planning the long game — passport applications, citizenship by descent, and dual-citizenship strategy where it&apos;s allowed.",
    covers: [
      "Canadian citizenship (after 3 years PR)",
      "Australian citizenship (after 4 years PR)",
      "Irish citizenship by naturalisation",
      "German citizenship (after 8 years)",
      "Caribbean / EU dual-citizenship options",
      "OCI card guidance for Indian citizens",
    ],
    countries: "Canada · Australia · Ireland · Germany",
  },
];

export default function PostStudyServicesPage() {
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
            eyebrow="Post-study services"
            title={
              <>
                Your degree is the start. <br />
                <span className="gradient-text">We stay with you</span> through PR.
              </>
            }
            description="Work permits, dependent visas, PR pathways, citizenship — six services that take you from graduation to settled status. End-to-end, in any of our destinations."
          />
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-elevated sm:rounded-3xl sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                  <s.icon size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-navy-900">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    {s.countries}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.blurb}
              </p>

              <ul className="mt-5 grid gap-2">
                {s.covers.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-navy-800"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-6 text-white shadow-elevated sm:mt-12 sm:rounded-3xl sm:p-12">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                Bundled with your study package
              </p>
              <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                One counsellor. Beginning to settled status.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
                The senior counsellor who got you admitted stays with you through
                your post-study work visa, your first job, your PR application,
                and your citizenship. No handoffs, no &ldquo;sorry we don&apos;t do
                that.&rdquo;
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/#enquire"
                className={buttonVariants({ variant: "gold", size: "lg" })}
              >
                Talk to a counsellor <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <CTABand />
    </>
  );
}
