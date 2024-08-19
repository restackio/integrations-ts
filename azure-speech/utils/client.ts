import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "dotenv/config";

let speechConfig: sdk.SpeechConfig | null = null;

export function azureSpeechClient({
  apiKey = process.env.AZURE_SPEECH_API_KEY,
  region = process.env.AZURE_SPEECH_REGION,
}: {
  apiKey: string;
  region: string;
}) {
  if (!apiKey || !region) {
    throw new Error("Azure subscription key or service region is missing");
  }
  if (!speechConfig) {
    speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);
  }
  return speechConfig;
}
