import { Component, prepareComponent } from '../../core/base/component';
import './login-page.scss';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin } from '../../utils';
import { TInputFieldProps } from '../../components/input-field';
import { TDataObserverProps } from '../../core/base/models';
import { TButtonProps } from '../../components/button';
import { TLinkProps } from '../../components/link';

type TLoginPageProps = {
  fields: TInputFieldProps[];
  button: TButtonProps;
  link: TLinkProps;
};

const template = `
    <div class="login">
      <div class="login-form__wrapper">
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

function componentDidMount(this: Component<TLoginPageProps>, props: TDataObserverProps<TLoginPageProps>) {
  this.setProps({
    ...props.data,
    fields: [
      { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
      { type: 'inputField', name: 'password', label: 'Пароль', validators: [validatePassword] },
    ],
    button: {
      type: 'submit',
      label: 'Авторизоваться',
    },
    link: {
      href: '/signin',
      label: 'Нет аккаунта?',
    },
  });
}

function onSubmit(data: { login: string; password: string }) {
  alert(JSON.stringify(data));
}

export const LoginPage = prepareComponent<TLoginPageProps>({
  name: 'login-page',
  template,
  children: [Form],
  componentDidMount,
  helpers: { onSubmit },
});
