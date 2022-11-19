import { Component, prepareComponent } from '../../core/component';
import { IChat } from '../../models';
import { chatsService } from '../../services/chats-service';
import { withStore } from '../../store';
import { ChatsItem } from '../chats-item';
import './chats.scss';

type TChatsProps = {
  chats: IChat;
};

const template = `
  <div class="chats-wrapper">
    {{#each props.chats.items}}
      {{{
        chats-item
          key=@index
          id=id
          title=title
          avatar=avatar
          unread_count=unread_count
          last_message=last_message
          created_by=created_by
          handleChatItem=../helpers.handleChatItem
          active=../props.chats.active
      }}}
    {{/each}}
  </div>
`;

export const Chats = withStore(
  prepareComponent<TChatsProps>({
    name: 'chats',
    template,
    children: [ChatsItem],
    helpers: {
      handleChatItem(this: Component<TChatsProps>, id: number) {
        if (this.props.chats.active === id) return;
        chatsService.setActiveChat(id);
      },
    },
  }),
);
