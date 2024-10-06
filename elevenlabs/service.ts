import Restack, { ServiceInput } from "@restackio/ai";
import { elevenlabsConvert } from "./functions";
import { elevenlabsTaskQueue } from "./taskQueue";

// rate limit https://help.elevenlabs.io/hc/en-us/articles/14312733311761-How-many-requests-can-I-make-and-can-I-increase-it

export async function elevenlabsService({
  client,
  options = {
    maxConcurrentFunctionRuns: 2,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: elevenlabsTaskQueue,
    functions: { elevenlabsConvert },
    options,
  });
}

elevenlabsService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
