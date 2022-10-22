import { DataController, ElementController } from './controllers'
import { ISimpleObject } from './models'

export abstract class Component<
  Data extends ISimpleObject = ISimpleObject,
  Events extends ISimpleObject = ISimpleObject
> {
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
    this._elementController.build({
      template: this.render(),
      data: this.data,
      events: this._events || ({} as Events),
    })
  }
}
