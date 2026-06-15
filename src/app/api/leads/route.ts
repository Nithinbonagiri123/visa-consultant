import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { forwardWebhook } from "@/lib/webhook-forward";

// Submissions fan out to two webhooks:
//   1. GOOGLE_SHEETS_WEBHOOK_URL  → appends a row to the Campus Meridian leads
//      sheet (Apps Script web app). Hard-failure-relevant.
//   2. EMAIL_DRIP_WEBHOOK_URL     → triggers the country-specific email drip
//      (Brevo / Mailchimp / Customer.io). Fire-and-forget so a drip outage
//      doesn't block lead capture.
//
// Tags are added so the drip platform can route into the right series — e.g.
// "country-canada" plus "interest-stem".

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const tags = [
    "lead-enquiry",
    `country-${slugify(data.country)}`,
    `course-${slugify(data.course)}`,
    `level-${slugify(data.educationLevel)}`,
  ];

  const payload = {
    type: "lead",
    ...data,
    tags,
    submittedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "direct",
  };

  // Sheet write is the source of truth — if it fails, return 502 so the
  // submitter can retry. Drip is fire-and-forget.
  const [sheetResult] = await Promise.all([
    forwardWebhook(process.env.GOOGLE_SHEETS_WEBHOOK_URL, payload, "leads/sheets"),
    forwardWebhook(process.env.EMAIL_DRIP_WEBHOOK_URL,    payload, "leads/drip"),
  ]);

  if (!sheetResult.ok) {
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: sheetResult.queued });
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
