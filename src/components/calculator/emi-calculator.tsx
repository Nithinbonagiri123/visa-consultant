"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Landmark, PiggyBank, Wallet } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { EmailResultButton } from "@/components/forms/email-result-button";
import { cn } from "@/lib/utils";

// ---- pure math ------------------------------------------------------------

type LoanInputs = {
  principalLakhs: number; // user-facing units; multiply by 1e5 for rupees
  annualRatePct: number;
  tenureYears: number;
};

type LoanResult = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
};

function calcEMI(inputs: LoanInputs): LoanResult {
  const P = inputs.principalLakhs * 1e5;
  const n = Math.max(1, Math.round(inputs.tenureYears * 12));
  const r = inputs.annualRatePct / 12 / 100;

  if (r === 0) {
    const emi = P / n;
    return { emi, totalInterest: 0, totalPayment: P };
  }

  const pow = Math.pow(1 + r, n);
  const emi = (P * r * pow) / (pow - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  return { emi, totalInterest, totalPayment };
}

function formatINR(n: number): string {
  if (!isFinite(n)) return "—";
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function formatINRWhole(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// ---- component ------------------------------------------------------------

export function EMICalculator() {
  const [principal, setPrincipal] = useState(30);   // ₹30L
  const [rate, setRate] = useState(11);              // 11% p.a.
  const [tenure, setTenure] = useState(10);          // 10 years

  const result = useMemo(
    () => calcEMI({ principalLakhs: principal, annualRatePct: rate, tenureYears: tenure }),
    [principal, rate, tenure],
  );

  return (
    <Container className="pb-16 sm:pb-24">
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* LEFT — inputs */}
        <div className="rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-elevated sm:rounded-[2rem] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-gold-300 sm:h-11 sm:w-11 sm:rounded-2xl">
              <Calculator size={20} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-navy-900 sm:text-xl">
                Adjust your loan
              </p>
              <p className="text-xs text-muted-foreground">
                Real-time EMI as you tune the inputs.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-7">
            <Slider
              label="Loan amount"
              value={principal}
              onChange={setPrincipal}
              min={1}
              max={150}
              step={1}
              displayValue={`₹${principal} L`}
              icon={<Landmark size={14} />}
              tickHints={["₹1L", "₹50L", "₹100L", "₹1.5Cr"]}
            />
            <Slider
              label="Interest rate (per annum)"
              value={rate}
              onChange={setRate}
              min={7}
              max={16}
              step={0.1}
              displayValue={`${rate.toFixed(1)}%`}
              icon={<PiggyBank size={14} />}
              tickHints={["7%", "10%", "13%", "16%"]}
            />
            <Slider
              label="Tenure"
              value={tenure}
              onChange={setTenure}
              min={1}
              max={15}
              step={1}
              displayValue={`${tenure} ${tenure === 1 ? "year" : "years"}`}
              icon={<Wallet size={14} />}
              tickHints={["1 yr", "5 yr", "10 yr", "15 yr"]}
            />
          </div>
        </div>

        {/* RIGHT — output */}
        <div className="relative overflow-hidden rounded-[1.5rem] border border-navy-100 bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-5 text-white shadow-elevated sm:rounded-[2rem] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-royal-500/30 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <DonutChart
              principal={principal * 1e5}
              interest={result.totalInterest}
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300 sm:text-[11px] sm:tracking-[0.18em]">
                Monthly EMI
              </p>
              <p className="mt-1 font-display text-[2.25rem] font-semibold leading-none tracking-tight text-white sm:text-5xl">
                {formatINRWhole(result.emi)}
              </p>
              <p className="mt-2 text-[13px] text-navy-200 sm:text-sm">
                for {tenure} {tenure === 1 ? "year" : "years"} at {rate.toFixed(1)}%
              </p>
            </div>
          </div>

          <dl className="relative mt-7 grid grid-cols-3 gap-2 border-t border-white/10 pt-6 sm:mt-10 sm:gap-4 sm:pt-8">
            <Stat
              label="Principal"
              value={formatINR(principal * 1e5)}
              dot="bg-gold-400"
            />
            <Stat
              label="Total interest"
              value={formatINR(result.totalInterest)}
              dot="bg-royal-400"
            />
            <Stat
              label="Total payback"
              value={formatINR(result.totalPayment)}
            />
          </dl>

          <div className="relative mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="/#enquire"
              className={cn(
                buttonVariants({ variant: "gold", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              Get loan + scholarship plan <ArrowRight size={18} />
            </Link>
            <Link
              href="/blog/study-abroad-cost-from-india-2026"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/15"
            >
              See full cost breakdown
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <EmailResultButton
          tool="loan-emi"
          label="Email me this EMI plan"
          payload={{
            principalLakhs: principal,
            annualRatePct: rate,
            tenureYears: tenure,
            emi: Math.round(result.emi),
            totalInterest: Math.round(result.totalInterest),
            totalPayment: Math.round(result.totalPayment),
          }}
        />
      </div>

      <DisclaimerNote />
    </Container>
  );
}

// ---- subcomponents --------------------------------------------------------

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  icon,
  tickHints,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  icon: React.ReactNode;
  tickHints: string[];
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
          <span className="text-gold-500">{icon}</span>
          {label}
        </label>
        <span className="font-display text-lg font-semibold text-navy-900">
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
        className="mt-4 w-full appearance-none bg-transparent [-webkit-appearance:none]"
        style={
          {
            background: `linear-gradient(to right, var(--navy-900) 0%, var(--navy-900) ${percent}%, var(--navy-100) ${percent}%, var(--navy-100) 100%)`,
            borderRadius: "9999px",
            height: "6px",
          } as React.CSSProperties
        }
      />
      <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-wider text-navy-500">
        {tickHints.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, dot }: { label: string; value: string; dot?: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-gold-300 sm:gap-2 sm:text-[10px] sm:tracking-[0.16em]">
        {dot && <span className={cn("h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2", dot)} />}
        {label}
      </dt>
      <dd className="mt-1 font-display text-[13px] font-semibold text-white sm:text-lg">
        {value}
      </dd>
    </div>
  );
}

function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = Math.max(1, principal + interest);
  const interestPct = interest / total;

  const radius = 58;
  const c = 2 * Math.PI * radius;
  const offset = c - interestPct * c;

  return (
    <div className="relative grid h-36 w-36 shrink-0 place-items-center sm:h-44 sm:w-44">
      <svg viewBox="0 0 176 176" className="absolute inset-0 h-full w-full">
        <circle
          cx="88"
          cy="88"
          r={radius}
          strokeWidth="14"
          className="fill-none stroke-gold-400"
        />
        <motion.circle
          cx="88"
          cy="88"
          r={radius}
          strokeWidth="14"
          strokeLinecap="round"
          className="fill-none stroke-royal-400"
          initial={false}
          animate={{ strokeDashoffset: offset }}
          strokeDasharray={c}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 88 88)"
        />
      </svg>
      <div className="relative text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300">
          Interest share
        </p>
        <p className="mt-1 font-display text-2xl font-semibold leading-none text-white">
          {Math.round(interestPct * 100)}%
        </p>
      </div>
    </div>
  );
}

function DisclaimerNote() {
  return (
    <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
      Numbers are indicative and assume a fixed-rate, equal-EMI structure with
      no moratorium. Your actual EMI will depend on lender, collateral, and
      moratorium terms. We work with partner banks and NBFCs to match you to
      the best loan structure for your university and country.
    </p>
  );
}
