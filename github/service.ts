import Restack, { ServiceInput } from "@restackio/ai";

import { githubTaskQueue } from "./taskQueue.js";
import {
  createRelease,
  getReleases,
  publishRelease,
  getLatestRelease,
} from "./functions/index.js";

export async function githubService({
  client,
  options = {
    rateLimit: 100,
  },
}: {
  client: Restack.default;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: githubTaskQueue,
    functions: {
      createRelease,
      getReleases,
      publishRelease,
      getLatestRelease,
    },
    options,
  });
}

githubService({ client: new Restack.default() }).catch((err) => {
  console.error("Error service:", err);
});
