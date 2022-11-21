import { BASE_URL } from '../../api/constants';
import { Component, prepareComponent } from '../../core/component';
import { IChatItem, IMessage } from '../../models';
import { chatsService } from '../../services/chats-service';
import { messageService } from '../../services/message-service/message-service';
import { TState, withStore } from '../../store';
import { ActionMenu } from '../action-menu';
import { ChatControlPanel } from '../chat-control-panel';
import { MessageForm } from '../message-form';
import './chat.scss';

type TChatProps = {
  userId: number | null;
  activeChat: IChatItem | null;
  messages: IMessage[];
};

type TChatState = {
  showControlPanel: boolean;
};

const state: TChatState = {
  showControlPanel: false,
};

const template = `
  {{#if props.activeChat}}
    <div class="chat">
      <div class="chat__header">
        <div class="chat__contact">
          <div class="chat__contact-avatar">
            {{#if props.activeChat.avatar}}
              <img 
                src="${BASE_URL}/resources/{{props.activeChat.avatar}}"
                alt="contact avatar" />
            {{/if}}
          </div>
          <div class="chat__contact-name">{{props.activeChat.title}}</div>
        </div>
        <div class="chat__menu">
          <div class="chat__setting-btn" data-event="[click:showControlPanel]"></div>  
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
        <div class="chat__footer-message">
          {{{ message-form onSubmit=helpers.sendMessage }}}
        </div>  
      </div>   
      {{#if state.showControlPanel}}
        <div class="chat__control-panel">          
            {{{
              chat-control-panel             
                hide=helpers.hideControlPanel 
                removeChat=helpers.removeChat
                chatUsers=props.activeChatUsers
                foundUsers=props.foundUsers
            }}}
        </div>
      {{/if}}
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
    activeChatUsers: state.activeChatUsers,
    foundUsers: state.foundUsers,
  };
}

export const Chat = withStore(
  prepareComponent<TChatProps, TChatState>({
    name: 'chat',
    template,
    state,
    children: [MessageForm, ActionMenu, ChatControlPanel],
    events: { showControlPanel },
    helpers: { sendMessage, removeChat, hideControlPanel },
  }),
  mapStateToProps,
);

function removeChat(this: Component<TChatProps, TChatState>) {
  chatsService.removeChat();
  this.setState((state) => ({ ...state, showControlPanel: false }));
}

function sendMessage(message: string) {
  if (!message) return;
  messageService.sendMessage(message);
}

function showControlPanel(this: Component<TChatProps, TChatState>) {
  this.setState((state) => ({ ...state, showControlPanel: true }));
}

function hideControlPanel(this: Component<TChatProps, TChatState>) {
  this.setState((state) => ({ ...state, showControlPanel: false }));
}
