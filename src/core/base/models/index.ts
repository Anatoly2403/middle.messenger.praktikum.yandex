import { AnyType } from '../../shared/models';
import { prepareComponent } from '../component/Component';

export type TEvents = Record<string, EventListener>;

export type THelpers = Record<string, (...arg: AnyType[]) => AnyType>;

export type ISimpleObject = Record<string | symbol | number, AnyType>;

export type TDataObserverProps<TData> = {
  data: TData;
  prevData: TData;
};

export type TElementControllerProps = {
  id: string;
  hbsTmp: string;
  events?: TEvents;
  helpers?: THelpers;
};

export type TPreComponent = ReturnType<typeof prepareComponent<AnyType>>;

export type TConfig<TProps extends ISimpleObject = ISimpleObject> = {
  name: string;
  template: string;
  events?: TEvents;
  helpers?: THelpers;
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