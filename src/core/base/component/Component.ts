import { v4 as makeUUID } from 'uuid';
import { DataController, ElementController } from '../controllers';
import { EventBus } from '../eventBus';
import { EEvents, ISimpleObject } from '../models';

export abstract class Component<
  TData extends ISimpleObject = ISimpleObject,
  TEvents extends ISimpleObject = ISimpleObject
> {
  public readonly id: string = makeUUID();

  private _dataController: DataController<TData> = new DataController<TData>();

  private _elementController: ElementController<TData, TEvents> = new ElementController<TData, TEvents>(this.id);

  private eventBus: EventBus<TData> = new EventBus<TData>();

  protected events: TEvents = {} as TEvents;

  constructor(props: TData) {
    this._registerEvents();
    this._dataController.init(props, this._afterUpdateCallback.bind(this));
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(data: TData): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidUpdate(prevData: TData): void {}
  protected abstract render(): string;

  protected get data(): TData {
    return this._dataController.data;
  }

  private _afterUpdateCallback(prevData: TData): void {
    this.eventBus.emit(EEvents.UPDATE, prevData);
  }

  private _updateCallback(prevData: TData): void {
    this._build();
    this.componentDidUpdate(prevData);
  }

  private _mountCallback(data: TData): void {
    this._build();
    this.componentDidMount(data);
  }

  private _registerEvents(): void {
    this.eventBus.on(EEvents.MOUNT, this._mountCallback.bind(this));
    this.eventBus.on(EEvents.UPDATE, this._updateCallback.bind(this));
  }

  private _build(): void {
    this._elementController.build({
      template: this.render(),
      data: this.data,
      events: this.events,
    });
  }

  public setData(data: TData): void {
    this._dataController.updateData(data);
  }

  public setParentElement(elem: Element): void {
    this._elementController.setParentElement(elem);
  }

  public mount(): void {
    this.eventBus.emit(EEvents.MOUNT, this.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public destroy(): void {}
}
