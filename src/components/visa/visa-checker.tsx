"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Globe,
  GraduationCap,
  Languages,
  Wallet,
  Clock,
  FileCheck,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EmailResultButton } from "@/components/forms/email-result-button";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/site";
import {
  academicBuckets,
  ieltsBuckets,
  fundsBuckets,
  gapBuckets,
  visaProfiles,
} from "@/lib/visa-data";
import {
  evaluateEligibility,
  type EligibilityResult,
} from "@/lib/visa-engine";

type StepId =
  | "country"
  | "academic"
  | "english"
  | "funds"
  | "gap"
  | "history";

const STEPS: { id: StepId; title: string; subtitle: string; icon: typeof Wallet }[] = [
  { id: "country",  title: "Which country are you applying to?", subtitle: "Each consulate scores differently.",     icon: Globe },
  { id: "academic", title: "Your latest academic record",         subtitle: "Use your most recent overall percentage.", icon: GraduationCap },
  { id: "english",  title: "English test status",                  subtitle: "IELTS or PTE equivalent.",                 icon: Languages },
  { id: "funds",    title: "Funds available for year one",         subtitle: "Tuition + living, ready to show.",         icon: Wallet },
  { id: "gap",      title: "Gap since last degree",               subtitle: "Counts both work and waiting years.",      icon: Clock },
  { id: "history",  title: "A couple of final factors",            subtitle: "Quick yes/no.",                            icon: FileCheck },
];

type Answers = {
  country: string;
  academic: string;
  english: string;
  funds: string;
  gap: string;
  hasAdmit: boolean | null;
  hasPriorRejection: boolean | null;
};

const INITIAL: Answers = {
  country: "",
  academic: "",
  english: "",
  funds: "",
  gap: "",
  hasAdmit: null,
  hasPriorRejection: null,
};

