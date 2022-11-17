import { Component, prepareComponent } from '../../core/component';
import './main-page.scss';
import { Contact } from '../../components/contact';
import { Link } from '../../core/router/components/link';
import { SearchInput } from '../../ui-kit/search-input';
import { Chat } from '../../components/chat';

import { ISimpleObject } from '../../core/models';

type TMainPageState = typeof state;

const template = `
  <div class="main-page">
    <div class="contact-block">
      <div class="contact-block__header">
        <div class="contact-block__header-link">
          {{{ link href="/profile" label="Профиль" }}}
        </div>
        <div>
          {{{ search-input onChange=helpers.searchInputHandler }}}
        </div>
      </div>
      <div class="contact-block__list">
        {{#each state.contacts}}   
          {{{ contact 
                key=@index 
                id=id
                name=name
                avatar=avatar
                lastName=lastName
                phone=phone
                messages=messages
                onClickContact=../helpers.onClickContact
                isActive=isActive
          }}}
        {{/each}} 
      </div>
    </div>  
    <div class="message-block">
      {{{ chat }}}
    </div>    
  </div>
`;

const state = {
  contacts: [],
};

function onClickContact(this: Component<ISimpleObject, TMainPageState>, id: string) {
  // eslint-disable-next-line no-console
  console.log(id);
}

function searchInputHandler(this: Component<ISimpleObject, TMainPageState>, searchValue: string) {
  // eslint-disable-next-line no-console
  console.log(searchValue);
  this.setState((state) => ({
    ...state,
    contacts: [],
  }));
}

export const MainPage = prepareComponent<ISimpleObject, TMainPageState>({
  name: 'main-page',
  template,
  state,
  children: [Link, SearchInput, Contact, Chat],
  helpers: { searchInputHandler, onClickContact },
});
