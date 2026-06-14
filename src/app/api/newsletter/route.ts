import { NextResponse } from "next/server";
import { z } from "zod";

// Newsletter signups share the same Google Apps Script webhook as lead
// submissions (configured via GOOGLE_SHEETS_WEBHOOK_URL). A `source` field
// lets the Apps Script route these to a separate sheet/tab if desired.

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
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

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const payload = {
    type: "newsletter",
    email: parsed.data.email,
    submittedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "direct",
  };

  if (!webhookUrl) {
    console.warn(
      "[newsletter] GOOGLE_SHEETS_WEBHOOK_URL not set — logging instead of forwarding:",
      payload,
    );
    return NextResponse.json({ ok: true, queued: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[newsletter] Webhook returned", res.status, await res.text());
      return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[newsletter] Webhook error", err);
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: true });
}
