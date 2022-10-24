import { Component } from '../../core/component'
import './text-button.scss'
import { TData, TEvents, TProps } from './types'

export class TextButton extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props })
  }

  events: TEvents = {
    handleClick: () => console.log('click'),
  }

  protected render(): string {
    const { type, label } = this.data
    const className = this.data.type
      ? `text-button text-button_${type}`
      : 'text-button'

    return `
      <button class="${className}" data-event="[click:handleClick]">
        <span>${label}</span>
      </button>
    `
  }
}
