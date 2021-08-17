import { ApplicationCommandData, Client, CommandInteraction, Snowflake } from 'discord.js';
import BaseInteractionManager from '../../InteractionsAPI/Managers/BaseInteractionManager';
import CommandInteractionHandler from './CommandInteractionHandler';

/**
 * The CommandInteraction manager
 * @extends BaseInteractionManager
 * @class
 */

export default class CommandInteractionManager extends BaseInteractionManager<
  CommandInteraction,
  CommandInteractionHandler
> {
  /**
   * @constructor
   * @public
   * @param {Client} client The Discord.js Client
   */
  public constructor(private client: Client) {
    if (!(client instanceof Client)) throw new TypeError(`The client must be an instance of a discord.js Client`);
    super(CommandInteraction);
    this.client = client;
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

  /**
   * Refreshes Guild or Global Commands
   * @param {Snowflake|String} guildId The guild Id to refresh Commands on
   * @public
   * @method
   * @returns
   */

  public async refreshCommands(guildId?: Snowflake): Promise<void> {
    if (typeof guildId !== 'string') throw new TypeError(`The guildId must be typeof 'string' `);
    const data: ApplicationCommandData[] = [];
    this.interactionHandlers.forEach((handler) => {
      data.push(handler.commandOptions);
    });

    if (guildId) {
      const guild = await this.client.guilds.fetch(guildId);
      if (!guild) return;
      await guild.commands.set(data).catch((err) => {
        throw new Error(err);
      });
    } else {
      await this.client.application?.commands.set(data).catch((err) => {
        throw new Error(err);
      });
    }
  }
}
