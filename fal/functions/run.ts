import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import "dotenv/config";
import { falClient } from "../utils/client";

type ImageResults = {
  images: {
    url: string;
    width: number;
    height: number;
    content_type: string;
  }[];
  timings: {
    inference: number;
  };
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
};

export async function falRun({
  id = "fal-ai/flux/dev",
  prompt,
  apiKey,
}: {
  id: string;
  prompt: string;
  apiKey?: string;
}) {
  if (!prompt) {
    throw FunctionFailure.nonRetryable("No prompt");
  }

  try {
    const fal = falClient({ apiKey });

    const result: ImageResults = await fal.run(id, {
      input: {
        prompt,
      },
    });

    log.debug("result", { result });

    return result;
  } catch (error) {
    throw new Error(`Fal error ${error}`);
  }
}
