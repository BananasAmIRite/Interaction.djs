import { ContextMenuInteraction, MessageApplicationCommandData } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';
import { Optional } from '../../utils/TypeUtils';
import ContextMenuInteractionManager from './ContextMenuInteractionManager';

// this is a thing used internally because 'type' is required here
interface ContextMenuOptions extends BaseInteractionHandlerOptions, MessageApplicationCommandData {}

// this is the actual thing you will be passing in
export interface ContextMenuInteractionOptions
  extends BaseInteractionHandlerOptions,
    Optional<MessageApplicationCommandData, 'type'> {}

export default abstract class ContextMenuInteractionHandler extends BaseInteractionHandler {
  public contextMenuOptions: ContextMenuOptions;
  constructor(contextMenuOptions: ContextMenuInteractionOptions, manager?: ContextMenuInteractionManager) {
    super(contextMenuOptions);
    this.contextMenuOptions = {
      ...contextMenuOptions,
      type: 'MESSAGE',
    };
    if (manager) manager.registerInteractionHandler(contextMenuOptions.name, this);
  }

  public abstract run(interaction: ContextMenuInteraction): Promise<unknown>;
}
