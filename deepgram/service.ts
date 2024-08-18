import Restack from "@restackio/restack-sdk-ts";
import { deepgramListen, deepgramSpeak } from "./functions";
import { deepgramTaskQueue } from "./taskQueue";

export async function deepgramService() {
  function calculateRpmToSecond(deepgramRpm: number): number {
    // RPD limit https://platform.deepgram.com/account/limits
    const secondsInAMinute: number = 60;
    return deepgramRpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: deepgramTaskQueue,
    functions: { deepgramListen, deepgramSpeak },
    rateLimit: calculateRpmToSecond(480),
  });
}

deepgramService().catch((err) => {
  console.error("Error in main:", err);
});
