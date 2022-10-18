document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input-field__input");
  inputs.forEach((field) => {
    field.addEventListener("focus", (e) => {
      const field = e.target as HTMLInputElement;
      const label = field.previousSibling as Element;
      label.classList.remove(`input-field__label_low`);
    });
    field.addEventListener("blur", (e) => {
      const field = e.target as HTMLInputElement;
      const label = field.previousSibling as Element;
      if (field.value) return;
      label.classList.add(`input-field__label_low`);
    });
  });
});
