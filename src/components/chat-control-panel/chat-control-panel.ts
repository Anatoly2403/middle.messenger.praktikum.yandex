import { Component, prepareComponent } from '../../core/component';
import { IChatUser } from '../../models';
import { chatsService } from '../../services/chats-service';
import { userService } from '../../services/user-service';
import { Button } from '../../ui-kit/button';
import { SearchInput } from '../../ui-kit/search-input';
import { ChatControlPanelUser } from './chat-control-panel-user';
import './chat-control-panel.scss';

type TChatControlPanelProps = {
  hide: () => void;
  removeChat: () => void;
  chatUsers: IChatUser[];
  foundUsers: IChatUser[];
};

const template = ` 
    <div class="chat-control-panel" data-event="[click:hideControlPanel]">
      <div class="chat-control-panel__inner">
        <div class="chat-control-panel__inner-header">
          <form class="chat-control-panel__inner-form" data-event="[submit:search]">
            <input class="chat-control-panel__inner-form-input" placeholder="Поиск"/>
            <button class="chat-control-panel__inner-form-btn">
              <div>&#9740;</div>
            </button>
          </form>
        </div>
        <div class="chat-control-panel__inner-content">
          <div class="chat-control-panel__inner-content-users">
            {{#if props.foundUsers}}
              {{#each props.foundUsers}}
                {{{
                  chat-control-panel-user
                    key=@index
                    id=id 
                    avatar=avatar
                    display_name=display_name
                    role=role 
                    type="add"
                    handleButtonClick=../helpers.addUser
                    
                }}}
              {{/each}}
            {{else}}
              {{#each props.chatUsers}}
                {{{
                  chat-control-panel-user
                    key=@index
                    id=id 
                    avatar=avatar
                    display_name=display_name
                    role=role
                    type="remove"
                    handleButtonClick=../helpers.removeUser
                }}}
              {{/each}}
            {{/if}}  
          </div>
          <div class="chat-control-panel__inner-content-footer">
            {{{button key=0 label="Удалить чат" onClick=helpers.removeChat}}}
          </div>
        </div>
      </div>
    </div>
`;

export const ChatControlPanel = prepareComponent<TChatControlPanelProps>({
  name: 'chat-control-panel',
  template,
  children: [SearchInput, Button, ChatControlPanelUser],
  events: { hideControlPanel, search },
  helpers: { removeChat, removeUser, addUser },
});

function removeChat(this: Component<TChatControlPanelProps>) {
  if (this.props.removeChat) {
    userService.removeFoundUsers();
    this.props.removeChat();
  }
}

function hideControlPanel(this: Component<TChatControlPanelProps, TChatControlPanelProps>, e: Event) {
  const elem = e.target as Element;
  const className = elem.className;
  if (className === 'chat-control-panel' && this.props.hide) {
    userService.removeFoundUsers();
    this.props.hide();
  }
}

function search(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLElement;
  const input = form.querySelector('input');
  if (!input || !input.value) return;
  userService.getUserByLogin(input.value);
  input.value = '';
}

function removeUser(id: number) {
  chatsService.removeUserFromChat(id);
}
function addUser(id: number) {
  chatsService.addUserToChat(id);
}
