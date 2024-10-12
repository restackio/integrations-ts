import Restack, { ServiceInput } from "@restackio/ai";
import { postMessage } from "./functions";
import { slackTaskQueue } from "./taskQueue";

export async function slackService({
  client,
  options = {},
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: slackTaskQueue,
    functions: { postMessage },
    options,
  });
}

slackService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
