import { lumaaiClient } from "../utils/client";

export async function lumaaiGetGeneration({
  generationId,
  apiKey,
}: {
  generationId: string;
  apiKey?: string;
}) {
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
