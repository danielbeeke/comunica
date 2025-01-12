import type { IActionHttp, IActorHttpOutput } from '@comunica/bus-http';
import type { Actor, IActionObserverArgs, IActorTest } from '@comunica/core';
import { ActionObserver } from '@comunica/core';

/**
 * Observes HTTP actions, and maintains a counter of the number of requests.
 */
export class ActionObserverHttp extends ActionObserver<IActionHttp, IActorHttpOutput> {
  public requests = 0;

  /* eslint-disable max-len */
  /**
   * @param args - @defaultNested {<npmd:@comunica/bus-http/^2.0.0/components/ActorHttp.jsonld#ActorHttp_default_bus>} bus
   */
  public constructor(args: IActionObserverArgs<IActionHttp, IActorHttpOutput>) {
    super(args);
    this.bus.subscribeObserver(this);
  }
  /* eslint-enable max-len */

  public onRun(actor: Actor<IActionHttp, IActorTest, IActorHttpOutput>,
    action: IActionHttp, output: Promise<IActorHttpOutput>): void {
    this.requests++;
  }
}
