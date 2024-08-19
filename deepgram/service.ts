import Restack from "@restackio/restack-sdk-ts";
import { deepgramListen, deepgramSpeak } from "./functions";
import { deepgramTaskQueue } from "./taskQueue";

export async function deepgramService({
  rateLimit,
  maxConcurrency = 100,
}: {
  rateLimit?: number;
  maxConcurrency?: number;
}) {
  // RPD limit https://platform.deepgram.com/account/limits
  // https://developers.deepgram.com/reference/api-rate-limits

  function calculateRpmToSecond(rpm: number): number {
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: deepgramTaskQueue,
    functions: { deepgramListen, deepgramSpeak },
    rateLimit: rateLimit ?? calculateRpmToSecond(480),
    maxConcurrentFunctionRuns: maxConcurrency,
  });
}

deepgramService({}).catch((err) => {
  console.error("Error service:", err);
});
