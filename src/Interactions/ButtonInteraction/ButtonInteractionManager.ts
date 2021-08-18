import { ButtonInteraction, Client } from 'discord.js';
import BaseInteractionManager from '../../InteractionsAPI/BaseInteractionManager';
import ButtonInteractionHandler from './ButtonInteractionHandler';

export default class ButtonInteractionManager extends BaseInteractionManager<
  ButtonInteraction,
  ButtonInteractionHandler
> {
  /**
   * @constructor
   * @public
   * @param {Client} client The Discord.js Client
   */
  public constructor() {
    super(ButtonInteraction);
  }
  protected getInteractionId(interaction: ButtonInteraction): string {
    return interaction.customId;
  }
  protected callInteraction(interaction: ButtonInteraction): void {
    this.getInteractionHandler(interaction)?.run(interaction);
  }
}
