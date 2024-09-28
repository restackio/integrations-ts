import LumaAI from "lumaai";
import "dotenv/config";

let clientLumaai: LumaAI;

export function lumaaiClient({
  apiKey = process.env.LUMAAI_API_KEY,
}: {
  apiKey: string;
}) {
  if (!apiKey) {
    throw new Error("API key is required to create LumaAI client.");
  }

  if (!clientLumaai) {
    clientLumaai = new LumaAI({ authToken: apiKey });
  }
  return clientLumaai;
}
