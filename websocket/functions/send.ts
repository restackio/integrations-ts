import { websocketConnect } from "../utils/client";
import { WebsocketEvent } from "./listen";

export async function websocketSend({
  name,
  input,
  address,
}: {
  name: string;
  input: WebsocketEvent;
  address?: string;
}) {
  const ws = await websocketConnect({ address });

  const { streamSid, data, media } = input;

  const event = {
    streamSid,
    event: name,
    data,
    media,
  };

  ws.send(JSON.stringify(event));
  ws.close();
  return true;
}
