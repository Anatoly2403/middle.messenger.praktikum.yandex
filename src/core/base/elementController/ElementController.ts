import { compile } from 'handlebars';
import { Component } from '../component/Component';
import { ISimpleObject, TDataObserverProps, TElementControllerProps, TEvents } from '../models';
import { parseEvent } from '../utils';
import { isEventHandler } from '../guards';

export class ElementController<TData extends ISimpleObject = ISimpleObject> {
  private _id: string;
  private _hbsTmp: string;
  private _compiledTemplate: string | null = null;
  private _parentElement: Element | null = null;
  private _events: TEvents;

  constructor(props: TElementControllerProps) {
    this._id = props.id;
    this._hbsTmp = props.hbsTmp;
    this._events = props.events || {};
  }

  public setParentElement() {
    const elementWithId = document.querySelector(`[data-child="${this._id}"]`);
    if (!elementWithId) return;
    this._parentElement = elementWithId.parentElement;
  }

  public compileTemplate(data: TData) {
    const elemWrapper = document.createElement('div');
    elemWrapper.innerHTML = compile(this._hbsTmp)(data);
    const elem = (elemWrapper.firstElementChild as unknown) as HTMLOrSVGElement;
    elem.dataset.id = this._id;
    this._compiledTemplate = elemWrapper.innerHTML;
  }

  public update() {
    if (!this._parentElement || !this._compiledTemplate) return;
    this._parentElement.innerHTML = this._compiledTemplate;
  }

  public mountTemplate() {
    if (!this._parentElement || !this._compiledTemplate) return;
    this._parentElement.innerHTML = this._compiledTemplate;
  }
}
