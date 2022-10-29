import { compile } from 'handlebars';
import { EManageEventsAction, ISimpleObject, TElementControllerProps, TEvents } from '../models';
import { ChildrenController } from '../childrenController';

export class ElementController<
  TData extends ISimpleObject = ISimpleObject,
  THelpers extends ISimpleObject = ISimpleObject
> {
  private _id: string;
  private _hbsTmp: string;
  private _events: TEvents;
  private _compiledTemplate: string | null = null;
  private _parentElement: Element | null = null;
  private _childrenController: ChildrenController;

  constructor(props: TElementControllerProps<THelpers>) {
    this._id = props.id;
    this._hbsTmp = props.hbsTmp;
    this._events = props.events || {};
    this._childrenController = new ChildrenController(props.children || [], props.helpers);
  }

  private _manageEvents(action: EManageEventsAction) {
    if (!this._parentElement) return;
    this._parentElement.querySelectorAll('[data-event]').forEach((elem) => {
      const { dataset } = (elem as unknown) as HTMLOrSVGElement;
      if (!dataset.event) return;
      const [event, name] = dataset.event.split(':');
      if (action === EManageEventsAction.ADD) elem.addEventListener(event, this._events[name]);
      if (action === EManageEventsAction.REMOVE) elem.removeEventListener(event, this._events[name]);
    });
  }

  public setParentElement() {
    const elementWithId = document.querySelector(`[data-child="${this._id}"]`);
    if (!elementWithId) return;
    this._parentElement = elementWithId;
  }

  public compileTemplate(data: TData) {
    this._manageEvents(EManageEventsAction.REMOVE);
    const elemWrapper = document.createElement('div');
    elemWrapper.innerHTML = compile(this._hbsTmp)({
      props: data,
      setChildProps: this._childrenController.setChildrenProps,
    });
    const elem = (elemWrapper.firstElementChild as unknown) as HTMLOrSVGElement;
    elem.dataset.id = this._id;
    this._compiledTemplate = elemWrapper.innerHTML;
  }

  public mountTemplate() {
    if (!this._parentElement || !this._compiledTemplate) return;
    this._parentElement.innerHTML = this._compiledTemplate;
    this._manageEvents(EManageEventsAction.ADD);
  }

  public initChildren() {
    this._childrenController.initChildren();
    this._childrenController.mountChildren();
  }

  public resetChildren() {
    this._childrenController.resetChildren();
  }
}
