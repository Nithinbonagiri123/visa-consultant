import { GoogleGenerativeAI, type ChatSession, type Content } from "@google/generative-ai";

// Lazy-initialised so module import doesn't crash before dotenv has loaded.
let _genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (_genAI) return _genAI;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Copy .env.example to .env.local and paste a key from https://aistudio.google.com/apikey",
    );
  }
  _genAI = new GoogleGenerativeAI(apiKey);
  return _genAI;
}

/**
 * Create a stateful chat session bound to a system instruction.
 * The caller drives the conversation by repeatedly calling sendMessage().
 */
export function createChatSession(
  systemInstruction: string,
  history: Content[] = [],
): ChatSession {
  const model = getGenAI().getGenerativeModel({
    // Free tier choice — Google tightened this substantially in 2025/26:
    //   gemini-2.5-flash       : 20 RPD free (too low)
    //   gemini-2.0-flash       : 0 RPD free (paid-only on most accounts now)
    //   gemini-2.5-flash-lite  : 1,000+ RPD free ← we use this
    //
    // The lite model is less polished but very capable for short
    // scheduling / qualifier turns.
    model: "gemini-2.5-flash-lite",
    systemInstruction,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 400, // short turns but not truncated mid-sentence
    },
  });
  return model.startChat({ history });
}

/** One-shot helper — for non-conversational tasks (e.g. extract qualifier JSON). */
export async function ask(systemInstruction: string, userMessage: string): Promise<string> {
  const model = getGenAI().getGenerativeModel({
    // Free tier choice — Google tightened this substantially in 2025/26:
    //   gemini-2.5-flash       : 20 RPD free (too low)
    //   gemini-2.0-flash       : 0 RPD free (paid-only on most accounts now)
    //   gemini-2.5-flash-lite  : 1,000+ RPD free ← we use this
    //
    // The lite model is less polished but very capable for short
    // scheduling / qualifier turns.
    model: "gemini-2.5-flash-lite",
    systemInstruction,
    generationConfig: { temperature: 0.2 },
  });
  const result = await model.generateContent(userMessage);
  return result.response.text().trim();
}
