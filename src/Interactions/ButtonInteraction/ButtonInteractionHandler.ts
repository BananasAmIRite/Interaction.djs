import { ButtonInteraction } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';
import ButtonInteractionManager from './ButtonInteractionManager';

export interface ButtonInteractionHandlerOptions extends BaseInteractionHandlerOptions {
  customId: string;
}

export default abstract class ButtonInteractionHandler extends BaseInteractionHandler {
  public customId: string;
  constructor(options: ButtonInteractionHandlerOptions, manager?: ButtonInteractionManager) {
    super(options);
    this.customId = options.customId;
    if (manager) manager.registerInteractionHandler(options.customId, this);
  }
  abstract run(interaction: ButtonInteraction): void;
}
