import Restack, { Worker } from "@restackio/restack-sdk-ts";
import { openaiChatCompletion } from "./functions";
import { openaiTaskQueue } from "./taskQueue";

export async function openaiWorker() {
  function calculateRpmToSecond(openaiRpm: number): number {
    // RPD limit https://platform.openai.com/account/limits
    const secondsInAMinute: number = 60;
    return openaiRpm / secondsInAMinute;
  }
  const restack = new Restack();

  const worker: Worker = await restack.createWorker({
    taskQueue: openaiTaskQueue,
    functions: { openaiChatCompletion },
    rateLimit: calculateRpmToSecond(5000),
  });
  return worker;
}
