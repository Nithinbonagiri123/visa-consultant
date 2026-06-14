import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { EMICalculator } from "@/components/calculator/emi-calculator";

export const metadata: Metadata = {
  title: "Education Loan EMI Calculator — For Indian Students Going Abroad",
  description:
    "Calculate your monthly education-loan EMI for studying abroad. Adjust loan amount, interest rate, and tenure — see EMI, total interest, and full payback at a glance.",
  alternates: { canonical: "/loan-emi-calculator" },
  openGraph: {
    title: "Education Loan EMI Calculator — Campus Meridian",
    description:
      "Free education-loan EMI calculator for Indian students planning to study abroad.",
    type: "website",
  },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "EMI Calculator" },
];

export default function EMIPage() {
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
            eyebrow="Education loan EMI"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Your study-abroad <span className="gradient-text">EMI</span>, in real time.
              </>
            }
            description="Adjust the loan amount, interest rate, and tenure. See your monthly EMI, total interest, and what 60% loan vs. 40% family contribution actually means in rupees."
          />
        </Container>
      </section>

      <EMICalculator />

      <CTABand />
    </>
  );
}
