import Restack, { ServiceInput } from "@restackio/ai";
import { rpmToSecond } from "@restackio/ai/utils";
import { postMessageToChannel } from "./functions";
import { discordTaskQueue } from "./taskQueue";

// rate limit https://discord.com/developers/docs/topics/rate-limits#global-rate-limit

export async function discordMessageService({
  client,
  options = {
    rateLimit: rpmToSecond(50 * 60),
    maxConcurrentFunctionRuns: 1,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: discordTaskQueue,
    functions: { postMessageToChannel },
    options,
  });
}

discordMessageService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
