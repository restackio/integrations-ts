import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { cartesiaTtsBytes } from "./functions";
import { cartesiaTaskQueue } from "./taskQueue";

// rate limit https://play.cartesia.ai/subscription

export async function deepgramService(
  options: ServiceInput["options"] = {
    rateLimit: rpmToSecond(480),
    maxConcurrentFunctionRuns: 3,
  }
) {
  function calculateRpmToSecond(rpm: number): number {
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: cartesiaTaskQueue,
    functions: { cartesiaTtsBytes },
    options,
  });
}

deepgramService().catch((err) => {
  console.error("Error service:", err);
});
