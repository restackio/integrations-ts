import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import { ChatCompletion } from "openai/resources/chat/completions";
import { openaiClient } from "../utils/client";
import { openaiCost } from "../utils/cost";

export type UsageOutput = { tokens: number; cost: number };

export type OpenAIChatInput = {
  apiKey: string;
  content: string;
  jsonSchema?: {
    name: string;
    schema: Record<string, unknown>;
  };
  model?: string;
};

export const openaiChatCompletion = async ({
  apiKey,
  content,
  jsonSchema,
  model,
}: OpenAIChatInput): Promise<{
  response: ChatCompletion;
  usage: UsageOutput;
}> => {
  try {
    log.info("openaiChat", { apiKey, content, jsonSchema, model });

    // Default to gpt-4o mini model
    const modelToUse = model ?? "gpt-4o-mini";

    const openai = openaiClient({ apiKey });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      ...(jsonSchema && {
        response_format: {
          type: "json_schema",
          json_schema: {
            name: jsonSchema.name,
            strict: true,
            schema: jsonSchema.schema,
          },
        },
      }),
      model: modelToUse,
      temperature: 0,
    });

    log.debug("completion", { completion });

    return {
      response: completion,
      usage: {
        tokens: completion.usage?.total_tokens ?? 0,
        cost: openaiCost({
          model: modelToUse,
          tokensCountInput: completion.usage?.prompt_tokens ?? 0,
          tokensCountOutput: completion.usage?.completion_tokens ?? 0,
        }),
      },
    };
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error OpenAI chat: ${error}`);
  }
};
