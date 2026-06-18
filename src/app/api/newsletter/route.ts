import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardWebhook } from "@/lib/webhook-forward";
import { sanitiseRefererForSheet } from "@/lib/sanitise";

// Newsletter signups fan out to the leads sheet (under a tagged row) and to
// the drip platform, tagged "newsletter" so the drip system starts the
// nurture sequence.

export const runtime = "nodejs";

const schema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(254, "Email is too long"),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const payload = {
    type: "newsletter",
    email: parsed.data.email,
    tags: ["newsletter"],
    submittedAt: new Date().toISOString(),
    source: sanitiseRefererForSheet(req.headers.get("referer")),
  };

  const [sheetResult] = await Promise.all([
    forwardWebhook(
      process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      payload,
      "newsletter/sheets",
    ),
    forwardWebhook(
      process.env.EMAIL_DRIP_WEBHOOK_URL,
      payload,
      "newsletter/drip",
    ),
  ]);

  if (!sheetResult.ok) {
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: sheetResult.queued });
}
