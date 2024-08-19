import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { websocketListen, websocketSend } from "./functions";
import { websocketTaskQueue } from "./taskQueue";

export async function websocketService(options?: ServiceInput["options"]) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: websocketTaskQueue,
    functions: { websocketListen, websocketSend },
    options,
  });
}

websocketService().catch((err) => {
  console.error("Error service:", err);
});
