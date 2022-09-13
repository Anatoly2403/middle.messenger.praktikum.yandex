import { getNodeByDataAttr } from '../../utils';

document.addEventListener("DOMContentLoaded", () => {
  // Кнопки
  const signinBtn = getNodeByDataAttr('button', 'signin');

  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //TODO Валидация + передача данных
    window.location.href = '/main';
  })
})