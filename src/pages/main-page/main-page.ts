import { Component, prepareComponent } from '../../core/component';
import './main-page.scss';
import { Chats } from '../../components/chats';
import { SearchInput } from '../../ui-kit/search-input';
import { Chat } from '../../components/chat';
import { chatsService } from '../../services/chats-service';
import { ISimpleObject } from '../../core/models';
import { userService } from '../../services/user-service';
import { debounce } from '../../core/utils';
import { messageService } from '../../services/message-service/message-service';
import { Link } from '../../core/router/components/link';
import { Modal } from '../../components/modal/modal';

type TMainPageState = {
  showModal: boolean;
  modalData: TModalData;
};

type TModalData = typeof createChatModalData;

const createChatModalData = {
  id: 'createChat',
  title: 'Добавить чат',
  fields: [{ type: 'inputField', name: 'title', label: 'Название чата', validators: [(s: string) => !!s.length] }],
  submit: { type: 'submit', label: 'Создать' },
};

const state: TMainPageState = {
  showModal: false,
  modalData: createChatModalData,
};

const template = `
  
  <div class="main-page">
    {{#if state.showModal}}
      <div class="main-page__modal">
        {{{
          modal
            show=state.showModal
            hideModal=helpers.hideModal  
            formData=state.modalData         
            handleSubmit=helpers.handleModalSubmit  
        }}}
      </div>
    {{/if}}   
    <div class="contact-block">
      <div class="contact-block__header">
        <div class="contact-block__header-link">
          {{{ link href="/profile" label="Профиль" }}}
        </div>
        <div class="contact-block__header-panel">
          {{{ search-input onChange=helpers.searchInputHandler }}}
          <button class="contact-block__header-panel__add" data-event="[click:showModal]">+</button>
        </div>
      </div>
      {{{chats}}}
    </div>
    <div class="message-block">
      {{{chat}}}
    </div>    
  </div>
`;

export const MainPage = prepareComponent<ISimpleObject, TMainPageState>({
  name: 'main-page',
  template,
  state,
  componentDidMount,
  componentWillUnmount,
  children: [Link, SearchInput, Chats, Chat, Modal],
  helpers: { searchInputHandler, hideModal, handleModalSubmit },
  events: { showModal },
});

const searchChat = debounce<string>(chatsService.getAllChats, 300);

function searchInputHandler(this: Component, searchValue: string) {
  searchChat(searchValue);
}

function componentDidMount() {
  userService.getUserData();
  chatsService.getAllChats();
}

function componentWillUnmount() {
  messageService.disconnect();
}

function showModal(this: Component<ISimpleObject, TMainPageState>) {
  this.setState((state) => ({ ...state, showModal: true }));
}

function hideModal(this: Component<ISimpleObject, TMainPageState>) {
  this.setState((state) => ({ ...state, showModal: false }));
}

async function handleModalSubmit(
  this: Component<ISimpleObject, TMainPageState>,
  data: Record<string, string>,
  id: string,
) {
  if (id === 'createChat') {
    await chatsService.crateChat(data['title']);
    this.setState((state) => ({ ...state, showModal: false }));
  }
}
