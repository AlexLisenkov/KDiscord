import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { KClient } from "./KBase/KClient";
import { CommandMessage } from "./KBase/CommandMessage";
import { CommandRegistry } from "./KBase/CommandRegistry";
import { Message, Client } from "discord.js";
import { KCommand } from "./KBase/KCommand";
import { KCommandInterface } from "./KBase/KCommandInterface";
import { MessageHandler } from "./KBase/MessageHandler";

declare const container: Container;
declare const kDiscord: KClient;

declare module "KDiscord" {

    export class CommandMessage {
        static COMMAND_NAME_EXPRESSION: RegExp;
        original: Message;
        commandName: string;
        argumentString: string;
        private kDiscord;
        constructor(original: Message);
        private init();
        private getArgumentString();
        private getCommandName();
    }

    export class KClient {
        readonly commandRegistry: CommandRegistry;
        readonly prefix: string;
        readonly client: Client;
        private _prefix;
        private _commandRegistry;
        private _messageHandler;
        private _client;
        private _container;
        constructor(commandRegistry: CommandRegistry);
        registerCommand<T>(command: interfaces.ServiceIdentifier<T>): void;
        private listenForCommands();
    }

    export abstract class KCommand implements KCommandInterface {
        abstract command: string;
        abstract alias: string[];
        abstract run(message: CommandMessage): void;
    }

    export interface KCommandInterface {
        command: string;
        alias: string[];
        run(message: CommandMessage): void;
    }

    export class MessageHandler {
        private _kclient;
        private _client;
        constructor(kclient: KClient);
        private shouldHandleMessage(message);
        handleMessage(message: Message): void;
    }


}