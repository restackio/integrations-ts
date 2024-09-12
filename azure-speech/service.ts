import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { azureSpeech } from "./functions";
import { azureSpeechTaskQueue } from "./taskQueue";

// rate limit https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits

export async function azureSpeechService({
  client,
  options = {
    rateLimit: rpmToSecond(600),
    maxConcurrentFunctionRuns: 1,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: azureSpeechTaskQueue,
    functions: { azureSpeech },
    options,
  });
}

azureSpeechService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
