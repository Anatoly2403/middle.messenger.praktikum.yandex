import { Component, prepareComponent } from '../../core/component';
import { showError } from '../../core/error';
import { IChatItem, IMessage } from '../../models';
import { chatsService } from '../../services/chats-service';
import { messageService } from '../../services/message-service/message-service';
import { TState, withStore } from '../../store';
import { ActionMenu } from '../action-menu';
import { MessageForm } from '../message-form';
import './chat.scss';

type TChatProps = {
  userId: number | null;
  activeChat: IChatItem | null;
  messages: IMessage[];
};

type TChatState = {
  menuItems: { name: string; value: string }[];
};

const state: TChatState = {
  menuItems: [
    { name: 'removeChat', value: 'Удалить чат' },
    { name: 'addUser', value: 'Добавить пользователя' },
    { name: 'removeUser', value: 'Удалить пользователя' },
  ],
};

const template = `
  {{#if props.activeChat}}
    <div class="chat">
      <div class="chat__header">
        <div class="chat__contact">
          <div class="chat__contact-avatar">
            {{#if props.activeChat.avatar}}
              <img 
                src="https://ya-praktikum.tech/api/v2/resources/{{props.activeChat.avatar}}"
                alt="contact avatar" />
            {{/if}}
          </div>
          <div class="chat__contact-name">{{props.activeChat.title}}</div>
        </div>
        <div class="chat__menu">
          {{{ action-menu menuItems=state.menuItems handler=helpers.handleMenuActions }}}
        </div>
      </div>
      <div class="chat__content">
        {{#each props.messages}}
          {{#if_eq ../props.userId user_id}}
            <div class="chat__message chat__message_out"><div>{{content}}</div></div>
          {{else}}
            <div class="chat__message chat__message_in"><div>{{content}}</div></div>
          {{/if_eq}}
        {{/each}}         
      </div>
      <div class="chat__footer">
        <div class="chat__footer-clip"></div>
        <div class="chat__footer-message"></div>
        {{{ message-form onSubmit=helpers.sendMessage }}}
      </div>
    </div>
  {{else}}
    <div class="chat_empty">Выберите чат чтобы отправить сообщение</div> 
  {{/if}}
`;
function mapStateToProps(state: TState) {
  return {
    userId: state.userId,
    activeChat: state.activeChat,
    messages: state.messages,
  };
}

export const Chat = withStore(
  prepareComponent<TChatProps, TChatState>({
    name: 'chat',
    template,
    state,
    children: [MessageForm, ActionMenu],
    helpers: { sendMessage, handleMenuActions },
  }),
  mapStateToProps,
);

function handleMenuActions(this: Component<TChatProps, TChatState>, actionName: string | null) {
  if (actionName === 'removeChat') {
    if (!this.props.activeChat?.id) {
      return showError('Выберите чат');
    }
    chatsService.removeChat(this.props.activeChat.id);
  }
  if (actionName === 'addUser') {
    if (!this.props.activeChat?.id) {
      return showError('Выберите чат');
    }
  }
  if (actionName === 'removeUser') {
    if (!this.props.activeChat?.id) {
      return showError('Выберите чат');
    }
  }
}

function sendMessage(message: string) {
  if (!message) return;
  messageService.sendMessage(message);
}
