import Restack, { ServiceInput } from "@restackio/ai";
import { rpmToSecond } from "@restackio/ai/utils";
import {
  openaiChatCompletionsBase,
  openaiChatCompletionsStream,
} from "./functions";
import { openaiTaskQueue } from "./taskQueue";

// rate limit https://platform.openai.com/account/limits

export async function openaiService({
  client,
  options = {
    rateLimit: rpmToSecond(10000),
  },
  taskQueueSuffix,
}: {
  client: Restack;
  options?: ServiceInput["options"];
  taskQueueSuffix?: string;
}) {
  await client.startService({
    taskQueue: `${openaiTaskQueue}${taskQueueSuffix ?? ""}`,
    functions: { openaiChatCompletionsBase, openaiChatCompletionsStream },
    options,
  });
}

// Optional: Call the service directly for testing
openaiService({ client: new Restack() }).catch((err) => {
  console.error("Error in main:", err);
});
