"use client";

import { ArrowRight, ShieldCheck, GraduationCap, Plane, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28">
      <HeroBackground />

      <Container className="relative">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-sm border border-navy-200 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-800 sm:text-xs">
              <ShieldCheck size={14} className="text-gold-500" />
              India · Ireland · Specialist Consultants
            </div>

            <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-navy-900 sm:mt-7 sm:text-5xl lg:text-[4.25rem]">
              Your pathway to studying in{" "}
              <span className="italic text-gold-500">Ireland</span>,
              <br className="hidden sm:inline" /> guided from day one.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:mt-8 sm:text-base lg:text-lg">
              We are senior education counsellors focused entirely on Ireland —
              from <span className="text-navy-900 font-medium">Trinity College Dublin, UCD and University of Galway</span> admissions
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
    <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-navy-100 pt-6 sm:grid-cols-3">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3 text-sm text-navy-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold-400/40 bg-white text-gold-500">
            <Icon size={16} />
          </span>
          <span className="font-medium">{label}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Static editorial background.
 *
 * Layer 1 — a cream wash (warm, institutional, replaces the SaaS orbs).
 * Layer 2 — an optional photograph at /public/hero-bg.jpg (educational /
 *           professional scene, e.g. a library, campus, or consultation).
 *           Drop your own asset there to enable it; until then the layer
 *           shows nothing and the cream wash carries the section.
 * Layer 3 — a soft cream-to-transparent gradient over the photo so the
 *           headline stays legible regardless of the chosen image.
 */
function HeroBackground() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ background: "var(--surface-cream)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[image:var(--hero-bg)] bg-cover bg-center opacity-[0.18]"
        style={{
          ["--hero-bg" as never]: "url('/hero-bg.jpg')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, var(--surface-cream) 0%, rgba(250,247,240,0.85) 35%, rgba(250,247,240,0.2) 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gold-400/30" />
    </>
  );
}
