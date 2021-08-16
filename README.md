# Interaction.DJS

Interaction.DJS is a simple and lightweight wrapper for discord.js's interaction system.

## Usage

### Typescript:

Since the project is written in typescript, importing it is relatively easy.

```typescript
import InteractionEventHandler, { CommandInteractionManager } from 'interaction-djs';
import { Client } from 'discord.js';
const bot = new Client({
  intents: [],
});

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```

### CommonJS:

Importing using CommonJS is a bit harder:

```javascript
const { CommandInteractionManager } = require('interaction-djs');
const InteractionEventHandler = require('interaction-djs').default;
const { Client } = require('discord.js');
const bot = new Client({
  intents: [],
});

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```

## Implementing new Interactions

To implement a new type of interaction using the handler api:

**This shows the implementation for CommandInteraction**

```typescript
import { CommandInteraction, Snowflake } from 'discord.js';
import { BaseInteractionManager } from 'interaction-djs';
import CommandInteractionHandler from './CommandInteractionHandler';
// CommandInteractionManager.ts

export default class CommandInteractionManager extends BaseInteractionManager<
  CommandInteraction, // the type of interaction you are implementing
  CommandInteractionHandler, // the handler class
  string // the type, usually omitted, for the unique id; default is string
> {
  constructor() {
    super(CommandInteraction);
  }

  protected getInteractionId(interaction: CommandInteraction): Snowflake {
    return interaction.commandName; // unique ID, in the case, the command name
  }
  protected callInteraction(interaction: CommandInteraction): void {
    this.getInteractionHandler(interaction).run(interaction); // get the interaction handler for the interaction by the id and call run() on it
  }
}
```

```typescript
import { ChatInputApplicationCommandData, CommandInteraction } from 'discord.js';
import { BaseInteractionHandler, BaseInteractionHandlerOptions } from 'interaction-djs';
// CommandInteractionHandler.ts

export interface CommandInteractionHandlerOptions
  extends BaseInteractionHandlerOptions, // base options are currently nothing, but extend in case options are added
    ChatInputApplicationCommandData {}

export default abstract class CommandInteractionHandler extends BaseInteractionHandler {
  constructor(private commandOptions: CommandInteractionHandlerOptions) {
    super(commandOptions); // pass command options into super
  }

  public abstract run(interaction: CommandInteraction): void; // run function to be implemented by more implementing classes
}
```

```typescript
import InteractionEventHandler from 'interaction-djs';
import { Client } from 'discord.js';
import CommandInteractionManager from './CommandInteractionManager';
const bot = new Client({
  intents: [],
});

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```
