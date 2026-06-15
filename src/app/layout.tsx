import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { CurrencyProvider } from "@/contexts/currency-context";
import { CrispChat } from "@/components/integrations/crisp-chat";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "study abroad consultants India",
    "overseas education consultants India",
    "student visa consultants India",
    "best education consultants in India",
    "Ireland education consultants India",
    "UK study visa consultants",
    "Canada student visa consultants",
    "Australia education consultants",
    "USA study abroad consultants",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1733",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <CurrencyProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <WhatsAppButton />
          <MobileCtaBar />
        </CurrencyProvider>
        <CrispChat />
      </body>
    </html>
  );
}
