import { ApplicationCommandData, Client, Interaction, Snowflake } from 'discord.js';
import BaseInteractionManager, { InteractionCtor } from '../InteractionsAPI/BaseInteractionManager';
import BaseInteractionHandler from '../InteractionsAPI/BaseInteractionHandler';

export default abstract class Refreshable<
  I extends Interaction,
  H extends BaseInteractionHandler,
  ID_TYPE = string,
> extends BaseInteractionManager<I, H, ID_TYPE> {
  constructor(private client: Client, type: InteractionCtor<I>) {
    super(type);
    if (!(client instanceof Client)) throw new TypeError(`The client must be an instance of a discord.js Client`);
  }

  protected abstract getHandlerCommandData(handler: H): ApplicationCommandData;
  /**
   * Refreshes Guild or Global Commands
   * @param {Snowflake|String} guildId The guild Id to refresh Commands on
   * @public
   * @method
   * @returns
   */
  public async refreshCommands(guildId?: Snowflake): Promise<void> {
    if (guildId && typeof guildId !== 'string') throw new TypeError(`The guildId must be typeof 'string' `);
    const data: ApplicationCommandData[] = [];
    this.interactionHandlers.forEach((handler) => {
      data.push(this.getHandlerCommandData(handler));
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
