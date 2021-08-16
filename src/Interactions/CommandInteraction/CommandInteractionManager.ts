import { CommandInteraction, Snowflake } from 'discord.js';
import BaseInteractionManager from '../../InteractionsAPI/Managers/BaseInteractionManager';
import CommandInteractionHandler from './CommandInteractionHandler';

export default class CommandInteractionManager extends BaseInteractionManager<
  CommandInteraction,
  CommandInteractionHandler,
  Snowflake
> {
  constructor() {
    super(CommandInteraction);
  }

  protected getInteractionId(interaction: CommandInteraction): string {
    return interaction.commandId;
  }
  protected callInteraction(interaction: CommandInteraction): void {
    this.getInteractionHandler(interaction).run();
  }
}
