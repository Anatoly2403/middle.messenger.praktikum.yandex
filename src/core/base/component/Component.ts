import { v4 as makeUUID } from 'uuid';
import { ElementController } from '../elementController';
import { DataObservable } from '../dataObservable';
import { EventBus } from '../eventBus';
import { EEvents, ISimpleObject, TConfig, TDataObserverProps, TEvents } from '../models';
import { ChildrenController } from '../childrenController';

export class Component<TProps extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _name: string;
  private _props: DataObservable<TProps>;
  private _unsubscribeProps: () => void;
  private _eventBus: EventBus<TProps> = new EventBus<TProps>();
  private _elementController: ElementController<TProps>;
  private _childrenController: ChildrenController;
  private _componentDidMount?: (props: TDataObserverProps<TProps>) => void;
  private _componentDidUpdate?: (props: TDataObserverProps<TProps>) => void;

  constructor(id: string, config: TConfig, props?: TProps) {
    this._id = id;
    this._name = config.name;
    this._props = new DataObservable<TProps>(props || ({} as TProps));
    this._componentDidMount = config.componentDidMount?.bind(this);
    this._componentDidUpdate = config.componentDidUpdate?.bind(this);
    this._childrenController = new ChildrenController(config.children || []);
    this._elementController = new ElementController<TProps>({
      id: this._id,
      hbsTmp: config.template,
      events: this._bindContext(config.events),
      helpers: this._bindContext(config.helpers),
    });

    this._registerEvents();
    this._unsubscribeProps = this._props.subscribe(({ prevData, data }) =>
      this._eventBus.emit(EEvents.UPDATE, prevData, data),
    );
  }

  public get id(): string {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get props() {
    return { ...this._props.data };
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

  private updateComponent(prevData: TProps, data: TProps) {
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    if (this._componentDidUpdate) this._componentDidUpdate.call(this, { prevData, data: { ...data } });
    this._childrenController.updateChildren();
  }

  private mountComponent() {
    this._elementController.compileTemplate(this._props.data);
    this._elementController.mountTemplate();
    if (this._componentDidMount)
      this._componentDidMount.call(this, { prevData: this._props.prevData, data: { ...this._props.data } });
    this._childrenController.mountChildren();
  }

  public setProps(data: TProps | ((data: TProps) => TProps)) {
    if (typeof data === 'function') this._props.updateData(data({ ...this._props.data }));
    else this._props.updateData(data);
  }

  public mount() {
    this._eventBus.emit(EEvents.MOUNT);
  }

  public setParentElement(element: Element) {
    this._elementController.setParentElement(element);
    this._childrenController.setParent(element);
  }
}

export function prepareComponent<TProps extends ISimpleObject = ISimpleObject>(config: TConfig<TProps>) {
  const id = makeUUID();
  function createComponent(props: TProps) {
    return new Component<TProps>(id, config, props);
  }
  createComponent.prototype['name'] = config.name;
  createComponent.prototype['id'] = id;

  return createComponent;
}
