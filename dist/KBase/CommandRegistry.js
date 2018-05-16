"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const KDiscord_1 = require("../KDiscord");
let CommandRegistry = class CommandRegistry {
    constructor() {
        this._commands = new Map();
        this._container = KDiscord_1.container;
    }
    assertHasCommand(command) {
        if (!this.exists(command)) {
            throw new CommandNotFoundException(command);
        }
    }
    addCommand(command) {
        this.registerCommand(command);
        const resolved = this.resolveCommand(command);
        this._commands.set(resolved.command, command);
        resolved.alias.forEach(value => {
            this._commands.set(value, command);
        });
    }
    exists(command) {
        return this._commands.has(command);
    }
    getCommand(command) {
        this.assertHasCommand(command);
        const className = this._commands.get(command);
        return this.resolveCommand(className);
    }
    registerCommand(command) {
        this._container.bind(command).toSelf();
    }
    resolveCommand(command) {
        return this._container.resolve(command);
    }
};
CommandRegistry = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], CommandRegistry);
exports.CommandRegistry = CommandRegistry;
//# sourceMappingURL=CommandRegistry.js.map