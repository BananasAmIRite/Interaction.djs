import { Client, Interaction } from 'discord.js';
import BaseInteractionManager from './Managers/BaseInteractionManager';

export default class InteractionEventHandler {
  managers: Map<{ new (): Interaction }, BaseInteractionManager>;

  hook(client: Client): void {
    client.addListener('interactionCreate', this._handleInteraction);
  }

  use(handler: BaseInteractionManager): void;
  use(handlers: BaseInteractionManager[]): void;
  use(handlers: BaseInteractionManager | BaseInteractionManager[]): void {
    const h: BaseInteractionManager[] = Array.isArray(handlers) ? handlers : [handlers];
    h.forEach((h) => {
      this.managers.set(h._interactionCtor, h);
    });
  }

  private _handleInteraction(interaction: Interaction) {
    this.managers.forEach((v, k) => {
      // note to self: we can also use ctor.isPrototypeOf to check for inherited inheritance (but not selfreference)
      if (Object.getPrototypeOf(interaction).constructor === k) {
        v.onInteraction(interaction);
      }
    });
  }
}
