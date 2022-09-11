import { ModalController } from '../../scripts/controllers';
import { getElementByDataAttr, } from '../../scripts/utils'

document.addEventListener("DOMContentLoaded", () => {
  // Аватар
  const avatarBlock = document.querySelector('.profile__avatar');
  const avatar = avatarBlock.querySelector('.avatar');

  // Скрываемые блоки кнопок
  const mainBtnsWrapper = document.querySelector('.profile__main-btns-wrapper');
  const saveBtnsWrapper = document.querySelector('.profile__save-btns-wrapper');

  // Кнопки страницы
  const changeUserPasswordBtn = getElementByDataAttr('button', 'buttonId', 'password');
  const saveUserDataBtn = getElementByDataAttr('button', 'buttonId', 'save');
  const changeUserDataBtn = getElementByDataAttr('button', 'buttonId', 'data');
  const logoutBtn = getElementByDataAttr('button', 'buttonId', 'logout');
  const goBackBtn = document.querySelector('.profile__block_left').firstChild;

  // Скрываемые блоки полей
  const userMainDataFieldsWrapper = document.querySelector('.profile__main-info-wrapper');
  const userPasswordFieldsWrapper = document.querySelector('.profile__password-wrapper');


  const modal = new ModalController()

  // Логика по работе с изменением данных
  changeUserDataBtn.addEventListener('click', () => {
    mainBtnsWrapper.style.display = 'none';
    saveBtnsWrapper.style.display = 'block';
    setDisabledForUserDataFields(userMainDataFieldsWrapper, false);

  });
  saveUserDataBtn.addEventListener('click', () => {
    mainBtnsWrapper.style.display = 'block';
    saveBtnsWrapper.style.display = 'none';
    setDisabledForUserDataFields(userMainDataFieldsWrapper, true)
  });

  // Логика по работе с изменением пароля
  changeUserPasswordBtn.addEventListener('click', () => {
    userMainDataFieldsWrapper.style.display = 'none';
    mainBtnsWrapper.style.display = 'none';

    userPasswordFieldsWrapper.style.display = 'block';
    saveBtnsWrapper.style.display = 'block';
    setDisabledForUserDataFields(userPasswordFieldsWrapper, false);
  })

  saveUserDataBtn.addEventListener('click', () => {
    userMainDataFieldsWrapper.style.display = 'block';
    mainBtnsWrapper.style.display = 'block';

    userPasswordFieldsWrapper.style.display = 'none';
    saveBtnsWrapper.style.display = 'none';
    setDisabledForUserDataFields(userPasswordFieldsWrapper, true)
  });

  // Логика кнопки выхода из ЛК
  logoutBtn.addEventListener('click', () => {
    console.log('logout')
  })

  // Логика кнопки вернуться на главную
  goBackBtn.addEventListener('click', () => {
    console.log('goBackBtn')
  })

  // Логика работы с аватаром
  avatar.addEventListener('click', () => {
    modal.showModal()
  })


  // Вспомогательные функции
  function setDisabledForUserDataFields(fieldsWrapper, disabled) {
    fieldsWrapper?.childNodes?.forEach(item => item.lastChild.disabled = disabled)
  }
});
