import WebSocket from "ws";
import "dotenv/config";
import { FunctionFailure } from "@restackio/restack-sdk-ts/function";

export function websocketConnect({
  address = process.env.WEBSOCKET_ADDRESS,
}: {
  address?: string;
}): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(address);

      ws.on("open", () => {
        resolve(ws);
      });

      ws.on("error", (error) => {
        reject(
          FunctionFailure.nonRetryable(
            `Error connecting to WebSocket: ${error}`
          )
        );
      });
    } catch (error) {
      reject(
        FunctionFailure.nonRetryable(`Error connecting to WebSocket: ${error}`)
      );
    }
  });
}
