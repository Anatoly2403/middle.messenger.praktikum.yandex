import { compile } from 'handlebars'
import { Component2 } from './Component2'
import { EventsController } from './EventsController'
import {
  EManageEventsType,
  TBindHelper,
  TEventHandler,
  TEvents,
} from './models'
import { isEventHandler, parseEvent } from './utils'

export class RenderController {
  private _events: TEvents
  private _parentElement: Element | null = null
  private _element: Element | null = null
  private _children: Record<string, Component2> = {}
  private _bindHelper: TBindHelper | null = null

  constructor() {
    this._events = this._events || {}
  }

  private _manageEEvents(type: EManageEventsType) {
    if (!this._element || !this._parentElement) return
    const nodeList = this._parentElement.querySelectorAll('[data-event]')
    Array.from(nodeList).forEach((node) => {
      const event = ((node as unknown) as HTMLOrSVGElement).dataset.event
      if (!event || !this._events) return
      const dataset = parseEvent(event)
      let handler = this._events[dataset.name]
      if (this._bindHelper) handler = this._bindHelper(handler)
      if (type === EManageEventsType.ADD) {
        node.addEventListener(dataset.event, handler)
      } else {
        node.removeEventListener(dataset.event, handler)
      }
    })
  }

  public setBindHelper(binder: (fn: TEventHandler) => TEventHandler) {
    this._bindHelper = binder
  }

  public setEvent(name: string, handler?: TEventHandler) {
    if (!handler) return
    this._events = {
      ...this._events,
      [name]: handler,
    }
  }

  public setParentElement(elem: Element) {
    if (this._parentElement) return
    this._parentElement = elem
  }

  public setChild(name: string, child: Component2) {
    this._children[name] = child
  }

  public compileElement(template: string) {
    const fragment = document.createElement('template')
    const compiledTemplate = compile(template)({})
    fragment.innerHTML = compiledTemplate
    this._element = fragment.content.firstElementChild
  }

  public mount() {
    this._manageEEvents(EManageEventsType.REMOVE)
    if (!this._parentElement || !this._element) return
    this._parentElement.appendChild(this._element)
    this._manageEEvents(EManageEventsType.ADD)
  }
}
