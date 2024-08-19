export type WebsocketEvent = {
  streamSid: string; // For Twilio compatibility
  media?: {
    track?: "inbound" | "outbound"; // For Twilio compatibility
    trackId: string;
    payload?: string;
  };
  data?: {
    trackId: string;
    [key: string]: any;
  };
};
