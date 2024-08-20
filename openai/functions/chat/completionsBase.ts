import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import { ChatCompletion } from "openai/resources/chat/completions";
import { openaiClient } from "../../utils/client";
import { openaiCost, Price } from "../../utils/cost";

export type UsageOutput = { tokens: number; cost: number };

export type OpenAIChatInput = {
  content: string;
  jsonSchema?: {
    name: string;
    schema: Record<string, unknown>;
  };
  model?: string;
  price?: Price;
  apiKey?: string;
};

export const openaiChatCompletionsBase = async ({
  content,
  jsonSchema,
  model = "gpt-4o-mini",
  price,
  apiKey,
}: OpenAIChatInput) => {
  try {
    log.info("openaiChat", { apiKey, content, jsonSchema, model });

    const openai = openaiClient({ apiKey });
    const completion: ChatCompletion = await openai.chat.completions.create({
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
      model,
      temperature: 0,
    });

    log.debug("completion", { completion });

    return {
      result: completion,
      cost:
        price &&
        openaiCost({
          price,
          tokensCount: {
            input: completion.usage?.prompt_tokens ?? 0,
            output: completion.usage?.completion_tokens ?? 0,
          },
        }),
    };
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error OpenAI chat: ${error}`);
  }
};
