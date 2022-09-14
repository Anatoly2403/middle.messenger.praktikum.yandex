document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('.file-field__input')
  inputs.forEach(field => {
    field.addEventListener('input', ({ target }) => {
      const { previousSibling, files } = target;
      previousSibling.textContent = files[0]?.name;
      previousSibling.classList.add('file-field__label_full')
    })
  });
})