"use client";

import { Container, SectionHeading } from "@/components/ui/container";
import { universities } from "@/lib/site";

export function Universities() {
  const row = [...universities, ...universities];

  return (
    <section id="universities" className="relative py-16 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="University partners"
          align="center"
          title={
            <>
              Where our students <span className="gradient-text">graduate</span>.
            </>
          }
          description="A selection of leading universities where Campus Meridian students have been admitted."
          className="mx-auto items-center text-center"
        />
      </Container>

      <div
        className="relative mt-10 overflow-hidden sm:mt-16"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-4">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-16 min-w-[200px] items-center justify-center rounded-xl border border-navy-100 bg-white px-5 text-center font-display text-[13px] font-semibold tracking-tight text-navy-800 shadow-[0_1px_2px_rgba(10,23,51,0.04)] sm:h-20 sm:min-w-[260px] sm:rounded-2xl sm:px-8 sm:text-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
