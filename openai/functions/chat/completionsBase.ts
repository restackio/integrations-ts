import { FunctionFailure, log } from "@restackio/restack-sdk-ts/function";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";
import { openaiClient } from "../../utils/client";
import { openaiCost, Price } from "../../utils/cost";
import { ChatCompletion, ChatModel } from "openai/resources/index";

export type UsageOutput = { tokens: number; cost: number };

export type OpenAIChatInput = {
  userContent: string;
  systemContent?: string;
  model?: ChatModel;
  jsonSchema?: {
    name: string;
    schema: Record<string, unknown>;
  };
  price?: Price;
  apiKey?: string;
  params?: ChatCompletionCreateParamsNonStreaming;
};

export const openaiChatCompletionsBase = async ({
  userContent,
  systemContent = "",
  model = "gpt-4o-mini",
  jsonSchema,
  price,
  apiKey,
  params,
}: OpenAIChatInput): Promise<{ result: ChatCompletion; cost?: number }> => {
  try {
    const openai = openaiClient({ apiKey });

    const isO1Model = model.startsWith("o1-");

    const o1ModelParams = {
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const chatParams: ChatCompletionCreateParamsNonStreaming = {
      messages: [
        ...(systemContent ? [{ role: "system", content: systemContent }] : []),
        { role: "user", userContent },
        ...params.messages,
      ],
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
      ...params,
      ...(isO1Model && o1ModelParams),
    };

    log.debug("OpenAI chat completion params", {
      chatParams,
    });

    const completion = await openai.chat.completions.create(chatParams);

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
