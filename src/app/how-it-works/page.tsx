import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { Journey } from "@/components/sections/journey";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "How It Works — Our 6-Step Study Abroad Journey",
  description:
    "The Campus Meridian process — six steps from your free consultation to landing on campus. Clear timelines, what to expect, and what your counsellor handles end-to-end.",
  alternates: { canonical: "/how-it-works" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "How It Works" },
];

export default function HowItWorksPage() {
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
            eyebrow="The journey"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Six steps. One <span className="gradient-text">life-defining</span> outcome.
              </>
            }
            description="A clear, measurable path from the first conversation to your flight abroad. Every step is owned by one senior counsellor — no handoffs, no surprises."
          />
        </Container>
      </section>

      <Journey />

      <CTABand />
    </>
  );
}
