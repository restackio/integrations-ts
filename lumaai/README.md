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
import Restack from "@restackio/ai";
import { lumaaiService } from "@restackio/integrations-lumaai";
const client = new Restack();
lumaaiService({ client }).catch((err) => {
 console.error("Error starting LumaAI service:", err);
});
```

### Available Functions

This integration provides the following functions:

1. `lumaaiGenerate`: Generate content using LumaAI.
2. `lumaaiGetGeneration`: Retrieve a specific generation by ID.
3. `lumaaiListGenerations`: List all generations.

#### Generate Content

```typescript
import { lumaaiGenerate } from "@restackio/integrations-lumaai/functions";
const result = await lumaaiGenerate({
 prompt: "A futuristic cityscape",
 aspectRatio: "16:9",
 loop: false,
 apiKey: "your_api_key" // Optional if set in environment variables
});
```

#### Get Generation

```typescript
import { lumaaiGetGeneration } from "@restackio/integrations-lumaai/functions";
const result = await lumaaiGetGeneration({
 generationId: "generation_id_here",
 apiKey: "your_api_key" // Optional if set in environment variables
});
```

#### List Generations

```typescript
import { lumaaiListGenerations } from "@restackio/integrations-lumaai/functions";
const result = await lumaaiListGenerations({
 apiKey: "your_api_key" // Optional if set in environment variables
});
```
