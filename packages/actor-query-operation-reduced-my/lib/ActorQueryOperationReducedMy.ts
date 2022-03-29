import { ActorQueryOperationTypedMediated, ActorQueryOperation } from '@comunica/bus-query-operation';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import type { IActorTest } from '@comunica/core';
import type { IActionContext, IQueryOperationResultBindings } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';

/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation)
 * actor that handles SPARQL reduced-my operations.
 */
export class ActorQueryOperationReducedMy extends ActorQueryOperationTypedMediated<Algebra.Reduced> {
  public constructor(args: IActorQueryOperationTypedMediatedArgs) {
    super(args, 'reduced');
  }

  public async testOperation(pattern: Algebra.Reduced, context: IActionContext): Promise<IActorTest> {
    return true;
  }

  public async runOperation(pattern: Algebra.Reduced, context: IActionContext):
  Promise<IQueryOperationResultBindings> {
    const output = ActorQueryOperation.getSafeBindings(await this
      .mediatorQueryOperation.mediate({ operation: pattern.input, context }));

      console.log(context)

    return {
      type: 'bindings',
      bindingsStream: output.bindingsStream,
      metadata: output.metadata,
    };
  }
}
