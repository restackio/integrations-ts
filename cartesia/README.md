# Cartesia Integration for Restack

This package provides integration with Cartesia AI services for Restack applications.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-cartesia
```

## Configuration

Before using the Cartesia integration, make sure to set up your Cartesia API key. You can do this by setting the `CARTESIA_API_KEY` environment variable or by passing it directly to the functions.

## Usage

### Starting the Cartesia Service

To start the Cartesia service, use the `cartesiaService` function:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { cartesiaService } from "@restackio/integrations-cartesia";

export async function services() {
  const client = new Restack();
  cartesiaService({ client }).catch((err) => {
    console.error("Error starting Cartesia service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Text-to-Speech Function

The package provides a Text-to-Speech function that converts text to audio bytes: Here's how to use it inside a workflow as part of one of its steps:

```typescript
// cartesiaSpeechToWorflow.ts
import { log, step } from "@restackio/ai/workflow";
import * as cartesiaFunctions from "@restackio/integrations-cartesia/functions";
import { cartesiaTaskQueue } from "@restackio/integrations-cartesia/taskQueue";

export async function cartesiaSpeechToTextWorkflow() {
  const result = await step<typeof cartesiaFunctions>({
    taskQueue: cartesiaTaskQueue,
  }).cartesiaTtsBytes({
    text: "Hello, world!",
    apiKey: "your-api-key", // Optional if CARTESIA_API_KEY is set in environment
  });
  log.info("result", { result: result.media.payload }); // Base64 encoded audio data
  return result;
}
```
