import { log } from "@restackio/restack-sdk-ts/function";
import LumaAI from "lumaai";
import { lumaaiClient } from "../utils/client";

export async function lumaaiGeneration({
  prompt,
  aspectRatio,
  apiKey,
}: {
  prompt: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "21:9" | "9:21";
  apiKey?: string;
}) {
  try {
    const client = lumaaiClient({
      apiKey,
    });

    const generation = await client.generations
      .create({
        aspect_ratio: aspectRatio,
        prompt: prompt,
      })
      .catch(async (err) => {
        if (err instanceof LumaAI.APIError) {
          log.error("generation error", { err });
        } else {
          throw err;
        }
      });

    return {
      generation,
    };
  } catch (error) {
    throw new Error(`LumaAI generation error ${error}`);
  }
}
