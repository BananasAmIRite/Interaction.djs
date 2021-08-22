import { ApplicationCommandData, Client, ContextMenuInteraction } from 'discord.js';
import Refreshable from '../Refreshable';
import ContextMenuInteractionHandler from './ContextMenuInteractionHandler';

export default class ContextMenuInteractionManager extends Refreshable<
  ContextMenuInteraction,
  ContextMenuInteractionHandler
> {
  constructor(client: Client) {
    super(client, ContextMenuInteraction);
  }

  protected getInteractionId(interaction: ContextMenuInteraction): string {
    return interaction.commandName;
  }

  protected callInteraction(interaction: ContextMenuInteraction): void {
    this.getInteractionHandler(interaction).run(interaction);
  }

  protected getHandlerCommandData(handler: ContextMenuInteractionHandler): ApplicationCommandData {
    return handler.contextMenuOptions;
  }
}
