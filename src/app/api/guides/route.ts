import { NextResponse } from "next/server";
import { z } from "zod";
import { getGuide } from "@/lib/guides-data";
import { forwardWebhook } from "@/lib/webhook-forward";

// Captures a lead for a specific guide download. Fans out to the leads sheet
// (so you can see every download) and to the drip platform (which is what
// actually sends the PDF and starts the country-specific nurture series).

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  guideSlug: z.string().trim().min(1),
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

  const guide = getGuide(parsed.data.guideSlug);
  if (!guide) {
    return NextResponse.json({ error: "Unknown guide" }, { status: 404 });
  }

  const payload = {
    type: "guide_download",
    email: parsed.data.email,
    guideSlug: guide.slug,
    guideTitle: guide.title,
    tags: ["guide-downloaded", ...guide.tags],
    submittedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "direct",
  };

  const [sheetResult] = await Promise.all([
    forwardWebhook(
      process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      payload,
      "guides/sheets",
    ),
    forwardWebhook(
      process.env.EMAIL_DRIP_WEBHOOK_URL,
      payload,
      "guides/drip",
    ),
  ]);

  if (!sheetResult.ok) {
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: sheetResult.queued });
}
