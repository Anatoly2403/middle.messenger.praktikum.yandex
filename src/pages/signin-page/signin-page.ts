import { Component, prepareComponent } from '../../core/base/component';
import './signin-page.scss';
import { Form } from '../../components/form/form';
import { validatePassword, validateLogin, validateEmail, validateName, validatePhone } from '../../utils';

function getStaticData(this: Component) {
  return {
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
    <div class="signin">
      <div class="signin-form__wrapper">
        {{{ 
            form 
              onSubmit="[static.formMeta.onSubmit]"
              title="Регистрация" 
              fields="[static.formMeta.fields]" 
              submit="[static.formMeta.submit]"
              link="[static.formMeta.link]"
        }}}
      </div>  
    </div>
  `;
}

export const SigninPage = prepareComponent({
  name: 'signin-page',
  getTemplate,
  getStaticData,
  children: [Form],
});
