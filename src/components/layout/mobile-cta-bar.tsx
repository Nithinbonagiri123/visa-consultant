"use client";

import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { useWhatsAppHref } from "@/components/layout/whatsapp-button";

export function MobileCtaBar() {
  const number = site.contact.whatsapp.replace(/[^\d]/g, "");
  const whatsappHref = useWhatsAppHref(number);
  const telHref = `tel:${site.contact.phone.replace(/\s/g, "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div
        className="bg-gradient-to-t from-white via-white/95 to-transparent px-4 pb-4 pt-6"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <div className="flex gap-2 rounded-full border border-navy-100 bg-white p-1.5 shadow-[0_12px_40px_-8px_rgba(10,23,51,0.25)]">
          <a
            href="/#enquire"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-900 px-3 py-3 text-sm font-semibold text-white"
          >
            <Calendar size={16} />
            Book
          </a>
          <a
            href={telHref}
            aria-label="Call us"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal-500 text-white"
          >
            <Phone size={18} />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 11.985C.003 5.369 5.373 0 11.985 0c3.207 0 6.222 1.248 8.487 3.513a11.882 11.882 0 013.51 8.487c-.003 6.616-5.374 11.986-11.99 11.986a11.99 11.99 0 01-5.733-1.459L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.003-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
