import { universities, type University } from "@/lib/universities-data";
import { programmes } from "@/lib/programmes-data";

export type AdmitInputs = {
  programmeSlug: string;     // chosen programme slug
  undergradPct: number;       // 50-100
  ieltsBand: number;           // 0-9; 0 = not taken
  greScore?: number;          // 260-340; 0 / undefined = not taken
  gmatScore?: number;         // 200-800; 0 / undefined = not taken
  workYears?: number;         // for MBA
};

export type AdmitBand = "reach" | "target" | "safe";

export type AdmitMatch = {
  university: University;
  band: AdmitBand;
  fitScore: number;          // 0-100
  reasons: string[];
  gaps: string[];
};

export function evaluateAdmits(inputs: AdmitInputs): AdmitMatch[] {
  // Only consider universities that list this programme as popular.
  const relevant = universities.filter((u) =>
    u.popularProgrammes.includes(inputs.programmeSlug),
  );

  return relevant
    .map((u) => scoreUniversity(u, inputs))
    .sort((a, b) => b.fitScore - a.fitScore);
}

function scoreUniversity(u: University, a: AdmitInputs): AdmitMatch {
  const t = u.thresholds;
  const reasons: string[] = [];
  const gaps: string[] = [];

  // Start everyone at the university's admit-rate baseline.
  // Higher admit rate → easier baseline.
  let score = clamp(t.typicalAdmitRatePct, 5, 50);

  // --- Academic (up to +/-25) ---------------------------------------------
  const acadDelta = a.undergradPct - t.minAcademicPct;
  if (acadDelta >= 10) {
    score += 25;
    reasons.push(`Academics well above the ${t.minAcademicPct}% bar`);
  } else if (acadDelta >= 0) {
    score += 18;
    reasons.push(`Academics meet the ${t.minAcademicPct}% bar`);
  } else if (acadDelta >= -5) {
    score += 8;
    gaps.push(`Academics ${Math.abs(acadDelta).toFixed(0)} pp short of bar`);
  } else if (acadDelta >= -10) {
    gaps.push(`Academics well below the typical bar`);
  } else {
    score -= 10;
    gaps.push(`Academics significantly below the typical bar`);
  }

  // --- IELTS (up to +/-15) -------------------------------------------------
  if (a.ieltsBand === 0) {
    gaps.push(`IELTS not yet taken — target ${t.minIELTS}+`);
  } else {
    const ieltsDelta = a.ieltsBand - t.minIELTS;
    if (ieltsDelta >= 1) {
      score += 15;
      reasons.push(`IELTS comfortably clears ${t.minIELTS}`);
    } else if (ieltsDelta >= 0) {
      score += 10;
      reasons.push(`IELTS meets ${t.minIELTS} bar`);
    } else if (ieltsDelta >= -0.5) {
      score += 2;
      gaps.push(`IELTS 0.5 short of ${t.minIELTS} bar — plan one retake`);
    } else {
      score -= 5;
      gaps.push(`IELTS well below ${t.minIELTS} — retake required`);
    }
  }

  // --- GRE (up to +/-15) ---------------------------------------------------
  if (t.gre?.required) {
    const target = t.gre.targetScore ?? 320;
    if (!a.greScore) {
      gaps.push(`GRE not taken — required, target ${target}+`);
      score -= 5;
    } else {
      const greDelta = a.greScore - target;
      if (greDelta >= 10) {
        score += 15;
        reasons.push(`GRE well above target of ${target}`);
      } else if (greDelta >= 0) {
        score += 10;
        reasons.push(`GRE meets target`);
      } else if (greDelta >= -10) {
        score += 2;
        gaps.push(`GRE slightly below ${target} target`);
      } else {
        score -= 5;
        gaps.push(`GRE well below ${target} target — consider retake`);
      }
    }
  } else if (a.greScore && a.greScore >= 320) {
    score += 5;
    reasons.push(`Strong GRE strengthens an already-strong profile`);
  }

  // --- GMAT (up to +/-15) --------------------------------------------------
  if (t.gmat?.required) {
    const target = t.gmat.targetScore ?? 650;
    if (!a.gmatScore) {
      gaps.push(`GMAT not taken — required, target ${target}+`);
      score -= 5;
    } else {
      const gmatDelta = a.gmatScore - target;
      if (gmatDelta >= 30) {
        score += 15;
        reasons.push(`GMAT well above target of ${target}`);
      } else if (gmatDelta >= 0) {
        score += 10;
        reasons.push(`GMAT meets target`);
      } else if (gmatDelta >= -30) {
        score += 2;
        gaps.push(`GMAT slightly below ${target} target`);
      } else {
        score -= 5;
        gaps.push(`GMAT well below ${target} target`);
      }
    }
  }

  // --- Work years (MBA only, up to +/-10) ----------------------------------
  const mbaSlug = "mba";
  if (a.programmeSlug === mbaSlug && (t.minWorkYears ?? 2)) {
    const minYears = t.minWorkYears ?? 2;
    const w = a.workYears ?? 0;
    if (w >= minYears + 2) {
      score += 10;
      reasons.push(`${w} yrs experience — strong for MBA`);
    } else if (w >= minYears) {
      score += 5;
      reasons.push(`${w} yrs experience meets the MBA bar`);
    } else {
      score -= 5;
      gaps.push(`Under ${minYears} yrs experience — most MBAs expect more`);
    }
  }

  // Clamp & categorise
  score = Math.max(0, Math.min(100, Math.round(score)));

  let band: AdmitBand;
  if (score >= 70) band = "safe";
  else if (score >= 45) band = "target";
  else band = "reach";

  return {
    university: u,
    band,
    fitScore: score,
    reasons: dedupe(reasons).slice(0, 3),
    gaps: dedupe(gaps).slice(0, 3),
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function dedupe(a: string[]): string[] {
  return [...new Set(a)];
}

// Helpful programme list filtered to what we have universities for.
export function getAdmitProgrammes() {
  return programmes.filter((p) =>
    universities.some((u) => u.popularProgrammes.includes(p.slug)),
  );
}
