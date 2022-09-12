import { getNode } from '../../utils';

document.addEventListener("DOMContentLoaded", () => {
  const avatar = getNode('.avatar');
  const modalWrapper = getNode('.modal-wrapper');
  const modalForm = getNode('.modal');


  modalWrapper.addEventListener('click', (e) => {
    if (e.target.className !== "modal-wrapper") return;
    hideModal();
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideModal();
  });

  avatar.addEventListener('click', showModal);

  function showModal() {
    modalWrapper.style.display = 'flex'
  };

  function hideModal() {
    modalWrapper.style.display = 'none'
  };
})