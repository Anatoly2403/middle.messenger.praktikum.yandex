import { Component } from '../../core/base/component';
import './button.scss';
import { TEvents, TProps } from './types';

export class Button extends Component<TProps, TEvents> {
  constructor(props: TProps) {
    super(props);
  }

  events: TEvents = {
    handleClick: () => this.data.click(),
  };

  protected render(): string {
    return `
      <button class="btn" type="${this.data.type}" data-event="[click:handleClick]" >${this.data.label}</button>
    `;
  }
}
