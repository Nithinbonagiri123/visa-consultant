import type { WebSocket } from "@fastify/websocket";
import { createChatSession } from "../lib/gemini.js";
import { VOICE_SCHEDULING_PROMPT } from "../lib/system-prompts.js";

// Per-connection session state. Stored in memory only — call ends, state is GC'd.
// Production would persist transcripts to Postgres.
type ClientMsg =
  | { type: "start"; leadName: string; country: string }
  | { type: "speech"; text: string }
  | { type: "hangup" };

type ServerMsg =
  | { type: "ready" }
  | { type: "agent_speak"; text: string }
  | { type: "transcript_user"; text: string }
  | { type: "booking_confirmed"; counsellor: string; time: string }
  | { type: "ended" }
  | { type: "error"; message: string };

// Stricter than v1: the bot must use the *exact* phrase from the prompt:
//   "Booked: <Name> · <time> tomorrow. They will call you. Thank you, bye!"
// Anything looser (e.g. "I've booked you for ...") will NOT end the call,
// preventing premature hang-ups mid-conversation.
const BOOKING_REGEX = /^Booked:\s*([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)\s*·\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*IST)\s+tomorrow\b/i;

export async function handleVoiceConnection(socket: WebSocket) {
  let session: ReturnType<typeof createChatSession> | null = null;
  let leadName = "";
  let country = "";

  const send = (msg: ServerMsg) => socket.send(JSON.stringify(msg));

  socket.on("message", async (raw) => {
    let msg: ClientMsg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      send({ type: "error", message: "Invalid JSON" });
      return;
    }

    try {
      if (msg.type === "start") {
        leadName = msg.leadName;
        country = msg.country;
        session = createChatSession(VOICE_SCHEDULING_PROMPT);

        // Seed the model with the lead context, then ask it to greet.
        const leadContext = `LEAD CONTEXT: Name=${leadName}, country=${country}, source=website form. Greet them now in one short sentence and ask if it's a good time to talk for 30 seconds.`;
        const result = await session.sendMessage(leadContext);
        const greeting = result.response.text().trim();
        send({ type: "ready" });
        send({ type: "agent_speak", text: greeting });
        return;
      }

      if (msg.type === "speech") {
        if (!session) {
          send({ type: "error", message: "Call not started" });
          return;
        }
        send({ type: "transcript_user", text: msg.text });

        const result = await session.sendMessage(msg.text);
        let reply = result.response.text().trim();

        // Empty / blank Gemini responses → graceful fallback instead of silence.
        if (!reply) {
          reply = "Sorry, I didn't quite catch that. Could you say it once more?";
        }

        send({ type: "agent_speak", text: reply });

        // Detect the booking confirmation phrase the prompt enforces.
        const bookingMatch = reply.match(BOOKING_REGEX);
        if (bookingMatch) {
          send({
            type: "booking_confirmed",
            counsellor: bookingMatch[1].trim(),
            time: bookingMatch[2].trim() + " tomorrow",
          });
          setTimeout(() => {
            send({ type: "ended" });
            socket.close();
          }, 4000);
        }
        return;
      }

      if (msg.type === "hangup") {
        send({ type: "ended" });
        socket.close();
        return;
      }
    } catch (err) {
      console.error("voice handler error:", err);
      const raw = err instanceof Error ? err.message : "Unknown error";
      // Surface friendly errors for the most common failure modes.
      let friendly = raw;
      if (raw.includes("429") || raw.toLowerCase().includes("quota")) {
        friendly = "Gemini daily free quota exhausted. Either wait until midnight Pacific time (when it resets) or switch to a different model.";
      } else if (raw.includes("API key")) {
        friendly = "Gemini API key is invalid. Check agent/.env.local.";
      }
      send({ type: "error", message: friendly });
    }
  });

  socket.on("close", () => {
    session = null;
  });
}
