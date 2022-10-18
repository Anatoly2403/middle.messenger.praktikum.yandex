import { getNodeByDataAttr, getNode } from "../../utils";

document.addEventListener("DOMContentLoaded", () => {
  // Блоки кнопок
  const mainBtnsWrapper = getNode(".profile__main-btns-wrapper");
  const saveBtnsWrapper = getNode(".profile__save-btns-wrapper");
  // Кнопки
  const changeUserPasswordBtn = getNodeByDataAttr("button", "password");
  const saveUserDataBtn = getNodeByDataAttr("button", "save");
  const changeUserDataBtn = getNodeByDataAttr("button", "data");
  const logoutBtn = getNodeByDataAttr("button", "logout");
  const backBtn = getNode(".profile__block_left .arrowBtn");
  // Блоки полей
  const userMainDataFieldsWrapper = getNode(".profile__main-info-wrapper");
  const userPasswordFieldsWrapper = getNode(".profile__password-wrapper");
  const userNikName = getNode(".profile__avatar span");

  changeUserDataBtn?.addEventListener("click", () => {
    if (!(userMainDataFieldsWrapper instanceof HTMLElement)) return;
    setDisabledForUserDataFields(userMainDataFieldsWrapper, false);
    toggleUserDataChangeMode(true);
  });

  changeUserPasswordBtn?.addEventListener("click", () => {
    if (!(userPasswordFieldsWrapper instanceof HTMLElement)) return;
    setDisabledForUserDataFields(userPasswordFieldsWrapper, false);
    toggleUserPasswordChangeMode(true);
  });

  saveUserDataBtn?.addEventListener("click", () => {
    if (!(userMainDataFieldsWrapper instanceof HTMLElement)) return;
    setDisabledForUserDataFields(userMainDataFieldsWrapper, true);
    if (userPasswordFieldsWrapper?.style.display === "block") {
      return toggleUserPasswordChangeMode(false);
    }
    toggleUserDataChangeMode(false);
    handleMainUserData();
  });

  logoutBtn?.addEventListener("click", () => {
    // TODO реализовать логику выхода из ЛК
    window.location.href = "/login";
  });

  backBtn?.addEventListener("click", () => (window.location.href = "/main"));

  function toggleUserDataChangeMode(isChangeMode: boolean) {
    if (
      !(mainBtnsWrapper instanceof HTMLElement) ||
      !(saveBtnsWrapper instanceof HTMLElement)
    )
      return;
    if (isChangeMode) {
      mainBtnsWrapper.style.display = "none";
      saveBtnsWrapper.style.display = "block";
    } else {
      mainBtnsWrapper.style.display = "block";
      saveBtnsWrapper.style.display = "none";
    }
  }

  function toggleUserPasswordChangeMode(isChangeMode: boolean) {
    if (
      !(userMainDataFieldsWrapper instanceof HTMLElement) ||
      !(userPasswordFieldsWrapper instanceof HTMLElement)
    )
      return;
    if (isChangeMode) {
      userMainDataFieldsWrapper.style.display = "none";
      userPasswordFieldsWrapper.style.display = "block";
      toggleUserDataChangeMode(isChangeMode);
    } else {
      userMainDataFieldsWrapper.style.display = "block";
      userPasswordFieldsWrapper.style.display = "none";
      toggleUserDataChangeMode(isChangeMode);
    }
  }

  function setDisabledForUserDataFields(
    fieldsWrapper: HTMLElement,
    disabled: boolean
  ) {
    fieldsWrapper.childNodes.forEach((item) => {
      const { lastChild } = item;
      if (!(lastChild instanceof HTMLInputElement)) return;
      lastChild.disabled = disabled;
    });
  }

  function handleMainUserData() {
    const fields = [
      ...(userMainDataFieldsWrapper?.childNodes || []),
      ...(userPasswordFieldsWrapper?.childNodes || []),
    ];
    const data = fields.reduce(
      (acc: Record<string, string>, item: ChildNode) => {
        if (!(item instanceof HTMLElement)) return acc;
        const key = item.dataset.id;
        const lastChild = item.lastChild;
        if (!(lastChild instanceof HTMLInputElement)) return acc;
        const value = lastChild.value;

        if (!key || !value || !(userNikName instanceof HTMLElement)) return acc;
        if (key === "nikName") userNikName.textContent = value;
        return { ...acc, [key]: value };
      },
      {}
    );
  }
});
