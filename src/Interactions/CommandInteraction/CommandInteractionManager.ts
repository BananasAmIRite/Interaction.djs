import { CommandInteraction, Snowflake } from 'discord.js';
import BaseInteractionManager from '../../InteractionsAPI/Managers/BaseInteractionManager';
import CommandInteractionHandler from './CommandInteractionHandler';

export default class CommandInteractionManager extends BaseInteractionManager<
  CommandInteraction,
  CommandInteractionHandler,
  Snowflake
> {
  protected getInteractionId(interaction: CommandInteraction): string {
    throw new Error('Method not implemented.');
  }
  protected callInteraction(interaction: CommandInteraction): void {
    throw new Error('Method not implemented.');
  }
}
