import "dotenv/config";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Load .env.local in priority over .env.
config({ path: ".env.local", override: true });

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyWebsocket from "@fastify/websocket";
import { handleVoiceConnection } from "./voice/ws-handler.js";
import { registerWhatsAppRoutes } from "./whatsapp/handler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 4000);

const app = Fastify({ logger: { level: "info" } });

await app.register(fastifyWebsocket);
await app.register(fastifyStatic, {
  // Serve `public/` at the root.
  root: join(__dirname, "../public"),
  prefix: "/",
});

// Voice simulator WebSocket — bot speaks via SpeechSynthesis in the browser.
app.get("/ws/voice", { websocket: true }, (socket) => {
  app.log.info("voice WS connected");
  handleVoiceConnection(socket);
});

// WhatsApp simulator HTTP — chat-style turn-based.
registerWhatsAppRoutes(app);

app.get("/health", async () => ({
  ok: true,
  gemini: Boolean(process.env.GOOGLE_API_KEY),
}));

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log("\n🤖 Campus Meridian agent listening at http://localhost:" + PORT);
  console.log("   Voice sim:    http://localhost:" + PORT + "/voice.html");
  console.log("   WhatsApp sim: http://localhost:" + PORT + "/whatsapp.html");
  console.log("");
});
