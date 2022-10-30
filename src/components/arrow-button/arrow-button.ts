import { Component, prepareComponent } from '../../core/base/component';
import './arrow-button.scss';

type TArrowBtnProps = {
  onClick: () => void;
};

export const ArrowButton = prepareComponent<TArrowBtnProps>({
  name: 'arrow-button',
  getTemplate: () =>
    `<button class="arrowBtn" data-event="[click:handleClick]"><div class="arrowBtn__arrow"></div></button>`,
  events: {
    handleClick(this: Component<TArrowBtnProps>) {
      this.props.onClick();
    },
  },
});
