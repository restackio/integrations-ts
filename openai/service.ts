import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import {
  openaiChatCompletionsBase,
  openaiChatCompletionsStream,
} from "./functions";
import { openaiTaskQueue } from "./taskQueue";

// rate limit https://platform.openai.com/account/limits

export async function openaiService(
  options: ServiceInput["options"] = {
    rateLimit: rpmToSecond(5000),
  }
) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: openaiTaskQueue,
    functions: { openaiChatCompletionsBase, openaiChatCompletionsStream },
    options,
  });
}

openaiService().catch((err) => {
  console.error("Error in main:", err);
});
