import { FunctionFailure, log } from "@restackio/ai/function";
import { Buffer } from "node:buffer";
import { deepgramClient } from "../utils/client";
import { PrerecordedSchema } from "@deepgram/sdk";

export async function deepgramListen({
  base64Payload,
  options = {
    model: "nova-2",
    punctuate: true,
    interim_results: true,
    endpointing: 500,
    utterance_end_ms: 2000,
  },
  twilioEncoding,
  apiKey,
}: {
  base64Payload: string;
  options?: PrerecordedSchema;
  twilioEncoding?: boolean;
  apiKey?: string;
}) {
  if (!base64Payload) {
    throw FunctionFailure.nonRetryable("No audio file");
  }

  try {
    const decodedBuffer = Buffer.from(base64Payload, "base64");

    const deepgram = deepgramClient({ apiKey });

    const response = await deepgram.listen.prerecorded.transcribeFile(
      decodedBuffer,
      {
        ...options,
        ...(twilioEncoding && {
          encoding: "mulaw",
          sample_rate: 8000,
        }),
      }
    );

    if (response.error) {
      log.error("deepgramListen error", { error: response.error });
    }

    const result = response.result;
    const firstChannel = result.results?.channels?.[0];

    const transcript = firstChannel?.alternatives?.[0]?.transcript;

    let language = "";
    if (options.detect_language) {
      language = firstChannel?.detected_language;
    }

    return {
      transcript,
      language,
      result,
    };
  } catch (error) {
    throw new Error(`Deepgram TTS error ${error}`);
  }
}
