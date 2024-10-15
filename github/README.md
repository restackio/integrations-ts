# @restackio/integrations-github

This package provides integration with Github, allowing you to create and publish releases programmatically using the Github API.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-github
```

## Usage

Make sure to create an access token on your github account and set the token as environment variabled named `GITHUB_AUTH_TOKEN`

### Setting up the Github service

To use the Github integration, you need to set up the Github service:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { githubService } from "@restackio/integrations-github";

export async function services() {
  const client = new Restack();
  githubService({ client }).catch((err) => {
    console.error("Error starting Github service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Creating a release

To create a release for a provided repository on Github:

```typescript
/// workflows/createRelease.ts

import { log, step } from "@restackio/ai/workflow";
import { githubTaskQueue } from "@restackio/integrations-github/taskQueue";
import * as githubFunctions from "@restackio/integrations-github/functions";

import * as functions from "../functions";

export async function createReleaseWorkflow({
  owner,
  repo,
  tagName,
  releaseName,
  releaseBody,
  branch,
}: {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  releaseBody: string;
  branch?: string;
}) {
  const createdRelease = await step<typeof githubFunctions>({
    taskQueue: githubTaskQueue,
  }).createRelease({
    owner,
    repo,
    tagName,
    releaseName,
    releaseBody,
    branch,
  });

  return createdRelease;
}
```

### Publishing a release

To mark the release as published on Github:

```typescript
/// workflows/publishRelease.ts

import { log, step } from "@restackio/ai/workflow";
import { githubTaskQueue } from "@restackio/integrations-github/taskQueue";
import * as githubFunctions from "@restackio/integrations-github/functions";

import * as functions from "../functions";

export async function publishReleaseWorkflow({
  owner,
  repo,
  id,
}: {
  owner: string;
  repo: string;
  id: number;
}) {
  const publishedRelease = await step<typeof githubFunctions>({
    taskQueue: githubTaskQueue,
  }).publishRelease({
    owner,
    repo,
    id.
  });

  return publishedRelease;
}
```

## Configuration

The Github client is configured using an access token. You can either pass the API key directly to the functions or set it as an environment variable:

```bash
GITHUB_AUTH_TOKEN=your-access-token
```
