import TwitchClient from "../clients/TwitchClient";

export default class TemplateHandler {
    public constructor(twitchClient: TwitchClient) {
        twitchClient.getClient()?.on("join", (channel, username, self) => {
            console.log(twitchClient.getClient())
        });
    }
}