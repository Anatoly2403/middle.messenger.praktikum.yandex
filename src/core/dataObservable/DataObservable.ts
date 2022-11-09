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

  constructor(data: TData) {
    this._data = this.makeAsProxy(data, this._callSubscribers.bind(this));
    this._prevData = { ...data };
    this.subscribe = this.subscribe.bind(this);
  }

  public get data(): TData {
    return this._data;
  }

  public get prevData(): TData {
    return this._prevData;
  }

  private makeAsProxy(data: TData, callback: (props: TDataObserverProps<TData>) => void) {
    let dataLength = Object.keys(data).length - 1;
    return new Proxy(data, {
      set(target: TData, key: keyof TData, val) {
        const prevTarget = { ...target };
        target[key] = val;

        if (dataLength) {
          dataLength--;
        } else {
          callback({ data: target, prevData: prevTarget });
          dataLength = Object.keys(data).length - 1;
        }
        return true;
      },
    });
  }

  private _callSubscribers(props: TDataObserverProps<TData>) {
    this._prevData = props.prevData;
    this._subscribers.forEach((fn) => fn(props));
  }

  public updateData(data: TData) {
    Object.assign(this._data, data);
  }

  public subscribe(subscriber: TSubscriber<TData>) {
    this._subscribers.push(subscriber);
    return () => this._subscribers.filter((fn) => fn === subscriber);
  }
}
