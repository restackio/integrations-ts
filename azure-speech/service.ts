import Restack, { ServiceInput } from "@restackio/ai";
import { rpmToSecond } from "@restackio/ai/utils";
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
