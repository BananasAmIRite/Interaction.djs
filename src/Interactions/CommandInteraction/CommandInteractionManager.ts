import { ApplicationCommandData, Client, CommandInteraction, Snowflake } from 'discord.js';
import BaseInteractionManager from '../../InteractionsAPI/Managers/BaseInteractionManager';
import CommandInteractionHandler from './CommandInteractionHandler';

export default class CommandInteractionManager extends BaseInteractionManager<
  CommandInteraction,
  CommandInteractionHandler
> {
  public constructor(private client: Client) {
    super(CommandInteraction);
    this.client = client;
  }

  protected getInteractionId(interaction: CommandInteraction): Snowflake {
    return interaction.commandName;
  }
  protected callInteraction(interaction: CommandInteraction): void {
    this.getInteractionHandler(interaction)?.run(interaction);
  }

  public async refreshCommands(guildId?: Snowflake): Promise<void> {
    const data: ApplicationCommandData[] = [];
    this.interactionHandlers.forEach((handler) => {
      data.push(handler.commandOptions);
    });

    if (guildId) {
      const guild = await this.client.guilds.fetch(guildId);
      if (!guild) return;
      await guild.commands.set(data);
    } else {
      await this.client.application?.commands.set(data);
    }
  }
}
