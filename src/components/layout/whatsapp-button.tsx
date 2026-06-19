"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { buildWhatsAppMessage } from "@/lib/whatsapp";

const FALLBACK_MESSAGE = "I'd like to know more about studying abroad.";

function defaultHref(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(`Hi ${site.name}, ${FALLBACK_MESSAGE}`)}`;
}

export function WhatsAppButton() {
  const number = site.contact.whatsapp.replace(/[^\d]/g, "");
  const href = useWhatsAppHref(number);
  const telHref = `tel:${site.contact.phone.replace(/\s/g, "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex"
    >
      <a
        href={telHref}
        aria-label="Call us"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-navy-900 text-white shadow-[0_12px_40px_-8px_rgba(10,23,51,0.55)] ring-2 ring-white/70 transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.42.6 3.7.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.28.21 2.54.6 3.7a1 1 0 0 1-.24 1.05l-2.24 2.04z"/></svg>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.55)] ring-2 ring-white/70 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor">
          <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 11.985C.003 5.369 5.373 0 11.985 0c3.207 0 6.222 1.248 8.487 3.513a11.882 11.882 0 013.51 8.487c-.003 6.616-5.374 11.986-11.99 11.986a11.99 11.99 0 01-5.733-1.459L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.003-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </motion.div>
  );
}

// Renders with a sensible default href at SSR (no useSearchParams() during render
// → no static-prerender bailout). Once hydrated, reads window.location.search and
// computes the context-aware message for the current page.
export function useWhatsAppHref(number: string): string {
  const pathname = usePathname();
  const [href, setHref] = useState(() => defaultHref(number));

  useEffect(() => {
    const search =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : undefined;
    const msg = buildWhatsAppMessage(pathname || "/", search);
    setHref(
      `https://wa.me/${number}?text=${encodeURIComponent(`Hi ${site.name}, ${msg}`)}`,
    );
  }, [pathname, number]);

  return href;
}
