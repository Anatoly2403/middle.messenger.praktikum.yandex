import { Component, prepareComponent } from '../../core/base/component';
import './profile-page.scss';
import avatarSrc from '../../assets/icons/defaultAvatar.svg';
import { Form } from '../../components/form/form';
import { parseImg } from '../../utils';
import { ArrowButton } from '../../components/arrow-button';
import { Avatar } from '../../components/avatar';
import { TextField } from '../../components/text-field/text-field';
import { TDataObserverProps } from '../../core/base/models';
import { TextButton } from '../../components/text-button/text-button';
import { Modal } from '../../components/modal/modal';
import { isAvatarData, TAvatarData, TProfilePageProps, TUserData } from './types';
import { avatarFormMeta, userDataFormMeta } from './constants';

const template = `
    <div class="profile">
      {{#if props.modal.show}}  
        {{{
          modal
            show=props.modal.show
            hideModal=helpers.hideModal
            saveData=helpers.saveData
            formData=props.modal.formData
        }}}    
      {{/if}}    
      <div class="profile__block_left">
        {{{ arrow-button onClick=helpers.arrowBtnClick}}}
      </div>
      <div class="profile__block_right">
        <div class="profile__avatar">
          {{{ avatar avatarSrc=props.avatar.src avatarClick=helpers.avatarClick}}}
        </div>
        <div class="profile__user-data">
          <div class="profile__main-info-wrapper">     
            {{#each props.info}}
              {{{ text-field key=@index name=name label=label value=value }}}   
            {{/each}}                   
          </div>
        </div>
        <div class="profile__control">
          <div class="profile__main-btns-wrapper">
            {{#each props.buttons}}           
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

function componentDidMount(this: Component<TProfilePageProps>, props: TDataObserverProps<TProfilePageProps>) {
  this.setProps({
    ...props.data,
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
  });
}

function arrowBtnClick() {
  window.location.href = '/main';
}

function avatarClick(this: Component<TProfilePageProps>) {
  this.setProps((props) => ({ ...props, modal: { name: 'avatar', show: true, formData: avatarFormMeta } }));
}

function textButtonClick(this: Component<TProfilePageProps>, name: string) {
  if (name === 'changeData') {
    this.setProps((props) => ({ ...props, modal: { name: 'formData', show: true, formData: userDataFormMeta } }));
  } else {
    window.location.href = '/login';
  }
}

function hideModal(this: Component<TProfilePageProps>) {
  this.setProps((props) => ({ ...props, modal: { show: false, formData: undefined, name: undefined } }));
}

async function saveData(this: Component<TProfilePageProps>, data: TAvatarData | TUserData) {
  if (isAvatarData(data)) {
    const avatar = await parseImg(data.avatar);
    this.setProps((props) => ({
      ...props,
      avatar: { src: avatar },
      modal: { ...props.modal, show: false },
    }));
    console.log({ avatar: avatar });
  } else {
    this.setProps((props) => ({
      ...props,
      info: props.info.map((item) => ({ ...item, value: data[item.name] })),
      modal: { ...props.modal, show: false },
    }));
    console.log(data);
  }
}

export const ProfilePage = prepareComponent<TProfilePageProps>({
  name: 'profile-page',
  template,
  componentDidMount,
  children: [Form, ArrowButton, Avatar, TextField, TextButton, Modal],
  helpers: { arrowBtnClick, avatarClick, textButtonClick, hideModal, saveData },
});
