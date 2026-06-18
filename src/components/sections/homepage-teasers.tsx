"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Plane,
  Trophy,
  PenLine,
  Compass,
  ShieldCheck,
  Calculator,
  Scale,
  Quote,
  Plus,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Cost } from "@/components/ui/cost";
import { destinations, services, testimonials, faqs } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Featured countries on the home teaser — the four most-asked-about by Indian
// students. Everyone else lives on /destinations.
const FEATURED_COUNTRY_SLUGS = ["canada", "ireland", "uk", "australia"];

const SERVICE_ICONS = { GraduationCap, Plane, Trophy, PenLine } as const;
const FEATURED_SERVICE_TITLES = [
  "University Admissions",
  "Student Visa Assistance",
  "Scholarship Guidance",
  "SOP & LOR Crafting",
];

const FEATURED_TOOLS = [
  { href: "/find-your-destination", title: "Destination Finder", blurb: "Five questions → ranked country shortlist.", icon: Compass },
  { href: "/visa-eligibility", title: "Visa Eligibility Check", blurb: "Country-specific scoring with concrete next steps.", icon: ShieldCheck },
  { href: "/loan-emi-calculator", title: "Education Loan EMI", blurb: "Real-time EMI math and payback projections.", icon: Calculator },
  { href: "/compare", title: "Country Comparator", blurb: "Side-by-side cost, visa, stay-back, universities.", icon: Scale },
] as const;

// ----- 1. Destinations teaser ----------------------------------------------

export function DestinationsTeaser() {
  const featured = FEATURED_COUNTRY_SLUGS
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d): d is (typeof destinations)[number] => Boolean(d));

  return (
    <section id="destinations" className="relative py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Destinations"
            title={
              <>
                Study where ambition meets <span className="gradient-text">opportunity</span>.
              </>
            }
            description="Nine destinations, eight cities. Real graduate outcomes, transparent costs, and consulate-tuned visa strategy for each one."
          />
          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-royal-600 hover:text-navy-900"
          >
            See all destinations <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: easeOut }}
            >
              <Link
                href={`/study-in-${d.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated transition-shadow hover:shadow-[0_24px_48px_-20px_rgba(10,23,51,0.25)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl leading-none">{d.flag}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <p className="mt-4 font-display text-xl font-semibold tracking-tight text-navy-900">
                  {d.country}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-navy-500">
                  {d.intakes}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {d.blurb}
                </p>
                <div className="mt-5 flex items-baseline justify-between border-t border-navy-100 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Tuition from
                  </span>
                  <span className="font-display text-base font-semibold text-navy-900">
                    <Cost inr={d.costFromINR} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
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
    <section id="services" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Eight services. <span className="gradient-text">One</span> uninterrupted journey.
              </>
            }
            description="From the day you reach out to the day you land — a single dedicated counsellor and a senior team behind them."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-royal-600 hover:text-navy-900"
          >
            See all services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon as keyof typeof SERVICE_ICONS];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
                className="group flex flex-col gap-5 bg-white p-7"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-900 text-white transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-gold-300 group-hover:to-gold-500 group-hover:text-navy-900">
                  {Icon && <Icon size={18} />}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ----- 3. Tools teaser -----------------------------------------------------

export function ToolsTeaser() {
  return (
    <section className="relative py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Free tools"
            title={
              <>
                Seven tools to plan your <span className="gradient-text">move</span>.
              </>
            }
            description="Try the same tools our senior counsellors use during your free consultation. Browser-only, instant, no email required."
          />
          <Link
            href="/tools"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-royal-600 hover:text-navy-900"
          >
            See all tools <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_TOOLS.map((t, i) => (
            <motion.div
              key={t.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: easeOut }}
            >
              <Link
                href={t.href}
                className="group flex h-full items-start gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-elevated transition-shadow hover:shadow-[0_24px_48px_-20px_rgba(10,23,51,0.25)]"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                  <t.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                    {t.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {t.blurb}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="mt-1 shrink-0 text-navy-500 transition-colors group-hover:text-navy-900"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ----- 4. Stories teaser ---------------------------------------------------

export function StoriesTeaser() {
  const featured = testimonials.slice(0, 2);

  return (
    <section id="stories" className="relative py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Success stories"
            title={
              <>
                Real students. <br />
                Real <span className="gradient-text">outcomes</span>.
              </>
            }
            description="A small taste of what our students have gone on to achieve. Every story is anchored to one senior counsellor who owned the journey."
          />
          <Link
            href="/stories"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-royal-600 hover:text-navy-900"
          >
            Read all stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: easeOut }}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-elevated"
            >
              <div className="absolute -right-6 -top-6 text-navy-100">
                <Quote size={96} strokeWidth={1} />
              </div>
              <blockquote className="relative font-display text-xl font-medium leading-snug tracking-tight text-navy-900">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative flex items-center gap-4 border-t border-navy-100 pt-5">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-navy-700 font-display text-sm font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-navy-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.course} · {t.university}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800">
                  {t.country}
                </span>
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
    <section id="faq" className="relative py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  Top three <span className="gradient-text">questions</span>.
                </>
              }
              description="The questions every student arrives with. See all six on the full FAQ page."
            />
            <Link
              href="/faq"
              className={`mt-8 inline-flex w-fit ${buttonVariants({ variant: "outline", size: "lg" })}`}
            >
              See full FAQ
            </Link>
          </div>

          <ul className="flex flex-col divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white">
            {featured.map((f) => (
              <li key={f.q} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                    {f.q}
                  </p>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-navy-100 text-navy-500">
                    <Plus size={14} />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
