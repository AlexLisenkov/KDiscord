import { KCommandInterface } from "./KCommandInterface";
import { injectable, interfaces } from "inversify";
import { KCommand } from "./KCommand";
import { container } from "../KDiscord";
import Container = interfaces.Container;

@injectable()
class CommandRegistry {
    private _commands: Map<string, interfaces.Newable<KCommandInterface>>;
    private _container: Container;

    public constructor() {
        this._commands = new Map<string, interfaces.Newable<KCommandInterface>>();
        this._container = container;
    }

    private assertHasCommand(command: string): void {
        if (!this.exists(command)) {
            throw new CommandNotFoundException(command);
        }
    }

    public addCommand<T>(command: interfaces.ServiceIdentifier<T>): void {
        // Register command in the ioc
        this.registerCommand(command);
        const resolved = this.resolveCommand(<any>command);

        // Register the main
        this._commands.set(resolved.command, <any>command);

        // Register the aliases
        resolved.alias.forEach(value => {
            this._commands.set(value, <any>command);
        });
    }

    public exists(command: string) {
        return this._commands.has(command);
    }

    public getCommand(command: string): KCommandInterface {
        this.assertHasCommand(command);
        const className = this._commands.get(command);
        return this.resolveCommand(className);
    }

    private registerCommand<T>(command: interfaces.ServiceIdentifier<T>): void {
        this._container.bind<T>(command).toSelf();
    }

    private resolveCommand<T>(command: interfaces.Newable<T>): KCommand {
        return this._container.resolve<any>(command);
    }
}

export {CommandRegistry};
