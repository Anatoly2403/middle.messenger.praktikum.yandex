import { Component } from '../../core/base/component';
import './link.scss';
import { TData, TEvents, TProps } from './types';

export class Link extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props });
  }

  events: TEvents = {};

  protected render(): string {
    return `
      <a class="link" href="${this.data.href}">${this.data.label}</a>
    `;
  }
}
