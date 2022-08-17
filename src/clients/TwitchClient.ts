import * as tmi from 'tmi.js'
import ClassHandler from "../events/ClassHandler";
import TemplateHandler from "../events/TemplateHandler";

export default class TwitchClient {
    protected channelId = document.querySelector('#channel_name')?.innerHTML.trim()
    protected twitchClient: tmi.Client | undefined
    protected channelData = {}
    protected authToken = document.querySelector('#twitch_token')?.innerHTML.trim()
    protected clientId = document.querySelector('#client_id')?.innerHTML.trim()

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

        console.log(`get Info for ${this.channelId}`)

        const request = await fetch(`https://api.twitch.tv/helix/channels?${this.channelId}`, {
            // @ts-ignore
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
                'Client-Id': this.clientId
            }
        })

        console.log(request)

        console.log(`connect to ${this.channelId}`)

        await this.twitchClient.connect()

        console.log(`connected to ${this.channelId}`)

        this.registerHandlers()
    }

    private registerHandlers() {
        new ClassHandler(this)
        new TemplateHandler(this)
    }

    public getClient() {
        return this.twitchClient
    }

    public getChannelData() {
        return this.channelData
    }

    public setChannelData(channelData: any) {
        this.channelData = channelData
    }
}