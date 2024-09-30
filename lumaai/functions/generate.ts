import { log } from "@restackio/restack-sdk-ts/function";
import LumaAI from "lumaai";
import { lumaaiClient } from "../utils/client";

export async function lumaaiGenerate({
  prompt,
  aspectRatio,
  apiKey,
  extendGenerationId,
  fromImageUrl,
}: {
  prompt: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "21:9" | "9:21";
  apiKey?: string;
  extendGenerationId?: string;
  fromImageUrl?: string;
}) {
  try {
    const client = lumaaiClient({
      apiKey,
    });

    const generation = await client.generations
      .create({
        aspect_ratio: aspectRatio,
        prompt: prompt,
        ...(extendGenerationId
          ? {
              keyframes: {
                frame0: {
                  type: "generation",
                  id: extendGenerationId,
                },
              },
            }
          : {}),
        ...(fromImageUrl
          ? {
              keyframes: {
                frame0: {
                  type: "image",
                  url: fromImageUrl,
                },
              },
            }
          : {}),
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
