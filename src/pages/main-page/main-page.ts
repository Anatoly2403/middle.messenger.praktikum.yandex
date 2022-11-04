import { Contact } from '../../components/contact';
import { Link } from '../../ui-kit/link';
import { SearchInput } from '../../ui-kit/search-input';
import { Component, prepareComponent } from '../../core/base/component';
import './main-page.scss';
import { Chat } from '../../components/chat';

const template = `
  <div class="root">
    <div class="contact-block">
      <div class="contact-block__header">
        <div class="contact-block__header-link">
          {{{ link href="./profile" label="Профиль" }}}
        </div>
        <div>
          {{{ search-input onChange=helpers.searchInputHandler }}}
        </div>
      </div>
      <div class="contact-block__list">
        {{{ contact key=0 }}}
        {{{ contact key=1 }}}
        {{{ contact key=2 }}}
        {{{ contact key=3 }}}
        {{{ contact key=4 }}}
        {{{ contact key=5 }}}
        {{{ contact key=6 }}}
        {{{ contact key=7 }}}
        {{{ contact key=8 }}}
        {{{ contact key=9 }}}
        {{{ contact key=10 }}}
        {{{ contact key=11 }}}
        {{{ contact key=12 }}}
      </div>
    </div>  
    <div class="message-block">
      {{{ chat }}}
    </div>    
  </div>
`;

function searchInputHandler(this: Component, searchValue: string) {
  // eslint-disable-next-line no-console
  console.log(searchValue);
}

export const MainPage = prepareComponent({
  name: 'main-page',
  template,
  children: [Link, SearchInput, Contact, Chat],
  helpers: { searchInputHandler },
});
