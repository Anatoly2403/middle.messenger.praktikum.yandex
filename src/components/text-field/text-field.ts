import { Component } from '../../core/base/component';
import './text-field.scss';
import { TData, TEvents, TProps } from './types';

export class TextField extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props });
  }

  events: TEvents = {
    handleBlur: this.handleBlur.bind(this),
  };

  handleBlur(e: Event) {
    const field = e.target as HTMLInputElement;
    if (field.value) {
      this.setData({
        ...this.data,
        value: field.value,
      });
    }
  }

  protected render(): string {
    const { disabled, label, value } = this.data;

    return `
      <div class="text-field">
        <span class="text-field__title">${label}</span>
        <input 
          class="text-field__value" 
          value="${value}" 
          type="text" 
          ${disabled ? 'disabled' : ''}
        />
      </div>
    `;
  }
}
