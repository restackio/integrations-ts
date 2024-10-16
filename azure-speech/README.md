# Azure Speech Integration for Restack

This package provides an integration for Azure Speech services with Restack, allowing easy text-to-speech conversion using Microsoft's Cognitive Services.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-azurespeech
```

## Configuration

Before using the Azure Speech integration, you need to set up your Azure credentials. You can do this by setting environment variables or passing them directly to the functions.

1. Set up environment variables:

```bash
AZURE_SPEECH_API_KEY=your_azure_speech_api_key
AZURE_SPEECH_REGION=your_azure_speech_region
```

2. Or pass them directly when calling the functions (see Usage section).

## Usage

### Starting the Azure Speech Service

To start the Azure Speech service, use the `azureSpeechService` function:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { azureSpeechService } from "@restackio/integrations-azurespeech";

export async function services() {
  const client = new Restack();
  azureSpeechService({ client }).catch((err) => {
    console.error("Error starting Azure Speech service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Using the Azure Speech Function

The main function provided by this integration is `azureSpeech`. Here's how to use it inside a workflow as part of one of its steps:

```typescript
/// workflows/createRelease.ts

import { log, step } from "@restackio/ai/workflow";
import * as azureFunctions from "@restackio/integrations-azurespeech/functions";
import { azureSpeechTaskQueue } from "@restackio/integrations-azurespeech/taskQueue";

export async function azureSpeechWorkflow() {
  const result = await step<typeof azureFunctions>({
    taskQueue: azureSpeechTaskQueue,
  }).azureSpeech({
    text: "Hello, world!",
    config: {
      voiceName: "en-US-DavisNeural",
      format: sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3,
    },
    apiKey: "your_azure_speech_api_key", // Optional if set in environment variables
    region: "your_azure_speech_region", // Optional if set in environment variables
  });
  log(result.media.payload); // Base64 encoded audio data
  return result;
}
```
