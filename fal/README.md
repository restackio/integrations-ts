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
import Restack from "@restackio/ai";
import { falService } from "@restackio/integrations-fal";
const client = new Restack();
falService({ client }).catch((err) => {
  console.error("Error starting Fal service:", err);
});
```

### Running Fal Functions

The main function provided by this integration is `falRun`, which allows you to generate images using Fal's AI models. Here's an example of how to use it:

```typescript
import { falRun } from "@restackio/integrations-fal/functions";
const result = await falRun({
  id: "fal-ai/flux/dev",
  prompt: "A beautiful sunset over the ocean",
  imageSize: "landscape_16_9",
  numImages: 1,
});
console.log(result);
```
