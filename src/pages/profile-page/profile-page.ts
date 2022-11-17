import './profile-page.scss';
import { validatePassword, validateEmail, validateName, validatePhone, validateLogin } from './../../utils';
import { withStore } from './../../store/Store';
import { ArrowButton } from '../../ui-kit/arrow-button';
import { Avatar } from '../../components/avatar';
import { TextField } from '../../ui-kit/text-field/text-field';
import { TextButton } from '../../ui-kit/text-button/text-button';
import { Modal } from '../../components/modal/modal';
import { TAvatarData, TProfilePageState } from './types';
import { avatarFormMeta } from './constants';
import { redirect } from '../../core/router';
import { Component, prepareComponent } from '../../core/component';
import { ISimpleObject } from '../../core/models';
import { userService } from '../../services/user-service';
import { Button } from '../../ui-kit/button';
import { showError } from '../../core/error';
import { IProfileData, IPasswordData } from '../../models';

const template = `
    <div class="profile-page">
      {{#if state.showModal}}  
        {{{
          modal
            show=state.showModal
            hideModal=helpers.hideModal
            saveData=helpers.saveData
            formData=state.modalFormData
        }}}    
      {{/if}}    
      <div class="profile-page__block_left">
        {{{arrow-button onClick=helpers.arrowBtnClick}}}
      </div>
      <div class="profile-page__block_right">
        <div class="profile-page__avatar">
          {{{avatar avatarSrc=props.user.avatar avatarClick=helpers.avatarClick}}}
        </div>  
        <form class="profile-page__user-data" data-event="[submit:onSubmitData]"> 
          {{#if state.changePassword}}
            {{{
              text-field 
                key="oldPassword" 
                disabled=state.changePassword
                name="oldPassword" 
                label="Старый пароль" 
                value=''
            }}}
            {{{
              text-field 
                key="newPassword" 
                disabled=state.changePassword
                name="newPassword" 
                label="Новый пароль" 
                value=''}}}
          {{else}}
            {{{
              text-field 
                key="email"
                disabled=state.changeData
                name="email"
                label="Почта"
                value=props.user.email
              }}}
            {{{
              text-field 
                key="login"
                disabled=state.changeData
                name="login"
                label="Логин"
                value=props.user.login
              }}}
            {{{
              text-field 
                key="first_name"
                disabled=state.changeData
                name="first_name"
                label="Имя"
                value=props.user.first_name
              }}}
            {{{
              text-field 
                key="second_name"
                disabled=state.changeData
                name="second_name"
                label="Фамилия"
                value=props.user.second_name
              }}}
            {{{
              text-field 
                key="display_name"
                disabled=state.changeData
                name="display_name"
                label="Имя в чате"
                value=props.user.display_name
              }}}
            {{{
              text-field 
                key="phone"
                disabled=state.changeData
                name="phone"
                label="Телефон"
                value=props.user.phone
              }}}
          {{/if}}
          {{#if_or state.changePassword state.changeData}}         
            <div class="profile-page__user-data-submit">
              {{{button type="submit" label="Сохранить"}}}
            </div>       
          {{/if_or}}
        </form>  
        <div class="profile-page__control">
        {{#if_and-not state.changePassword state.changeData}}
          {{{text-button key=0 name="changeData" label="Изменить данные" onTextBtnClick=helpers.changeData}}}
          {{{text-button key=1 name="changePassword" label="Изменить пароль" onTextBtnClick=helpers.changePassword}}}
          {{{text-button key=2 name="logout" label="Выйти" type="danger" onTextBtnClick=helpers.logout}}}
        {{/if_and-not}} 
        </div>
      </div>
    </div>
  `;

export const ProfilePage = withStore(
  prepareComponent<ISimpleObject, TProfilePageState>({
    name: 'profile-page',
    template,
    componentDidMount: () => userService.getUserData(),
    children: [ArrowButton, Avatar, TextField, TextButton, Modal, Button],
    helpers: {
      arrowBtnClick: () => redirect('/'),
      logout: () => userService.logout(),
      avatarClick,
      changeData,
      hideModal,
      saveData,
      changePassword,
    },
    state: { modalFormData: avatarFormMeta, changeData: false, changePassword: false, showModal: false },
    events: { onSubmitData },
  }),
);

function avatarClick(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, showModal: true }));
}

function changeData(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, changeData: true }));
}
function changePassword(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, changePassword: true }));
}

function hideModal(this: Component<ISimpleObject, TProfilePageState>) {
  this.setState((state) => ({ ...state, showModal: false }));
}

async function saveData(this: Component<ISimpleObject, TProfilePageState>, data: TAvatarData) {
  const formData = new FormData();
  formData.append('avatar', data.avatar, data.avatar.name);
  await userService.updateAvatar(formData);
  this.setState((state) => ({ ...state, showModal: false }));
}

async function onSubmitData(this: Component<ISimpleObject, TProfilePageState>, e: Event) {
  e.preventDefault();
  const form = e.target as HTMLElement;
  const inputs = form.querySelectorAll('input');
  const isValid = validate(inputs);
  if (!isValid) {
    return showError('Form is invalid');
  }
  const data = prepareData(inputs);
  if (this.state.changeData) {
    await userService.updateProfileData((data as unknown) as IProfileData);
  }
  if (this.state.changePassword) {
    await userService.updatePassword((data as unknown) as IPasswordData);
  }
  this.setState((state) => ({ ...state, changeData: false, changePassword: false }));
}

function validate(inputs: NodeListOf<HTMLInputElement>) {
  return Array.from(inputs).every(({ name, value }) => {
    if (name === 'oldPassword' || name === 'newPassword') {
      return validatePassword(value);
    }
    if (name === 'email') {
      return validateEmail(value);
    }
    if (name === 'login') {
      return validateLogin(value);
    }
    if (name === 'login') {
      return validateLogin(value);
    }
    if (name === 'first_name' || name === 'second_name') {
      return validateName(value);
    }
    if (name === 'phone') {
      return validatePhone(value);
    }
    return !!value;
  });
}

function prepareData(inputs: NodeListOf<HTMLInputElement>) {
  return Array.from(inputs).reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {});
}
