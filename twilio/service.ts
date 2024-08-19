import Restack from "@restackio/restack-sdk-ts";
import { twilioCall } from "./functions";
import { twilioTaskQueue } from "./taskQueue";

export async function twilioService({
  rateLimit,
  maxConcurrency = 3,
}: {
  rateLimit?: number;
  maxConcurrency?: number;
}) {
  // https://play.cartesia.ai/subscription
  function calculateRpmToSecond(rpm: number): number {
    // RPD limit https://platform.deepgram.com/account/limits
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: twilioTaskQueue,
    functions: { twilioCall },
    rateLimit: rateLimit ?? calculateRpmToSecond(480),
    maxConcurrentFunctionRuns: maxConcurrency,
  });
}

twilioService({}).catch((err) => {
  console.error("Error service:", err);
});
