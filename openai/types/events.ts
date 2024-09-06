import OpenAI from "openai/index";

export type StreamEvent = {
  chunkId?: string;
  chunkContent?: string;
  response: string;
  assistantName?: string;
  isLast: boolean;
};

export type ToolCallEvent =
  OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall & {
    function: {
      name: string;
      input: JSON;
    };
    assistantName?: string;
  };
