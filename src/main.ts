import './style.css'
import TwitchClient from "./clients/TwitchClient";

const twitchClient = new TwitchClient()

function getTwitchClient() {
    return twitchClient
}