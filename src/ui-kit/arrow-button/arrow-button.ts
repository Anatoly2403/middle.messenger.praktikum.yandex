import { Component, prepareComponent } from '../../core/base/component';
import './arrow-button.scss';

type TArrowBtnProps = {
  onClick: () => void;
};

function handleClick(this: Component<TArrowBtnProps>) {
  this.props.onClick();
}

export const ArrowButton = prepareComponent<TArrowBtnProps>({
  name: 'arrow-button',
  template: `<button class="arrowBtn" data-event="[click:handleClick]"><div class="arrowBtn__arrow"></div></button>`,
  events: { handleClick },
});
