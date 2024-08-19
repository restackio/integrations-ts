import Restack from "@restackio/restack-sdk-ts";
import { elevenlabsConvert } from "./functions";
import { elevenlabsTaskQueue } from "./taskQueue";

export async function elevenlabsService({
  rateLimit,
  maxConcurrency = 1,
}: {
  rateLimit?: number;
  maxConcurrency?: number;
}) {
  // https://help.elevenlabs.io/hc/en-us/articles/14312733311761-How-many-requests-can-I-make-and-can-I-increase-it
  function calculateRpmToSecond(rpm: number): number {
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: elevenlabsTaskQueue,
    functions: { elevenlabsConvert },
    rateLimit: rateLimit ?? calculateRpmToSecond(480),
    maxConcurrentFunctionRuns: maxConcurrency,
  });
}

elevenlabsService({}).catch((err) => {
  console.error("Error service:", err);
});
