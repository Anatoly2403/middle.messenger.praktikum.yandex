import { DataObservable, TSubscriber } from '../../dataObservable';
import { ISimpleObject } from '../../models';

class BaseStore<TState extends ISimpleObject = ISimpleObject> {
  private state: DataObservable<TState>;

  constructor(initState: TState) {
    this.state = new DataObservable<TState>(initState);
  }

  public getState() {
    return { ...this.state.data };
  }

  public setState(nextValue: Partial<TState>) {
    this.state.updateData({ ...this.getState(), ...nextValue });
  }

  public subscribe(subscriber: TSubscriber<TState>) {
    return this.state.subscribe(subscriber);
  }
}

export function createStore<TInitState extends ISimpleObject = ISimpleObject>(initState: TInitState) {
  return new BaseStore<TInitState>(initState);
}
