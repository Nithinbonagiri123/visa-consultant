import { Hero } from "@/components/sections/hero";
import { TrustStats } from "@/components/sections/trust-stats";
import { Destinations } from "@/components/sections/destinations";
import { Services } from "@/components/sections/services";
import { Journey } from "@/components/sections/journey";
import { Universities } from "@/components/sections/universities";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/seo/jsonld";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />
      <Hero />
      <TrustStats />
      <Destinations />
      <Services />
      <Journey />
      <Universities />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
