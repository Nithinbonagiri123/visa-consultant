import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { AdmitCalculator } from "@/components/admit/admit-calculator";

export const metadata: Metadata = {
  title: "University Admit Probability Calculator — Find Your Shortlist",
  description:
    "Free tool that ranks 10 leading universities by admit probability for Indian students — input your academic %, IELTS, and GRE/GMAT to get Reach / Target / Safe buckets.",
  alternates: { canonical: "/admit-probability" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Admit Calculator" },
];

export default function AdmitProbabilityPage() {
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
            eyebrow="Admit probability"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Where do you <span className="gradient-text">actually</span> stand a chance?
              </>
            }
            description="Real-time shortlist across the 10 universities Indian students apply to most. Adjust your academic %, IELTS, and GRE/GMAT — see which schools are Safe, Target, or Reach for your profile."
          />
        </Container>
      </section>

      <AdmitCalculator />

      <CTABand />
    </>
  );
}
