import type { FastifyInstance, FastifyRequest } from "fastify";
import { createChatSession } from "../lib/gemini.js";
import { WHATSAPP_QUALIFIER_PROMPT } from "../lib/system-prompts.js";
import type { Content } from "@google/generative-ai";

// In-memory conversation store keyed by sessionId. Production would use the
// WhatsApp phone number + a Postgres row.
const sessions = new Map<
  string,
  { session: ReturnType<typeof createChatSession>; history: Content[] }
>();

export function registerWhatsAppRoutes(app: FastifyInstance) {
  app.post(
    "/api/wa/start",
    async (
      req: FastifyRequest<{
        Body: { leadName: string; country: string };
      }>,
      reply,
    ) => {
      const sessionId = crypto.randomUUID();
      const session = createChatSession(WHATSAPP_QUALIFIER_PROMPT);

      const leadContext = `LEAD CONTEXT: Name=${req.body.leadName}, country=${req.body.country}, source=website form. Open the conversation now with a friendly hi + ask the FIRST qualifier question (target intake).`;
      const result = await session.sendMessage(leadContext);
      const opener = result.response.text().trim();

      sessions.set(sessionId, { session, history: [] });
      return reply.send({ sessionId, message: opener });
    },
  );

  app.post(
    "/api/wa/message",
    async (
      req: FastifyRequest<{
        Body: { sessionId: string; text: string };
      }>,
      reply,
    ) => {
      const entry = sessions.get(req.body.sessionId);
      if (!entry) {
        return reply.code(404).send({ error: "Session not found" });
      }
      const result = await entry.session.sendMessage(req.body.text);
      const message = result.response.text().trim();
      return reply.send({ message });
    },
  );
}
