# Slack for Restack

This package provides an integration for Slack with Restack, allowing:

- the posting of messages to [conversations](https://api.slack.com/surfaces/messages#conversations)

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-slack
```

## Configuration

Before using the Slack integration you need to set up your Slack Bot User OAuth token. You can do this by setting an environment variable or passing it directly to the functions.

1. Set up environment variables:

```bash
SLACK_TOKEN=your_slack_bot_user_oauth_token
```

2. Or pass them directly when calling the functions (see Usage section).

## Usage

### Starting the Slack Service

To start the Slack service, use the `slackService` function:

```typescript
import Restack from "@restackio/ai";
import { slackService } from "@restackio/integrations-slack";

const client = new Restack();

slackService({ client }).catch((err) => {
  console.error("Error starting Slack service:", err);
});
```

### Using the Slack Post Message Function

This function allows the posting of messages to [conversations](https://api.slack.com/).

In order to use this function your Slack Bot User OAuth token must have one of these scopes:

- `bot`
- `chat:bot:write`
- `chat:user:write`

```typescript
import { postMessage } from "@restackio/integrations-slack/functions";

const result = await postMessage({
  blocks, // optional
  conversationId: "your_conversation_id", // Can be a channel ID, a DM ID, a MPDM ID, or a group ID
  mrkdwn, // defaults to true
  text: "Hello World!",
  token: "your_slack_bot_user_oauth_token", // Optional if set in environment variables
});

console.log(result);
```
