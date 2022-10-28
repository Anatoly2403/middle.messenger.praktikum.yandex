import { AnyType } from '../../shared/models';
import { Component, createComponent } from '../component/Component';

export interface IClassComponent {
  new (...args: AnyType[]): Component<AnyType>;
}

export type TEvents = Record<string, (e: Event) => void>;

export type ISimpleObject = Record<string | symbol | number, AnyType>;

export type TDataObserverProps<TData> = {
  data: TData;
  prevData: TData;
};

export type TElementControllerProps = {
  id: string;
  hbsTmp: string;
  events?: TEvents;
};

export type TPreComponent = ReturnType<typeof createComponent<AnyType>>;

export type TConfig<TState extends ISimpleObject = ISimpleObject> = {
  name: string;
  template: string;
  state?: TState;
  events?: TEvents;
  children?: TPreComponent[];
};

export enum EEvents {
  INIT = 'INIT',
  COMPILE = 'COMPILE',
  MOUNT = 'COMPONENT_DID_MOUNT',
  UPDATE = 'COMPONENT_DID_UPDATE',
}
