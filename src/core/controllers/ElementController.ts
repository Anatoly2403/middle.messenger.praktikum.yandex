import { compile } from 'handlebars'
import { Component } from '../Component'
import { EManageEventsType, ISimpleObject } from '../models'
import { isEventHandler, parseEvent } from '../utils'
import { v4 as makeUUID } from 'uuid'

export class ElementController<
  Data extends ISimpleObject = ISimpleObject,
  Events extends ISimpleObject = ISimpleObject
> {
  static readonly id: string = makeUUID()
  private _parentElement: Element | null = null
  private _element: Element | null = null
  private _children: Record<string, Component> = {}

  private _manageEvents(events: Events | null, type: EManageEventsType) {
    if (!this._parentElement || !events) return
    const nodeList = this._parentElement.querySelectorAll('[data-event]')
    nodeList.forEach((node) => {
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

  private _compileElement(template: string, data: Data & Events) {
    const fragment = document.createElement('template')
    const compiledTemplate = compile(template)(data)
    fragment.innerHTML = compiledTemplate
    const elem = fragment.content.firstElementChild
    if (!elem) return
    elem.setAttribute('data-id', ElementController.id)
    this._element = elem
  }

  private _mount() {
    if (!this._parentElement || !this._element) return
    const children = this._parentElement.childNodes
    if (!!children.length) {
      const oldChild = Array.from(children).find(
        (node) =>
          ((node as unknown) as HTMLOrSVGElement).dataset.id ===
          ElementController.id,
      )
      if (oldChild) this._parentElement.replaceChild(this._element, oldChild)
    } else {
      this._parentElement.appendChild(this._element)
    }
  }

  public setParentElement(elem: Element) {
    if (this._parentElement) return
    this._parentElement = elem
  }

  public setChild(name: string, child: Component) {
    this._children[name] = child
  }

  public build(params: { template: string; data: Data; events: Events }) {
    this._compileElement(params.template, { ...params.data, ...params.events })
    this._manageEvents(params.events, EManageEventsType.REMOVE)
    this._mount()
    this._manageEvents(params.events, EManageEventsType.ADD)
  }
}
