import { prepareComponent } from '../../core/base/component';
import { IContact } from '../../models';
import { ActionMenu } from '../action-menu';
import './chat.scss';

// {{#if_eq message.type "in"}}chat__message_in{{else}}chat__message_out{{/if_eq}}

type TChatProps = {
  contact: IContact;
};

type TChatState = {
  menuItems: { name: string; value: string }[];
};

const state: TChatState = {
  menuItems: [
    { name: 'add', value: 'Добавить пользователя' },
    { name: 'remove', value: 'Удалить пользователя' },
  ],
};

function manageContact(actionName: string | null) {
  console.log({ actionName });
}

const template = `
  <div class="chat">
    <div class="chat__header">
      <div class="chat__contact">
        <div class="chat__contact-avatar">
          {{#if props.contact.avatar}}
            <img src={{props.contact.avatar}}/>
          {{/if}}
        </div>
        <div class="chat__contact-name">{{props.contact.name}}</div>
      </div>
      <div class="chat__menu">
        {{{ action-menu menuItems=state.menuItems handler=helpers.manageContact }}}
      </div>
    </div>
    <div class="chat__content">
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>      
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out"> 
        <div>Исходящее</div>
      </div>      
    </div>
    <div class="chat__footer"></div>
  </div>
`;

export const Chat = prepareComponent<TChatProps, TChatState>({
  name: 'chat',
  template,
  state,
  children: [ActionMenu],
  helpers: { manageContact },
});
