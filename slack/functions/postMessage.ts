import { log } from "@restackio/ai/function";
import { WebAPICallResult } from "@slack/web-api";
import type { AnyBlock } from "@slack/web-api";
import { slackClient } from "../utils/client";

export type PostMessage = {
  blocks?: Array<AnyBlock>;
  conversationId: string;
  mrkdwn?: boolean;
  text: string;
  token?: string;
};

/**
 * Post message to conversations
 *
 * @see {@link https://api.slack.com/methods/chat.postMessage}
 * @see {@link https://api.slack.com/surfaces/messages#conversations}
 * @see {@link https://api.slack.com/surfaces/messages#payloads}
 */
export async function postMessage({
  blocks,
  conversationId,
  mrkdwn = true,
  text,
  token,
}: PostMessage): Promise<WebAPICallResult> {
  if (!conversationId) {
    throw new Error(`Missing 'conversationId' value`)
  }

  if (!text) {
    throw new Error(`Missing 'text' value`)
  }

  try {
    const slack = slackClient({ token });

    const response = await slack.chat.postMessage({
      blocks,
      channel: conversationId,
      mrkdwn,
      text,
    });

    return response;

  } catch (error) {
    log.error("Slack Post Message error", { error });
    throw new Error(`Slack Post Message error ${error}`);
  }
}
