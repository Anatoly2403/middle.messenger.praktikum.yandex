document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".file-field__input");
  inputs.forEach((field) => {
    field.addEventListener("input", (e) => {
      const field = e.target as HTMLInputElement;
      const previousSibling = field.previousSibling as Element;
      const files = field.files || [];
      previousSibling.textContent = files[0].name;
      previousSibling.classList.add("file-field__label_full");
    });
  });
});
