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
  imageSize = "landscape_16_9",
  numInferenceSteps = 4,
  numImages = 1,
  enableSafetyChecker = false,
  seed,
  syncMode,
  apiKey,
}: {
  id: string;
  prompt: string;
  imageSize?:
    | "square_hd"
    | "square"
    | "portrait_4_3"
    | "portrait_16_9"
    | "landscape_4_3"
    | "landscape_16_9";
  numInferenceSteps?: number;
  numImages?: number;
  enableSafetyChecker?: boolean;
  seed?: number;
  syncMode?: boolean;
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
        image_size: imageSize,
        num_inference_steps: numInferenceSteps,
        sync_mode: syncMode,
        seed,
        num_images: numImages,
        enable_safety_checker: enableSafetyChecker,
      },
    });

    log.debug("result", { result });

    return result;
  } catch (error) {
    throw new Error(`Fal error ${error}`);
  }
}
