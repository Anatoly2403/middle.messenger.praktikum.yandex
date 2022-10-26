import { AnyType } from '../../shared/models';
import { Component } from '../component/Component';

export interface IClassComponent {
  new (...args: AnyType[]): Component<AnyType>;
}

export type ISimpleObject = Record<string | symbol, AnyType>;

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
