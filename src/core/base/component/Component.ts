import { v4 as makeUUID } from 'uuid';
import { ElementController } from '../elementController';
import { DataObservable } from '../dataObservable';
import { EventBus } from '../eventBus';
import { ISimpleObject, TConfig, TDataObserverProps } from '../models';
import { registerComponent } from '../utils';

export class Component<TProps extends ISimpleObject = ISimpleObject, TState extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _state?: TState;
  private _props: DataObservable<TProps>;
  private _eventBus: EventBus = new EventBus();
  private _elementController: ElementController<TProps>;
  private _componentDidMount?: (props: TDataObserverProps<TProps>) => void;
  private _componentDidUpdate?: (props: TDataObserverProps<TProps>) => void;

  constructor(id: string, config: TConfig<TState>, props: TProps) {
    this._id = id;
    this._state = config.state;
    this._props = new DataObservable<TProps>(props);

    this._elementController = new ElementController<TProps>({
      id: this._id,
      hbsTmp: config.template,
      events: config.events,
    });
  }

  public get id(): string {
    return this._id;
  }

  private updateComponent() {
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    if (this._componentDidUpdate)
      this._componentDidUpdate.call(this, { prevData: this._props.prevData, data: this._props.data });
  }

  public mountComponent() {
    this._elementController.setParentElement();
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    if (this._componentDidMount)
      this._componentDidMount.call(this, { prevData: this._props.prevData, data: this._props.data });
  }

  public resetTemplate() {
    this._elementController.setParentElement();
    this._elementController.mountTemplate();
  }

  public setNewProps(data: TProps) {
    this._props.updateData(data);
  }
}

export function createComponent<
  TProps extends ISimpleObject = ISimpleObject,
  TState extends ISimpleObject = ISimpleObject
>(config: TConfig<TState>) {
  const id = makeUUID();
  registerComponent(id, config.name);
  return (props: TProps) => new Component<TProps, TState>(id, config, props);
}
