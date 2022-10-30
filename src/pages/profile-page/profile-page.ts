import { Component, prepareComponent } from '../../core/base/component';
import './profile-page.scss';
import avatarSrc from '../../assets/icons/defaultAvatar.svg';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin, validateEmail, validateName, validatePhone } from '../../utils';
import { ArrowButton } from '../../components/arrow-button';
import { Avatar } from '../../components/avatar';
import { TextField } from '../../components/text-field/text-field';
import { TDataObserverProps } from '../../core/base/models';
import { TextButton } from '../../components/text-button/text-button';
import { Modal } from '../../components/modal/modal';
import { TInputFieldProps } from '../../components/input-field';
import { TButtonProps } from '../../components/button';

type TProfilePageProps = {
  avatar: {
    src: string;
  };
  info: Array<{
    name: string;
    label: string;
    value: string;
  }>;
  buttons: Array<{
    name: string;
    type?: string;
    label: string;
  }>;
  modal: {
    show: boolean;
    formData?: {
      title: string;
      fields: Array<TInputFieldProps>;
      submit: TButtonProps;
    };
  };
};

const formData = {
  title: 'Обновите данные',
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
    label: 'Обновить',
  },
};

function registerHelpers(this: Component) {
  return {
    arrowBtnClick: () => (window.location.href = '/main'),
    avatarClick: () => console.log('avatarClick'),
    textButtonClick: (name: string) => {
      if (name === 'changeData') {
        this.setNewProps({
          ...this.props,
          modal: { show: true, formData: formData },
        });
        console.log(this.props);
      } else {
        console.log();
      }
    },
    hideModal: () => {
      this.setNewProps({
        ...this.props,
        modal: { show: false, formData: formData },
      });
    },
    saveData: (data: any) => {
      console.log(data);
    },
  };
}

function getTemplate(this: Component) {
  return `
    <div class="profile">
      {{#if props.modal.show}}  
        {{{          
          modal
            show=props.modal.show
            hideModal="[helpers.hideModal]"
            saveData="[helpers.saveData]"
            formData=props.modal.formData
        }}} 
      {{/if}}        
      <div class="profile__block_left">
        {{{ arrow-button onClick="[arrowBtnClick]"}}}
      </div>
      <div class="profile__block_right">
        <div class="profile__avatar">
          {{{ avatar avatarSrc=props.avatar.src avatarClick="[avatarClick]"}}}
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
                  onTextBtnClick="[textButtonClick]" 
              }}}   
            {{/each}} 
          </div>
        </div>
      </div>
    </div>
  `;
}

export const ProfilePage = prepareComponent<TProfilePageProps>({
  name: 'profile-page',
  getTemplate,
  registerHelpers,
  children: [Form, ArrowButton, Avatar, TextField, TextButton, Modal],
  componentDidMount(this: Component<TProfilePageProps>, props: TDataObserverProps<TProfilePageProps>) {
    this.setNewProps({
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
        formData: formData,
      },
    });
  },
});
