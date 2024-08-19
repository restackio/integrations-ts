import OpenAI from "openai/index";

import { currentWorkflow, log } from "@restackio/restack-sdk-ts/function";

import { ChatCompletionChunk } from "openai/resources/chat/completions.mjs";

import { aggregateStreamChunks } from "../../utils/aggregateStream";
import { mergeToolCalls } from "../../utils/mergeToolCalls";

import Restack from "@restackio/restack-sdk-ts";
import { SendWorkflowEvent } from "@restackio/restack-sdk-ts/event";
import { openaiClient } from "../../utils/client";
import { openaiCost, Price } from "../../utils/cost";

export type StreamEvent = {
  response: string;
  isLast: boolean;
};

export type ToolCallEvent =
  OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall & {
    function: {
      name: string;
      input: JSON;
    };
  };

export async function openaiChatCompletionsStream({
  newMessage,
  messages = [],
  tools,
  toolEvent,
  streamAtCharacter,
  streamEvent,
  apiKey,
  price,
}: {
  newMessage?: string;
  messages?: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  tools?: OpenAI.Chat.Completions.ChatCompletionTool[];
  toolEvent?: SendWorkflowEvent;
  streamAtCharacter?: string;
  streamEvent?: SendWorkflowEvent;
  apiKey?: string;
  price?: Price;
}) {
  const restack = new Restack();
  const workflow = currentWorkflow().workflowExecution;

  if (newMessage) {
    messages.push({
      role: "user",
      content: newMessage,
    });
  }

  const openai = openaiClient({ apiKey });
  const chatStream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    tools,
    stream: true,
  });

  const [stream, streamEnd] = chatStream.tee();
  const readableStream = streamEnd.toReadableStream();
  const aggregatedStream = await aggregateStreamChunks(readableStream);

  let finishReason: ChatCompletionChunk.Choice["finish_reason"];
  let response: ChatCompletionChunk.Choice.Delta["content"] = "";
  let tokensCountInput = 0;
  let tokensCountOutput = 0;

  for await (const chunk of stream) {
    let content = chunk.choices[0]?.delta?.content || "";
    finishReason = chunk.choices[0].finish_reason;
    tokensCountInput += chunk.usage?.prompt_tokens ?? 0;
    tokensCountOutput += chunk.usage?.completion_tokens ?? 0;

    if (finishReason === "tool_calls") {
      const { toolCalls } = mergeToolCalls(aggregatedStream);
      await Promise.all(
        toolCalls.map((toolCall) => {
          if (toolEvent) {
            const functionArguments = JSON.parse(
              toolCall.function?.arguments ?? ""
            );

            const input: ToolCallEvent = {
              ...toolCall,
              function: {
                name: toolCall.function?.name,
                input: functionArguments,
              },
            };
            const workflowEvent = {
              ...workflow,
              ...toolEvent,
              input,
            };
            log.debug("toolEvent sendWorkflowEvent", { workflowEvent });
            if (streamEvent) {
              restack.sendWorkflowEvent(workflowEvent);
            }
          }
        })
      );
    } else {
      response += content;
      if (
        content.trim().slice(-1) === streamAtCharacter ||
        finishReason === "stop"
      ) {
        if (response.length) {
          const input: StreamEvent = {
            response,
            isLast: finishReason === "stop",
          };
          const workflowEvent = {
            ...workflow,
            ...streamEvent,
            input,
          };
          log.debug("streamEvent sendWorkflowEvent", { workflowEvent });
          if (streamEvent) {
            restack.sendWorkflowEvent(workflowEvent);
          }
        }
      }

      if (finishReason === "stop") {
        const newMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
          content: response,
          role: "assistant",
        };

        messages.push(newMessage);

        return {
          result: messages,
          cost:
            price &&
            openaiCost({
              price,
              tokensCount: {
                input: tokensCountInput,
                output: tokensCountOutput,
              },
            }),
        };
      }
    }
  }
}
