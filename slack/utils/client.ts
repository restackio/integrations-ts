import { WebClient } from "@slack/web-api";
import "dotenv/config";

export function slackClient({
  token = process.env.SLACK_TOKEN,
}: {
  token?: string;
}): WebClient {
  if (!token) {
    throw new Error("Slack Bot User OAuth Token is missing");
  }

  const client = new WebClient(token);

  return client;
}
