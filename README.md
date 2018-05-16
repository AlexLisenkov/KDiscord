#KDiscord
KDiscord is a simple crisp command manager package for Discord based on the [discord.js](https://github.com/discordjs/discord.js) package.
This package is in an early phase, don't expect much.

##Installation
``npm install KDiscord --save``

##Examples
###Typescript example:
```javascript
import {KCommand, CommandMessage} from 'KDiscord';

export default class MyCommand extends KCommand
{
    command: string = 'helloworld';
    alias: string[] = ['hw'];

    public run(message: CommandMessage): void {
        message.original.reply('Hello world!');
    }
}

```

```javascript
import {kDiscord, MessageHandler} from "KDiscord";
import MyCommand from "./MyCommand";

kDiscord.registerCommand(MyCommand);

kDiscord.client.login('your-bot-key');

```

###Javascript example:
```javascript
const KDiscord = require('KDiscord');

// Create a class that extends KCommand
class MyCommand extends KDiscord.KCommand
{
    constructor() {
        this.command = 'helloworld';
        this.alias = ['hw'];
    }

    public run(message) {
        message.original.reply('Hello world!');
    }
}

exports.default = MyCommand;
```

```javascript
const KDiscord = require("KDiscord");
const MyCommand = require("./MyCommand");

KDiscord.kDiscord.registerCommand(MyCommand.default);
KDiscord.kDiscord.client.login('your-bot-key');

```