"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Target,
  Shield,
  Flame,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EmailResultButton } from "@/components/forms/email-result-button";
import { cn } from "@/lib/utils";
import { getAdmitProgrammes, evaluateAdmits, type AdmitBand } from "@/lib/admit-engine";
import { destinations } from "@/lib/site";

const programmeOptions = getAdmitProgrammes();
const countryName: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
);

export function AdmitCalculator() {
  const [programmeSlug, setProgrammeSlug] = useState(programmeOptions[0].slug);
  const [undergradPct, setUndergradPct] = useState(70);
  const [ieltsBand, setIeltsBand] = useState(7.0);
  const [greScore, setGreScore] = useState(0);    // 0 = not taken
  const [gmatScore, setGmatScore] = useState(0);
  const [workYears, setWorkYears] = useState(0);

  const isMba = programmeSlug === "mba";

  const matches = useMemo(
    () =>
      evaluateAdmits({
        programmeSlug,
        undergradPct,
        ieltsBand,
        greScore: greScore || undefined,
        gmatScore: gmatScore || undefined,
        workYears: isMba ? workYears : undefined,
      }),
    [programmeSlug, undergradPct, ieltsBand, greScore, gmatScore, workYears, isMba],
  );

  const grouped = useMemo(() => {
    return {
      safe:   matches.filter((m) => m.band === "safe"),
      target: matches.filter((m) => m.band === "target"),
      reach:  matches.filter((m) => m.band === "reach"),
    };
  }, [matches]);

  return (
    <Container className="pb-16 sm:pb-24">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* LEFT — inputs */}
        <div className="rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-elevated sm:rounded-[2rem] sm:p-7 lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-gold-300 sm:h-11 sm:w-11 sm:rounded-2xl">
              <GraduationCap size={20} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-navy-900 sm:text-xl">
                Your profile
              </p>
              <p className="text-xs text-muted-foreground">
                Adjust below — matches update live.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:mt-7 sm:gap-6">
            <Field label="Target programme">
              <select
                value={programmeSlug}
                onChange={(e) => setProgrammeSlug(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 pr-9 text-sm focus-visible:outline-none focus-visible:border-royal-500 focus-visible:ring-2 focus-visible:ring-royal-500/15"
              >
                {programmeOptions.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Slider
              label="Undergraduate %"
              displayValue={`${undergradPct}%`}
              min={50}
              max={95}
              step={1}
              value={undergradPct}
              onChange={setUndergradPct}
            />

            <Slider
              label="IELTS band"
              displayValue={
                ieltsBand < 5.5 ? "Not taken / below 5.5" : ieltsBand.toFixed(1)
              }
              min={5}
              max={9}
              step={0.5}
              value={ieltsBand}
              onChange={setIeltsBand}
            />

            <Slider
              label="GRE score"
              displayValue={greScore === 0 ? "Not taken" : String(greScore)}
              min={0}
              max={340}
              step={1}
              value={greScore}
              onChange={setGreScore}
            />

            {isMba && (
              <>
                <Slider
                  label="GMAT score"
                  displayValue={gmatScore === 0 ? "Not taken" : String(gmatScore)}
                  min={0}
                  max={800}
                  step={10}
                  value={gmatScore}
                  onChange={setGmatScore}
                />
                <Slider
                  label="Work experience"
                  displayValue={`${workYears} yr${workYears === 1 ? "" : "s"}`}
                  min={0}
                  max={10}
                  step={1}
                  value={workYears}
                  onChange={setWorkYears}
                />
              </>
            )}
          </div>
        </div>

        {/* RIGHT — results */}
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl lg:text-3xl">
            Your shortlist
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground sm:text-sm">
            {matches.length} universities ranked by fit for{" "}
            {programmeOptions.find((p) => p.slug === programmeSlug)?.shortName}.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8">
            <BandGroup
              title="Safe"
              tag="High-probability admits"
              icon={<Shield size={16} />}
              accent="bg-emerald-100 text-emerald-700"
              matches={grouped.safe}
            />
            <BandGroup
              title="Target"
              tag="Good-fit applications"
              icon={<Target size={16} />}
              accent="bg-royal-100 text-royal-700"
              matches={grouped.target}
            />
            <BandGroup
              title="Reach"
              tag="Ambitious — go for it"
              icon={<Flame size={16} />}
              accent="bg-amber-100 text-amber-700"
              matches={grouped.reach}
            />
          </div>

          {matches.length === 0 && (
            <div className="mt-10 rounded-3xl border border-navy-100 bg-white p-8 text-center text-sm text-muted-foreground shadow-elevated">
              No universities in our catalogue match this programme yet. We
              cover MS CS, MS DS, MS AI, MS Cyber, MBA, and MSc Finance.
            </div>
          )}

          <div className="mt-8">
            <EmailResultButton
              tool="admit-probability"
              label="Email me this university shortlist"
              payload={{
                programmeSlug,
                undergradPct,
                ieltsBand,
                greScore,
                gmatScore,
                workYears,
                matches: matches.map((m) => ({
                  slug: m.university.slug,
                  band: m.band,
                  fitScore: m.fitScore,
                  reasons: m.reasons,
                  gaps: m.gaps,
                })),
              }}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#enquire"
              className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
            >
              Refine with a counsellor <ArrowRight size={18} />
            </Link>
            <Link
              href="/universities"
              className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
            >
              Browse all universities
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-navy-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function Slider({
  label,
  displayValue,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-navy-700">
          {label}
        </span>
        <span className="font-display text-base font-semibold text-navy-900">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-3 w-full appearance-none bg-transparent [-webkit-appearance:none]"
        style={
          {
            background: `linear-gradient(to right, var(--navy-900) 0%, var(--navy-900) ${percent}%, var(--navy-100) ${percent}%, var(--navy-100) 100%)`,
            borderRadius: "9999px",
            height: "6px",
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function BandGroup({
  title,
  tag,
  icon,
  accent,
  matches,
}: {
  title: string;
  tag: string;
  icon: React.ReactNode;
  accent: string;
  matches: ReturnType<typeof evaluateAdmits>;
}) {
  if (matches.length === 0) return null;
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", accent)}>
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
          {title}
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-navy-500">
          {tag} · {matches.length}
        </span>
      </div>
      <ul className="mt-4 grid gap-3">
        {matches.map((m, i) => (
          <motion.li
            key={m.university.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-navy-100 bg-white p-4 shadow-elevated sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/universities/${m.university.slug}`}
                  className="font-display text-[15px] font-semibold tracking-tight text-navy-900 hover:text-royal-600 sm:text-base"
                >
                  {m.university.name}
                </Link>
                <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                  {m.university.city} · {countryName[m.university.countrySlug]} · QS #{m.university.qsRanking}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-xl font-semibold leading-none text-navy-900 sm:text-2xl">
                  {m.fitScore}
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:text-[10px] sm:tracking-[0.16em]">
                  fit / 100
                </p>
              </div>
            </div>

            {(m.reasons.length > 0 || m.gaps.length > 0) && (
              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {m.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-1.5 text-xs text-navy-800">
                    <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{r}</span>
                  </li>
                ))}
                {m.gaps.map((g) => (
                  <li key={g} className="flex items-start gap-1.5 text-xs text-amber-800">
                    <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// Wrap evaluateAdmits as a "type" reference for the inner type
type AdmitMatchType = ReturnType<typeof evaluateAdmits>[number];
export type { AdmitBand, AdmitMatchType };
