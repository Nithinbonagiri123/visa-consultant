import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-navy-900 via-navy-700 to-royal-500",
  "from-navy-800 via-royal-600 to-royal-400",
  "from-navy-900 via-royal-700 to-gold-500",
  "from-royal-600 via-navy-700 to-navy-900",
];

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Deterministic gradient choice based on name
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const gradient = GRADIENTS[hash % GRADIENTS.length];

  const sizes = {
    sm: "h-10 w-10 text-xs",
    md: "h-14 w-14 text-sm",
    lg: "h-20 w-20 text-lg",
    xl: "h-28 w-28 text-2xl",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-display font-semibold text-white",
        gradient,
        sizes[size],
        className,
      )}
    >
      <span>{initials}</span>
      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-gold-400" />
    </div>
  );
}
