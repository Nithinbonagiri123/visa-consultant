import { visaProfiles, type VisaProfile } from "@/lib/visa-data";

export type EligibilityAnswers = {
  country: string;
  academicPct: number;
  ieltsBand: number;      // 0 if not yet taken
  fundsReadyINR: number;  // lakhs
  studyGapYears: number;
  hasPriorRejection: boolean;
  hasAdmit: boolean;
};

export type EligibilityResult = {
  country: string;
  score: number;          // 0..100
  band: "strong" | "moderate" | "preparation";
  bandLabel: string;
  bandBlurb: string;
  strengths: string[];
  gaps: { title: string; action: string }[];
  visaType: string;
  expedited?: string;
};

export function evaluateEligibility(
  a: EligibilityAnswers,
): EligibilityResult | null {
  const p = visaProfiles[a.country];
  if (!p) return null;

  const t = p.thresholds;
  let score = 0;
  const strengths: string[] = [];
  const gaps: { title: string; action: string }[] = [];

  // --- Academic (25) -------------------------------------------------------
  const acadGap = a.academicPct - t.minAcademicPct;
  if (acadGap >= 10) {
    score += 25;
    strengths.push(`Strong academic record — well above the ${t.minAcademicPct}% bar`);
  } else if (acadGap >= 0) {
    score += 22;
    strengths.push(`Academic record clears the ${t.minAcademicPct}% threshold`);
  } else if (acadGap >= -5) {
    score += 14;
    gaps.push({
      title: "Academic record slightly below typical bar",
      action: `Apply to programmes with lower cut-offs and lean on strong SOPs, projects, and recommendations.`,
    });
  } else if (acadGap >= -10) {
    score += 6;
    gaps.push({
      title: "Academic record below typical bar",
      action: `Consider a postgraduate diploma or foundation pathway to bridge into the master's.`,
    });
  } else {
    gaps.push({
      title: "Academic record well below the typical bar",
      action: `A pathway programme or work experience-led MBA may be the cleanest route — talk to a counsellor.`,
    });
  }

  // --- English (25) --------------------------------------------------------
  if (a.ieltsBand === 0) {
    score += 8;
    gaps.push({
      title: "IELTS / PTE not taken yet",
      action: `Target IELTS ${t.minIELTS}+ overall. Our prep team runs a free diagnostic to set your study plan.`,
    });
  } else {
    const ieltsGap = a.ieltsBand - t.minIELTS;
    if (ieltsGap >= 1) {
      score += 25;
      strengths.push(`IELTS comfortably clears the ${t.minIELTS} bar`);
    } else if (ieltsGap >= 0) {
      score += 22;
      strengths.push(`IELTS meets the ${t.minIELTS} requirement`);
    } else if (ieltsGap >= -0.5) {
      score += 12;
      gaps.push({
        title: `IELTS is 0.5 band short of the ${t.minIELTS} target`,
        action: `Plan one retake — most students lift by 0.5 with focused practice on weakest module.`,
      });
    } else {
      score += 3;
      gaps.push({
        title: `IELTS is well below the ${t.minIELTS} target`,
        action: `Enrol in a structured 6-8 week prep cycle and retake. Aim for ${t.minIELTS}+ overall.`,
      });
    }
  }

  // --- Financial (25) ------------------------------------------------------
  const fundsRatio = a.fundsReadyINR / t.firstYearFundsINR;
  if (fundsRatio >= 1.1) {
    score += 25;
    strengths.push(`Funds comfortably exceed the ₹${t.firstYearFundsINR}L first-year requirement`);
  } else if (fundsRatio >= 0.9) {
    score += 22;
    strengths.push(`Funds approximately match the ₹${t.firstYearFundsINR}L first-year requirement`);
  } else if (fundsRatio >= 0.6) {
    score += 12;
    gaps.push({
      title: `Funds fall short of the ~₹${t.firstYearFundsINR}L first-year requirement`,
      action: `Top up via an education loan (collateral or non-collateral) — we'll match you to partner lenders.`,
    });
  } else {
    score += 3;
    gaps.push({
      title: `Funds are well below the ~₹${t.firstYearFundsINR}L first-year requirement`,
      action: `A combined approach: lower-cost university + education loan + scholarship targeting.`,
    });
  }

  // --- Background factors (25) --------------------------------------------
  // Gap tolerance — 10 pts
  if (a.studyGapYears <= t.gapToleranceYears) {
    score += 10;
    if (a.studyGapYears === 0) strengths.push("No academic gap to justify");
  } else {
    score += 4;
    gaps.push({
      title: "Study gap exceeds typical tolerance",
      action: `Document the gap with work, freelance, certifications, or research — a tight SOP narrative clears most consulates.`,
    });
  }

  // Prior rejection — 10 pts
  if (!a.hasPriorRejection) {
    score += 10;
    strengths.push("No prior visa rejections on file");
  } else {
    const penalty = p.notes.rejectionTolerance === "low" ? 1 : p.notes.rejectionTolerance === "medium" ? 4 : 7;
    score += penalty;
    gaps.push({
      title: "Prior visa rejection on record",
      action: `Disclose transparently with a clear, evidence-led explanation of what's changed since.`,
    });
  }

  // Admit letter — 5 pts (just a milestone)
  if (a.hasAdmit) {
    score += 5;
    strengths.push("Already holding an admit letter — visa application can move now");
  } else {
    gaps.push({
      title: "No admit letter yet",
      action: `Visa application requires a confirmed offer. Let's run a shortlist + applications first.`,
    });
  }

  // Clamp
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    country: a.country,
    score,
    ...computeBand(score),
    strengths: dedupe(strengths),
    gaps: dedupeGaps(gaps),
    visaType: p.visaType,
    expedited: p.notes.expedited,
  };
}

function computeBand(score: number): Pick<EligibilityResult, "band" | "bandLabel" | "bandBlurb"> {
  if (score >= 80) {
    return {
      band: "strong",
      bandLabel: "Strong candidate",
      bandBlurb:
        "You meet or beat most consulate expectations. Tighten documentation and you're ready to apply.",
    };
  }
  if (score >= 60) {
    return {
      band: "moderate",
      bandLabel: "Moderate — fixable gaps",
      bandBlurb:
        "The pieces are there. A focused 2–3 month plan closes the remaining gaps before you apply.",
    };
  }
  return {
    band: "preparation",
    bandLabel: "Preparation phase",
    bandBlurb:
      "There's real work ahead, but every gap below has a clear path through. Let's build a plan.",
  };
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

function dedupeGaps(arr: { title: string; action: string }[]) {
  const seen = new Set<string>();
  return arr.filter((g) => (seen.has(g.title) ? false : (seen.add(g.title), true)));
}

export function getVisaProfile(slug: string): VisaProfile | undefined {
  return visaProfiles[slug];
}
