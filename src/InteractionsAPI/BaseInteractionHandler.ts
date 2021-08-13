export interface BaseInteractionHandlerOptions {}

export default abstract class BaseInteractionHandler {
  constructor(private options: BaseInteractionHandlerOptions) {}
}
