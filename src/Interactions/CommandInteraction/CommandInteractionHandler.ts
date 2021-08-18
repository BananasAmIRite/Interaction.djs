import { ChatInputApplicationCommandData, CommandInteraction } from 'discord.js';
import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';
import CommandInteractionManager from './CommandInteractionManager';

/**
 * @interface
 * @extends BaseInteractionHandlerOptions
 * @extends ChatInputApplicationCommandData
 */

export interface CommandInteractionHandlerOptions
  extends BaseInteractionHandlerOptions,
    ChatInputApplicationCommandData {}

/**
 * The CommandInteraction handler
 * @class
 * @abstract
 */

export default abstract class CommandInteractionHandler extends BaseInteractionHandler {
  /**
   * Handler for a Command Interaction. Will auto register with the manager supplied.
   * @constructor
   * @method
   * @param {CommandInteractionHandlerOptions} commandOptions The command options to supply
   * @param {CommandInteractionManager} manager The CommandInteractionManager
   * @public
   */
  public constructor(public commandOptions: CommandInteractionHandlerOptions, manager?: CommandInteractionManager) {
    super(commandOptions);
    if (manager && !(manager instanceof CommandInteractionManager))
      throw new TypeError(`The manager must be an instance of a CommandInteractionManager`);
    this.commandOptions = {
      ...commandOptions,
      type: 'CHAT_INPUT',
    };
    if (manager) manager.registerInteractionHandler(commandOptions.name, this);
  }

  /**
   * Runs the interaction supplied
   * @method
   * @param {CommandInteraction} interaction The interaction to run
   * @public
   * @abstract
   */
  public abstract run(interaction: CommandInteraction): Promise<unknown>;
}
