import { Component } from '../Component'
import { Component2 } from '../Component2'
import { EventsController } from '../EventsController'

export function Ev(
  target: Component2,
  propKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
) {
  target.setEvent(propKey, descriptor.value)
}
