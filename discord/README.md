# Discord Integration for Restack

This package provides an integration for Discord with Restack, allowing message sending to individual channels in a Discord server.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-discord
```

## Configuration

Before using the Discord integration, you need to set up your Discord app's bot token. You can do this by setting environment variables or passing them directly to the functions.

1. Set up environment variables:

```bash
DISCORD_BOT_TOKEN=your_discord_bot_token
```

2. Or pass them directly when calling the functions (see Usage section).

## Usage

### Starting the Discord Service

To start the Discord service, use the `discordMessageService` function:

```typescript
import Restack from "@restackio/ai";
import { discordMessageService } from "@restackio/integrations-discord";
const client = new Restack();
discordMessageService({ client }).catch((err) => {
    console.error("Error starting Discord service:", err);
});
```

### Using the Discord Send Message Function

The main function provided by this integration is `postMessageToChannel`. Here's how to use it:

```typescript
import { postMessageToChannel } from "@restackio/integrations-discord/functions";
const result = await postMessageToChannel({
  messageText: "Hello, world!",
  chnnelId: "exampleChannelId",
  botToken: "your_discord_app_bot_token" // Optional if set in environment variables
});
console.log(result.content);
```
