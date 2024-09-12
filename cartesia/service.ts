import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { cartesiaTtsBytes } from "./functions";
import { cartesiaTaskQueue } from "./taskQueue";

// rate limit https://play.cartesia.ai/subscription

export async function cartesiaService({
  client,
  options = {
    rateLimit: rpmToSecond(480),
    maxConcurrentFunctionRuns: 3,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: cartesiaTaskQueue,
    functions: { cartesiaTtsBytes },
    options,
  });
}

cartesiaService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
