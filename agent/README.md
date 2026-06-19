# Campus Meridian — Agent (local demo)

A FREE local prototype of:

- **Voice scheduling bot** (`/voice.html`) — pretends to call the lead, books a slot for a human counsellor
- **WhatsApp qualifier** (`/whatsapp.html`) — chat-style lead qualification

Built on **Gemini 1.5 Flash** (free tier), browser **SpeechRecognition + SpeechSynthesis** APIs, and **Fastify**. No real telephony, no real WhatsApp — both are simulators in your browser.

## What's tested locally

✅ Conversation logic (Gemini reasoning, refusal of out-of-scope questions)
✅ State machine (greeting → consent → slot offer → booking)
✅ Tone / phrasing of the bot
✅ Qualifier field extraction over chat
✅ Hand-off message structure to human counsellor

## What's NOT tested locally

❌ Real phone calls (needs Exotel/Twilio + DLT)
❌ Real WhatsApp messages (needs Meta Business API)
❌ Indian-network call quality / accent recognition on real phone lines
❌ Voice naturalness (browser TTS is robotic; production uses ElevenLabs/OpenAI TTS — paid)

## Running it

```bash
cd agent
npm install
npm run dev
```

Then open: **http://localhost:4000**

Use **Chrome on macOS** for the voice sim — Safari's SpeechRecognition is flaky.

## Killing it

```bash
cd ..
rm -rf agent/
```

The main site doesn't depend on this folder. No cleanup needed.
