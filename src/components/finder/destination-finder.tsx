"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Trophy,
  Wallet,
  GraduationCap,
  Languages,
  Lightbulb,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/site";
import {
  budgetOptions,
  fieldOptions,
  priorityOptions,
  ieltsOptions,
  academicOptions,
  type Field,
  type Priority,
} from "@/lib/finder-data";
import { rankDestinations, type FinderMatch } from "@/lib/finder-engine";

type StepId = "budget" | "field" | "priorities" | "english" | "academic";

const STEPS: { id: StepId; title: string; subtitle: string; icon: typeof Wallet }[] = [
  { id: "budget",     title: "What's your annual budget?", subtitle: "Tuition + living, all-in.", icon: Wallet },
  { id: "field",      title: "Which field interests you?",  subtitle: "Pick the closest match.",   icon: Lightbulb },
  { id: "priorities", title: "What matters most?",          subtitle: "Pick your top 3.",          icon: Trophy },
  { id: "english",    title: "Where's your English at?",   subtitle: "IELTS or equivalent.",       icon: Languages },
  { id: "academic",   title: "Current academic stage",     subtitle: "So we tailor the plan.",     icon: GraduationCap },
];

type Answers = {
  budgetValue: string;
  field: Field | "";
  priorities: Priority[];
  ielts: string;
  academic: string;
};

const INITIAL: Answers = {
  budgetValue: "",
  field: "",
  priorities: [],
  ielts: "",
  academic: "",
};

