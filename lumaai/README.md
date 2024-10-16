# @restackio/integrations-lumaai

This package provides integration with LumaAI for the Restack platform. It allows you to generate, retrieve, and list AI-generated content using LumaAI's powerful API.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-lumaai
```

## Configuration

Before using the LumaAI integration, make sure to set up your environment variables:

```
LUMAAI_API_KEY=your_lumaai_api_key_here
```

## Usage

### Initializing the Service

To start the LumaAI service, use the following code:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { lumaaiService } from "@restackio/integrations-lumaai";

export async function services() {
  const client = new Restack();
  lumaaiService({ client }).catch((err) => {
    console.error("Error starting LumaAI service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Available Functions

This integration provides the following functions:

1. `lumaaiGenerate`: Generate content using LumaAI.
2. `lumaaiGetGeneration`: Retrieve a specific generation by ID.
3. `lumaaiListGenerations`: List all generations.

#### Generate Content

```typescript
// generateContent.ts
import { log, step } from "@restackio/workflow";
import * as lumaaiFunctions from "@restackio/integrations-lumaai/functions";
import { lumaaiTaskQueue } from "@restackio/integrations-lumaai/taskQueue";

export async function generateContentWorkflow() {
  const result = await step<typeof lumaaiFunctions>({
    taskQueue: lumaaiTaskQueue,
  }).lumaaiGenerate({
    prompt: "A futuristic cityscape",
    aspectRatio: "16:9",
    loop: false,
    apiKey: "your_api_key", // Optional if set in environment variables
  });
}
```

#### Get Generation

```typescript
// getGeneration.ts
import { log, step } from "@restackio/workflow";
import * as lumaaiFunctions from "@restackio/integrations-lumaai/functions";
import { lumaaiTaskQueue } from "@restackio/integrations-lumaai/taskQueue";

export async function getGenerationWorkflow() {
  const result = await step<typeof lumaaiFunctions>({
    taskQueue: lumaaiTaskQueue,
  }).lumaaiGetGeneration({
    generationId: "generation_id_here",
    apiKey: "your_api_key", // Optional if set in environment variables
  });
}
```

#### List Generations

```typescript
// listGenerations.ts

import { log, step } from "@restackio/workflow";
import * as lumaaiFunctions from "@restackio/integrations-lumaai/functions";
import { lumaaiTaskQueue } from "@restackio/integrations-lumaai/taskQueue";

export async function listGenerationsWorkflow() {
  const result = await step<typeof lumaaiFunctions>({
    taskQueue: lumaaiTaskQueue,
  }).lumaaiListGenerations({
    apiKey: "your_api_key", // Optional if set in environment variables
  });
}
```
