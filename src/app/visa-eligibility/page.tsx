import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { VisaChecker } from "@/components/visa/visa-checker";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { visaProfiles } from "@/lib/visa-data";

export const metadata: Metadata = {
  title: "Student Visa Eligibility Checker — Country-by-country",
  description:
    "Free 90-second student visa eligibility check for Indian students. Get a country-specific readiness score with strengths, gaps, and the exact next steps to close them.",
  alternates: { canonical: "/visa-eligibility" },
  openGraph: {
    title: "Student Visa Eligibility Checker — Campus Meridian",
    description:
      "Free 90-second student visa eligibility check with country-specific scoring and next steps.",
    type: "website",
  },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Visa Eligibility" },
];

export default function VisaEligibilityPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
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
            eyebrow="90-second eligibility check"
            align="center"
            className="mx-auto items-center text-center"
            title={
              <>
                Will you clear the <span className="gradient-text">student visa</span>?
              </>
            }
            description="Six questions. We benchmark your profile against the country-specific bar that real consulates use — instant, free, and honest. Strengths and gaps come with concrete next steps, not generic advice."
          />
        </Container>
      </section>

      <VisaCheckerWithCountry searchParams={searchParams} />

      <CTABand />
    </>
  );
}

async function VisaCheckerWithCountry({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const params = await searchParams;
  const requested = params.country;
  const initialCountry =
    requested && visaProfiles[requested] ? requested : undefined;
  return <VisaChecker initialCountry={initialCountry} />;
}
