# Interaction.DJS

## Usage

### Typescript:

```typescript
import InteractionEventHandler, { CommandInteractionManager } from 'interaction-djs';
import { Client } from 'discord.js';
const bot = new Client();

const evtHandler = new InteractionEventHandler();
const cmdManager = new CommandInteractionManager();
evtHandler.hook(bot);
evtHandler.use(cmdManager);

bot.start('TOKEN');
```
