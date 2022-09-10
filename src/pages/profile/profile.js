import pug from 'pug'
import { getElementByDataAttr, } from '../../scripts/utils'
import { userDataBlockStructure, } from '../../scripts/page-structures'


document.addEventListener("DOMContentLoaded", () => {
  const changeUserDataBtn = getElementByDataAttr('button', 'buttonId', 'data');
  const profile = document.querySelector('.profile');


  const formData = {
    id: 'changeForm',
    title: 'Изменить данные',
    fields: [
      { type: 'inputField', id: 'login', label: 'Логин', fieldType: 'text', },
      { type: 'inputField', id: 'password', label: 'Пароль', fieldType: 'text', }
    ],
    footer: [
      { type: 'button', id: 'save', label: 'Сохранить', btnType: 'submit' }
    ]
  }


  changeUserDataBtn.addEventListener('click', () => {
    const newUserDataBlockStructure = userDataBlockStructure.map(item => ({ ...item, type: 'inputField', fieldType: 'text' }));
   

    console.log(compiledFunction);
  })
});
