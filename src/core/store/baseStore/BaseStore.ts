import { DataObservable, TSubscriber } from '../../dataObservable';
import { ISimpleObject } from '../../models';

export abstract class Store<TState extends ISimpleObject = ISimpleObject> {
  private state: DataObservable<TState>;
  private subscribers: Record<string, () => void> = {};

  constructor(initState: TState) {
    this.state = new DataObservable<TState>(initState);
  }

  public getState() {
    return { ...this.state.data };
  }

  public setState(nextValue: Partial<TState>) {
    this.state.updateData({ ...this.getState(), ...nextValue });
  }

  public subscribe(id: string, subscriber: TSubscriber<TState>) {
    const unsubscribe = this.state.subscribe(subscriber);
    this.subscribers[id] = unsubscribe;
  }

  public unsubscribe(id: string) {
    if (!this.subscribers[id]) return;
    this.subscribers[id]();
  }
}
