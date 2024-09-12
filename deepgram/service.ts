import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { deepgramListen, deepgramSpeak } from "./functions";
import { deepgramTaskQueue } from "./taskQueue";

// rate limit limit https://platform.deepgram.com/account/limits
// https://developers.deepgram.com/reference/api-rate-limits

export async function deepgramService({
  client,
  options = {
    rateLimit: rpmToSecond(480),
    maxConcurrentFunctionRuns: 100,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: deepgramTaskQueue,
    functions: { deepgramListen, deepgramSpeak },
    options,
  });
}

deepgramService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
