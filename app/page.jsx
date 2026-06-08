import Background from "../src/components/Background";
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Marquee from "../src/components/Marquee";
import Services from "../src/components/Services";
import Process from "../src/components/Process";
import Universities from "../src/components/Universities";
import Testimonials from "../src/components/Testimonials";
import Pricing from "../src/components/Pricing";
import FAQ from "../src/components/FAQ";
import CTA from "../src/components/CTA";
import Footer from "../src/components/Footer";

export default function Page() {
  return (
    <main className="relative w-full overflow-x-hidden text-white">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Universities />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
