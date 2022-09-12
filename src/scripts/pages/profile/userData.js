import { getNodeByDataAttr, getNode } from '../../utils';

document.addEventListener("DOMContentLoaded", () => {
  // Блоки кнопок
  const mainBtnsWrapper = getNode('.profile__main-btns-wrapper');
  const saveBtnsWrapper = getNode('.profile__save-btns-wrapper');
  // Кнопки
  const changeUserPasswordBtn = getNodeByDataAttr('button', 'password');
  const saveUserDataBtn = getNodeByDataAttr('button', 'save');
  const changeUserDataBtn = getNodeByDataAttr('button', 'data');
  const logoutBtn = getNodeByDataAttr('button', 'logout');
  const backBtn = getNode('.profile__block_left .arrowBtn');
  // Блоки полей
  const userMainDataFieldsWrapper = getNode('.profile__main-info-wrapper');
  const userPasswordFieldsWrapper = getNode('.profile__password-wrapper');
  const userNikName = getNode('.profile__avatar span');

  changeUserDataBtn.addEventListener('click', () => {
    setDisabledForUserDataFields(userMainDataFieldsWrapper, false);
    toggleUserDataChangeMode(true);
  });

  changeUserPasswordBtn.addEventListener('click', () => {
    setDisabledForUserDataFields(userPasswordFieldsWrapper, false);
    toggleUserPasswordChangeMode(true);
  });

  saveUserDataBtn.addEventListener('click', () => {
    setDisabledForUserDataFields(userMainDataFieldsWrapper, true);
    if (userPasswordFieldsWrapper.style.display === 'block') {
      return toggleUserPasswordChangeMode(false);
    }
    toggleUserDataChangeMode(false);
    handleMainUserData()
  });

  logoutBtn.addEventListener('click', () => {
    // TODO реализовать логику выхода из ЛК
    window.location.href = '/login';
  })

  backBtn.addEventListener('click', () => window.location.href = '/main');

  function toggleUserDataChangeMode(isChangeMode) {
    if (isChangeMode) {
      mainBtnsWrapper.style.display = 'none';
      saveBtnsWrapper.style.display = 'block';
    } else {
      mainBtnsWrapper.style.display = 'block';
      saveBtnsWrapper.style.display = 'none';
    }
  }

  function toggleUserPasswordChangeMode(isChangeMode) {
    if (isChangeMode) {
      userMainDataFieldsWrapper.style.display = 'none';
      userPasswordFieldsWrapper.style.display = 'block';
      toggleUserDataChangeMode(isChangeMode)
    } else {
      userMainDataFieldsWrapper.style.display = 'block';
      userPasswordFieldsWrapper.style.display = 'none';
      toggleUserDataChangeMode(isChangeMode)
    }
  }

  function setDisabledForUserDataFields(fieldsWrapper, disabled) {
    fieldsWrapper?.childNodes?.forEach(item => item.lastChild.disabled = disabled)
  }

  function handleMainUserData() {
    const fields = [...userMainDataFieldsWrapper.childNodes, ...userPasswordFieldsWrapper.childNodes];
    const data = fields.reduce((acc, item) => {
      const key = item.dataset.id;
      const value = item.lastChild.value;
      if (key === 'nikName') userNikName.textContent = value;
      return { ...acc, [key]: value }
    }, {})
    console.log(data);
  }
})