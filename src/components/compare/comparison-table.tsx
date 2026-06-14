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
    <Container className="pb-24">
      <div className="overflow-x-auto rounded-[2rem] border border-navy-100 bg-white shadow-elevated">
        <table className="w-full min-w-[640px] divide-y divide-navy-100 text-sm">
          <thead className="bg-surface-muted">
            <tr>
              <th className="w-56 px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500" />
              {countries.map((c) => (
                <th key={c.slug} className="px-6 py-5 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none">{c.flag}</span>
                    <div>
                      <p className="font-display text-lg font-semibold tracking-tight text-navy-900">
                        {c.country}
                      </p>
                      <Link
                        href={`/study-in-${c.slug}`}
                        className="text-xs text-royal-600 hover:underline"
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
          className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.label}>
          <td className="px-6 py-5 align-top text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-700">
            {r.label}
          </td>
          {r.values.map((v, i) => (
            <td
              key={i}
              className="px-6 py-5 align-top text-sm leading-relaxed text-navy-800"
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
    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      <Link
        href="/#enquire"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        Get a personal shortlist <ArrowRight size={18} />
      </Link>
      <Link
        href="/find-your-destination"
        className={buttonVariants({ variant: "outline", size: "lg" })}
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
