import { Component, prepareComponent } from '../../core/base/component';
import './signin-page.scss';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin, validateEmail, validateName, validatePhone } from '../../utils';
import { TInputFieldProps } from '../../ui-kit/input-field';
import { TButtonProps } from '../../ui-kit/button';
import { TLinkProps } from '../../ui-kit/link';
import { TDataObserverProps } from '../../core/base/models';

type TSigninPageProps = {
  fields: TInputFieldProps[];
  button: TButtonProps;
  link: TLinkProps;
};

function componentDidMount(this: Component<TSigninPageProps>, props: TDataObserverProps<TSigninPageProps>) {
  this.setProps({
    ...props.data,
    fields: [
      { type: 'inputField', name: 'mail', label: 'Почта', validators: [validateEmail] },
      { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
      { type: 'inputField', name: 'name', label: 'Имя', validators: [validateName] },
      { type: 'inputField', name: 'lastName', label: 'Фамилия', validators: [validateName] },
      { type: 'inputField', name: 'phoneNumber', label: 'Телефон', validators: [validatePhone] },
      { type: 'inputField', name: 'password', label: 'Пароль', validators: [validatePassword] },
    ],
    button: {
      type: 'submit',
      label: 'Зарегистрироваться',
    },
    link: {
      href: '/login',
      label: 'Войти',
    },
  });
}

function onSubmit(data: { login: string; password: string }) {
  alert(JSON.stringify(data));
}

const template = `
    <div class="signin">
      <div class="signin-form__wrapper">
        {{{ 
          form 
            onSubmit=helpers.onSubmit
            title="Вход" 
            fields=props.fields 
            button=props.button
            link=props.link
        }}}
      </div>  
    </div>
  `;

export const SigninPage = prepareComponent<TSigninPageProps>({
  name: 'signin-page',
  template,
  componentDidMount,
  children: [Form],
  helpers: { onSubmit },
});
