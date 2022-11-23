import { BASE_URL } from '../../api/constants';
import { Component, prepareComponent } from '../../core/component';
import { Button } from '../../ui-kit/button';
import { SearchInput } from '../../ui-kit/search-input';

type TChatControlPanelUserProps = {
  id: number;
  avatar: string | null;
  display_name: string;
  role: string;
  type: string;
  handleButtonClick: (id: number) => void;
};

const template = `
  <div class="chat-control-panel__user">
    <div class="chat-control-panel__user-data">
      <div class="chat-control-panel__user-avatar">
        {{#if props.avatar}}
          <img src="${BASE_URL}/resources/{{props.avatar}}" alt="contact avatar" />
        {{/if}}
      </div>                
      <span class="chats-item__data-name">{{props.display_name}}</span>
    </div>
    {{#if_eq props.role 'admin'}}
    {{else}} 
      {{#if_eq props.type 'remove'}}               
        <button 
          class="chat-control-panel__btn chat-control-panel__btn_remove"
          data-event="[click:removeUser]"
        >Удалить</button>
      {{else}}
        <button 
          class="chat-control-panel__btn chat-control-panel__btn_add"
          data-event="[click:addUser]"
        >Добавить</button>
      {{/if_eq}}
    {{/if_eq}}
  </div>
`;

export const ChatControlPanelUser = prepareComponent<TChatControlPanelUserProps>({
  name: 'chat-control-panel-user',
  template,
  children: [SearchInput, Button],
  events: { removeUser, addUser },
});

function removeUser(this: Component<TChatControlPanelUserProps>) {
  if (this.props.handleButtonClick) this.props.handleButtonClick(this.props.id);
}
function addUser(this: Component<TChatControlPanelUserProps>) {
  if (this.props.handleButtonClick) this.props.handleButtonClick(this.props.id);
}
