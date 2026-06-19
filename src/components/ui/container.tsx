import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}
      {...props}
    />
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 backdrop-blur",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
