import { inject, injectable, interfaces } from "inversify";
import { Client, Message } from "discord.js";
import { container } from "../KDiscord";
import { CommandRegistry } from "./CommandRegistry";
import { MessageHandler } from "./MessageHandler";

@injectable()
class KClient {
    get commandRegistry(): CommandRegistry {
        return this._commandRegistry;
    }
    get prefix(): string {
        return this._prefix;
    }
    get client(): Client {
        return this._client;
    }
    private _prefix: string;
    private _commandRegistry: CommandRegistry;
    private _messageHandler: MessageHandler;
    private _client: Client;
    private _container: interfaces.Container;

    public constructor(
        @inject(CommandRegistry) commandRegistry: CommandRegistry,
    ) {
        this._container = container;
        this._client = new Client();
        this._commandRegistry = commandRegistry;
        this._prefix = ";";

        this._messageHandler = new MessageHandler(this);
        this._client.once("ready", this.listenForCommands.bind(this));
    }

    public registerCommand<T>(command: interfaces.ServiceIdentifier<T>) {
        this._commandRegistry.addCommand(command);
    }

    private listenForCommands(): void {
        this._client.on("message", (message: Message) => {
            this._messageHandler.handleMessage(message);
        });
    }
}

export {KClient};