import Restack from "@restackio/restack-sdk-ts";
import { azureSpeech } from "./functions";
import { azureSpeechTaskQueue } from "./taskQueue";

export async function azureSpeechService({
  rateLimit,
  maxConcurrency = 1,
}: {
  rateLimit?: number;
  maxConcurrency?: number;
}) {
  // https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits

  function calculateRpmToSecond(rpm: number): number {
    const secondsInAMinute: number = 60;
    return rpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: azureSpeechTaskQueue,
    functions: { azureSpeech },
    rateLimit: rateLimit ?? calculateRpmToSecond(600),
    maxConcurrentFunctionRuns: maxConcurrency,
  });
}

azureSpeechService({}).catch((err) => {
  console.error("Error service:", err);
});
