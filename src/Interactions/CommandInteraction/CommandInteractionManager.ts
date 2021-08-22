import { ApplicationCommandData, Client, CommandInteraction, Snowflake } from 'discord.js';
import Refreshable from '../Refreshable';
import CommandInteractionHandler from './CommandInteractionHandler';

/**
 * The CommandInteraction manager
 * @extends BaseInteractionManager
 * @class
 */

export default class CommandInteractionManager extends Refreshable<CommandInteraction, CommandInteractionHandler> {
  /**
   * @constructor
   * @public
   * @param {Client} client The Discord.js Client
   */
  public constructor(client: Client) {
    super(client, CommandInteraction);
  }

  /**
   * Gets the Interactions Id
   * @param {CommandInteraction} interaction The interaction's Id to return
   * @protected
   * @method
   * @returns
   */
  protected getInteractionId(interaction: CommandInteraction): Snowflake {
    if (!(interaction instanceof CommandInteraction))
      throw new TypeError(`Interaction must be an instance of a CommandInteraction`);
    return interaction.commandName;
  }

  /**
   * Calls the given interaction
   * @param {CommandInteraction} interaction The Interaction to call
   * @method
   * @protected
   */
  protected callInteraction(interaction: CommandInteraction): void {
    if (!(interaction instanceof CommandInteraction))
      throw new TypeError(`Interaction must be an instance of a CommandInteraction`);
    this.getInteractionHandler(interaction)?.run(interaction);
  }

  protected getHandlerCommandData(handler: CommandInteractionHandler): ApplicationCommandData {
    return handler.commandOptions;
  }
}
