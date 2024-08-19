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
