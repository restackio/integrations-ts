import { ElevenLabsClient } from "elevenlabs";
import "dotenv/config";

let clientElevenlabs: ElevenLabsClient;

export function elevenlabsClient({
  apiKey = process.env.ELEVENLABS_API_KEY,
}: {
  apiKey: string;
}) {
  if (!apiKey) {
    throw new Error("API key is required to create ElevenLabs client.");
  }
  if (!clientElevenlabs) {
    clientElevenlabs = new ElevenLabsClient({
      apiKey,
    });
  }
  return clientElevenlabs;
}
