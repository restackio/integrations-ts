import {
  heartbeat,
  currentWorkflow,
  log,
} from "@restackio/restack-sdk-ts/function";
import { websocketConnect } from "../utils/client";
import Restack from "@restackio/restack-sdk-ts";
import {
  SendWorkflowEvent,
  WorkflowEvent,
} from "@restackio/restack-sdk-ts/event";

type WebsocketEvent = WorkflowEvent & {
  name: string;
  input: {
    track: string;
    [key: string]: any;
  };
};

export async function websocketListen({
  streamSid,
  mediaEvents,
  dataEvents,
  stopEvent,
  address,
}: {
  streamSid: string;
  mediaEvents?: (SendWorkflowEvent & { event: WebsocketEvent })[];
  dataEvents?: (SendWorkflowEvent & { event: WebsocketEvent })[];
  stopEvent: SendWorkflowEvent & { event: WebsocketEvent };
  address?: string;
}) {
  return new Promise<void>(async (resolve) => {
    const ws = await websocketConnect({ address });

    const restack = new Restack();
    const workflow = currentWorkflow().workflowExecution;

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.streamSid === streamSid) {
        if (message.event === "media" && mediaEvents) {
          mediaEvents.forEach((mediaEvent) => {
            if (message.media.track === mediaEvent.event.input.track) {
              // Clean Twilio empty noise
              const cleanedPayload = message.media.payload?.replace(
                /(\+\/[a-zA-Z0-9+\/]{2,}==)/g,
                ""
              );
              if (!cleanedPayload) {
                return;
              }
              const workflowEvent = {
                ...workflow,
                ...mediaEvent,
                input: {
                  streamSid,
                  payload: {
                    ...message.media.payload,
                    track: mediaEvent.event.input.track,
                  },
                },
              };
              log.debug("mediaEvent sendWorkflowEvent", { workflowEvent });

              restack.sendWorkflowEvent(workflowEvent);
            }
          });
        }
        if (dataEvents) {
          dataEvents.forEach((dataEvent) => {
            if (message.event === dataEvent.event.name) {
              const workflowEvent = {
                ...workflow,
                ...dataEvent,
                input: {
                  streamSid,
                  data: {
                    ...message.data,
                    track: dataEvent.event.input.track,
                  },
                },
              };
              log.debug("dataEvent sendWorkflowEvent", { workflowEvent });

              restack.sendWorkflowEvent(workflowEvent);
            }
          });
        }
        heartbeat(message.streamSid);
        if (message.event === "stop") {
          const workflowEvent = {
            ...workflow,
            ...stopEvent,
          };
          log.debug("stopEvent sendWorkflowEvent", { workflowEvent });

          restack.sendWorkflowEvent(workflowEvent);
          resolve();
        }
      }
    });
  });
}
