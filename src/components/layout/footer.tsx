import Link from "next/link";
import { site, navLinks } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const toolLinks = [
  { label: "Destination Finder", href: "/find-your-destination" },
  { label: "Visa Eligibility", href: "/visa-eligibility" },
  { label: "EMI Calculator", href: "/loan-emi-calculator" },
  { label: "Admit Probability", href: "/admit-probability" },
  { label: "Scholarship Match", href: "/scholarships" },
  { label: "Country Comparator", href: "/compare" },
] as const;

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Free Guides", href: "/guides" },
  { label: "Glossary", href: "/glossary" },
  { label: "Counsellors", href: "/counsellors" },
  { label: "FAQ", href: "/faq" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-navy-950 text-navy-100 sm:mt-32">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-royal-500/20 blur-3xl" />

      <Container className="relative py-12 sm:py-20">
        {/* Newsletter band */}
        <div className="grid gap-6 border-b border-white/10 pb-8 sm:gap-8 sm:pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:text-xs sm:tracking-[0.2em]">
              Newsletter
            </p>
            <h3 className="mt-3 max-w-xl font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              One short email a fortnight. Country updates, scholarship deadlines, intake reminders.
            </h3>
          </div>
          <NewsletterForm variant="dark" />
        </div>

        {/* Columns */}
        <div className="grid gap-10 pt-10 sm:gap-12 sm:pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L3 7l9 5 9-5-9-5z" />
                  <path d="M3 13l9 5 9-5" />
                  <path d="M3 18l9 5 9-5" />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold text-white">
                {site.name}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-navy-200">
              {site.tagline}. End-to-end support from shortlisting to landing —
              run by senior counsellors who&apos;ve placed thousands of students at
              the world&apos;s leading universities.
            </p>
            <div className="mt-6 space-y-1 text-sm text-navy-200">
              <p>{site.contact.address}</p>
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>

          <FooterCol title="Explore">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Tools">
            {toolLinks.map((t) => (
              <FooterLink key={t.href} href={t.href}>
                {t.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Resources">
            {resourceLinks.map((r) => (
              <FooterLink key={r.href} href={r.href}>
                {r.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-navy-300 sm:mt-16 sm:pt-8 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {/* Privacy + Terms pages aren't built yet; show as muted text so we
                don't ship dead `href="#"` anchors that scroll to top. */}
            <span className="text-navy-400">Privacy</span>
            <span className="text-navy-400">Terms</span>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-300">
        {title}
      </p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-navy-200 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
