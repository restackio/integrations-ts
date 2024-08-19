import Restack from "@restackio/restack-sdk-ts";
import { cartesiaTtsBytes } from "./functions";
import { cartesiaTaskQueue } from "./taskQueue";

export async function deepgramService({
  rateLimit,
  maxConcurrency = 3,
}: {
  rateLimit?: number;
  maxConcurrency?: number;
}) {
  // https://play.cartesia.ai/subscription
  function calculateRpmToSecond(rpm: number): number {
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: cartesiaTaskQueue,
    functions: { cartesiaTtsBytes },
    rateLimit: rateLimit ?? calculateRpmToSecond(480),
    maxConcurrentFunctionRuns: maxConcurrency,
  });
}

deepgramService({}).catch((err) => {
  console.error("Error service:", err);
});
