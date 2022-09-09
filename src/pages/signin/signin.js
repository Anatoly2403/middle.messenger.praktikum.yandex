import { FormController } from '../../scripts';

document.addEventListener("DOMContentLoaded", () => {
  const form = new FormController({
    formSelector: '.form',
    formFieldsSelector: '.field__input',
    submitHandler
  });

  form.init()

  function submitHandler(e) {
    e.preventDefault();
  }
});
