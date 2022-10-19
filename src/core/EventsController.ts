type EEvents = {
  [key: string]: Record<string, (event?: Event) => void>;
};

export class EventsController {
  private static _instance: EventsController;
  private _EEvents: EEvents = {};

  constructor() {
    if (!EventsController._instance) {
      EventsController._instance = this;
    }
    return EventsController._instance;
  }

  get EEvents() {
    return this._EEvents;
  }

  setEvent(
    componentName: string,
    name: string,
    func?: (event?: Event) => void
  ) {
    if (!func) return;
    this._EEvents[componentName] = {
      ...this._EEvents[componentName],
      [name]: func,
    };
  }

  removeEEventsBlock(componentName: string) {
    delete this._EEvents[componentName];
  }
}
