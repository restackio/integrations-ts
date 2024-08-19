import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { deepgramListen, deepgramSpeak } from "./functions";
import { deepgramTaskQueue } from "./taskQueue";

// rate limit limit https://platform.deepgram.com/account/limits
// https://developers.deepgram.com/reference/api-rate-limits

export async function deepgramService(
  options: ServiceInput["options"] = {
    rateLimit: rpmToSecond(480),
    maxConcurrentFunctionRuns: 100,
  }
) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: deepgramTaskQueue,
    functions: { deepgramListen, deepgramSpeak },
    options,
  });
}

deepgramService().catch((err) => {
  console.error("Error service:", err);
});
