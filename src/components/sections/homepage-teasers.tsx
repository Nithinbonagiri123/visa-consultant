"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Plane,
  Trophy,
  PenLine,
  Compass,
  ShieldCheck,
  Calculator,
  Scale,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { services, testimonials, faqs } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const SERVICE_ICONS = { GraduationCap, Plane, Trophy, PenLine } as const;
const FEATURED_SERVICE_TITLES = [
  "University Admissions",
  "Student Visa Assistance",
  "Scholarship Guidance",
  "SOP & LOR Crafting",
];

const FEATURED_TOOLS = [
  { href: "/find-your-destination", title: "Programme Finder",      blurb: "Match your background to the right Irish master's programme.", icon: Compass },
  { href: "/visa-eligibility",      title: "Visa Eligibility Check", blurb: "Score your Type D student visa application before you apply.", icon: ShieldCheck },
  { href: "/loan-emi-calculator",   title: "Education Loan EMI",     blurb: "Real-time EMI math for Irish tuition + living costs.",        icon: Calculator },
  { href: "/compare-programmes",    title: "Programme Comparator",   blurb: "Side-by-side fees, intake, ranking, post-study work rights.",  icon: Scale },
] as const;

// Ireland-specific reasons. Mirrors the destinationDetail.ireland.whyPoints
// content, condensed for the homepage. Edit there and here together.
const WHY_IRELAND = [
  {
    title: "EU-recognised degrees",
    body: "Bachelor's and master's recognised across all 27 EU member states for further study and work.",
  },
  {
    title: "Two-year stay-back",
    body: "Master's graduates receive the Third Level Graduate Scheme — up to 24 months to live and work in Ireland.",
  },
  {
    title: "Global tech & pharma corridor",
    body: "Google, Meta, Pfizer and Johnson & Johnson anchor a job market hungry for STEM and business graduates.",
  },
  {
    title: "English-language teaching",
    body: "Every programme taught in English with structured academic and visa support for Indian students.",
  },
];

// ----- 1. Why Ireland (replaces the multi-country destinations grid) -------

export function DestinationsTeaser() {
  return (
    <section id="why-ireland" className="border-b border-navy-100 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-500">
              Why Ireland
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              Four reasons Indian students are choosing Ireland.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              An EU degree, two years of post-study work, and Europe&apos;s busiest tech corridor — Dublin to Cork — at your doorstep.
            </p>
            <Link
              href="/study-in-ireland"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-navy-900 underline decoration-gold-400 underline-offset-4 hover:decoration-navy-900"
            >
              Full Ireland guide <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="grid gap-px bg-navy-100 sm:grid-cols-2">
            {WHY_IRELAND.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
                className="flex flex-col gap-3 bg-white p-6 sm:p-8"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

// ----- 2. Services teaser --------------------------------------------------

export function ServicesTeaser() {
  const featured = FEATURED_SERVICE_TITLES
    .map((title) => services.find((s) => s.title === title))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <section id="services" className="bg-surface-cream py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Eight services. One uninterrupted journey to Ireland."
            description="From the day you reach out to the day you land in Dublin — a single dedicated counsellor and a senior team behind them."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-navy-900 underline decoration-gold-400 underline-offset-4 hover:decoration-navy-900"
          >
            See all services <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-px border border-navy-100 bg-navy-100 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon as keyof typeof SERVICE_ICONS];
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
                className="flex flex-col gap-5 bg-white p-6 sm:p-8"
              >
                {Icon && (
                  <Icon size={26} strokeWidth={1.5} className="text-navy-900" />
                )}
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

// ----- 3. Tools teaser -----------------------------------------------------

export function ToolsTeaser() {
  return (
    <section className="border-y border-navy-100 bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Free tools"
            title="Four tools to plan your move to Ireland."
            description="The same tools our senior counsellors run during your free consultation. Browser-only, instant, no email required."
          />
          <Link
            href="/tools"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-navy-900 underline decoration-gold-400 underline-offset-4 hover:decoration-navy-900"
          >
            See all tools <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_TOOLS.map((t, i) => (
            <motion.li
              key={t.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
            >
              <Link
                href={t.href}
                className="group flex h-full flex-col gap-4 border border-navy-100 bg-white p-6 transition-colors hover:border-navy-900"
              >
                <t.icon size={26} strokeWidth={1.5} className="text-navy-900" />
                <div className="flex-1">
                  <p className="font-display text-base font-semibold text-navy-900">
                    {t.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.blurb}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-700 transition-colors group-hover:text-navy-900">
                  Open tool <ArrowRight size={12} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// ----- 4. Stories teaser ---------------------------------------------------

export function StoriesTeaser() {
  const featured = testimonials.slice(0, 2);

  return (
    <section id="stories" className="bg-surface-cream py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Success stories"
            title="Real Indian students. Real Ireland outcomes."
            description="A small sample of what our students have gone on to achieve at Irish universities. Every story is anchored to one senior counsellor."
          />
          <Link
            href="/stories"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-navy-900 underline decoration-gold-400 underline-offset-4 hover:decoration-navy-900"
          >
            Read all stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-navy-100 bg-navy-100 sm:mt-12 sm:grid-cols-2">
          {featured.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
              className="flex flex-col gap-6 bg-white p-8 sm:p-10"
            >
              <span className="text-gold-500 font-display text-5xl leading-none">&ldquo;</span>
              <blockquote className="font-display text-lg leading-snug text-navy-900 sm:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-navy-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center border border-gold-400 bg-white font-display text-xs font-semibold text-navy-900">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.course} &middot; {t.university}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ----- 5. FAQ teaser -------------------------------------------------------

export function FAQTeaser() {
  const featured = faqs.slice(0, 3);

  return (
    <section id="faq" className="border-y border-navy-100 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="The questions every Ireland-bound student arrives with."
              description="See the full FAQ for visa timelines, scholarships, accommodation and Type D documentation."
            />
            <Link
              href="/faq"
              className={`mt-7 inline-flex w-full sm:w-fit ${buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}`}
            >
              See full FAQ
            </Link>
          </div>

          <ul className="flex flex-col divide-y divide-navy-100 border border-navy-100 bg-white">
            {featured.map((f) => (
              <li key={f.q} className="p-6 sm:p-7">
                <p className="font-display text-lg font-semibold text-navy-900">
                  {f.q}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
