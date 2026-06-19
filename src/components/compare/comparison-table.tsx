import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Cost } from "@/components/ui/cost";
import {
  buildComparison,
  type ComparisonRow,
  type CountrySnapshot,
} from "@/lib/comparator";

const GROUPS: ComparisonRow["group"][] = ["Overview", "Costs", "Visa", "Outcomes"];

export function ComparisonTable({ slugs }: { slugs: string[] }) {
  const { countries, rows } = buildComparison(slugs);

  return (
    <Container className="pb-16 sm:pb-24">
      <p className="mb-2 text-[11px] font-medium text-navy-500 sm:hidden">
        ← Swipe table to compare →
      </p>
      <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-elevated sm:rounded-[2rem]">
        <table className="w-full min-w-[640px] divide-y divide-navy-100 text-sm">
          <thead className="bg-surface-muted">
            <tr>
              <th className="w-40 px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:w-56 sm:px-6 sm:py-5 sm:text-[11px] sm:tracking-[0.16em]" />
              {countries.map((c) => (
                <th key={c.slug} className="px-4 py-4 text-left sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl leading-none sm:text-3xl">{c.flag}</span>
                    <div>
                      <p className="font-display text-base font-semibold tracking-tight text-navy-900 sm:text-lg">
                        {c.country}
                      </p>
                      <Link
                        href={`/study-in-${c.slug}`}
                        className="text-[11px] text-royal-600 hover:underline sm:text-xs"
                      >
                        Country guide →
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {GROUPS.map((group) => (
              <GroupRows
                key={group}
                group={group}
                rows={rows.filter((r) => r.group === group)}
                countries={countries}
              />
            ))}
          </tbody>
        </table>
      </div>

      <CtaRow countries={countries} />
    </Container>
  );
}

function GroupRows({
  group,
  rows,
  countries,
}: {
  group: ComparisonRow["group"];
  rows: ComparisonRow[];
  countries: CountrySnapshot[];
}) {
  return (
    <>
      <tr className="bg-surface-muted/40">
        <td
          colSpan={1 + countries.length}
          className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-500 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.18em]"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.label}>
          <td className="px-4 py-4 align-top text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-700 sm:px-6 sm:py-5 sm:text-[11px] sm:tracking-[0.14em]">
            {r.label}
          </td>
          {r.values.map((v, i) => (
            <td
              key={i}
              className="px-4 py-4 align-top text-[13px] leading-relaxed text-navy-800 sm:px-6 sm:py-5 sm:text-sm"
            >
              {r.isCost && v !== "—" ? <Cost inr={v} /> : v}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CtaRow({ countries }: { countries: CountrySnapshot[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2">
      <Link
        href="/#enquire"
        className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
      >
        Get a personal shortlist <ArrowRight size={18} />
      </Link>
      <Link
        href="/find-your-destination"
        className={buttonVariants({ variant: "outline", size: "lg", className: "w-full" })}
      >
        Try the destination finder
      </Link>
      {countries.map((c) => (
        <Link
          key={c.slug}
          href={`/visa-eligibility?country=${c.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-50 px-5 py-3 text-xs font-medium text-navy-900 hover:bg-navy-100"
        >
          Check {c.country} visa eligibility →
        </Link>
      ))}
    </div>
  );
}
