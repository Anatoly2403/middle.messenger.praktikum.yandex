import { Component, prepareComponent } from '../../core/base/component';
import './login-page.scss';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin } from '../../utils';

function getStaticData(this: Component) {
  return {
    formMeta: {
      fields: [
        { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
        { type: 'inputField', name: 'password', label: 'Пароль', validators: [validatePassword] },
      ],
      submit: {
        type: 'submit',
        label: 'Авторизоваться',
      },
      link: {
        href: '/signin',
        label: 'Нет аккаунта?',
      },
      onSubmit: (data: { login: string; password: string }) => {
        alert(JSON.stringify(data));
      },
    },
  };
}

function getTemplate(this: Component) {
  return `
    <div class="login">
      <div class="login-form__wrapper">
        {{{ 
            form 
              onSubmit="[static.formMeta.onSubmit]"
              title="Вход" 
              fields="[static.formMeta.fields]" 
              submit="[static.formMeta.submit]"
              link="[static.formMeta.link]"
        }}}
      </div>  
    </div>
  `;
}

export const LoginPage = prepareComponent({
  name: 'not-found-page',
  getTemplate,
  getStaticData,
  children: [Form],
});
