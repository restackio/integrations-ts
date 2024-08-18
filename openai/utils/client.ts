import OpenAI from "openai/index";

let openaiInstance: OpenAI | null = null;

export const openaiClient = ({ apiKey }: { apiKey: string }): OpenAI => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey,
    });
  }
  return openaiInstance;
};
