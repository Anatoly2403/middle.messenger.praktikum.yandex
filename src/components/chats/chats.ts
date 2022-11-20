import { Component, prepareComponent } from '../../core/component';
import { IChatItem } from '../../models';
import { chatsService } from '../../services/chats-service';
import { messageService } from '../../services/message-service/message-service';
import { TState, withStore } from '../../store';
import { ChatsItem } from '../chats-item';
import './chats.scss';

type TChatsProps = {
  chats: IChatItem[];
  activeChat: IChatItem;
};

const template = `
  <div class="chats-wrapper">
    {{#each props.chats}}
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
          active=../props.activeChat.id
      }}}
    {{/each}}
  </div>
`;

function mapStateToProps(state: TState) {
  return {
    chats: state.chats,
    activeChat: state.activeChat,
  };
}

export const Chats = withStore(
  prepareComponent<TChatsProps>({
    name: 'chats',
    template,
    children: [ChatsItem],
    helpers: {
      async handleChatItem(this: Component<TChatsProps>, id: number) {
        if (this.props.activeChat?.id === id) return;
        await chatsService.getToken(id);
        await chatsService.setActiveChat(id);
        messageService.init();
        chatsService.getAllChats();
      },
    },
  }),
  mapStateToProps,
);
