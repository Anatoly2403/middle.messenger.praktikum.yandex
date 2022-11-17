import './login-page.scss';
import { ISigninData } from '../../models/interfaces';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin } from '../../utils';
import { TInputFieldProps } from '../../ui-kit/input-field';
import { TButtonProps } from '../../ui-kit/button';
import { TLinkProps } from '../../core/router/components/link';
import { prepareComponent } from '../../core/component';
import { ISimpleObject } from '../../core/models';
import { userService } from '../../services/user-service';

type TLoginPageState = {
  fields: TInputFieldProps[];
  button: TButtonProps;
  link: TLinkProps;
};

const template = `
    <div class="login-page">
      <div class="login-page-form__wrapper">
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

function onSubmit(data: ISigninData) {
  userService.login(data);
}

export const LoginPage = prepareComponent<ISimpleObject, TLoginPageState>({
  name: 'login-page',
  template,
  children: [Form],
  helpers: { onSubmit },
  state: {
    fields: [
      { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
      { type: 'inputField', name: 'password', label: 'Пароль', validators: [validatePassword] },
    ],
    button: {
      type: 'submit',
      label: 'Авторизоваться',
    },
    link: {
      href: '/signup',
      label: 'Нет аккаунта?',
    },
  },
});
