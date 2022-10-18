import { EventBus } from "./EventBus";
import { compile } from "handlebars";
import { v4 as makeUUID } from "uuid";
import {
  ComponentMeta,
  Events,
  ManageEventsType,
  SimpleObject,
} from "./models";
import { createProxy, getEvent } from "./utils";

export default abstract class Component<
  TProps extends SimpleObject = SimpleObject,
  TState extends SimpleObject = SimpleObject,
  TEvents extends SimpleObject = SimpleObject
> {
  private readonly id: string;
  private eventBus: () => EventBus;
  private meta: ComponentMeta<TProps, TState>;
  private _element: HTMLElement | null = null;
  private _props: TProps;
  private _state: TState;
  private events: TEvents;

  constructor({ props, state }: { props: TProps; state: TState }) {
    console.log("constructor");
    this.id = makeUUID();
    this.meta = { props: { ...props }, state: { ...state } };
    const eventBus = new EventBus();
    this._props = createProxy<TProps>(props, this.afterUpdateData.bind(this));
    this._state = createProxy<TState>(state, this.afterUpdateData.bind(this));

    this.eventBus = () => eventBus;
    this.registerComponentEvents(eventBus);
    this.eventBus().emit(Events.INIT);
    this.setProps = this.setProps.bind(this);
    this.events = this.events || {};
  }

  protected abstract componentDidMount(prevProps: TProps): void;
  protected abstract componentDidUpdate(
    prevProps: TProps,
    prevState: TState
  ): void;
  protected abstract render(): string;

  public get element(): HTMLElement | null {
    return this._element;
  }

  public get state(): TState {
    return this._state;
  }

  public get props(): TProps {
    return this._props;
  }

  public setEvents(event: TEvents) {
    this.events = Object.assign(this.events || {}, event);
  }

  private registerComponentEvents(eventBus: EventBus) {
    eventBus.on(Events.INIT, this.init.bind(this));
    eventBus.on(Events.MOUNT, this.onMount.bind(this));
    eventBus.on(Events.UPDATE, this.onUpdate.bind(this));
    eventBus.on(Events.COMPILE, this.compile.bind(this));
  }

  private createResources() {
    this._element = this.createDocumentElement();
  }

  private createDocumentElement() {
    const element = document.createElement("div");
    element.setAttribute("data-id", this.id);
    return element;
  }

  private manageEvents(type: ManageEventsType) {
    if (!this.element) return;
    const nodeList = this.element.querySelectorAll("[data-event]");
    Array.from(nodeList).forEach((node) => {
      const event = (node as unknown as HTMLOrSVGElement).dataset.event;
      if (!event) return;
      const dataset = getEvent(event);
      const handler = this.props[dataset.name] || this.events[dataset.name];
      if (typeof handler !== "function") return;
      if (type === ManageEventsType.ADD) {
        node.addEventListener(dataset.event, handler.bind(this));
      } else {
        node.removeEventListener(dataset.event, handler.bind(this));
      }
    });
  }

  private afterUpdateData() {
    this.eventBus().emit(Events.UPDATE);
  }

  private onMount() {
    this.componentDidMount(this.props);
  }

  private onUpdate() {
    this.componentDidUpdate(this.meta.props, this.meta.state);
    this.updateMeta(this.props, this.state);
    this.eventBus().emit(Events.COMPILE);
  }

  private compile() {
    if (!this.element) return;
    this.manageEvents(ManageEventsType.REMOVE);
    this.element.innerHTML = compile(this.render())({ events: this.events });
    this.manageEvents(ManageEventsType.ADD);
  }

  protected init() {
    this.createResources();
    this.eventBus().emit(Events.COMPILE);
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Events.MOUNT);
  }

  protected setProps(props: TProps) {
    if (!props) return;
    Object.assign(this._props, props);
  }

  protected setState(state: TState) {
    if (!state) return;
    Object.assign(this._state, state);
  }

  private updateMeta(props: TProps, state: TState) {
    this.meta.props = { ...props };
    this.meta.state = { ...state };
  }
}
