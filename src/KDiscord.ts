import "reflect-metadata";
import { Container } from "inversify";
import { KClient } from "./KBase/KClient";
import { CommandRegistry } from "./KBase/CommandRegistry";
import { CommandMessage } from "./KBase/CommandMessage";
import { MessageHandler } from "./KBase/MessageHandler";
import { KCommand } from "./KBase/KCommand";

const container = new Container();

container.bind<KClient>(KClient).toSelf().inSingletonScope();
container.bind<CommandRegistry>(CommandRegistry).toSelf();
container.bind<MessageHandler>(MessageHandler).toSelf();

const kDiscord = container.resolve(KClient);

export {
    kDiscord,
    container,
    CommandRegistry,
    CommandMessage,
    KClient,
    KCommand,
    MessageHandler
};