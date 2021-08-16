import { ChatInputApplicationCommandData } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';

export interface CommandInteractionHandlerOptions
  extends BaseInteractionHandlerOptions,
    ChatInputApplicationCommandData {
  customId: string;
}

export default abstract class CommandInteractionHandler extends BaseInteractionHandler {
  constructor(private commandOptions: CommandInteractionHandlerOptions) {
    super(commandOptions);
  }

  public abstract run(): any;
}
