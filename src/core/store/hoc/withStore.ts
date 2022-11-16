import { TPreComponent } from './../../component/models/types';

export function withStore<TProps>(preComponent: TPreComponent) {
  return function (props: TProps) {
    const component = preComponent(props);

    return component;
  };
}
