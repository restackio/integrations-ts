import { FunctionFailure, log } from "@restackio/ai/function";
import { DiscordClient } from "../utils/client";

export async function postMessageToChannel({
    messageText,
    channelId,
    botToken
}: {
    messageText: string,
    channelId: string,
    botToken?: string
}){
    try {
        const client = new DiscordClient(botToken);
        return client.post_message(messageText, channelId);
    } catch (error) {
        log.error("Discord integration error", { error });
        throw new Error(`Discord integration error ${error}`);
    }
}