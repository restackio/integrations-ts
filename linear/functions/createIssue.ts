import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";
import { linearClient } from "../utils/client";

export async function linearCreateIssue({
  issue,
  apiKey,
}: {
  issue: IssueCreateInput;
  apiKey?: string;
}) {
  if (!issue) {
    throw FunctionFailure.nonRetryable("No issue");
  }

  try {
    const linear = linearClient({ apiKey });

    const result = await linear.createIssue(issue);

    log.debug("result", { result });

    return result;
  } catch (error) {
    throw new Error(`Fal error ${error}`);
  }
}
