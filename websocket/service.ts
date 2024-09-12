import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { websocketListen, websocketSend } from "./functions";
import { websocketTaskQueue } from "./taskQueue";

export async function websocketService({
  client,
  options,
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: websocketTaskQueue,
    functions: { websocketListen, websocketSend },
    options,
  });
}

websocketService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
