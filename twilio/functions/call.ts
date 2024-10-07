import { FunctionFailure } from "@restackio/ai/function";
import { CallListInstanceCreateOptions } from "twilio/lib/rest/api/v2010/account/call";
import { twilioClient } from "../utils/client";

interface Output {
  sid: string;
}

export async function twilioCall({
  accountSid,
  authToken,
  options,
}: {
  accountSid?: string;
  authToken?: string;
  options: CallListInstanceCreateOptions;
}): Promise<Output> {
  const client = twilioClient({ accountSid, authToken });

  if (!accountSid || !authToken) {
    throw FunctionFailure.nonRetryable("Twilio credentials are missing");
  }

  try {
    if (options.to && options.from && options.url) {
      const { sid } = await client.calls.create(options);
      return { sid };
    } else {
      throw FunctionFailure.nonRetryable(`No to, from or url`);
    }
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error Twilio call create: ${error}`);
  }
}
