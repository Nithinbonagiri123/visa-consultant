"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, Select, Label } from "@/components/ui/input";
import { destinations, courseCategories } from "@/lib/site";
import {
  leadSchema,
  educationLevels,
  ieltsStatuses,
  type LeadInput,
} from "@/lib/lead-schema";

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      country: destinations[0].country,
      course: courseCategories[0],
      educationLevel: educationLevels[0],
      ieltsStatus: ieltsStatuses[0],
      consent: true,
    },
  });

  const onSubmit = async (values: LeadInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Network error. Please try again in a moment.");
    }
  };

  return (
    <div id="enquire" className="relative">
      <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-300/30 via-royal-400/20 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/85 p-6 shadow-elevated backdrop-blur-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
              <Sparkles size={12} /> Free consultation
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-navy-900">
              Talk to a senior counsellor.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              30 minutes. No obligation. A real plan you can act on.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center"
            >
              <CheckCircle2 className="text-emerald-600" size={36} />
              <div>
                <p className="font-display text-xl font-semibold text-navy-900">
                  You&apos;re in. Talk soon.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A senior counsellor will reach out within one working day.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-medium text-royal-600 hover:underline"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 grid gap-4"
              noValidate
            >
              <Field label="Full name" error={errors.name?.message}>
                <Input placeholder="e.g. Aarav Mehta" {...register("name")} />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" error={errors.phone?.message}>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 9XXXXXXXXX"
                    {...register("phone")}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred country" error={errors.country?.message}>
                  <Select {...register("country")}>
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.country}>
                        {d.country}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Preferred course" error={errors.course?.message}>
                  <Select {...register("course")}>
                    {courseCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Education level"
                  error={errors.educationLevel?.message}
                >
                  <Select {...register("educationLevel")}>
                    {educationLevels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="IELTS / PTE" error={errors.ieltsStatus?.message}>
                  <Select {...register("ieltsStatus")}>
                    {ieltsStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <label className="mt-1 flex items-start gap-3 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-navy-200 text-royal-500 focus:ring-royal-500"
                  {...register("consent")}
                />
                <span>
                  I agree to be contacted by Campus Meridian about my study abroad
                  enquiry.
                </span>
              </label>
              {errors.consent?.message && (
                <p className="-mt-2 text-xs text-rose-600">
                  {errors.consent.message}
                </p>
              )}

              {serverError && (
                <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isSubmitting}
                className="mt-2 w-full"
              >
                {isSubmitting ? "Sending..." : "Book free consultation"}
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                Your details are stored securely and never shared with third
                parties.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
