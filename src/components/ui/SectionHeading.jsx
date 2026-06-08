"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  italic,
  trailing,
  description,
  align = "left",
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.32em] uppercase text-white/50 mb-5"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.04] text-white"
      >
        {title}
        {italic && (
          <>
            {" "}
            <em className="font-serif italic font-normal text-white/95">
              {italic}
            </em>
          </>
        )}
        {trailing && <> {trailing}</>}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base text-white/60 max-w-xl leading-relaxed"
          style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
