const discord_api_version = '10';
const discord_base_url = `https://discord.com/api/v${discord_api_version}`;
export class DiscordClient {
    private bot_token: string;
    constructor(
        bot_token: string = process.env.DISCORD_BOT_TOKEN
    ){
        this.bot_token = bot_token;
    }

    public post_message(message: string, channel_id: string) {
        const message_url = `/channels/${channel_id}/messages`
        const url = discord_base_url + message_url;
        const body = {
            'content': message
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this.bot_token}`
        }
        const options = {
            'method': 'POST',
            'body': JSON.stringify(body),
            'headers': headers
        }
        return fetch(url, options);
    }
}