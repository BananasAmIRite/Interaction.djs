import { Client, Collection, Interaction } from 'discord.js';
import BaseInteractionHandler from './BaseInteractionHandler';
import BaseInteractionManager from './BaseInteractionManager';

/**
 * The Interaction Event handler, handles Interaction events
 */

export default class InteractionEventHandler {
  /**
   * The managers of the Event handler
   * @private
   */
  private managers: Collection<{ new (): Interaction }, BaseInteractionManager<Interaction, BaseInteractionHandler>>;

  /**
   * @constructor
   * @public
   */
  public constructor() {
    this.managers = new Collection();
  }

  /**
   * Handles the interaction event
   * @param client The Discord.js Client
   * @public
   */

  public hook(client: Client): void {
    client.on('interactionCreate', (i: Interaction) => this._handleInteraction(i));
  }

  /**
   * Pass in new handlers to use
   * @param handlers The handlers to use
   * @typedef {BaseInteractionManager|Array}
   * @public
   */
  public use(handler: BaseInteractionManager<Interaction, BaseInteractionHandler>): void;
  public use(handlers: BaseInteractionManager<Interaction, BaseInteractionHandler>[]): void;
  public use(
    handlers:
      | BaseInteractionManager<Interaction, BaseInteractionHandler>
      | BaseInteractionManager<Interaction, BaseInteractionHandler>[],
  ): void {
    const managers: BaseInteractionManager<Interaction, BaseInteractionHandler>[] = Array.isArray(handlers)
      ? handlers
      : [handlers];
    for (const manager of managers) {
      this.managers.set(manager._interactionCtor, manager);
    }
  }

  /**
   * Internal function to handle interactions
   * @param interaction The interaction to handle|
   * @private
   */

  private _handleInteraction(interaction: Interaction) {
    this.managers.forEach((v, k) => {
      // note to self: we can also use ctor.isPrototypeOf to check for inherited inheritance (but not selfreference)
      if (Object.getPrototypeOf(interaction).constructor === k) {
        v.onInteraction(interaction);
      }
    });
  }
}
