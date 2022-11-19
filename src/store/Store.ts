import { TPreComponent } from '../core/component/models';
import { ISimpleObject } from '../core/models';
import { IUserData, IChat } from '../models';
import { createStore } from './../core/store';

interface TState {
  user: IUserData | null;
  isLoading: boolean;
  chats: IChat;
}

export type TStore = typeof store;

export const store = createStore<TState>({
  isLoading: false,
  user: null,
  chats: {
    items: [],
    active: undefined,
  },
});

export function withStore<
  TProps extends ISimpleObject = ISimpleObject,
  TPropsFromStore extends ISimpleObject = ISimpleObject
>(preComponent: TPreComponent, mapStateToProps?: (state: TState) => TPropsFromStore) {
  innerWithStore.prototype['name'] = preComponent.prototype.name;
  innerWithStore.prototype['id'] = preComponent.prototype.id;

  function innerWithStore(props: TProps) {
    const component = preComponent(props);
    const state = store.getState();

    component.setProps(state);

    const unsubscribe = store.subscribe(({ data }) => {
      if (!mapStateToProps) {
        return component.setProps(data);
      }
      const mappedProps = mapStateToProps(data);
      component.setProps(mappedProps);
    });

    component.setUnsubscribe(unsubscribe);
    return component;
  }

  return innerWithStore;
}
