import { lumaaiClient } from "../utils/client";
import { LumaAI } from "lumaai";

export async function lumaaiListGenerations({
  apiKey,
}: {
  apiKey?: string;
}): Promise<{ list: LumaAI.Generations.GenerationListResponse }> {
  // Explicitly define the return type
  try {
    const client = lumaaiClient({
      apiKey,
    });

    const list = await client.generations.list();

    return {
      list,
    };
  } catch (error) {
    throw new Error(`LumaAI generation list error ${error}`);
  }
}
