import { Component, prepareComponent } from '../../core/component';
import { IChatItem } from '../../models';
import './chats-item.scss';

type TChatsItemProps = IChatItem & {
  handleChatItem: (id: number) => void;
  active?: number;
};

const template = `
      <div
        class="chats-item {{#if_eq props.active props.id}}chats-item_active{{/if_eq}}"  
        data-event="[click:onClick]"
      > 
        <div class="chats-item__avatar">
          {{#if props.avatar}}
            <img src="https://ya-praktikum.tech/api/v2/resources/{{props.avatar}}" alt="contact avatar" />
          {{/if}}
        </div>
        <div class="chats-item__data">
          <span class="chats-item__data-name">{{props.title}}</span>
          <span class="chats-item__data-message">{{props.last_message}}</span>
        </div>
        <div class="chats-item__info">          
          {{#time props.created_by}}
            <time class="chats-item__info-time">{{date}}</time>
          {{/time}}
          {{#if unread_count}}
            <span class="chats-item__info-count">{{props.unread_count}}</span>
          {{/if}}
        </div>
      </div>
`;

export const ChatsItem = prepareComponent<TChatsItemProps>({
  name: 'chats-item',
  template,
  events: {
    onClick(this: Component<TChatsItemProps>) {
      if (this.props.handleChatItem) this.props.handleChatItem(this.props.id);
    },
  },
});
