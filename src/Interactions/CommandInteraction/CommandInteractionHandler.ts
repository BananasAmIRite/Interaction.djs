import BaseInteractionHandler, { BaseInteractionHandlerOptions } from '../../InteractionsAPI/BaseInteractionHandler';

export interface CommandInteractionHandlerOptions extends BaseInteractionHandlerOptions {
  customId: string;
}

export default class CommandInteractionHandler extends BaseInteractionHandler {
  constructor(private commandOptions: CommandInteractionHandlerOptions) {
    super(commandOptions);
  }
}
