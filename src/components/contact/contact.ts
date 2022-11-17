import { Component, prepareComponent } from '../../core/component';
import { AnyType } from './../../core/models/index';
import { TDataObserverProps } from '../../core/dataObservable';
// import { inCurrentMonth, isToday } from '../../utils';
import './contact.scss';

type TContactProps = {
  id: string;
  name: string;
  avatar?: string;
  lastName: string;
  phone: string;
  messages: AnyType[];
  onClickContact: (id: string) => void;
  isActive?: boolean;
};

type TContactState = {
  lastMessageContent: string;
  lastMessageTime: string;
  unreadMessagesCount?: number;
};

const template = `
  <div 
    class="contact-item {{#if props.isActive}}contact-item_active{{/if}}" 
    data-event="[click:onClick]"
  >
    <div class="contact-item__avatar">
      {{#if props.avatar}}
        <img href={{props.avatar}} alt="contact avatar" />
      {{/if}}
    </div>
    <div class="contact-item__data">
      <span class="contact-item__data-name">{{props.name}}</span>
      <span class="contact-item__data-message">{{state.lastMessageContent}}</span>
    </div>
    <div class="contact-item__info">
      <time class="contact-item__info-time">{{state.lastMessageTime}}</time>
      {{#if state.unreadMessagesCount}}
        <span class="contact-item__info-count">{{state.unreadMessagesCount}}</span>
      {{/if}}
    </div>  
  </div>
`;

// function getLastMessageContent(message: AnyType) {
//   return message?.content;
// }

// function getUnreadMessageCount(messages: AnyType[]) {
//   // const unreadMessages = messages.filter((message) => message.status === EMessageStatus.UNREAD);
//   // return unreadMessages.length;
//   console.log(messages);
// }

// function getMessageTime(message: AnyType) {
//   const messageTime = message.createdAt;

//   if (isToday(messageTime)) {
//     return `${messageTime.getHours()}:${messageTime.getMinutes()}`;
//   }
//   if (inCurrentMonth(messageTime)) {
//     return `${messageTime.getDate()}.${messageTime.getMonth() + 1}`;
//   }
//   return `${messageTime.getMonth() + 1}.${messageTime.getFullYear()}`;
// }

// function getDataForRender(props: TContactProps) {
//   const lastMessage = props.messages[props.messages.length - 1];
//   return {
//     lastMessageContent: lastMessage ? getLastMessageContent(lastMessage) : '',
//     lastMessageTime: lastMessage ? getMessageTime(lastMessage) : '',
//     unreadMessagesCount: lastMessage ? getUnreadMessageCount(props.messages) : undefined,
//   };
// }

function componentDidMount(this: Component<TContactProps, TContactState>, props: TDataObserverProps<TContactProps>) {
  if (props.data.messages.length) {
    // this.setState({ ...getDataForRender(props.data) });
  }
}

export const Contact = prepareComponent<TContactProps, TContactState>({
  name: 'contact',
  template,
  state: {
    lastMessageContent: '',
    lastMessageTime: '',
    unreadMessagesCount: undefined,
  },
  componentDidMount,
  events: {
    onClick(this: Component<TContactProps, TContactState>) {
      if (this.props.onClickContact) {
        this.props.onClickContact(this.props.id);
      }
    },
  },
});
