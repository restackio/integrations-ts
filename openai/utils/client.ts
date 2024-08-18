import OpenAI from "openai";

export const openaiClient = ({ apiKey }: { apiKey: string }): OpenAI => {
  return new OpenAI({
    apiKey,
  });
};
