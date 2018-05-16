import { kDiscord } from "../KDiscord";
import { KClient } from "./KClient";
import { Message } from "discord.js";

class CommandMessage {
    static COMMAND_NAME_EXPRESSION = /([\S]+)/;

    public original: Message;
    public commandName: string;
    public argumentString: string;
    private kDiscord: KClient;

    public constructor(original: Message) {
        this.kDiscord = kDiscord;
        this.original = original;
        this.init();
    }

    private init(): void {
        this.commandName = this.getCommandName();
        this.argumentString = this.getArgumentString();
    }

    private getArgumentString(): string {
        return this.original.content
            .replace(this.getCommandName(), "")
            .replace(this.kDiscord.prefix, "");
    }

    private getCommandName(): string {
        return this.original.content
            .match(CommandMessage.COMMAND_NAME_EXPRESSION)[0]
            .replace(this.kDiscord.prefix, "");
    }
}

export {CommandMessage};