import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import { CommentCreateInput } from "@linear/sdk/dist/_generated_documents";
import { linearClient } from "../utils/client";

export async function linearCreateComment({
  comment,
  apiKey,
}: {
  comment: CommentCreateInput;
  apiKey?: string;
}) {
  if (!comment) {
    throw FunctionFailure.nonRetryable("No comment");
  }

  try {
    const linear = linearClient({ apiKey });

    const result = await linear.createComment(comment);

    log.debug("result", { result });

    return result;
  } catch (error) {
    throw new Error(`Fal error ${error}`);
  }
}
