import { compile } from 'handlebars'
import { Component2 } from './Component2'
import { EventsController } from './EventsController'
import { EManageEventsType, ISimpleObject } from './models'
import { isEventHandler, parseEvent } from './utils'

export class ElementController<
  Data extends ISimpleObject = ISimpleObject,
  Events extends ISimpleObject = ISimpleObject
> {
  private _parentElement: Element | null = null
  private _element: Element | null = null
  private _children: Record<string, Component2> = {}

  private _manageEvents(events: Events | null, type: EManageEventsType) {
    if (!this._parentElement || !events) return
    const nodeList = this._parentElement.querySelectorAll('[data-event]')
    Array.from(nodeList).forEach((node) => {
      const { dataset } = (node as unknown) as HTMLOrSVGElement
      if (!dataset.event) return
      const { name, event } = parseEvent(dataset.event)
      const handler = events[event]
      if (!isEventHandler(handler)) return
      if (type === EManageEventsType.ADD) {
        node.addEventListener(name, handler)
      } else {
        node.removeEventListener(name, handler)
      }
    })
  }

  public setParentElement(elem: Element) {
    if (this._parentElement) return
    this._parentElement = elem
  }

  public setChild(name: string, child: Component2) {
    this._children[name] = child
  }

  public compileElement(template: string, data: Data & Events) {
    const fragment = document.createElement('template')
    const compiledTemplate = compile(template)(data)
    fragment.innerHTML = compiledTemplate
    this._element = fragment.content.firstElementChild
  }

  public mount(events: Events | null) {
    if (!this._parentElement || !this._element) return
    this._manageEvents(events, EManageEventsType.REMOVE)
    this._parentElement.appendChild(this._element)
    this._manageEvents(events, EManageEventsType.ADD)
  }
}
