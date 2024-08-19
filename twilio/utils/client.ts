import twilio from "twilio";
import "dotenv/config";

let clientTwilio: twilio.Twilio;

export function twilioClient({
  accountSid = process.env.TWILIO_ACCOUNT_SID,
  authToken = process.env.TWILIO_AUTH_TOKEN,
}: {
  accountSid: string;
  authToken: string;
}) {
  if (!accountSid || !authToken) {
    throw new Error(
      "Account SID and auth token are required to create Twilio client."
    );
  }

  if (!clientTwilio) {
    clientTwilio = twilio(accountSid, authToken);
  }
  return clientTwilio;
}
