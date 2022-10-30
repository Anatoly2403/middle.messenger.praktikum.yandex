import { v4 as makeUUID } from 'uuid';
import { ElementController } from '../elementController';
import { DataObservable } from '../dataObservable';
import { EventBus } from '../eventBus';
import { EEvents, ISimpleObject, TConfig, TDataObserverProps, TEvents } from '../models';
import { registerComponent } from '../utils';

export class Component<TProps extends ISimpleObject = ISimpleObject, TStatic extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _uniqueKey?: string;
  private _name: string;
  private _props: DataObservable<TProps>;
  private _unsubscribeProps: () => void;
  private _eventBus: EventBus = new EventBus();
  private _elementController: ElementController<TProps>;
  private _componentDidMount?: (props: TDataObserverProps<TProps>) => void;
  private _componentDidUpdate?: (props: TDataObserverProps<TProps>) => void;

  constructor(id: string, config: TConfig<TStatic>, props?: TProps) {
    this._id = id;
    this._name = config.name;
    this._props = new DataObservable<TProps>(props || ({} as TProps));

    this._elementController = new ElementController<TProps>({
      id: this._id,
      hbsTmp: config.getTemplate(),
      events: this._bindContext(config.events),
      children: config.children,
      staticData: config.getStaticData?.bind(this)(),
    });

    this._registerEvents();
    this._unsubscribeProps = this._props.subscribe(() => this._eventBus.emit(EEvents.UPDATE));
  }

  public get id(): string {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get uniqueKey() {
    return this._uniqueKey;
  }

  public get props() {
    return { ...this._props.data };
  }

  public get children() {
    return this._elementController.children;
  }

  private _bindContext(events?: TEvents) {
    if (!events) return events;
    return Object.keys(events).reduce<TEvents>((acc, key) => {
      acc[key] = events[key].bind(this);
      return acc;
    }, {});
  }

  private _registerEvents() {
    this._eventBus.on(EEvents.MOUNT, this.mountComponent.bind(this));
    this._eventBus.on(EEvents.UPDATE, this.updateComponent.bind(this));
  }

  public setUniqueKey(key?: string) {
    this._uniqueKey = key;
  }

  private updateComponent() {
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    this._elementController.resetChildren();
    if (this._componentDidUpdate)
      this._componentDidUpdate.call(this, { prevData: this._props.prevData, data: this._props.data });
  }

  public mountComponent() {
    this._elementController.setParentElement();
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    this._elementController.initChildren();
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

  public mount() {
    this._eventBus.emit(EEvents.MOUNT);
  }
}

export function prepareComponent<
  TProps extends ISimpleObject = ISimpleObject,
  TStatic extends ISimpleObject = ISimpleObject
>(config: TConfig<TStatic>) {
  const id = makeUUID();
  registerComponent(id, config.name);

  function createComponentWithProps(props: TProps) {
    return new Component<TProps, TStatic>(id, config, props);
  }
  createComponentWithProps.prototype['name'] = config.name;

  return createComponentWithProps;
}
