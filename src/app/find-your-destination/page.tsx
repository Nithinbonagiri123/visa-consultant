import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { DestinationFinder } from "@/components/finder/destination-finder";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Study Destination Finder — Personalised Recommendations",
  description:
    "Free 60-second tool that recommends the best study-abroad destinations for Indian students based on budget, field of interest, priorities, and English readiness.",
  alternates: { canonical: "/find-your-destination" },
  openGraph: {
    title: "Study Destination Finder — Campus Meridian",
    description:
      "Free 60-second tool that recommends the best study-abroad destinations for Indian students.",
    type: "website",
  },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Destination Finder" },
];

export default function FinderPage() {
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
            eyebrow="60-second matchmaker"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Find your perfect <span className="gradient-text">study destination</span>.
              </>
            }
            description="Five quick questions. We rank all nine destinations against your goals — instant, free, and built on the same scoring framework our senior counsellors use."
          />
        </Container>
      </section>

      <DestinationFinder />

      <CTABand />
    </>
  );
}
