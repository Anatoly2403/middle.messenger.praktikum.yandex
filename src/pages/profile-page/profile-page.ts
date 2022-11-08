import './profile-page.scss';
import avatarSrc from '../../assets/icons/defaultAvatar.svg';
import { Form } from '../../components/form/form';
import { parseImg } from '../../utils';
import { ArrowButton } from '../../ui-kit/arrow-button';
import { Avatar } from '../../components/avatar';
import { TextField } from '../../ui-kit/text-field/text-field';
import { TextButton } from '../../ui-kit/text-button/text-button';
import { Modal } from '../../components/modal/modal';
import { isAvatarData, TAvatarData, TProfilePageState, TUserData } from './types';
import { avatarFormMeta, userDataFormMeta } from './constants';
import { redirect } from '../../core/router';
import { Component, prepareComponent } from '../../core/component';
import { ISimpleObject } from '../../core/models';

const template = `
    <div class="profile-page">
      {{#if state.modal.show}}  
        {{{
          modal
            show=state.modal.show
            hideModal=helpers.hideModal
            saveData=helpers.saveData
            formData=state.modal.formData
        }}}    
      {{/if}}    
      <div class="profile-page__block_left">
        {{{ arrow-button onClick=helpers.arrowBtnClick}}}
      </div>
      <div class="profile-page__block_right">
        <div class="profile-page__avatar">
          {{{ avatar avatarSrc=state.avatar.src avatarClick=helpers.avatarClick}}}
        </div>
        <div class="profile-page__user-data">
          <div class="profile-page__main-info-wrapper">     
            {{#each state.info}}
              {{{ text-field key=@index name=name label=label value=value }}}   
            {{/each}}                   
          </div>
        </div>
        <div class="profile-page__control">
          <div class="profile-page__main-btns-wrapper"></div>
            {{#each state.buttons}}           
              {{{ 
                text-button 
                  key=@index 
                  name=name  
                  label=label 
                  type=type 
                  onTextBtnClick=../helpers.textButtonClick
              }}}   
            {{/each}} 
          </div>
        </div>
      </div>
    </div>
  `;

function arrowBtnClick() {
  redirect('/');
}

function avatarClick(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, modal: { name: 'avatar', show: true, formData: avatarFormMeta } }));
}

function textButtonClick(this: Component<ISimpleObject, TProfilePageState>, name: string) {
  if (name === 'changeData') {
    this.setState((state) => ({ ...state, modal: { name: 'formData', show: true, formData: userDataFormMeta } }));
  } else {
    redirect('/login');
  }
}

function hideModal(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, modal: { show: false, formData: undefined, name: undefined } }));
}

async function saveData(this: Component<ISimpleObject, TProfilePageState>, data: TAvatarData | TUserData) {
  if (isAvatarData(data)) {
    const avatar = await parseImg(data.avatar);
    this.setState((state) => ({
      ...state,
      avatar: { src: avatar },
      modal: { ...state.modal, show: false },
    }));
    // eslint-disable-next-line no-console
    console.log({ avatar: avatar });
  } else {
    this.setState((state) => ({
      ...state,
      info: state.info.map((item) => ({ ...item, value: data[item.name] })),
      modal: { ...state.modal, show: false },
    }));
    // eslint-disable-next-line no-console
    console.log(data);
  }
}

export const ProfilePage = prepareComponent<ISimpleObject, TProfilePageState>({
  name: 'profile-page',
  template,
  children: [Form, ArrowButton, Avatar, TextField, TextButton, Modal],
  helpers: { arrowBtnClick, avatarClick, textButtonClick, hideModal, saveData },
  state: {
    info: [
      { name: 'mail', label: 'Почта', value: '' },
      { name: 'login', label: 'Логин', value: '' },
      { name: 'name', label: 'Имя', value: '' },
      { name: 'lastName', label: 'Фамилия', value: '' },
      { name: 'phoneNumber', label: 'Телефон', value: '' },
      { name: 'password', label: 'Пароль', value: '' },
    ],
    avatar: {
      src: avatarSrc,
    },
    buttons: [
      { name: 'changeData', label: 'Изменить данные' },
      { name: 'logout', label: 'Выйти', type: 'danger' },
    ],
    modal: {
      show: false,
    },
  },
});
