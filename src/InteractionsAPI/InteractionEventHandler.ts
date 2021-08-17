import { Client, Collection, Interaction } from 'discord.js';
import BaseInteractionManager from './Managers/BaseInteractionManager';

/**
 * The Interaction Event handler, handles Interaction events
 */

export default class InteractionEventHandler {
  /**
   * The managers of the Event handler
   * @private
   */
  private managers: Collection<{ new (): Interaction }, BaseInteractionManager>;

  /**
   * @constructor
   * @private
   */
  private constructor() {
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
   * @type {(BaseInteractionManager|Array)}
   * @public
   */
  public use(handler: BaseInteractionManager): void;
  public use(handlers: BaseInteractionManager[]): void;
  public use(handlers: BaseInteractionManager | BaseInteractionManager[]): void {
    const managers: BaseInteractionManager[] = Array.isArray(handlers) ? handlers : [handlers];
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
