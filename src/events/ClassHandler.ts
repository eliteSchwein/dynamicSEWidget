import TwitchClient from "../clients/TwitchClient";

export default class ClassHandler {
    protected stateCooldown = document.querySelector('#state_cooldown')?.innerHTML.trim()
    protected stateDuration = document.querySelector('#state_duration')?.innerHTML.trim()
    protected borderElements = document.querySelectorAll('[data-streamulus-border="true"]')
    protected backgroundElements = document.querySelectorAll('[data-streamulus-background="true"]')
    protected classElements = document.querySelectorAll('[data-streamulus-class="true"]')
    protected states = []

    public constructor(twitchClient: TwitchClient) {
        twitchClient.getClient()?.on('raided', () => {
            this.changeClassState('raid')
        })
        twitchClient.getClient()?.on('subgift', () => {
            this.changeClassState('subgift')
        })
        twitchClient.getClient()?.on('resub', () => {
            this.changeClassState('resub')
        })
        twitchClient.getClient()?.on('giftpaidupgrade', () => {
            this.changeClassState('giftpaidupgrade')
        })
        twitchClient.getClient()?.on('subscription', () => {
            this.changeClassState('sub')
        })
        twitchClient.getClient()?.on('submysterygift', () => {
            this.changeClassState('submysterygift')
        })
        twitchClient.getClient()?.on('cheer', () => {
            this.changeClassState('cheer')
        })
    }

    protected changeClassState(state: string, add = true) {
        if(this.stateCooldown === null || this.stateDuration === null) {
            return
        }

        // @ts-ignore
        this.states.push(state)

        if(this.states.length !== 1 && add) {
            return;
        }

        const elements: any[] = []
        // @ts-ignore
        for(const borderElement of this.borderElements) {
            elements.push(borderElement)
            borderElement.classList.add(`streamulus-border-${state}`)
        }

        // @ts-ignore
        for(const backgroundElement of this.backgroundElements) {
            elements.push(backgroundElement)
            backgroundElement.classList.add(`streamulus-background-${state}`)
        }

        // @ts-ignore
        for(const classElement of this.classElements) {
            elements.push(classElement)
            classElement.classList.add(`streamulus-class-${state}`)
        }

        setTimeout(() => {

            console.log(this.states)
            for(const raidElement of elements) {
                raidElement.classList.remove(`streamulus-border-${state}`)
                raidElement.classList.remove(`streamulus-background-${state}`)
                raidElement.classList.remove(`streamulus-class-${state}`)
            }
        },Number(this.stateDuration) * 1000)

        setTimeout(() => {
            this.states.shift()
            if(this.states.length === 0) {
                return
            }
            this.changeClassState(this.states[0], false)
        },Number(this.stateCooldown) * 1000)
    }
}