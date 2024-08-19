import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { falRun } from "./functions";
import { falTaskQueue } from "./taskQueue";

export async function falService(options?: ServiceInput["options"]) {
  const restack = new Restack();

  await restack.startService({
    taskQueue: falTaskQueue,
    functions: { falRun },
    options,
  });
}

falService().catch((err) => {
  console.error("Error service:", err);
});
