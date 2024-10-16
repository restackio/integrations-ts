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
// services.ts
import Restack from "@restackio/ai";
import { openaiService } from "@restackio/integrations-openai";

export async function services() {
  const client = new Restack();
  openaiService({ client, options: { rateLimit: 1000 } }).catch((err) => {
    console.error("Error starting OpenAi service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Chat Completions

For basic chat completions:

```typescript
// openaiChatCompletionsBase.ts

import { log, step } from "@restackio/ai/workflow";
import * as openaiFunctions from "@restackio/integrations-openai/functions";
import { openaiTaskQueue } from "@restackio/integrations-openai/taskQueue";

export async function openaiChatCompletionsBaseWorkflow() {
  const response = await step<typeof openaiFunctions>({
    taskQueue: openaiTaskQueue,
  }).openaiChatCompletionsBase({
    userContent: "Hello, how are you?",
    model: "gpt-4",
    apiKey: "your-api-key-here",
  });
}
```

For streaming chat completions:

```typescript
// streamingChatCompletions.ts

import { log, step } from "@restackio/ai/workflow";
import * as openaiFunctions from "@restackio/integrations-openai/functions";
import { openaiTaskQueue } from "@restackio/integrations-openai/taskQueue";

export async function streamingChatsCompletionsWorkflow() {
  const response = await step<typeof openaiFunctions>({
    taskQueue: openaiTaskQueue,
  }).openaiChatCompletionsStream({
    newMessage: "Tell me a story",
    model: "gpt-4",
    streamAtCharacter: ".",
    streamEvent: {
      workflowEventName: "story_chunk",
    },
    apiKey: "your-api-key-here",
  });
}
```

## Configuration

The package uses environment variables for configuration. Make sure to set:

- `OPENAI_API_KEY`: Your OpenAI API key
