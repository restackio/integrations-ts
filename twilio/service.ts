import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { twilioCall } from "./functions";
import { twilioTaskQueue } from "./taskQueue";

// rate limit https://help.twilio.com/articles/223180028

export async function twilioService({
  client,
  options = {
    rateLimit: 1,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: twilioTaskQueue,
    functions: { twilioCall },
    options,
  });
}

twilioService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
