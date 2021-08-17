export interface BaseInteractionHandlerOptions {}

/**
 * The base Interaction Handler class
 * @class
 * @abstract
 */

export default abstract class BaseInteractionHandler {
  /**
   * @constructor
   * @public
   * @param {BaseInteractionHandlerOptions} options The options supplied to the handler
   */
  public constructor(/**@private */ private options: BaseInteractionHandlerOptions) {}
}
