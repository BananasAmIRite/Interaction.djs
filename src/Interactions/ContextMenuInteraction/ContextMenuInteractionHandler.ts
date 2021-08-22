import { ContextMenuInteraction, MessageApplicationCommandData } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';
import { CommandInteractionHandlerOptions } from '../CommandInteraction/CommandInteractionHandler';
import ContextMenuInteractionManager from './ContextMenuInteractionManager';

export interface ContextMenuInteractionOptions extends BaseInteractionHandlerOptions, MessageApplicationCommandData {}

export default abstract class ContextMenuInteractionHandler extends BaseInteractionHandler {
  constructor(public contextMenuOptions: CommandInteractionHandlerOptions, manager?: ContextMenuInteractionManager) {
    super(contextMenuOptions);
    this.contextMenuOptions = contextMenuOptions;
    if (manager) manager.registerInteractionHandler(contextMenuOptions.name, this);
  }

  public abstract run(interaction: ContextMenuInteraction): Promise<unknown>;
}
