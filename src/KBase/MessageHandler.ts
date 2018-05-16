import { KClient } from "./KClient";
import { Client, Message } from "discord.js";
import { CommandMessage } from "./CommandMessage";

class MessageHandler {
    private _kclient: KClient;
    private _client: Client;

    constructor(kclient: KClient) {
        this._kclient = kclient;
        this._client = this._kclient.client;
    }

    private shouldHandleMessage(message: Message): boolean {
        return message.content.startsWith(this._kclient.prefix) && !message.author.bot;
    }

    public handleMessage(message: Message): void {
        if (!this.shouldHandleMessage(message)) {
            return;
        }
        const commandMessage = new CommandMessage(message);
        if (this._kclient.commandRegistry.exists(commandMessage.commandName)) {
            this._kclient.commandRegistry.getCommand(commandMessage.commandName).run(commandMessage);
        }
    }

}

export {MessageHandler};