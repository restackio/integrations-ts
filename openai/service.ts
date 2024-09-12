import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import {
  openaiChatCompletionsBase,
  openaiChatCompletionsStream,
} from "./functions";
import { openaiTaskQueue } from "./taskQueue";

// rate limit https://platform.openai.com/account/limits

export async function openaiService({
  client,
  options = {
    rateLimit: rpmToSecond(5000),
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: openaiTaskQueue,
    functions: { openaiChatCompletionsBase, openaiChatCompletionsStream },
    options,
  });
}

// Optional: Call the service directly for testing
openaiService({ client: new Restack() }).catch((err) => {
  console.error("Error in main:", err);
});
