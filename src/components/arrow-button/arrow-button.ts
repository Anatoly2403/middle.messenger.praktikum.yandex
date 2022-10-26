import { Component } from '../../core/base/component';
import './arrow-button.scss';
import { TEvents, TProps } from './types';

export class ArrowButton extends Component<TProps, TEvents> {
  events: TEvents = {
    // eslint-disable-next-line no-console
    handleClick: () => console.log('click'),
  };

  protected render(): string {
    return `
      <button class="arrowBtn" data-event="[click:handleClick]">
        <div class="arrowBtn__arrow"></div>
      </button>
    `;
  }
}
