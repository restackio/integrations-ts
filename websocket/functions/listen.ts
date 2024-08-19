import Restack from "@restackio/restack-sdk-ts";
import { SendWorkflowEvent } from "@restackio/restack-sdk-ts/event";
import {
  heartbeat,
  currentWorkflow,
  log,
} from "@restackio/restack-sdk-ts/function";

import { WebsocketEvent } from "../types";
import { websocketConnect } from "../utils/client";

export async function websocketListen({
  streamSid,
  track,
  listenFor,
  address,
}: {
  streamSid: string;
  track: string;
  listenFor?: string[];
  address?: string;
}) {
  return new Promise<void>(async (resolve) => {
    const ws = await websocketConnect({ address });

    const restack = new Restack();
    const workflow = currentWorkflow().workflowExecution;

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.streamSid === streamSid) {
        if (message.event === "media" && listenFor?.includes("media")) {
          if (message.media.track === track) {
            // Clean Twilio empty noise
            const cleanedPayload = message.media.payload?.replace(
              /(\+\/[a-zA-Z0-9+\/]{2,}==)/g,
              ""
            );
            if (!cleanedPayload) {
              return;
            }

            const input: WebsocketEvent = {
              streamSid: message.streamSid,
              media: {
                track,
                payload: cleanedPayload,
              },
            };
            const workflowEvent: SendWorkflowEvent = {
              ...workflow,
              event: {
                name: "media",
                input,
              },
            };
            log.debug("event media sendWorkflowEvent", { workflowEvent });

            restack.sendWorkflowEvent(workflowEvent);
          }
        }
        if (message.event === listenFor?.includes(message.event)) {
          const input: WebsocketEvent = {
            streamSid: message.streamSid,
            data: {
              ...message.data,
              track,
            },
          };
          const workflowEvent: SendWorkflowEvent = {
            ...workflow,
            event: {
              name: message.event,
              input,
            },
          };
          log.debug(`event ${message.event} sendWorkflowEvent`, {
            workflowEvent,
          });

          restack.sendWorkflowEvent(workflowEvent);
        }
        heartbeat(message.streamSid);
        if (message.event === "stop") {
          const input: WebsocketEvent = {
            streamSid: message.streamSid,
            data: {
              track,
            },
          };
          const workflowEvent: SendWorkflowEvent = {
            ...workflow,
            event: {
              name: "stop",
              input,
            },
          };
          log.debug("event stop sendWorkflowEvent", { workflowEvent });

          restack.sendWorkflowEvent(workflowEvent);
          resolve();
        }
      }
    });
  });
}
