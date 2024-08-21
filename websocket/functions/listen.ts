import {
  heartbeat,
  currentWorkflow,
  log,
} from "@restackio/restack-sdk-ts/function";
import { websocketConnect } from "../utils/client";
import Restack from "@restackio/restack-sdk-ts";
import { SendWorkflowEvent } from "@restackio/restack-sdk-ts/event";

export async function websocketListen({
  streamSid,
  events,
  address,
  silenceDuration = 5000,
  silenceEvent,
}: {
  streamSid: string;
  events?: {
    websocketEventName: string;
    workflowEventName: string;
    workflow?: SendWorkflowEvent["workflow"];
  }[];
  address?: string;
  silenceDuration?: number;
  silenceEvent?: {
    workflowEventName: string;
    workflow?: SendWorkflowEvent["workflow"];
  };
}) {
  return new Promise<void>(async (resolve) => {
    const ws = await websocketConnect({ address });

    const restack = new Restack();
    const workflow = currentWorkflow().workflowExecution;

    let silenceTimer: NodeJS.Timeout;

    const resetSilenceTimer = () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        if (silenceEvent) {
          const workflowEvent: SendWorkflowEvent = {
            event: {
              name: silenceEvent.workflowEventName,
              input: {
                streamSid,
              },
            },
            workflow: {
              ...workflow,
              ...silenceEvent.workflow,
            },
          };
          log.debug(`Silence detected, sending workflow event`, {
            workflowEvent,
          });

          restack.sendWorkflowEvent(workflowEvent);
        }
      }, silenceDuration);
    };

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.streamSid === streamSid) {
        resetSilenceTimer();

        if (events) {
          events.forEach((listenEvent) => {
            if (message.event === listenEvent.websocketEventName) {
              if (message.media && message.media.track !== "inbound") {
                return;
              }

              const workflowEvent: SendWorkflowEvent = {
                event: {
                  name: listenEvent.workflowEventName,
                  input: {
                    streamSid,
                    data: message.data,
                    media: message.media,
                  },
                },
                workflow: {
                  ...workflow,
                  ...listenEvent.workflow,
                },
              };
              log.debug(`${message.event} sendWorkflowEvent`, {
                workflowEvent,
              });

              restack.sendWorkflowEvent(workflowEvent);
            }
          });
        }
        heartbeat(message.streamSid);
        if (message.event === "stop") {
          resolve();
        }
      }
    });

    resetSilenceTimer();
  });
}
