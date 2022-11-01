import { compile } from 'handlebars';
import { EManageEventsAction, ISimpleObject, TElementControllerProps, TEvents, THelpers } from '../models';
import { parseEvent } from '../utils';

export class ElementController<TData extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _helpers?: THelpers;
  private _hbsTmp: string;
  private _events: TEvents;
  private _compiledTemplate: string | null = null;
  private _parentElement: Element | null = null;

  constructor(props: TElementControllerProps) {
    this._id = props.id;
    this._hbsTmp = props.hbsTmp;
    this._events = props.events || {};
    this._helpers = props.helpers;
  }

  private _manageEvents(action: EManageEventsAction) {
    if (!this._parentElement) return;
    this._parentElement.querySelectorAll('[data-event]').forEach((elem) => {
      const { dataset } = (elem as unknown) as HTMLOrSVGElement;
      if (!dataset.event) return;
      const events = parseEvent(dataset.event);
      events.forEach(({ event, name }) => {
        if (action === EManageEventsAction.ADD) elem.addEventListener(event, this._events[name]);
        if (action === EManageEventsAction.REMOVE) elem.removeEventListener(event, this._events[name]);
      });
    });
  }

  public compileTemplate(data: TData) {
    const elemWrapper = document.createElement('div');
    elemWrapper.innerHTML = compile(this._hbsTmp)({
      props: data,
      helpers: this._helpers,
    });
    const elem = (elemWrapper.firstElementChild as unknown) as HTMLOrSVGElement;
    elem.dataset.id = this._id;
    this._compiledTemplate = elemWrapper.innerHTML;
  }

  public mountTemplate() {
    this._manageEvents(EManageEventsAction.REMOVE);
    if (!this._parentElement || !this._compiledTemplate) return;
    this._parentElement.innerHTML = this._compiledTemplate;
    this._manageEvents(EManageEventsAction.ADD);
  }

  public setParentElement(parent: Element) {
    this._parentElement = parent;
  }
}
