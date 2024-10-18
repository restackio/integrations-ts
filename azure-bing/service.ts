import Restack, { ServiceInput } from "@restackio/ai";
import { rpmToSecond } from "@restackio/ai/utils";
import { azureBingWebSearch } from "./functions";
import { azureBingTaskQueue } from "./taskQueue";

// rate limit https://www.microsoft.com/en-us/bing/apis/pricing

export async function azureBingService({
  client,
  options = {
    rateLimit: rpmToSecond(3),
    maxConcurrentFunctionRuns: 1,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: azureBingTaskQueue,
    functions: { azureBingWebSearch },
    options,
  });
}

azureBingService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
