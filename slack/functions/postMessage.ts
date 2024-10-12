import { log } from "@restackio/ai/function";
import { WebAPICallResult } from "@slack/web-api";
import type { AnyBlock } from "@slack/web-api";
import { slackClient } from "../utils/client";

/**
 * Post message to conversations
 *
 * @see {@link https://api.slack.com/methods/chat.postMessage}
 * @see {@link https://api.slack.com/surfaces/messages#conversations}
 */
export async function postMessage({
  blocks,
  conversationId,
  text,
  token
}: {
  blocks?: Array<AnyBlock>;
  conversationId: string;
  text: string;
  token?: string;
}): Promise<WebAPICallResult > {
  try {
    return new Promise(async (resolve) => {
      const slack = slackClient({token});

      const response = await slack.chat.postMessage({
        blocks,
        channel: conversationId,
        text,
      });

      resolve(response);
    });
  } catch (error) {
    log.error("Slack Post Message error", { error });
    throw new Error(`Slack Post Message error ${error}`);
  }
}
