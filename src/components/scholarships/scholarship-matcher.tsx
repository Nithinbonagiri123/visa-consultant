"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Filter,
  Globe,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/site";
import {
  scholarships,
  fieldFilterOptions,
  levelFilterOptions,
  type ScholarshipField,
  type ScholarshipLevel,
} from "@/lib/scholarships-data";

type Filters = {
  country: string;            // slug or "any"
  field: ScholarshipField;
  level: ScholarshipLevel;
};

const INITIAL: Filters = {
  country: "any",
  field: "any",
  level: "pg",
};

export function ScholarshipMatcher() {
  const [filters, setFilters] = useState<Filters>(INITIAL);

  const matches = useMemo(() => {
    return scholarships.filter((s) => {
      const countryOk =
        filters.country === "any" || s.countries.includes(filters.country);
      const fieldOk =
        s.fields.includes("any") || s.fields.includes(filters.field);
      const levelOk = s.levels.includes(filters.level);
      return countryOk && fieldOk && levelOk;
    });
  }, [filters]);

  return (
    <Container className="pb-24">
      <SectionHeading
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Filter size={12} /> Filter
          </span>
        }
        title={<>What&apos;s your profile?</>}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Select
          label="Destination"
          value={filters.country}
          onChange={(v) => setFilters({ ...filters, country: v })}
          options={[
            { value: "any", label: "Any country" },
            ...destinations.map((d) => ({ value: d.slug, label: d.country })),
          ]}
        />
        <Select
          label="Field"
          value={filters.field}
          onChange={(v) =>
            setFilters({ ...filters, field: v as ScholarshipField })
          }
          options={fieldFilterOptions}
        />
        <Select
          label="Level"
          value={filters.level}
          onChange={(v) =>
            setFilters({ ...filters, level: v as ScholarshipLevel })
          }
          options={levelFilterOptions}
        />
      </div>

      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
          {matches.length} scholarship{matches.length === 1 ? "" : "s"} matched
        </h2>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-navy-500">
          Sorted by competitiveness
        </p>
      </div>

      <ul className="mt-6 grid gap-5">
        {matches.length === 0 && (
          <li className="rounded-3xl border border-navy-100 bg-white p-8 text-center text-sm text-muted-foreground shadow-elevated">
            No scholarships match this filter combination yet. Try widening
            <strong className="mx-1 text-navy-900">Field</strong> to
            &ldquo;Any&rdquo;.
          </li>
        )}
        {matches
          .slice()
          .sort((a, b) => {
            const rank = { high: 0, moderate: 1, auto: 2 } as const;
            return rank[a.competitiveness] - rank[b.competitiveness];
          })
          .map((s, i) => (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated"
            >
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                  <Trophy size={20} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                      {s.name}
                    </h3>
                    <CompetitivenessChip level={s.competitiveness} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.blurb}
                  </p>

                  <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                    <Field
                      icon={<Sparkles size={12} />}
                      label="Coverage"
                      value={s.amount}
                    />
                    <Field
                      icon={<Globe size={12} />}
                      label="Countries"
                      value={s.countries
                        .map(
                          (c) =>
                            destinations.find((d) => d.slug === c)?.country ?? c,
                        )
                        .join(" · ")}
                    />
                    <Field
                      icon={<CheckCircle2 size={12} />}
                      label="Level"
                      value={s.levels
                        .map((l) =>
                          l === "ug" ? "UG" : l === "pg" ? "Master's" : "PhD",
                        )
                        .join(" · ")}
                    />
                  </dl>
                </div>
              </div>
            </motion.li>
          ))}
      </ul>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#enquire"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Build my scholarship plan <ArrowRight size={18} />
        </Link>
        <Link
          href="/blog/scholarships-for-indian-students-2026"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Read the full scholarships guide
        </Link>
      </div>
    </Container>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-navy-700">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 pr-9 text-sm text-navy-900 focus-visible:outline-none focus-visible:border-royal-500 focus-visible:ring-2 focus-visible:ring-royal-500/15"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
          ▾
        </span>
      </div>
    </label>
  );
}

function CompetitivenessChip({
  level,
}: {
  level: "high" | "moderate" | "auto";
}) {
  const labels = {
    high: "Highly competitive",
    moderate: "Moderate competition",
    auto: "Automatic merit award",
  };
  const colors = {
    high: "bg-amber-50 text-amber-800 border-amber-200",
    moderate: "bg-royal-50 text-royal-700 border-royal-200",
    auto: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
        colors[level],
      )}
    >
      {labels[level]}
    </span>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-500">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-navy-800">{value}</dd>
    </div>
  );
}
