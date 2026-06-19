import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardWebhook } from "@/lib/webhook-forward";
import { sanitiseRefererForSheet } from "@/lib/sanitise";

// "Email me this report" submissions from any of the interactive tools.
// Captures the user's email + the structured tool result so the drip can
// send a real PDF/summary later. Tag carries the tool name for routing.

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(254),
  tool: z.enum([
    "visa-eligibility",
    "loan-emi",
    "destination-finder",
    "admit-probability",
  ]),
  payload: z.record(z.string(), z.unknown()).optional(),
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
    type: "tool_result_email",
    email: parsed.data.email,
    tool: parsed.data.tool,
    result: parsed.data.payload ?? {},
    tags: [
      "tool-result-emailed",
      `tool-${parsed.data.tool}`,
    ],
    submittedAt: new Date().toISOString(),
    source: sanitiseRefererForSheet(req.headers.get("referer")),
  };

  const [sheetResult] = await Promise.all([
    forwardWebhook(process.env.GOOGLE_SHEETS_WEBHOOK_URL, payload, "save-result/sheets"),
    forwardWebhook(process.env.EMAIL_DRIP_WEBHOOK_URL,    payload, "save-result/drip"),
  ]);

  if (!sheetResult.ok) {
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: sheetResult.queued });
}
