import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { ScholarshipMatcher } from "@/components/scholarships/scholarship-matcher";

export const metadata: Metadata = {
  title: "Scholarship Match Tool — Find Scholarships for Indian Students Abroad",
  description:
    "Free scholarship matcher for Indian students studying abroad — Chevening, Fulbright, DAAD, Vanier, Eiffel, university merit awards and more, filtered by your profile.",
  alternates: { canonical: "/scholarships" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Scholarships" },
];

export default function ScholarshipsPage() {
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
            eyebrow="Scholarship match"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Find the <span className="gradient-text">scholarships</span> you qualify for.
              </>
            }
            description="Filter by destination, field, and study level. We surface the ones that genuinely fit — from fully-funded marquee awards to high-conversion university merit waivers."
          />
        </Container>
      </section>

      <ScholarshipMatcher />

      <CTABand />
    </>
  );
}
