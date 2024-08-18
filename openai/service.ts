import Restack from "@restackio/restack-sdk-ts";
import { openaiChatCompletion } from "./functions";
import { openaiTaskQueue } from "./taskQueue";

export async function openaiService() {
  function calculateRpmToSecond(openaiRpm: number): number {
    // RPD limit https://platform.openai.com/account/limits
    const secondsInAMinute: number = 60;
    return openaiRpm / secondsInAMinute;
  }
  const restack = new Restack();

  await restack.startService({
    taskQueue: openaiTaskQueue,
    functions: { openaiChatCompletion },
    rateLimit: calculateRpmToSecond(5000),
  });
}

openaiService().catch((err) => {
  console.error("Error in main:", err);
});
