import { LinearClient } from "@linear/sdk";
import "dotenv/config";

let clientLinear: LinearClient;

export function linearClient({
  apiKey = process.env.LINEAR_API_KEY,
}: {
  apiKey: string;
}) {
  if (!apiKey) {
    throw new Error("API key is required to create Linear client.");
  }
  if (!clientLinear) {
    clientLinear = new LinearClient({ apiKey });
  }
  return clientLinear;
}
