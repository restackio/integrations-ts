import LumaAI from "lumaai";
import "dotenv/config";
import { FunctionFailure } from "@restackio/ai/function"; // Import FunctionFailure

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
    try {
      clientLumaai = new LumaAI({
        authToken: apiKey,
      });
    } catch (error) {
      throw new FunctionFailure("Unauthorized access - invalid API key");
    }
  }

  return clientLumaai;
}
