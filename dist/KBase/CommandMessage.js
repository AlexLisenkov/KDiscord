"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KDiscord_1 = require("../KDiscord");
class CommandMessage {
    constructor(original) {
        this.kDiscord = KDiscord_1.kDiscord;
        this.original = original;
        this.init();
    }
    init() {
        this.commandName = this.getCommandName();
        this.argumentString = this.getArgumentString();
    }
    getArgumentString() {
        return this.original.content
            .replace(this.getCommandName(), "")
            .replace(this.kDiscord.prefix, "");
    }
    getCommandName() {
        return this.original.content
            .match(CommandMessage.COMMAND_NAME_EXPRESSION)[0]
            .replace(this.kDiscord.prefix, "");
    }
}
CommandMessage.COMMAND_NAME_EXPRESSION = /([\S]+)/;
exports.CommandMessage = CommandMessage;
//# sourceMappingURL=CommandMessage.js.map