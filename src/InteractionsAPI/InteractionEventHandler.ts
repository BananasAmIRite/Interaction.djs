import { Client, Interaction } from 'discord.js';
import BaseInteractionManager from './Managers/BaseInteractionManager';

export default class InteractionEventHandler {
  private managers: Map<{ new (): Interaction }, BaseInteractionManager>;
  constructor() {
    this.managers = new Map();
  }

  hook(client: Client): void {
    client.addListener('interactionCreate', (i: Interaction) => this._handleInteraction(i));
  }

  use(handler: BaseInteractionManager): void;
  use(handlers: BaseInteractionManager[]): void;
  use(handlers: BaseInteractionManager | BaseInteractionManager[]): void {
    const h: BaseInteractionManager[] = Array.isArray(handlers) ? handlers : [handlers];
    for (const manager of h) {
      this.managers.set(manager._interactionCtor, manager);
    }
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
