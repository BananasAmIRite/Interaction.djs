# Interaction.DJS

Interaction.DJS is a simple and lightweight wrapper for discord.js's interaction system.

## Usage

### Typescript

```typescript
import InteractionEventHandler, { CommandInteractionManager } from 'interaction-djs';
import { Client } from 'discord.js';
const bot = new Client({
  intents: [],
});

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(bot); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```

### CommonJS:

```javascript
const { CommandInteractionManager } = require('interaction-djs');
const InteractionEventHandler = require('interaction-djs').default;
const { Client } = require('discord.js');
const bot = new Client({
  intents: [],
});

// Main file, index

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(bot); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```

## Implementing new Interactions

Implement a new type of interaction using the handler api

**NOTE: When implementing custom interaction functionality, please compile to ES2015 Classes and above**
**Implementation with CommandInteractions**

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
    return interaction.commandName; // unique ID, in this case, the command name
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
// index.ts

const bot = new Client({
  intents: [],
});

const evtHandler = new InteractionEventHandler(); // create the event handler
const cmdManager = new CommandInteractionManager(); // create a manager for command interactions
evtHandler.hook(bot); // connect handler to bot
evtHandler.use(cmdManager); // use the command interaction manager

bot.login('TOKEN');
```

## Using CommandInteraction Implementation

### CommandInteraction Implementation

```typescript
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { CommandInteractionHandler, CommandInteractionManager } from 'interaction-djs';
// testcommand.ts

export default class TestCommand extends CommandInteractionHandler {
  constructor(manager?: CommandInteractionManager) {
    super(
      {
        name: 'test',
        description: 'test',
      },
      manager, // pass in the manager if applicable
    );
  }
  override async run(interaction: CommandInteraction): Promise<void> {
    // put code here
    interaction.reply({ content: 'Test succeeded!' });
  }
}
```

### Registering CommandInteraction

```typescript
import { Client } from 'discord.js';
import InteractionEventHandler, { CommandInteractionManager } from 'interaction-djs';
import TestCommand from './testcommand';
// index.ts

const bot = new Client({ intents: [] });

const evtHandler = new InteractionEventHandler();
const cmdManager = new CommandInteractionManager(bot);
evtHandler.hook(bot);
evtHandler.use([cmdManager, btnManager]);
const testCommand = new TestCommand();
cmdManager.registerInteractionHandler(testCommand.customId, testCommand); // registers the command
// Alternatively, you could do:
// new TestCommand(cmdManager);

bot.login('TOKEN');
bot.on('ready', async () => {
  cmdManager.refreshCommands(); // this refreshes the commands globally. It may take up to an hour to show in all servers
  // You could also refresh with a guild ID parameter to refresh it in a guild instantly
});
```
