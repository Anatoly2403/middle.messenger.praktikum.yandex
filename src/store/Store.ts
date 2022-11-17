import { TPreComponent } from '../core/component/models';
import { ISimpleObject } from '../core/models';
import { IUserData } from '../models';
import { createStore } from './../core/store';

interface TState {
  user: IUserData | null;
}

export type TStore = typeof store;

export const store = createStore<TState>({
  user: null,
});

export function withStore<
  TProps extends ISimpleObject = ISimpleObject,
  TPropsFromStore extends ISimpleObject = ISimpleObject
>(preComponent: TPreComponent, mapStateToProps?: (state: TState) => TPropsFromStore) {
  return function (props: TProps) {
    const component = preComponent(props);
    const state = store.getState();
    component.setProps(state);

    const unsubscribe = store.subscribe(({ data }) => {
      if (mapStateToProps) {
        const mappedProps = mapStateToProps(data);
        component.setProps(mappedProps);
      } else {
        component.setProps(data);
      }
    });

    component.setUnsubscribe(unsubscribe);

    return component;
  };
}
