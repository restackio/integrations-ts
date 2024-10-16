# Restack Fal Integration

This package provides an integration between Restack and Fal AI, allowing you to easily use Fal's AI services within your Restack applications.

## Installation

To install the Restack Fal integration, use npm or yarn:

```bash
npm install @restackio/integrations-fal
```

## Configuration

Before using the Fal integration, you need to set up your Fal API key. You can do this by setting the `FAL_API_KEY` environment variable or by passing the API key directly when initializing the client.

## Usage

### Starting the Fal Service

To start the Fal service, you can use the `falService` function:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { falService } from "@restackio/integrations-fal";

export async function services() {
  const client = new Restack();
  falService({ client }).catch((err) => {
    console.error("Error starting Fal service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Running Fal Functions

The main function provided by this integration is `falRun`, which allows you to generate images using Fal's AI models. Here's an example of how to use it on a workflow as a step:

```typescript
// falRunWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as falFunctions from "@restackio/integrations-fal/functions";
import { falTaskQueue } from "@restackio/integerations-fal/taskQueue";

export async function falRunWorkflow() {
  const result = await step<typeof falFunctions>({
    taskQueue: falTaskQueue,
  }).falRun({
    id: "fal-ai/flux/dev",
    prompt: "A beautiful sunset over the ocean",
    imageSize: "landscape_16_9",
    numImages: 1,
  });
  log(result);
}
```