export function DestinationFinder() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [results, setResults] = useState<FinderMatch[] | null>(null);

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const progress = ((stepIdx + (results ? 1 : 0)) / STEPS.length) * 100;

  const canAdvance = useMemo(() => {
    switch (step.id) {
      case "budget":     return !!answers.budgetValue;
      case "field":      return !!answers.field;
      case "priorities": return answers.priorities.length > 0;
      case "english":    return !!answers.ielts;
      case "academic":   return !!answers.academic;
    }
  }, [step.id, answers]);

  function advance() {
    if (isLast) {
      const budget = budgetOptions.find((o) => o.value === answers.budgetValue)!;
      const ielts = ieltsOptions.find((o) => o.value === answers.ielts)!;
      const ranked = rankDestinations({
        budgetMaxINR: budget.budgetMaxINR,
        field: answers.field as Field,
        priorities: answers.priorities,
        ieltsBand: ielts.ieltsBand,
        academicStage: answers.academic,
      });
      setResults(ranked);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function reset() {
    setAnswers(INITIAL);
    setResults(null);
    setStepIdx(0);
  }

  return (
    <Container className="pb-24">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-elevated">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-royal-500/10 blur-3xl" />

        <div className="relative p-6 sm:p-10">
          <ProgressBar percent={progress} />

          <AnimatePresence mode="wait">
            {!results ? (
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
                  {step.id === "budget" && (
                    <RadioGrid
                      options={budgetOptions.map((o) => ({ value: o.value, label: o.label }))}
                      value={answers.budgetValue}
                      onChange={(v) => setAnswers({ ...answers, budgetValue: v })}
                    />
                  )}
                  {step.id === "field" && (
                    <RadioGrid
                      options={fieldOptions.map((f) => ({ value: f, label: f }))}
                      value={answers.field}
                      onChange={(v) => setAnswers({ ...answers, field: v as Field })}
                      columns={3}
                    />
                  )}
                  {step.id === "priorities" && (
                    <MultiSelectGrid
                      options={priorityOptions.map((p) => ({ value: p.value, label: p.label, hint: p.hint }))}
                      values={answers.priorities}
                      max={3}
                      onChange={(values) =>
                        setAnswers({ ...answers, priorities: values as Priority[] })
                      }
                    />
                  )}
                  {step.id === "english" && (
                    <RadioGrid
                      options={ieltsOptions.map((o) => ({ value: o.value, label: o.label }))}
                      value={answers.ielts}
                      onChange={(v) => setAnswers({ ...answers, ielts: v })}
                    />
                  )}
                  {step.id === "academic" && (
                    <RadioGrid
                      options={academicOptions.map((o) => ({ value: o.value, label: o.label }))}
                      value={answers.academic}
                      onChange={(v) => setAnswers({ ...answers, academic: v })}
                    />
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                    disabled={stepIdx === 0}
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
                    {isLast ? "See my matches" : "Continue"}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Results matches={results} onReset={reset} />
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
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-royal-500"
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

function MultiSelectGrid({
  options,
  values,
  max,
  onChange,
}: {
  options: { value: string; label: string; hint: string }[];
  values: string[];
  max: number;
  onChange: (v: string[]) => void;
}) {
  function toggle(v: string) {
    if (values.includes(v)) {
      onChange(values.filter((x) => x !== v));
    } else if (values.length < max) {
      onChange([...values, v]);
    }
  }
  const full = values.length >= max;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const active = values.includes(o.value);
          const disabled = !active && full;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => toggle(o.value)}
              disabled={disabled}
              className={cn(
                "relative flex flex-col gap-1 rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                active
                  ? "border-navy-900 bg-navy-900 text-white shadow-elevated"
                  : "border-navy-100 bg-white hover:border-navy-300",
                disabled && "opacity-40",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{o.label}</span>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border transition-colors",
                    active
                      ? "border-gold-300 bg-gold-300 text-navy-900"
                      : "border-navy-200 bg-white",
                  )}
                >
                  {active && <CheckCircle2 size={14} />}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs leading-snug",
                  active ? "text-navy-200" : "text-muted-foreground",
                )}
              >
                {o.hint}
              </p>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {values.length} of {max} selected
      </p>
    </div>
  );
}

function Results({
  matches,
  onReset,
}: {
  matches: FinderMatch[];
  onReset: () => void;
}) {
  const top = matches.slice(0, 3);
  const rest = matches.slice(3);

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
            Your matches
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-900">
            Here&apos;s where you fit best.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on your budget, field, priorities, and English readiness.
          </p>
        </div>
      </div>

      <ol className="mt-10 flex flex-col gap-4">
        {top.map((m, i) => (
          <ResultCard key={m.slug} match={m} rank={i + 1} prominent />
        ))}
      </ol>

      {rest.length > 0 && (
        <details className="mt-6 group">
          <summary className="cursor-pointer list-none rounded-full border border-navy-100 bg-white px-5 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-50">
            <span className="inline-flex items-center gap-2">
              See {rest.length} more matches
              <ArrowRight size={14} className="transition-transform group-open:rotate-90" />
            </span>
          </summary>
          <ol className="mt-4 flex flex-col gap-3">
            {rest.map((m, i) => (
              <ResultCard key={m.slug} match={m} rank={i + 4} />
            ))}
          </ol>
        </details>
      )}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#enquire"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Discuss with a counsellor <ArrowRight size={18} />
        </Link>
        <button
          type="button"
          onClick={onReset}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <RefreshCw size={16} /> Restart finder
        </button>
      </div>
    </div>
  );
}

function ResultCard({
  match,
  rank,
  prominent = false,
}: {
  match: FinderMatch;
  rank: number;
  prominent?: boolean;
}) {
  const dest = destinations.find((d) => d.slug === match.slug);
  if (!dest) return null;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: rank * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-white p-6 transition-shadow",
        prominent ? "border-navy-100 shadow-elevated" : "border-navy-100",
      )}
    >
      {prominent && rank === 1 && (
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-gold-300/30 to-royal-500/20 blur-2xl" />
      )}
      <div className="relative flex items-start gap-5">
        <div className="grid shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-900 sm:h-16 sm:w-16">
          <span className="text-3xl sm:text-4xl">{dest.flag}</span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  "font-display text-xs font-semibold uppercase tracking-[0.18em]",
                  rank === 1 ? "text-gold-500" : "text-navy-500",
                )}
              >
                #{rank}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                {dest.country}
              </h3>
            </div>
            <Score score={match.score} prominent={prominent} />
          </div>

          {prominent && (
            <>
              <ul className="mt-4 flex flex-col gap-1.5">
                {match.reasons.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-navy-800"
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              {match.caveats.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {match.caveats.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-amber-700"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/study-in-${dest.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline"
              >
                Explore Study in {dest.country}
                <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.li>
  );
}

function Score({ score, prominent }: { score: number; prominent: boolean }) {
  return (
    <div className="flex items-baseline gap-1">
      <span
        className={cn(
          "font-display font-semibold leading-none",
          prominent ? "text-4xl text-navy-900" : "text-2xl text-navy-700",
        )}
      >
        {score}
      </span>
      <span className="text-xs font-medium text-navy-500">/100</span>
    </div>
  );
}
