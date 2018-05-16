"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandMessage_1 = require("./CommandMessage");
class MessageHandler {
    constructor(kclient) {
        this._kclient = kclient;
        this._client = this._kclient.client;
    }
    shouldHandleMessage(message) {
        return message.content.startsWith(this._kclient.prefix) && !message.author.bot;
    }
    handleMessage(message) {
        if (!this.shouldHandleMessage(message)) {
            return;
        }
        const commandMessage = new CommandMessage_1.CommandMessage(message);
        if (this._kclient.commandRegistry.exists(commandMessage.commandName)) {
            this._kclient.commandRegistry.getCommand(commandMessage.commandName).run(commandMessage);
        }
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=MessageHandler.js.map