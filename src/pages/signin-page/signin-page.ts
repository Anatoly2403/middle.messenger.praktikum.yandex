import './signin-page.scss';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin, validateEmail, validateName, validatePhone } from '../../utils';
import { TInputFieldProps } from '../../ui-kit/input-field';
import { TButtonProps } from '../../ui-kit/button';
import { TLinkProps } from '../../ui-kit/link';
import { prepareComponent } from '../../core/component';
import { ISimpleObject } from '../../core/models';

type TSigninPageState = {
  fields: TInputFieldProps[];
  button: TButtonProps;
  link: TLinkProps;
};

function onSubmit(data: { login: string; password: string }) {
  alert(JSON.stringify(data));
}

const template = `
    <div class="signin-page">
      <div class="signin-page-form__wrapper">
        {{{ 
          form 
            onSubmit=helpers.onSubmit
            title="Вход" 
            fields=state.fields 
            button=state.button
            link=state.link
        }}}
      </div>  
    </div>
  `;

export const SigninPage = prepareComponent<ISimpleObject, TSigninPageState>({
  name: 'signin-page',
  template,
  children: [Form],
  helpers: { onSubmit },
  state: {
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
  },
});
