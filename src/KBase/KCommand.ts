import { KCommandInterface } from "./KCommandInterface";
import { CommandMessage } from "./CommandMessage";
import { injectable } from "inversify";

@injectable()
abstract class KCommand implements KCommandInterface {
    abstract command: string;
    abstract alias: string[];

    public abstract run(message: CommandMessage): void;
}

export { KCommand };