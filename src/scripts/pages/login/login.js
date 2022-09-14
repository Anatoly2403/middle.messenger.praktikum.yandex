import { getNodeByDataAttr } from '../../utils';

document.addEventListener("DOMContentLoaded", () => {
  // Кнопки
  const loginBtn = getNodeByDataAttr('button', 'login');

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //TODO Валидация + передача данных
    window.location.href = '/main';
  })
})