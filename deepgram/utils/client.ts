import { createClient, DeepgramClient } from "@deepgram/sdk";
import "dotenv/config";

let clientDeepgram: DeepgramClient;

export function deepgramClient({
  apiKey = process.env.ELEVENLABS_API_KEY,
}: {
  apiKey: string;
}) {
  if (!apiKey) {
    throw new Error("API key is required to create Deepgram client.");
  }

  if (!clientDeepgram) {
    clientDeepgram = createClient(apiKey);
  }
  return clientDeepgram;
}
