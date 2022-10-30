import { Component, prepareComponent } from '../../core/base/component';
import './button.scss';

export type TButtonProps = {
  type: string;
  label: string;
  onClick?: () => void;
};

export const Button = prepareComponent<TButtonProps>({
  name: 'button',
  getTemplate: () =>
    '<button class="btn" type="{{ props.type }}" data-event="[click:handleSubmit]" >{{ props.label }}</button>',
  events: {
    handleSubmit(this: Component<TButtonProps>) {
      if (this.props.onClick) this.props.onClick();
    },
  },
});
