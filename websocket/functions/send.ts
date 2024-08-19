import { websocketConnect } from "../utils/client";

export async function websocketSend({
  streamSid,
  eventName,
  data,
  media,
  address,
}: {
  streamSid: string;
  eventName: string;
  data?: {
    track: string;
    [key: string]: any;
  };
  media?: {
    track: string;
    payload: string;
  };
  address?: string;
}) {
  const ws = await websocketConnect({ address });

  const event = {
    streamSid: streamSid,
    event: eventName,
    data,
    media,
  };

  ws.send(JSON.stringify(event));
  ws.close();
  return true;
}
