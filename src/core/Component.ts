import { EventBus } from './eventBus'
import { compile } from 'handlebars'
import { v4 as makeUUID } from 'uuid'
import {
  IComponentMeta,
  EEvents,
  EManageEventsType,
  ISimpleObject,
} from './models'
import { createProxy, parseEvent } from './utils'

export abstract class Component<
  TProps extends ISimpleObject = ISimpleObject,
  TState extends ISimpleObject = ISimpleObject,
  TEvents extends ISimpleObject = ISimpleObject
> {
  public readonly id: string
  private _element: HTMLElement | null = null
  private _props: TProps
  private _state: TState
  private eventBus: () => EventBus
  private meta: IComponentMeta<TProps, TState>
  private EEvents: TEvents = {}
  private children: Record<string, Component> = {}

  constructor({ props, state }: { props: TProps; state: TState }) {
    this.id = makeUUID()
    this.meta = { props: { ...props }, state: { ...state } }
    const eventBus = new EventBus()
    this._props = createProxy<TProps>(props, this.afterUpdateData.bind(this))
    this._state = createProxy<TState>(state, this.afterUpdateData.bind(this))

    this.eventBus = () => eventBus
    this.registerComponentEEvents(eventBus)
    this.eventBus().emit(EEvents.INIT)
    this.setProps = this.setProps.bind(this)
    this.EEvents = this.EEvents || {}
  }

  protected abstract componentDidMount(prevProps: TProps): void
  protected abstract componentDidUpdate(
    prevProps: TProps,
    prevState: TState,
  ): void
  protected abstract render(): string

  public get element(): HTMLElement | null {
    return this._element
  }

  public get state(): TState {
    return this._state
  }

  public get props(): TProps {
    return this._props
  }

  public setEEvents(event: TEEvents) {
    this.EEvents = Object.assign(this.EEvents || {}, event)
  }

  private registerComponentEEvents(eventBus: EventBus) {
    eventBus.on(EEvents.INIT, this.init.bind(this))
    eventBus.on(EEvents.MOUNT, this.onMount.bind(this))
    eventBus.on(EEvents.UPDATE, this.onUpdate.bind(this))
    eventBus.on(EEvents.COMPILE, this.compile.bind(this))
  }

  private createResources() {
    this._element = this.createDocumentElement()
  }

  private createDocumentElement() {
    const element = document.createElement('div')
    element.setAttribute('data-id', this.id)
    return element
  }

  private manageEEvents(type: EManageEventsType) {
    if (!this.element) return
    const nodeList = this.element.querySelectorAll('[data-event]')
    Array.from(nodeList).forEach((node) => {
      const event = ((node as unknown) as HTMLOrSVGElement).dataset.event
      if (!event) return
      const dataset = parseEvent(event)
      const handler = this.props[dataset.name] || this.EEvents[dataset.name]
      if (typeof handler !== 'function') return
      if (type === EManageEventsType.ADD) {
        node.addEventListener(dataset.event, handler.bind(this))
      } else {
        node.removeEventListener(dataset.event, handler.bind(this))
      }
    })
  }

  private afterUpdateData() {
    this.eventBus().emit(EEvents.UPDATE)
  }

  private onMount() {
    this.componentDidMount(this.props)
  }

  private onUpdate() {
    this.componentDidUpdate(this.meta.props, this.meta.state)
    this.updateMeta(this.props, this.state)
    this.eventBus().emit(EEvents.COMPILE)
  }

  private setChild(name: string, child: Component) {
    this.children[name] = child
  }

  private compile() {
    if (!this.element) return
    this.manageEEvents(EManageEventsType.REMOVE)
    this.element.innerHTML = compile(this.render())({
      setChild: this.setChild.bind(this),
      EEvents: this.EEvents,
      props: this.props,
      state: this.state,
    })
    this.manageEEvents(EManageEventsType.ADD)
  }

  protected init() {
    this.createResources()
    this.eventBus().emit(EEvents.COMPILE)
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(EEvents.MOUNT)
  }

  protected setProps(props: TProps) {
    if (!props) return
    Object.assign(this._props, props)
  }

  protected setState(state: TState) {
    if (!state) return
    Object.assign(this._state, state)
  }

  private updateMeta(props: TProps, state: TState) {
    this.meta.props = { ...props }
    this.meta.state = { ...state }
  }
}
