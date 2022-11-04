import { Component, prepareComponent } from '../../core/base/component';
import './popup.scss';

type TPopupProps = {
  show: boolean;
  position?: 'over';
  items: { name: string; value: string }[];
  handler: (name: string | null) => void;
};

const template = `  
    <div class="popup {{#if_eq props.position "over"}}popup_over{{else}}popup_under{{/if_eq}}">
      {{#each props.items}}           
        <div class="popup__item" name={{name}} data-event="[click:handleClickOption]">{{ value }}</div>
      {{/each}} 
    </div>  
`;

export const Popup = prepareComponent<TPopupProps>({
  name: 'popup',
  template,
  events: {
    handleClickOption(this: Component<TPopupProps>, e: Event) {
      const name = (e.target as HTMLElement).getAttribute('name');
      if (this.props.handler) this.props.handler(name);
    },
  },
});
