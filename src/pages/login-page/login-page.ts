import { Component, prepareComponent } from '../../core/base/component';
import './login-page.scss';
import { Form } from '../../components/form/form';

// type TStatic = {};

// const static = {
//   formMeta: {
//     title: 'login',
//     fields: [
//       { type: 'inputField', name: 'login', label: 'Логин', fieldType: 'text' },
//       { type: 'inputField', name: 'password', label: 'Пароль', fieldType: 'text' },
//     ],
//     footer: [
//       {
//         type: 'button',
//         name: 'login',
//         label: 'Авторизоваться',
//         btnType: 'submit',
//         handler: (data: any) => console.log(data),
//       },
//       { type: 'link', name: 'login', title: 'Нет аккаунта?', href: '/signin' },
//     ],
//   },
// };

function getTemplate(this: Component) {
  return `
    <div class="login">
      <div class="login-form__wrapper">
        {{{ form title="login" fields="[static.formMeta.fields]" }}}
      </div>  
    </div>
  `;
}

export const LoginPage = prepareComponent({
  name: 'not-found-page',
  getTemplate,
  children: [Form],
  static: {
    formMeta: {
      fields: [
        { type: 'inputField', name: 'login', label: 'Логин', fieldType: 'text' },
        { type: 'inputField', name: 'password', label: 'Пароль', fieldType: 'text' },
      ],
    },
  },
});