export function VisaChecker({ initialCountry }: { initialCountry?: string }) {
  const [stepIdx, setStepIdx] = useState(initialCountry ? 1 : 0);
  const [answers, setAnswers] = useState<Answers>({
    ...INITIAL,
    country: initialCountry ?? "",
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const progress = ((stepIdx + (result ? 1 : 0)) / STEPS.length) * 100;

  const canAdvance = useMemo(() => {
    switch (step.id) {
      case "country":  return !!answers.country;
      case "academic": return !!answers.academic;
      case "english":  return !!answers.english;
      case "funds":    return !!answers.funds;
      case "gap":      return !!answers.gap;
      case "history":  return answers.hasAdmit !== null && answers.hasPriorRejection !== null;
    }
  }, [step.id, answers]);

  function advance() {
    if (isLast) {
      const academic = academicBuckets.find((b) => b.value === answers.academic)!;
      const english = ieltsBuckets.find((b) => b.value === answers.english)!;
      const funds = fundsBuckets.find((b) => b.value === answers.funds)!;
      const gap = gapBuckets.find((b) => b.value === answers.gap)!;
      const r = evaluateEligibility({
        country: answers.country,
        academicPct: academic.midpoint,
        ieltsBand: english.band,
        fundsReadyINR: funds.midpointINR,
        studyGapYears: gap.years,
        hasAdmit: answers.hasAdmit === true,
        hasPriorRejection: answers.hasPriorRejection === true,
      });
      setResult(r);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function reset() {
    setAnswers({ ...INITIAL, country: initialCountry ?? "" });
    setResult(null);
    setStepIdx(initialCountry ? 1 : 0);
  }

  return (
    <Container className="pb-24">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-elevated">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-royal-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative p-6 sm:p-10">
          <ProgressBar percent={progress} />

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`step-${step.id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <StepHeader step={step} index={stepIdx} total={STEPS.length} />

                <div className="mt-8">
                  {step.id === "country" && (
                    <CountryGrid
                      value={answers.country}
                      onChange={(v) => setAnswers({ ...answers, country: v })}
                    />
                  )}
                  {step.id === "academic" && (
                    <RadioGrid
                      options={academicBuckets.map((b) => ({ value: b.value, label: b.label }))}
                      value={answers.academic}
                      onChange={(v) => setAnswers({ ...answers, academic: v })}
                    />
                  )}
                  {step.id === "english" && (
                    <RadioGrid
                      options={ieltsBuckets.map((b) => ({ value: b.value, label: b.label }))}
                      value={answers.english}
                      onChange={(v) => setAnswers({ ...answers, english: v })}
                      columns={3}
                    />
                  )}
                  {step.id === "funds" && (
                    <RadioGrid
                      options={fundsBuckets.map((b) => ({ value: b.value, label: b.label }))}
                      value={answers.funds}
                      onChange={(v) => setAnswers({ ...answers, funds: v })}
                    />
                  )}
                  {step.id === "gap" && (
                    <RadioGrid
                      options={gapBuckets.map((b) => ({ value: b.value, label: b.label }))}
                      value={answers.gap}
                      onChange={(v) => setAnswers({ ...answers, gap: v })}
                    />
                  )}
                  {step.id === "history" && (
                    <div className="flex flex-col gap-6">
                      <YesNo
                        question="Do you already have an admit letter from a university?"
                        value={answers.hasAdmit}
                        onChange={(v) => setAnswers({ ...answers, hasAdmit: v })}
                      />
                      <YesNo
                        question="Have you ever had a student visa rejected (any country)?"
                        value={answers.hasPriorRejection}
                        onChange={(v) => setAnswers({ ...answers, hasPriorRejection: v })}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setStepIdx((i) => Math.max(initialCountry ? 1 : 0, i - 1))
                    }
                    disabled={stepIdx <= (initialCountry ? 1 : 0)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={advance}
                    disabled={!canAdvance}
                    className={cn(
                      buttonVariants({ variant: "gold", size: "lg" }),
                      "disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                  >
                    {isLast ? "Check eligibility" : "Continue"}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Result result={result} onReset={reset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}

// ----- subcomponents --------------------------------------------------------

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
      <motion.div
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-royal-500 via-royal-400 to-gold-400"
      />
    </div>
  );
}

function StepHeader({
  step,
  index,
  total,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
}) {
  const Icon = step.icon;
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-300">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
          Step {index + 1} of {total}
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-900">
          {step.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
      </div>
    </div>
  );
}

function CountryGrid({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((d) => {
        const active = value === d.slug;
        return (
          <button
            key={d.slug}
            type="button"
            onClick={() => onChange(d.slug)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200",
              active
                ? "border-navy-900 bg-navy-900 text-white shadow-elevated"
                : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50",
            )}
          >
            <span className="text-2xl leading-none">{d.flag}</span>
            <span>{d.country}</span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "group relative flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200",
              active
                ? "border-navy-900 bg-navy-900 text-white shadow-elevated"
                : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50",
            )}
          >
            <span>{o.label}</span>
            <span
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full border transition-colors",
                active ? "border-gold-300 bg-gold-300 text-navy-900" : "border-navy-200",
              )}
            >
              {active && <CheckCircle2 size={14} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function YesNo({
  question,
  value,
  onChange,
}: {
  question: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5">
      <p className="font-display text-base font-semibold text-navy-900">
        {question}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Yes", v: true },
          { label: "No",  v: false },
        ].map((opt) => {
          const active = value === opt.v;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onChange(opt.v)}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----- result panel ---------------------------------------------------------

function Result({
  result,
  onReset,
}: {
  result: EligibilityResult;
  onReset: () => void;
}) {
  const profile = visaProfiles[result.country];
  const dest = destinations.find((d) => d.slug === result.country);

  return (
    <div>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <ScoreRing score={result.score} band={result.band} />
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
            <Sparkles size={12} /> {result.bandLabel}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-900">
            {dest?.flag} {dest?.country} · {profile?.visaType}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {result.bandBlurb}
          </p>
        </div>
      </div>

      {result.expedited && (
        <div className="mt-8 rounded-2xl border border-royal-500/20 bg-royal-500/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">
            Expedited pathway available
          </p>
          <p className="mt-1 text-sm text-navy-800">{result.expedited}</p>
        </div>
      )}

      {result.strengths.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
            What you have going for you
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {result.strengths.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-navy-900"
              >
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.gaps.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
            What to address before applying
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {result.gaps.map((g) => (
              <li
                key={g.title}
                className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-sm"
              >
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-semibold text-navy-900">{g.title}</p>
                  <p className="mt-1 text-navy-800">{g.action}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <EmailResultButton
          tool="visa-eligibility"
          label="Email me this eligibility report"
          payload={{
            country: result.country,
            score: result.score,
            band: result.band,
            visaType: result.visaType,
            strengths: result.strengths,
            gaps: result.gaps,
          }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#enquire"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Build a plan with a counsellor <ArrowRight size={18} />
        </Link>
        {dest && (
          <Link
            href={`/study-in-${dest.slug}`}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            See Study in {dest.country}
          </Link>
        )}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}

function ScoreRing({
  score,
  band,
}: {
  score: number;
  band: EligibilityResult["band"];
}) {
  const radius = 58;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  const ringColor =
    band === "strong"   ? "stroke-emerald-500" :
    band === "moderate" ? "stroke-gold-400" :
                          "stroke-amber-500";

  return (
    <div className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full bg-navy-50">
      <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0">
        <circle
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="10"
          className="fill-none stroke-navy-100"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="10"
          strokeLinecap="round"
          className={cn("fill-none", ringColor)}
          initial={{ strokeDasharray: c, strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="relative text-center">
        <p className="font-display text-4xl font-semibold leading-none text-navy-900">
          {score}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-500">
          out of 100
        </p>
      </div>
    </div>
  );
}
