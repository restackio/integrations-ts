import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { falTaskQueue } from "./taskQueue";
import { falRun } from "./functions";

export async function falService({
  client,
  options,
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: falTaskQueue,
    functions: { falRun },
    options,
  });
}

falService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
