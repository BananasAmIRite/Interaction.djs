import { ChatInputApplicationCommandData, CommandInteraction } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';
import CommandInteractionManager from './CommandInteractionManager';

export interface CommandInteractionHandlerOptions
  extends BaseInteractionHandlerOptions,
    ChatInputApplicationCommandData {}

export default abstract class CommandInteractionHandler extends BaseInteractionHandler {
  constructor(public commandOptions: CommandInteractionHandlerOptions, manager: CommandInteractionManager) {
    super(commandOptions);
    this.commandOptions = {
      ...commandOptions,
      type: 'CHAT_INPUT',
    };
    manager.registerInteractionHandler(commandOptions.name, this);
  }

  public abstract run(interaction: CommandInteraction): Promise<any>;
}
