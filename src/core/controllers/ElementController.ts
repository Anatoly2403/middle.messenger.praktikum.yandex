import { compile } from 'handlebars'
import { Component } from '../component/Component'
import { EManageEventsType, ISimpleObject } from '../models'
import { parseEvent } from '../utils'
import { isEventHandler } from '../guards'

export class ElementController<
  TData extends ISimpleObject = ISimpleObject,
  TEvents extends ISimpleObject = ISimpleObject
> {
  private _id: string
  private _parentElement: Element | null = null
  private _element: Element | null = null
  private _children: Component[] = []

  constructor(id: string) {
    this._id = id
  }

  private _manageEvents(events: TEvents | null, type: EManageEventsType) {
    if (!this._parentElement || !events) return
    const nodeList = this._parentElement.querySelectorAll('[data-event]')
    nodeList.forEach((node) => {
      const { dataset } = (node as unknown) as HTMLOrSVGElement
      if (!dataset.event) return
      const eventsArray = parseEvent(dataset.event)
      eventsArray.forEach(({ name, event }) => {
        const handler = events[name]
        if (!isEventHandler(handler)) return
        if (type === EManageEventsType.ADD) {
          node.addEventListener(event, handler)
        } else {
          node.removeEventListener(event, handler)
        }
      })
    })
  }

  private setChild(child: Component) {
    this._children.push(child)
  }

  private _mountChildren(): void {
    if (!this._children.length || !this._parentElement) return
    this._parentElement.querySelectorAll('[data-child-id]').forEach((node) => {
      const { dataset } = (node as unknown) as HTMLOrSVGElement
      const child = this._children.find((child) => child.id === dataset.childId)
      const parent = node.parentElement
      if (!child || !parent) return
      child.setParentElement(parent)
      parent.removeChild(node)
      child.mount()
    })
  }

  private _compileElement(template: string, data: TData, events: TEvents) {
    const fragment = document.createElement('template')
    const compiledTemplate = compile(template)({
      data,
      events,
      setChild: this.setChild.bind(this),
    })
    fragment.innerHTML = compiledTemplate
    const elem = fragment.content.firstElementChild
    if (!elem) return
    elem.setAttribute('data-id', this._id)
    this._element = elem
  }

  private _mount() {
    if (!this._parentElement || !this._element) return
    const children = this._parentElement.childNodes
    const oldChild = Array.from(children).find((node) => {
      return ((node as unknown) as HTMLOrSVGElement).dataset?.id === this._id
    })
    if (oldChild) this._parentElement.replaceChild(this._element, oldChild)
    else this._parentElement.appendChild(this._element)
  }

  public setParentElement(elem: Element) {
    this._parentElement = elem
  }

  public build(params: { template: string; data: TData; events: TEvents }) {
    this._compileElement(params.template, params.data, params.events)
    this._manageEvents(params.events, EManageEventsType.REMOVE)
    this._mount()
    this._manageEvents(params.events, EManageEventsType.ADD)
    this._mountChildren()
  }
}
