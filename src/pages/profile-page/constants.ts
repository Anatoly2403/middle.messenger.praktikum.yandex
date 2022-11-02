import { validateEmail, validateLogin, validateName, validatePassword, validatePhone } from '../../utils';

export const userDataFormMeta = {
  title: 'Обновите данные',
  fields: [
    { type: 'inputField', name: 'mail', label: 'Почта', validators: [validateEmail] },
    { type: 'inputField', name: 'login', label: 'Логин', validators: [validateLogin] },
    { type: 'inputField', name: 'name', label: 'Имя', validators: [validateName] },
    { type: 'inputField', name: 'lastName', label: 'Фамилия', validators: [validateName] },
    { type: 'inputField', name: 'phoneNumber', label: 'Телефон', validators: [validatePhone] },
    { type: 'inputField', name: 'password', label: 'Пароль', fieldType: 'password', validators: [validatePassword] },
  ],
  button: {
    type: 'submit',
    label: 'Обновить',
  },
};

export const avatarFormMeta = {
  title: 'Загрузите файл',
  fields: [{ type: 'fileField', name: 'avatar', label: 'Выбрать файл на компьютере', required: true }],
  button: {
    type: 'submit',
    label: 'Поменять',
  },
};
