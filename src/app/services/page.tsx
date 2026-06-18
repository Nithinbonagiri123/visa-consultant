import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { Services } from "@/components/sections/services";
import { OrganizationJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Our Services — End-to-End Study Abroad Support",
  description:
    "Eight services that make Campus Meridian an end-to-end study-abroad partner — university admissions, student visa, scholarships, SOP/LOR, IELTS/PTE, education loans, accommodation and pre-departure support.",
  alternates: { canonical: "/services" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Services" },
];

export default function ServicesPage() {
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
            eyebrow="What we do"
            title={
              <>
                Eight services. <br />
                One uninterrupted <span className="gradient-text">journey</span>.
              </>
            }
            description="From the day you reach out to the day you land — a single dedicated counsellor and a senior team behind them. Every service is included in our single, transparent fee."
          />
        </Container>
      </section>

      <Services />

      <CTABand />
    </>
  );
}
