// Fan-out helper: forwards a JSON payload to a webhook URL with structured
// error logging. Returns a discriminated result so the caller can decide what
// counts as a hard failure (e.g. sheet write) vs. fire-and-forget (drip).

export type ForwardResult =
  | { ok: true; queued: true }
  | { ok: true; queued: false; reason: "no-url" }
  | { ok: false; status: number; reason: string };

export async function forwardWebhook(
  url: string | undefined,
  payload: unknown,
  name: string,
): Promise<ForwardResult> {
  if (!url) {
    console.warn(`[${name}] webhook URL not set — logging:`, payload);
    return { ok: true, queued: false, reason: "no-url" };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[${name}] webhook returned`, res.status, text);
      return { ok: false, status: res.status, reason: text || "non-2xx" };
    }
    return { ok: true, queued: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "network-error";
    console.error(`[${name}] webhook error`, err);
    return { ok: false, status: 0, reason };
  }
}
