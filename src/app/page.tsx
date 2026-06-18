import { Hero } from "@/components/sections/hero";
import { TrustStats } from "@/components/sections/trust-stats";
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
      <TrustStats />
      <DestinationsTeaser />
      <ServicesTeaser />
      <ToolsTeaser />
      <StoriesTeaser />
      <FAQTeaser />
      <CTABand />
    </>
  );
}
