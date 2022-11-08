import { TDataObserverProps } from '../../dataObservable';
import { AnyType, ISimpleObject } from '../../models';
import { prepareComponent } from '../Component';

export type TPreComponent = ReturnType<typeof prepareComponent<AnyType>>;

export type TComponentProps<TProps> = {
  id: string,
  config: TConfig,
  props?: TProps
}

export type TConfig<TProps extends ISimpleObject = ISimpleObject, TState extends ISimpleObject = ISimpleObject> = {
  name: string;
  template: string;
  state?: TState,
  events?: TEvents;
  helpers?: THelpers;
  children?: TPreComponent[];
  componentDidMount?: (props: TDataObserverProps<TProps>) => void
  componentDidUpdate?: (props: TDataObserverProps<TProps>) => void
};

export type TEvents = Record<string, EventListener>;

export type THelpers = Record<string, (...arg: AnyType[]) => AnyType>;

export type TElementControllerProps = {
  id: string;
  hbsTmp: string;
  events?: TEvents;
  helpers?: THelpers;
};


