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

export type WebsocketEvent = {
  streamSid: string;
  media?: {
    track: string;
    payload: string;
  };
  data?: {
    track: string;
    [key: string]: any;
  };
};

export type SendWebsocketEvent = WorkflowEvent & {
  name: string;
  input: WebsocketEvent;
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

              const input: WebsocketEvent = {
                streamSid: message.streamSid,
                media: {
                  track: mediaEvent.event.input.track,
                  payload: cleanedPayload,
                },
              };
              const workflowEvent = {
                ...workflow,
                ...mediaEvent,
                input,
              };
              log.debug("mediaEvent sendWorkflowEvent", { workflowEvent });

              restack.sendWorkflowEvent(workflowEvent);
            }
          });
        }
        if (dataEvents) {
          dataEvents.forEach((dataEvent) => {
            if (message.event === dataEvent.event.name) {
              const input: WebsocketEvent = {
                streamSid: message.streamSid,
                data: {
                  ...message.data,
                  track: dataEvent.event.input.track,
                },
              };
              const workflowEvent = {
                ...workflow,
                ...dataEvent,
                input,
              };
              log.debug("dataEvent sendWorkflowEvent", { workflowEvent });

              restack.sendWorkflowEvent(workflowEvent);
            }
          });
        }
        heartbeat(message.streamSid);
        if (message.event === "stop") {
          const input: WebsocketEvent = {
            streamSid: message.streamSid,
          };
          const workflowEvent = {
            ...workflow,
            ...stopEvent,
            input,
          };
          log.debug("stopEvent sendWorkflowEvent", { workflowEvent });

          restack.sendWorkflowEvent(workflowEvent);
          resolve();
        }
      }
    });
  });
}
