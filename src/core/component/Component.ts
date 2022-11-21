import { v4 as makeUUID } from 'uuid';
import { DataObservable, TDataObserverProps } from '../dataObservable';
import { EEvents, EventBus } from '../eventBus';
import { ISimpleObject } from '../models';
import { ChildrenController } from './childrenController';
import { ElementController } from './elementController';
import { TComponentProps, TConfig, TEvents } from './models';

export function prepareComponent<
  TProps extends ISimpleObject = ISimpleObject,
  TState extends ISimpleObject = ISimpleObject
>(config: TConfig<TProps, TState>) {
  const id = makeUUID();

  function createComponent(props: TProps) {
    return new Component<TProps>({ id, config, props });
  }
  createComponent.prototype['name'] = config.name;
  createComponent.prototype['id'] = id;

  return createComponent;
}

export class Component<TProps extends ISimpleObject = ISimpleObject, TState extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _name: string;
  private _props: DataObservable<TProps>;
  private _state: DataObservable<TState>;
  private _eventBus: EventBus<TProps> = new EventBus<TProps>();
  private _elementController: ElementController<TProps>;
  private _childrenController: ChildrenController;
  private _componentDidMount?: (props: TDataObserverProps<TProps>) => void;
  private _componentDidUpdate?: (props: TDataObserverProps<TProps>) => void;
  private _componentWillUnmount?: () => void;
  private _unsubscribeFuncs: Array<() => void> = [];

  constructor({ id, config, props }: TComponentProps<TProps>) {
    this._id = id;
    this._name = config.name;
    this._props = new DataObservable<TProps>({ ...props } as TProps);
    this._state = new DataObservable<TState>({ ...config.state } as TState);
    this._componentDidMount = config.componentDidMount?.bind(this);
    this._componentWillUnmount = config.componentWillUnmount?.bind(this);
    this._componentDidUpdate = config.componentDidUpdate?.bind(this);
    this._childrenController = new ChildrenController(config.children || []);
    this._elementController = new ElementController<TProps>({
      id: this._id,
      hbsTmp: config.template,
      events: this._bindContext(config.events),
      helpers: this._bindContext(config.helpers),
    });

    this._registerEvents();
    this.setUnsubscribe(
      this._props.subscribe(({ prevData, data }) => {
        this._eventBus.emit(EEvents.UPDATE_PROPS, prevData, data);
      }),
    );
    if (config.state) {
      this.setUnsubscribe(
        this._state.subscribe(({ prevData, data }) => {
          this._eventBus.emit(EEvents.UPDATE_STATE, prevData, data);
        }),
      );
    }
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

  public get state() {
    return { ...this._state.data };
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
    this._eventBus.on(EEvents.UPDATE_PROPS, this.updateComponent.bind(this));
    this._eventBus.on(EEvents.UPDATE_STATE, this.updateComponent.bind(this));
  }

  private updateComponent(prevData: TProps, data: TProps) {
    this._elementController.compileTemplate({ ...this._props.data }, { ...this._state.data });
    this._elementController.mountTemplate();
    if (this._componentDidUpdate) this._componentDidUpdate({ prevData, data: { ...data } });
    this._childrenController.setParent(this._elementController.parent);
    this._childrenController.updateChildren();
  }

  private mountComponent() {
    this._elementController.compileTemplate(this._props.data, this._state.data);
    this._elementController.mountTemplate();
    if (this._componentDidMount)
      this._componentDidMount({ prevData: this._props.prevData, data: { ...this._props.data } });
    this._childrenController.mountChildren();
  }

  public setProps(data: TProps | ((data: TProps) => TProps)) {
    if (typeof data === 'function') this._props.updateData(data({ ...this._props.data }));
    else this._props.updateData(data);
  }

  public setState(data: TState | ((data: TState) => TState)) {
    if (typeof data === 'function') this._state.updateData(data({ ...this._state.data }));
    else this._state.updateData(data);
  }

  public mount() {
    this._eventBus.emit(EEvents.MOUNT);
  }

  public setParentElement(element: Element) {
    this._elementController.setParentElement(element);
    this._childrenController.setParent(element);
  }

  public setUnsubscribe(fn: () => void) {
    this._unsubscribeFuncs.push(fn);
  }

  public destroy() {
    this._unsubscribeFuncs.forEach((fn) => fn());
    this._childrenController.destroy();
    this._elementController.destroy();
    if (this._componentWillUnmount) this._componentWillUnmount();
  }

  public forceUpdate() {
    this._elementController.compileTemplate({ ...this._props.data }, { ...this._state.data });
    this._elementController.mountTemplate();
    this._childrenController.setParent(this._elementController.parent);
    this._childrenController.updateChildren();
  }
}
