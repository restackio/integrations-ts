const DISCORD_API_VERSION = '10';
const DISCORD_BASE_URL = `https://discord.com/api/v${DISCORD_API_VERSION}`;
export class DiscordClient {
    private botToken: string;
    constructor(
        botToken: string = process.env.DISCORD_BOT_TOKEN
    ){
        this.botToken = botToken;
    }

    public post_message(message: string, channel_id: string) {
        const messageUrl = `/channels/${channel_id}/messages`
        const url = DISCORD_BASE_URL + messageUrl;
        const body = {
            'content': message
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this.botToken}`
        }
        const options = {
            'method': 'POST',
            'body': JSON.stringify(body),
            'headers': headers
        }
        return fetch(url, options);
    }
}