import { Component, prepareComponent } from '../../core/component';
import './main-page.scss';
import { Chats } from '../../components/chats';
import { Link } from '../../core/router/components/link';
import { SearchInput } from '../../ui-kit/search-input';
import { Chat } from '../../components/chat';
import { chatsService } from '../../services/chats-service';
import { debounce } from '../../core/component/utils';
import { ActionMenu } from '../../components/action-menu';
import { ISimpleObject } from '../../core/models';
import { redirect } from '../../core/router';

type TChatState = typeof state;

const state = {
  menuItems: [
    { name: 'profile', value: 'Перейти в профиль' },
    { name: 'add', value: 'Добавить чат' },
    { name: 'remove', value: 'Удалить чат' },
  ],
};

const template = `
  <div class="main-page">    
    <div class="contact-block">
      <div class="contact-block__header">
        {{{ search-input onChange=helpers.searchInputHandler }}}
        {{{ action-menu menuItems=state.menuItems handler=helpers.handleMenuActions }}}    
      </div>
      {{{chats}}}
    </div>
    <div class="message-block">    
      {{{chat}}}
    </div>
  </div>
`;

export const MainPage = prepareComponent<ISimpleObject, TChatState>({
  name: 'main-page',
  state,
  template,
  componentDidMount: () => chatsService.getAllChats(),
  children: [Link, SearchInput, Chats, Chat, ActionMenu],
  helpers: { searchInputHandler, handleMenuActions },
});

const searchChat = debounce<string>(chatsService.getAllChats, 300);

function searchInputHandler(this: Component, searchValue: string) {
  searchChat(searchValue);
}

function handleMenuActions(actionName: string | null) {
  if (actionName === 'profile') {
    redirect('/profile');
  }
  if (actionName === 'add') {
    console.log('add');
  }
  if (actionName === 'remove') {
    console.log('remove');
  }
}
