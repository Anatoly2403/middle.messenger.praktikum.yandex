import { v4 as makeUUID } from 'uuid'
import { DataController, ElementController } from '../controllers'
import { ISimpleObject } from '../models'

export abstract class Component<
  TData extends ISimpleObject = ISimpleObject,
  TEvents extends ISimpleObject = ISimpleObject
> {
  public readonly id: string = makeUUID()

  private _dataController: DataController<TData> = new DataController<TData>()

  private _elementController: ElementController<
    TData,
    TEvents
  > = new ElementController<TData, TEvents>(this.id)

  protected events: TEvents = {} as TEvents

  constructor(props: TData) {
    this._dataController.init(props, this._afterUpdateCallback.bind(this))
  }
  protected componentDidMount(data: TData): void {}
  protected componentDidUpdate(prevData: TData): void {}
  protected abstract render(): string

  protected get data(): TData {
    return this._dataController.data
  }

  private _afterUpdateCallback(): void {
    this._build()
    this.componentDidUpdate(this._dataController.prevData)
  }

  private _build(): void {
    this._elementController.build({
      template: this.render(),
      data: this.data,
      events: this.events,
    })
  }

  public setData(data: TData): void {
    this._dataController.updateData(data)
  }

  public setParentElement(elem: Element): void {
    this._elementController.setParentElement(elem)
  }

  public mount(): void {
    this._build()
    this.componentDidMount(this.data)
  }

  public destroy(): void {}
}
