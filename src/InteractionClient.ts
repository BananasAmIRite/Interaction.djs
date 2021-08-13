import { Client, ClientOptions } from 'discord.js';

export default class InteractionClient extends Client {
  constructor(options: ClientOptions) {
    super(options);
  }
}
