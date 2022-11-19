import { ISimpleObject } from '../models';

export type TDataObserverProps<TData> = {
  data: TData;
  prevData: TData;
};

export type TSubscriber<TData> = (props: TDataObserverProps<TData>) => void;

export class DataObservable<TData extends ISimpleObject = ISimpleObject> {
  private _data: TData;
  private _prevData: TData;
  private _subscribers: Array<(props: TDataObserverProps<TData>) => void> = [];
  private _dataLength = 0;

  constructor(data: TData) {
    this._data = this.makeAsProxy({ ...data }, this._callSubscribers.bind(this));
    this._prevData = { ...data };
    this.subscribe = this.subscribe.bind(this);
  }

  public get data(): TData {
    return { ...this._data };
  }

  public get prevData(): TData {
    return { ...this._prevData };
  }

  private makeAsProxy(data: TData, callback: (props: TDataObserverProps<TData>) => void) {
    return new Proxy(data, {
      set(target: TData, key: keyof TData, val) {
        const prevTarget = { ...target };
        target[key] = val;
        callback({ data: target, prevData: prevTarget });
        return true;
      },
    });
  }

  private _callSubscribers(props: TDataObserverProps<TData>) {
    this._dataLength--;
    if (this._dataLength === 0) {
      this._prevData = props.prevData;
      this._subscribers.forEach((fn) => fn(props));
    }
  }

  public updateData(data: TData) {
    this._dataLength = Object.keys({ ...this._data, ...data }).length;
    Object.assign(this._data, data);
  }

  public subscribe(subscriber: TSubscriber<TData>) {
    this._subscribers.push(subscriber);
    return () => this._subscribers.filter((fn) => fn === subscriber);
  }
}
