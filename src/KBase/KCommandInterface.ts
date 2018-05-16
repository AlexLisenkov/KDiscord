import { CommandMessage } from "./CommandMessage";

interface KCommandInterface {
    command: string;
    alias: string[];

    run(message: CommandMessage): void;
}

export { KCommandInterface };