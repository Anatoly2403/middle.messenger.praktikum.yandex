import { Component } from '../component/Component'

export interface IClassComponent {
  new (...args: any[]): Component
}

export type ISimpleObject = Record<string | symbol, unknown>

export enum EEvents {
  INIT = 'INIT',
  COMPILE = 'COMPILE',
  MOUNT = 'COMPONENT_DID_MOUNT',
  UPDATE = 'COMPONENT_DID_UPDATE',
}

export enum EManageEventsType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}
