import { Interaction } from 'discord.js';
import BaseInteractionHandler from '../BaseInteractionHandler';

export default abstract class BaseInteractionManager<
  I extends Interaction = unknown,
  H extends BaseInteractionHandler = unknown,
  ID_TYPE = string,
> {
  protected interactionHandlers: Map<ID_TYPE, H>;
  constructor(public _interactionCtor: { new (...args: unknown[]): I }) {
    this.interactionHandlers = new Map();
    this._interactionCtor = _interactionCtor;
  }

  public registerInteractionHandler(id: ID_TYPE, handler: H): void {
    this.interactionHandlers.set(id, handler);
  }

  public removeInteractionHandler(id: ID_TYPE): boolean {
    return this.interactionHandlers.delete(id);
  }

  protected getInteractionHandler(interaction: I): H | undefined {
    return this.interactionHandlers.get(this.getInteractionId(interaction));
  }

  protected abstract getInteractionId(interaction: I): ID_TYPE;

  protected abstract callInteraction(interaction: I): void;

  public onInteraction(interaction: I): void {
    this.callInteraction(interaction);
  }
}
