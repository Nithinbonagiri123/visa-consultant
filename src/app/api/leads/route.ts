import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

// Submissions are forwarded to a Google Apps Script web app that appends a row
// to the Campus Meridian leads sheet. Configure the deployed URL via env var:
//   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
// The Apps Script should accept a JSON POST body and write the row.

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

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "direct",
  };

  if (!webhookUrl) {
    console.warn(
      "[leads] GOOGLE_SHEETS_WEBHOOK_URL not set — logging instead of forwarding:",
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
      console.error("[leads] Webhook returned", res.status, await res.text());
      return NextResponse.json(
        { error: "Forwarding failed" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[leads] Webhook error", err);
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: true });
}
