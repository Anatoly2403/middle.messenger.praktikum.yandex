import { Component } from '../../core/component'
import './input-field.scss'
import { TData, TEvents, TProps } from './types'

export class InputField extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props, value: '' })
  }

  events: TEvents = {
    handleInput: this.handleInput.bind(this),
    handleFocus: this.handleFocus.bind(this),
    handleBlur: this.handleBlur.bind(this),
  }

  handleInput(e: Event) {
    console.log(e)
  }

  handleFocus(e: Event) {
    const field = e.target as HTMLInputElement
    const label = field.previousElementSibling as Element
    label.classList.remove(`input-field__label_low`)
  }

  handleBlur(e: Event) {
    const field = e.target as HTMLInputElement
    const label = field.previousElementSibling as Element
    if (field.value) {
      this.setData({
        ...this.data,
        value: field.value,
      })
    }
    label.classList.add(`input-field__label_low`)
  }

  protected render(): string {
    const { label, name, value } = this.data
    const className = !!value ? '' : 'input-field__label_low'
    return `
      <div class="input-field">
        <label class="input-field__label ${className}" for="${name}">${label}</label>
        <input 
          class="input-field__input" type="text" 
          name="${name}" 
          data-event="[input:handleInput, focus:handleFocus, blur:handleBlur]"
          value="${value}"
          
        />
        <span class="input-field__error"></span>
      </div>
    `
  }
}
