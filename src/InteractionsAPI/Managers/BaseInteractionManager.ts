import { Collection, Interaction } from 'discord.js';
import BaseInteractionHandler from '../BaseInteractionHandler';

/**
 * @type
 */

export type InteractionCtor<I extends Interaction = any> = { new (...args: any[]): I };

/**
 * The base interaction manager
 * @class
 */

export default abstract class BaseInteractionManager<
  I extends Interaction = any,
  H extends BaseInteractionHandler = any,
  ID_TYPE = string,
> {
  /**
   * A Collection of interaction handlers
   * @protected
   */
  protected interactionHandlers: Collection<ID_TYPE, H>;

  /**
   * @constructor
   * @param {InteractionCtor} _interactionCtor
   * @public
   */
  public constructor(public _interactionCtor: InteractionCtor) {
    this.interactionHandlers = new Collection();
    this._interactionCtor = _interactionCtor;
  }

  /**
   * Registers a new Interaction Handler inside of a Collection
   * @param {ID_TYPE} Id The Id to set as the key
   * @param {H} handler The handler to set as the value
   * @method
   * @public
   */
  public registerInteractionHandler(Id: ID_TYPE, handler: H): void {
    this.interactionHandlers.set(Id, handler);
  }

  /**
   * Removes a Handler from the Interactions Handler Collection
   * @param {ID_TYPE} Id The Id to delete
   * @method
   * @public
   * @returns
   */

  public removeInteractionHandler(Id: ID_TYPE): boolean {
    return this.interactionHandlers.delete(Id);
  }

  /**
   * Fetches an Interaction handler
   * @param {I} interaction The interaction to get
   * @method
   * @protected
   * @returns
   */

  protected getInteractionHandler(interaction: I): H | undefined {
    return this.interactionHandlers.get(this.getInteractionId(interaction));
  }

  /**
   * Get an interaction via Id
   * @param {T} interaction The interaction to get.
   * @method
   * @abstract
   * @protected
   */

  protected abstract getInteractionId(interaction: I): ID_TYPE;

  /**
   * Calls an interaction function
   * @param {I} interaction The interaction to call
   * @method
   * @abstract
   * @protected
   */

  protected abstract callInteraction(interaction: I): void;

  /**
   * Call an interaction based on an event
   * @param {I} interaction The interaction to listen for
   * @method
   * @public
   */

  public onInteraction(interaction: I): void {
    this.callInteraction(interaction);
  }
}
