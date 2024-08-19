import * as fal from "@fal-ai/serverless-client";
import "dotenv/config";

let falConfig: typeof fal | null = null;

export function falClient({
  apiKey = process.env.FAL_API_KEY,
}: {
  apiKey: string;
}) {
  if (!apiKey) {
    throw new Error("API key is required to create Fal client.");
  }
  if (!falConfig) {
    fal.config({ credentials: apiKey });
    falConfig = fal;
  }
  return falConfig;
}
