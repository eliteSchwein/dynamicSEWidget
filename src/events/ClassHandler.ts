import TwitchClient from "../clients/TwitchClient";

export default class ClassHandler {
    protected raidCooldown = document.querySelector('#raid_cooldown')?.innerHTML.trim()
    protected borderElements = document.querySelectorAll('[data-dyse-widget-border="true"]')
    protected backgroundElements = document.querySelectorAll('[data-dyse-widget-background="true"]')

    public constructor(twitchClient: TwitchClient) {
        twitchClient.getClient()?.on('raided', (channel, username, viewers) => {
            if(this.raidCooldown === null) {
                return
            }


        })
    }
}