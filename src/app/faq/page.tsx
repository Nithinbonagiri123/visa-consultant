import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { FAQ } from "@/components/sections/faq";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Study Abroad From India",
  description:
    "Direct, senior-counsellor answers to the most common study-abroad questions Indian students ask — best country, documents, costs, university selection and more.",
  alternates: { canonical: "/faq" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "FAQ" },
];

export default function FAQPage() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Everything you wanted to ask <span className="gradient-text">before</span> we talked.
              </>
            }
            description="The questions every prospective student arrives with. Senior-counsellor answers — no fluff, no marketing."
          />
        </Container>
      </section>

      <FAQ />

      <CTABand />
    </>
  );
}
