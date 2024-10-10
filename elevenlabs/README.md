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
import Restack from "@restackio/ai";
import { elevenlabsService } from "@restackio/integrations-elevenlabs";
const client = new Restack();
elevenlabsService({ client }).catch((err) => {
 console.error("Error starting ElevenLabs service:", err);
});
```

### Converting text to speech

To convert text to speech, use the `elevenlabsConvert` function:

```typescript
import { elevenlabsConvert } from "@restackio/integrations-elevenlabs/functions";
const result = await elevenlabsConvert({
  text: "Hello, world!",
  apiKey: "YOUR_ELEVENLABS_API_KEY",
});
console.log(result.media.payload); // Base64 encoded audio
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
