import OpenAI from "openai/index";

export const openaiClient = ({ apiKey }: { apiKey: string }): OpenAI => {
  return new OpenAI({
    apiKey,
  });
};
