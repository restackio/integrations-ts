# @restackio/integrations-openai

This package provides an integration for OpenAI's API, specifically tailored for use with the Restack AI framework.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-openai
```

## Features

- OpenAI Chat Completions (base and streaming)
- Rate limiting support
- Cost calculation
- Tool calls handling
- Event streaming

## Usage

### Basic Setup

```typescript
import Restack from "@restackio/ai";
import { openaiService } from "@restackio/integrations-openai";
const client = new Restack();
await openaiService({
  client,
  options: {
  rateLimit: rpmToSecond(10000)
  }
});
```

### Chat Completions

For basic chat completions:

```typescript
import { openaiChatCompletionsBase } from "@restackio/integrations-openai/functions";
const response = await openaiChatCompletionsBase({
  userContent: "Hello, how are you?",
  model: "gpt-4",
  apiKey: "your-api-key-here"
});
```

For streaming chat completions:

```typescript
import { openaiChatCompletionsStream } from "@restackio/integrations-openai/functions";
const response = await openaiChatCompletionsStream({
   newMessage: "Tell me a story",
   model: "gpt-4",
   streamAtCharacter: ".",
   streamEvent: {
   workflowEventName: "story_chunk"
   },
   apiKey: "your-api-key-here"
});
```

## Configuration

The package uses environment variables for configuration. Make sure to set:

- `OPENAI_API_KEY`: Your OpenAI API key
