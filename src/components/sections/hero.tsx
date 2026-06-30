"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, GraduationCap, Plane, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { stockImages, stockSrc } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />

      <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative">
            <div className="inline-flex items-center gap-2 border border-navy-900/15 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-800 shadow-sm sm:text-xs">
              <ShieldCheck size={14} className="text-gold-500" />
              India &middot; Ireland &middot; Specialist Consultants
            </div>

            <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-navy-900 sm:mt-7 sm:text-5xl lg:text-[4.25rem]">
              Your pathway to studying in{" "}
              <span className="italic text-gold-500">Ireland</span>,
              <br className="hidden sm:inline" /> guided from day one.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-navy-800 sm:mt-7 sm:text-base lg:text-lg">
              We are senior education counsellors focused entirely on Ireland —
              from <span className="font-semibold text-navy-900">Trinity College Dublin, UCD and University of Galway</span> admissions
              to Type D student visas, scholarships and your first job after graduation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#enquire"
                className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
              >
                Book free Ireland consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="/visa-eligibility"
                className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
              >
                Check Ireland visa eligibility
              </a>
            </div>

            <ProofPoints />

            <ConsultationCard />
          </div>

          <div className="lg:pt-1">
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofPoints() {
  const items = [
    { icon: GraduationCap, label: "2,400+ Ireland admits" },
    { icon: Plane,         label: "96% visa approval" },
    { icon: Trophy,        label: "€2.4M scholarships unlocked" },
  ];
  return (
    <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-navy-900/10 pt-6 sm:grid-cols-3">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3 text-sm text-navy-900">
          <span className="flex h-9 w-9 items-center justify-center border border-gold-400 bg-white text-gold-500">
            <Icon size={16} strokeWidth={1.75} />
          </span>
          <span className="font-medium">{label}</span>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <figure className="mt-10 hidden max-w-md border-l-2 border-gold-400 bg-white p-5 shadow-elevated lg:flex lg:items-center lg:gap-4">
      <Image
        src={stockSrc(stockImages.studentsConsulting, 280)}
        alt={stockImages.studentsConsulting.alt}
        width={140}
        height={140}
        className="h-28 w-28 shrink-0 object-cover"
      />
      <figcaption className="text-sm leading-relaxed text-navy-800">
        <p className="font-display text-base font-semibold text-navy-900">
          A senior counsellor, one student.
        </p>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Every Ireland application is owned end-to-end by one specialist. No handoffs, no junior reviewers.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Prominent photographic hero background.
 *
 * Layer 1 — full-bleed photograph (spiral library, evokes Trinity Long Room).
 * Layer 2 — cream gradient from the left so the left-column headline + form
 *           area stays legible while the right side keeps the photo visible.
 * Layer 3 — a thin navy underbar to anchor the section.
 *
 * Replace the photograph in [src/lib/images.ts](src/lib/images.ts) once we
 * have an Ireland-specific commissioned shot (Trinity Long Room, UCD library,
 * Dublin campus, or a real consultation in our office).
 */
function HeroBackground() {
  const heroPhoto = stockSrc(stockImages.heroLibrary, 1800, 70);
  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-30 bg-surface-cream" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroPhoto}')` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(95deg, var(--surface-cream) 0%, rgba(250,247,240,0.96) 35%, rgba(250,247,240,0.55) 65%, rgba(250,247,240,0.18) 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-navy-900/10" />
    </>
  );
}
