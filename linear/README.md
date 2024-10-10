# @restackio/integrations-linear

This package provides integration with Linear, allowing you to create issues and comments programmatically using the Linear API.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-linear
```

## Usage

### Setting up the Linear service

To use the Linear integration, you need to set up the Linear service:

```typescript
import Restack from "@restackio/ai";
import { linearService } from "@restackio/integrations-linear";
const client = new Restack();
linearService({ client }).catch((err) => {
  console.error("Error starting Linear service:", err);
});
```

### Creating an issue

To create an issue in Linear:

```typescript
import { linearCreateIssue } from "@restackio/integrations-linear/functions";
const result = await linearCreateIssue({
  issue: {
  title: "New issue",
  description: "This is a new issue created via the API",
  teamId: "your-team-id",
},
 apiKey: "your-linear-api-key",
});
```

## Configuration

The Linear client is configured using an API key. You can either pass the API key directly to the functions or set it as an environment variable:

```bash
LINEAR_API_KEY=your-linear-api-key
```
