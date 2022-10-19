import { v4 as makeUUID } from 'uuid'
import { DataController } from './DataController'
import { EventBus } from './eventBus'
import { TEvents, ISimpleObject, TEventHandler } from './models'
import { RenderController } from './RenderController'

export abstract class Component2<Data extends ISimpleObject = ISimpleObject> {
  static readonly id: string = makeUUID()
  private _dataController: DataController<Data> = new DataController<Data>()
  private _renderController: RenderController

  constructor(props: Data) {
    this._renderController = this._renderController || new RenderController()
    this._renderController.setBindHelper(this._binderFunction.bind(this))
    this._dataController.init(props)
    this._compile()
  }

  protected abstract render(): string
  protected componentDidMount(props: Data): void {}
  protected componentDidUpdate(prevProps: Data): void {}

  private _binderFunction(fn: TEventHandler): TEventHandler {
    console.log(this)
    return fn.bind(this)
  }

  protected get data() {
    return this._dataController.data
  }

  public setEvent(name: string, handler?: TEventHandler) {
    if (!this._renderController) this._renderController = new RenderController()
    this._renderController.setEvent(name, handler)
  }

  private _compile() {
    if (!this._renderController) return
    const template = this.render()
    this._renderController.compileElement(template)
  }

  public setParentElement(elem: Element) {
    if (!this._renderController) return
    this._renderController.setParentElement(elem)
  }

  public build() {
    if (!this._renderController) return
    this._renderController.mount()
  }
}
