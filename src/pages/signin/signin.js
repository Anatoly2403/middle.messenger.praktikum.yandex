import { FormController } from '../../scripts/controllers';

document.addEventListener("DOMContentLoaded", () => {
  const form = new FormController({
    formSelector: '.form',
    formFieldsSelector: '.input-field__input',
    submitHandler
  });

  form.init()

  function submitHandler(e) {
    e.preventDefault();
  }
});
