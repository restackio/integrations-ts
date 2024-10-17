# @restackio/integrations-elevenlabs

This package provides an integration with ElevenLabs API for text-to-speech conversion using Restack.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-elevenlabs
```

## Usage

### Setting up the ElevenLabs service

First, import the necessary modules and set up the ElevenLabs service:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { elevenlabsService } from "@restackio/integrations-elevenlabs";

export async function services() {
  const client = new Restack();
  elevenlabsService({ client }).catch((err) => {
    console.error("Error starting ElevenLabs service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Converting text to speech

To convert text to speech, use the `elevenlabsConvert` function:

```typescript
// convertTextToSpeech.ts

import { log, step } from "@restackio/ai/workflow";
import * as elevenLabsFunctions from "@restackio/integrations-elevenlabs/functions";
import { elevenlabsTaskQueue } from "@restackio/integerations-elevenlabs/taskQueue";

export async function convertTextToSpeechWorkflow() {
  const result = await step<typeof elevenLabsFunctions>({
    taskQueue: elevenlabsTaskQueue,
  }).elevenlabsConvert({
    text: "Hello, world!",
    apiKey: "YOUR_ELEVENLABS_API_KEY",
  });
  log.info("result", { result: result.media.payload }); // Base64 encoded audio
}
```

## Configuration

The `elevenlabsConvert` function accepts the following parameters:

- `text` (required): The text to convert to speech.
- `voiceId` (optional): The ID of the voice to use. Defaults to "fCxG8OHm4STbIsWe4aT9".
- `options` (optional): Additional options for the text-to-speech conversion.
- `twilioEncoding` (optional): Set to enable Twilio-compatible encoding.
- `apiKey` (required): Your ElevenLabs API key.

## Environment Variables

To use the ElevenLabs client without explicitly passing the API key, set the following environment variable:

```bash
ELEVENLABS_API_KEY=your_api_key_here
```
