import { FunctionFailure, log } from "@restackio/ai/function";
import { ElevenLabs } from "elevenlabs/index";

import { elevenlabsClient } from "../utils/client";
import { TextToSpeechRequest } from "elevenlabs/api";

export async function elevenlabsConvert({
  text,
  voiceId = "fCxG8OHm4STbIsWe4aT9",
  options = {
    model_id: "eleven_turbo_v2_5",
    optimize_streaming_latency: ElevenLabs.OptimizeStreamingLatency.Zero,
  },
  twilioEncoding,
  apiKey,
}: {
  text: string;
  voiceId?: string;
  options?: Omit<TextToSpeechRequest, "text">;
  twilioEncoding?: string;
  apiKey?: string;
}) {
  if (!text.length) {
    log.error("Text is empty");
    throw FunctionFailure.nonRetryable("Text is empty");
  }
  try {
    const elevenlabs = elevenlabsClient({ apiKey });

    const response = await elevenlabs.textToSpeech
      .convert(voiceId, {
        text,
        ...options,
        ...(twilioEncoding && {
          output_format: ElevenLabs.OutputFormat.Ulaw8000,
        }),
      })
      .finally();
    const chunks: Buffer[] = [];
    for await (const chunk of response) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks);
    const base64String = Buffer.from(content).toString("base64");
    log.info("Elevenlabs: ", {
      audioLength: base64String.length,
    });
    return {
      media: {
        payload: base64String,
      },
    };
  } catch (error) {
    log.error("Elevenlabs convert error", { error });
    throw new Error(`Elevenlabs convert error ${error}`);
  }
}
