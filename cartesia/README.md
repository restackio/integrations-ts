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
import Restack from "@restackio/ai";
import { cartesiaService } from "@restackio/integrations-cartesia";
const client = new Restack();
cartesiaService({ client }).catch((err) => {
  console.error("Error starting Cartesia service:", err);
});
```

### Text-to-Speech Function

The package provides a Text-to-Speech function that converts text to audio bytes:

```typescript
import { cartesiaTtsBytes } from "@restackio/integrations-cartesia/functions";
const result = await cartesiaTtsBytes({
text: "Hello, world!",
 apiKey: "your-api-key" // Optional if CARTESIA_API_KEY is set in environment
});
console.log(result.media.payload); // Base64 encoded audio data
```
