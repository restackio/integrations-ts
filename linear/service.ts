import Restack, { ServiceInput } from "@restackio/restack-sdk-ts";
import { rpmToSecond } from "@restackio/restack-sdk-ts/utils";
import { linearTaskQueue } from "./taskQueue";
import { linearCreateComment, linearCreateIssue } from "./functions";

// https://developers.linear.app/docs/graphql/working-with-the-graphql-api/rate-limiting

export async function linearService({
  client,
  options = {
    rateLimit: rpmToSecond(1500 * 60),
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: linearTaskQueue,
    functions: { linearCreateComment, linearCreateIssue },
    options,
  });
}

linearService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
