document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('.input-field__input')
  inputs.forEach(field => {
    field.addEventListener('focus', ({ target }) => {
      target.previousSibling.classList.remove(`input-field__label_low`)
    })
    field.addEventListener('blur', ({ target }) => {
      if (target.value) return;
      target.previousSibling.classList.add(`input-field__label_low`)
    })
  });
})