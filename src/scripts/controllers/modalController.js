export class ModalController {
  constructor() {
    this._modalWrapper = document.querySelector('.modal-wrapper');
    this._modalForm = document.querySelector('.modal');
  }

  init() {
    this._modalWrapper.addEventListener('click', (e) => {
      if (e.target.className !== "modal-wrapper") return;
      this.hideModal();
    })
    this._modalForm.addEventListener('submit', this._submitForm.bind(this))
  }

  showModal() {
    this._modalWrapper.style.display = 'flex';
  }

  hideModal() {
    this._modalWrapper.style.display = 'none';
  }


  _submitForm(e) {
    e.preventDefault();
    this.hideModal();
  }
}