import {
  finderProfiles,
  type FinderProfile,
  type Field,
  type Priority,
} from "@/lib/finder-data";

export type FinderAnswers = {
  budgetMaxINR: number;        // lakhs/year ceiling
  field: Field;
  priorities: Priority[];       // up to 3
  ieltsBand: number;            // 0 if not taken/preparing
  academicStage: string;
};

export type FinderMatch = {
  slug: string;
  score: number;                // 0..100
  reasons: string[];            // 2-3 short positive bullets
  caveats: string[];            // 0-2 things to flag
};

// Field → which destinations excel (positive bias).
// Implicit: anywhere the field appears in `fieldStrengths` already scores.
// This adds extra weight to known global leaders for niche fields.
const fieldLeaderBoost: Partial<Record<Field, string[]>> = {
  "Artificial Intelligence": ["usa", "uk", "canada"],
  "Computer Science":        ["usa", "canada", "ireland"],
  "Finance":                 ["uk", "usa", "france"],
  "Engineering":             ["germany", "usa", "australia"],
  "Business Management":     ["uk", "usa", "france"],
  "Healthcare":              ["uk", "canada", "australia"],
  "Hospitality":             ["france", "uae", "new-zealand"],
  "Data Science":            ["usa", "canada", "uk"],
  "Cyber Security":          ["usa", "uk", "ireland"],
};

export function rankDestinations(answers: FinderAnswers): FinderMatch[] {
  return Object.values(finderProfiles)
    .map((p) => scoreDestination(p, answers))
    .sort((a, b) => b.score - a.score);
}

function scoreDestination(p: FinderProfile, a: FinderAnswers): FinderMatch {
  let score = 0;
  const reasons: string[] = [];
  const caveats: string[] = [];

  // --- Budget fit (max 30) ----------------------------------------------------
  const costMid = (p.costAllInINR.min + p.costAllInINR.max) / 2;
  if (a.budgetMaxINR >= p.costAllInINR.max) {
    score += 30;
    reasons.push(`Comfortably within your ₹${a.budgetMaxINR}L budget`);
  } else if (a.budgetMaxINR >= costMid) {
    score += 22;
    reasons.push(`Affordable on a tight ₹${a.budgetMaxINR}L budget`);
  } else if (a.budgetMaxINR >= p.costAllInINR.min) {
    score += 12;
    caveats.push(`Stretches your budget — pick lower-tuition universities`);
  } else {
    score += 0;
    caveats.push(`Total cost (~₹${p.costAllInINR.min}–${p.costAllInINR.max}L) exceeds your budget`);
  }

  // --- Field fit (max 25) -----------------------------------------------------
  const isStrength = p.fieldStrengths.includes(a.field);
  const isLeader = (fieldLeaderBoost[a.field] ?? []).includes(p.slug);

  if (isLeader) {
    score += 25;
    reasons.push(`Global leader for ${a.field}`);
  } else if (isStrength) {
    score += 18;
    reasons.push(`Strong programmes in ${a.field}`);
  } else {
    score += 6;
  }

  // --- Priorities (max 30, 10 each for up to 3) -------------------------------
  for (const pr of a.priorities.slice(0, 3)) {
    const { points, reason } = scorePriority(p, pr);
    score += points;
    if (reason) reasons.push(reason);
  }

  // --- English readiness (max 15) ---------------------------------------------
  if (a.ieltsBand === 0) {
    // Not taken yet — favour countries with lenient or standard requirements.
    if (p.ieltsTier === "easy")     score += 15;
    else if (p.ieltsTier === "standard") score += 10;
    else                            { score += 4; caveats.push("Strict English requirements — plan for IELTS 7.0+"); }
  } else if (a.ieltsBand >= 7.5) {
    score += 15;
    if (p.ieltsTier === "strict") reasons.push("Your IELTS comfortably clears the bar");
  } else if (a.ieltsBand >= 6.5) {
    score += p.ieltsTier === "strict" ? 8 : 14;
    if (p.ieltsTier === "strict") caveats.push("Some top universities expect IELTS 7.0+");
  } else if (a.ieltsBand >= 6.0) {
    score += p.ieltsTier === "easy" ? 13 : p.ieltsTier === "standard" ? 9 : 4;
    if (p.ieltsTier !== "easy") caveats.push("Aim to retake for a higher IELTS band");
  }

  // Clamp and dedupe
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    slug: p.slug,
    score,
    reasons: dedupe(reasons).slice(0, 3),
    caveats: dedupe(caveats).slice(0, 2),
  };
}

function scorePriority(p: FinderProfile, pr: Priority): { points: number; reason?: string } {
  switch (pr) {
    case "stay-back":
      if (p.stayBackTier === "long")   return { points: 10, reason: `Up to ${p.stayBackYears} years of post-study work` };
      if (p.stayBackTier === "medium") return { points: 6,  reason: `${p.stayBackYears}-year post-study work visa` };
      return { points: 1 };

    case "low-cost":
      if (p.budgetTier === "low")  return { points: 10, reason: "One of the lowest-cost destinations" };
      if (p.budgetTier === "mid")  return { points: 6,  reason: "Reasonable total cost vs. peers" };
      return { points: 1 };

    case "fast-degree":
      if (p.pace === "fast")     return { points: 10, reason: "One-year master's accelerates ROI" };
      return { points: 4 };

    case "pr-pathway":
      if (p.prPathway === "strong")  return { points: 10, reason: "Clear study → work → PR pipeline" };
      if (p.prPathway === "medium")  return { points: 6,  reason: "Reasonable PR pathway with effort" };
      return { points: 1 };

    case "prestige":
      // Soft proxy: high-budget destinations also host the top-ranked universities.
      if (p.budgetTier === "premium" || p.budgetTier === "high") {
        return { points: 10, reason: "Home to multiple global top-100 universities" };
      }
      return { points: 5 };

    case "english-only":
      return p.englishTaught
        ? { points: 10, reason: "All programmes taught in English" }
        : { points: 2 };
  }
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}
