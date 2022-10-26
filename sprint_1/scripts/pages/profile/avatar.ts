import { getNode } from "../../utils";

document.addEventListener("DOMContentLoaded", () => {
  const avatar = getNode(".avatar");
  const modalWrapper = getNode(".modal-wrapper");
  const modalForm = getNode(".modal");

  if (!avatar || !modalWrapper || !modalForm) return;

  modalWrapper.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.className !== "modal-wrapper") return;
    hideModal();
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideModal();
  });

  avatar.addEventListener("click", showModal);

  function showModal() {
    if (!modalWrapper) return;
    modalWrapper.style.display = "flex";
  }

  function hideModal() {
    if (!modalWrapper) return;
    modalWrapper.style.display = "none";
  }
});
