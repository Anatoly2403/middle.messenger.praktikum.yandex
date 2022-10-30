import { AnyType } from '../../shared/models';
import { Component, prepareComponent } from '../component/Component';

export interface IClassComponent {
  new (...args: AnyType[]): Component<AnyType>;
}

export type TEvents = Record<string, EventListener>;

export type ISimpleObject = Record<string | symbol | number, AnyType>;

export type TDataObserverProps<TData> = {
  data: TData;
  prevData: TData;
};

export type TElementControllerProps<THelpers extends ISimpleObject = ISimpleObject> = {
  id: string;
  hbsTmp: string;
  events?: TEvents;
  helpers?: THelpers;
  children?: TPreComponent[];
};

export type TChildProps = {
  name: string;
  props: ISimpleObject
}

export type TPreComponent = ReturnType<typeof prepareComponent<AnyType>>;

export type TConfig<
  TProps extends ISimpleObject = ISimpleObject,
  TStatic extends ISimpleObject = ISimpleObject,
> = {
  name: string;
  getTemplate: () => string;
  events?: TEvents;
  registerHelpers?: () => TStatic;
  children?: TPreComponent[];
  componentDidMount?: (props: TDataObserverProps<TProps>) => void
  componentDidUpdate?: (props: TDataObserverProps<TProps>) => void
};

export enum EEvents {
  INIT = 'INIT',
  COMPILE = 'COMPILE',
  MOUNT = 'COMPONENT_DID_MOUNT',
  UPDATE = 'COMPONENT_DID_UPDATE',
}

export enum EManageEventsAction {
  ADD = "ADD",
  REMOVE = "REMOVE"
}