import { Component } from '../../core/component'
import './file-field.scss'
import { TData, TEvents, TProps } from './types'

export class FileField extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props, hasFile: false })
  }

  events: TEvents = {
    handleInput: this.handleInput.bind(this),
  }

  handleInput(e: Event) {
    const field = e.target as HTMLInputElement
    const files = field.files || []
    if (!files.length) return
    this.setData({
      ...this.data,
      label: files[0].name,
      hasFile: true,
    })
  }

  protected render(): string {
    const { hasFile, label, name } = this.data
    return `
      <div class="file-field">
        <label 
          class="file-field__label ${hasFile ? 'file-field__label_full' : ''}" 
          for="${name}">
            ${label}
        </label>
        <input class="file-field__input" type="file" name="${name}" data-event="[input:handleInput]" />
        <span class="input-field__error"></span>
      </div> 
    `
  }
}
