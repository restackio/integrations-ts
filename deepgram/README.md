# Restack Deepgram Integration

This package provides an integration for Deepgram's speech-to-text and text-to-speech services within the Restack AI framework.

## Installation

To install the Deepgram integration, use npm or yarn:

```bash
npm install @restackio/integrations-deepgram
```

## Configuration

Before using the Deepgram integration, make sure to set up your Deepgram API key. You can do this by setting the `DEEPGRAM_API_KEY` environment variable or by passing the API key directly to the client.

## Usage

### Initializing the Deepgram Service

To start the Deepgram service:

```typescript
// services.ts

import Restack from "@restackio/ai";
import { deepgramService } from "@restackio/integrations-deepgram";

export async function services() {
  const client = new Restack();
  deepgramService({ client }).catch((err) => {
    console.error("Error starting Deepgram service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Available Functions

This integration provides two main functions:

1. `deepgramListen`: Transcribe audio to text
2. `deepgramSpeak`: Convert text to speech

#### Transcribing Audio (Speech-to-Text)

```typescript
// transcribeAudioWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as deepgramFunctions from "@restackio/integrations-deepgram/functions";
import { deepgramTaskQueue } from "@restackio/integerations-deepgram/taskQueue";

export async function transcribeAudioWorkflow() {
  const result = await step<typeof deepgramFunctions>({
    taskQueue: deepgramTaskQueue,
  }).deepgramListen({
    base64Payload: "your_base64_encoded_audio",
    options: {
      model: "nova-2",
      punctuate: true,
      interim_results: true,
      endpointing: 500,
      utterance_end_ms: 2000,
    },
  });
  log(result.transcript);
}
```

#### Converting Text to Speech

```typescript
import { log, step } from "@restackio/ai/workflow";
import * as deepgramFunctions from "@restackio/integrations-deepgram/functions";
import { deepgramTaskQueue } from "@restackio/integerations-deepgram/taskQueue";

export async function deepgramSpeakWorkflow() {
  const result = await step<typeof deepgramFunctions>({
    taskQueue: deepgramTaskQueue,
  }).deepgramSpeak({
    text: "Hello, world!",
    options: {
      model: "aura-arcas-en",
    },
  });
  log(result.media.payload); // Base64 encoded audio
}
```
