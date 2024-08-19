import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { twilioCall } from "./functions";
import { twilioTaskQueue } from "./taskQueue";

// rate limit https://help.twilio.com/articles/223180028

export async function twilioService(
  options: ServiceInput["options"] = {
    rateLimit: 1,
  }
) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: twilioTaskQueue,
    functions: { twilioCall },
    options,
  });
}

twilioService({}).catch((err) => {
  console.error("Error service:", err);
});
