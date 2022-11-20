import { TPreComponent } from '../core/component/models';
import { ISimpleObject } from '../core/models';
import { IUserData, IChatItem, IMessage, IChatUser } from '../models';
import { createStore } from './../core/store';

export interface TState {
  userId: null | number;
  user: IUserData | null;
  chats: IChatItem[];
  activeChatToken: string | null;
  activeChat: IChatItem | null;
  activeChatUsers: IChatUser[];
  messages: IMessage[];
  foundUsers: IChatUser[];
}

export type TStore = typeof store;

export const store = createStore<TState>({
  userId: null,
  user: null,
  chats: [],
  activeChatToken: null,
  activeChat: null,
  messages: [],
  activeChatUsers: [],
  foundUsers: [],
});

export function withStore<
  TProps extends ISimpleObject = ISimpleObject,
  TPropsFromStore extends ISimpleObject = ISimpleObject
>(preComponent: TPreComponent, mapStateToProps?: (state: TState) => TPropsFromStore) {
  innerWithStore.prototype['name'] = preComponent.prototype.name;
  innerWithStore.prototype['id'] = preComponent.prototype.id;

  function innerWithStore(props: TProps) {
    const component = preComponent({ ...props });
    const state = mapStateToProps ? mapStateToProps(store.getState()) : store.getState();

    component.setProps({ ...state });

    const unsubscribe = store.subscribe(({ data }) => {
      if (!mapStateToProps) {
        return component.setProps({ ...data });
      }
      const mappedProps = mapStateToProps(data);
      component.setProps(mappedProps);
    });

    component.setUnsubscribe(unsubscribe);
    return component;
  }

  return innerWithStore;
}
