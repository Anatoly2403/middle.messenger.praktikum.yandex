import { Component } from '../Component'

export interface ISimpleObject {
  [key: string | symbol]: unknown
}
export interface IClassComponent {
  new (...args: ISimpleObject[]): Component
}
