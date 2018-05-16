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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const discord_js_1 = require("discord.js");
const KDiscord_1 = require("../KDiscord");
const CommandRegistry_1 = require("./CommandRegistry");
const MessageHandler_1 = require("./MessageHandler");
let KClient = class KClient {
    constructor(commandRegistry) {
        this._container = KDiscord_1.container;
        this._client = new discord_js_1.Client();
        this._commandRegistry = commandRegistry;
        this._prefix = ";";
        this._messageHandler = new MessageHandler_1.MessageHandler(this);
        this._client.once("ready", this.listenForCommands.bind(this));
    }
    get commandRegistry() {
        return this._commandRegistry;
    }
    get prefix() {
        return this._prefix;
    }
    get client() {
        return this._client;
    }
    registerCommand(command) {
        this._commandRegistry.addCommand(command);
    }
    listenForCommands() {
        this._client.on("message", (message) => {
            this._messageHandler.handleMessage(message);
        });
    }
};
KClient = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(CommandRegistry_1.CommandRegistry)),
    __metadata("design:paramtypes", [CommandRegistry_1.CommandRegistry])
], KClient);
exports.KClient = KClient;
//# sourceMappingURL=KClient.js.map