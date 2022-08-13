import * as tmi from 'tmi.js'

export default class TwitchClient {
    protected channelId = document.querySelector('#channel_name')?.innerHTML.trim()
    protected twitchClient: tmi.Client | undefined

    public constructor() {
        this.connectClient()
    }

    public async connectClient() {
        if(this.channelId === null) {
            return
        }

        this.twitchClient = new tmi.Client({
            // @ts-ignore
            channels: [this.channelId]
        })

        console.log(`connect to ${this.channelId}`)

        await this.twitchClient.connect()

        console.log(`connected to ${this.channelId}`)
    }

    public getClient() {
        return this.twitchClient
    }
}