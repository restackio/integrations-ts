import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { elevenlabsConvert } from "./functions";
import { elevenlabsTaskQueue } from "./taskQueue";

// rate limit https://help.elevenlabs.io/hc/en-us/articles/14312733311761-How-many-requests-can-I-make-and-can-I-increase-it

export async function elevenlabsService(
  options: ServiceInput["options"] = {
    maxConcurrentFunctionRuns: 2,
  }
) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: elevenlabsTaskQueue,
    functions: { elevenlabsConvert },
    options,
  });
}

elevenlabsService().catch((err) => {
  console.error("Error service:", err);
});
