import { lumaaiClient } from "../utils/client";
import { LumaAI } from "lumaai";

export async function lumaaiGetGeneration({
  generationId,
  apiKey,
}: {
  generationId: string;
  apiKey?: string;
}): Promise<{ generation: LumaAI.Generation }> {
  // Explicitly define the return type
  try {
    const client = lumaaiClient({
      apiKey,
    });

    const generation = await client.generations.get(generationId);

    return {
      generation,
    };
  } catch (error) {
    throw new Error(`LumaAI generation error ${error}`);
  }
}
