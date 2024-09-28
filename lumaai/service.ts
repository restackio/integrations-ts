import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { lumaaiGeneration } from "./functions";
import { lumaaiTaskQueue } from "./taskQueue";

// https://docs.lumalabs.ai/docs/rate-limits

export async function lumaaiService({
  client,
  options = {
    rateLimit: rpmToSecond(50 * 60),
    maxConcurrentFunctionRuns: 20,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: lumaaiTaskQueue,
    functions: { lumaaiGeneration },
    options,
  });
}

lumaaiService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
