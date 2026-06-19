import { NextResponse } from "next/server";
import { z } from "zod";
import { getWebinar } from "@/lib/webinars-data";
import { forwardWebhook } from "@/lib/webhook-forward";
import { sanitiseRefererForSheet } from "@/lib/sanitise";

// Webinar registrations fan out to Google Sheets + email drip with a
// per-webinar tag so the drip can send reminder emails, calendar invites,
// and the recording link after the event.

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(254),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(8).max(20).regex(/^[\d+\-\s()]+$/).optional().or(z.literal("")),
  webinarSlug: z.string().trim().min(1).max(120),
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

  const webinar = getWebinar(parsed.data.webinarSlug);
  if (!webinar) {
    return NextResponse.json({ error: "Unknown webinar" }, { status: 404 });
  }

  const payload = {
    type: "webinar_registration",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    webinarSlug: webinar.slug,
    webinarTitle: webinar.title,
    webinarStartAt: webinar.startAt,
    tags: [
      "webinar-registered",
      `webinar-${webinar.slug}`,
      `webinar-tier-${webinar.tier.toLowerCase()}`,
    ],
    submittedAt: new Date().toISOString(),
    source: sanitiseRefererForSheet(req.headers.get("referer")),
  };

  const [sheetResult] = await Promise.all([
    forwardWebhook(process.env.GOOGLE_SHEETS_WEBHOOK_URL, payload, "webinars/sheets"),
    forwardWebhook(process.env.EMAIL_DRIP_WEBHOOK_URL,    payload, "webinars/drip"),
  ]);

  if (!sheetResult.ok) {
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: sheetResult.queued });
}
