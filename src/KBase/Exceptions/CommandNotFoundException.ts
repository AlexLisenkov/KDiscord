class CommandNotFoundException extends Error {
    public constructor(command: string) {
        super(`${command} not found.`);
    }
}