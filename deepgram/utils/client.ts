import { createClient, DeepgramClient } from "@deepgram/sdk";

let clientDeepgram: DeepgramClient;

export function deepgramClient({ apiKey }: { apiKey: string }) {
  if (!clientDeepgram) {
    clientDeepgram = createClient(apiKey);
  }
  return clientDeepgram;
}
