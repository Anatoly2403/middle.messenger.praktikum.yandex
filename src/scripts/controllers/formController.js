
export class FormController {
  constructor({ formSelector, formFieldsSelector, submitHandler }) {
    this._form = document.querySelector(formSelector);
    this._formFields = this._form.querySelectorAll(formFieldsSelector);
    this._submitHandler = submitHandler;
    console.log(formFieldsSelector)
  }

  _setSubmitHandler() {
    this._form.addEventListener('submit', this._submitHandler);
  }

  _setFormFieldsHandler() {
    this._formFields.forEach(field => {
      field.addEventListener('focus', ({ target }) => {
        target.previousSibling.classList.remove(`input-field__label_low`)
      })
      field.addEventListener('blur', ({ target }) => {
        if (target.value) return;
        target.previousSibling.classList.add(`input-field__label_low`)
      })
      field.addEventListener('input', ({ target }) => {
        const {
          previousSibling: label,
          nextSibling: error
        } = target;
      })
    })
  }


  init() {
    this._setFormFieldsHandler();
    this._setSubmitHandler()
  }
}