import './profile-page.scss';
import { withStore } from './../../store/Store';
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
import { userService } from '../../services/user-service';

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
          {{{ avatar avatarSrc=props.user.avatar avatarClick=helpers.avatarClick}}}
        </div>
        <div class="profile-page__user-data">                
          {{{ text-field key=0 name="mail" label="Почта" value=props.user.email }}}          
          {{{ text-field key=1 name="login" label="Логин" value=props.user.login }}}          
          {{{ text-field key=2 name="name" label="Имя" value=props.user.first_name }}}          
          {{{ text-field key=3 name="lastName" label="Фамилия" value=props.user.second_name }}}          
          {{{ text-field key=4 name="phoneNumber" label="Телефон" value=props.user.phone }}}    
        </div>
        <div class="profile-page__control">
          {{{ text-button key=0 name="changeData" label="Изменить данные" onTextBtnClick=helpers.changeUserData }}}
          {{{ text-button key=1 name="logout" label="Выйти" type="danger" onTextBtnClick=helpers.logout }}}
        </div>
      </div>
    </div>
  `;

function avatarClick(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, modal: { name: 'avatar', show: true, formData: avatarFormMeta } }));
}

function changeUserData(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, modal: { name: 'formData', show: true, formData: userDataFormMeta } }));
}

function hideModal(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, modal: { show: false, formData: undefined, name: undefined } }));
}

async function saveData(this: Component<ISimpleObject, TProfilePageState>, data: TAvatarData | TUserData) {
  if (isAvatarData(data)) {
    const avatar = await parseImg(data.avatar);
    console.log({ avatar: avatar });
  } else {
    this.setState((state) => ({
      ...state,
      modal: { ...state.modal, show: false },
    }));
    console.log(data);
  }
}

function componentDidMount() {
  userService.getUserData();
}

export const ProfilePage = withStore(
  prepareComponent<ISimpleObject, TProfilePageState>({
    name: 'profile-page',
    template,
    componentDidMount,
    children: [Form, ArrowButton, Avatar, TextField, TextButton, Modal],
    helpers: {
      arrowBtnClick: () => redirect('/'),
      logout: () => userService.logout(),
      avatarClick,
      changeUserData,
      hideModal,
      saveData,
    },
    state: { modal: { show: false } },
  }),
);
