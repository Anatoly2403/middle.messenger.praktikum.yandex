import { Component, prepareComponent } from '../../core/base/component';
import './profile-page.scss';
import avatarSrc from '../../assets/icons/defaultAvatar.svg';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin, validateEmail, validateName, validatePhone } from '../../utils';
import { ArrowButton } from '../../components/arrow-button';
import { Avatar } from '../../components/avatar';
import { TextField } from '../../components/text-field/text-field';

function getStaticData(this: Component) {
  return {
    arrowBtn: {
      onClick: () => (window.location.href = '/main'),
    },
    avatar: {
      src: avatarSrc,
      avatarClick: () => console.log('click'),
    },
    formMeta: {
      fields: [
        { type: 'inputField', name: 'mail', label: 'Почта', validators: [validateEmail] },
        { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
        { type: 'inputField', name: 'name', label: 'Имя', validators: [validateName] },
        { type: 'inputField', name: 'lastName', label: 'Фамилия', validators: [validateName] },
        { type: 'inputField', name: 'phoneNumber', label: 'Телефон', validators: [validatePhone] },
        { type: 'inputField', name: 'password', label: 'Пароль', validators: [validatePassword] },
      ],
      submit: {
        type: 'submit',
        label: 'Зарегистрироваться',
      },
      link: {
        href: '/login',
        label: 'Войти',
      },
      onSubmit: (data: { login: string; password: string }) => {
        alert(JSON.stringify(data));
      },
    },
  };
}

function getTemplate(this: Component) {
  return `
    <div class="profile">
      <div class="profile__block_left">
        {{{ arrow-button onClick="[static.arrowBtn.onClick]"}}}
      </div>
      <div class="profile__block_right">
        <div class="profile__avatar">
          {{{ avatar avatarSrc="[static.avatar.src]" avatarClick="[static.avatar.avatarClick]"}}}
        </div>
        <div class="profile__user-data">
          <div class="profile__main-info-wrapper">
              {{{ text-field key="0" }}}             
              {{{ text-field key="1" }}}             
          </div>
          <div class="profile__password-wrapper"></div>
        </div>
        <div class="profile__control">
          <div class="profile__main-btns-wrapper"></div>
          <div class="profile__save-btns-wrapper"></div>
        </div>
      </div>
    </div>
  `;
}

export const ProfilePage = prepareComponent({
  name: 'profile-page',
  getTemplate,
  getStaticData,
  children: [Form, ArrowButton, Avatar, TextField],
});
