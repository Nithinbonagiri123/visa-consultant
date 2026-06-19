import { Hero } from "@/components/sections/hero";
import { Accreditations } from "@/components/sections/accreditations";
import { TrustStats } from "@/components/sections/trust-stats";
import { StudentEmployers } from "@/components/sections/student-employers";
import {
  DestinationsTeaser,
  ServicesTeaser,
  ToolsTeaser,
  StoriesTeaser,
  FAQTeaser,
} from "@/components/sections/homepage-teasers";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/seo/jsonld";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />
      <Hero />
      <Accreditations />
      <TrustStats />
      <DestinationsTeaser />
      <ServicesTeaser />
      <ToolsTeaser />
      <StudentEmployers />
      <StoriesTeaser />
      <FAQTeaser />
      <CTABand />
    </>
  );
}
