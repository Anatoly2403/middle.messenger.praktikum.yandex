import { v4 as makeUUID } from 'uuid'
import { DataController } from './DataController'
import { EventBus } from './eventBus'
import { ISimpleObject } from './models'
import { ElementController } from './ElementController'

export abstract class Component2<
  Data extends ISimpleObject = ISimpleObject,
  Events extends ISimpleObject = ISimpleObject
> {
  static readonly id: string = makeUUID()

  private _dataController: DataController<Data> = new DataController<Data>()
  private _elementController: ElementController<
    Data,
    Events
  > = new ElementController<Data, Events>()

  protected _events: Events | null = null

  constructor(props: Data) {
    this._dataController.init(props, () => this.build())
  }

  protected abstract render(): string

  protected componentDidMount(data: Data): void {}

  protected componentDidUpdate(prevData: Data): void {}

  protected registerEvents(events: Events) {
    this._events = events
  }

  protected get data() {
    return this._dataController.data
  }

  public setParentElement(elem: Element) {
    this._elementController.setParentElement(elem)
  }

  public build() {
    const template = this.render()
    this._elementController.compileElement(template, {
      ...this.data,
      ...(this._events || ({} as Events)),
    })
    this._elementController.mount(this._events)
  }
}
