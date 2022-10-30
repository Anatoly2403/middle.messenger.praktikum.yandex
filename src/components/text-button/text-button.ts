import { Component, prepareComponent } from '../../core/base/component';
import './text-button.scss';

function getTemplate() {
  return `
    <button 
      {{#if props.type}}       
        class="text-button text-button_{{props.type}}" 
        {{else}}
        class="text-button" 
      {{/if}}    
      data-event="[click:handleClick]">
      <span>{{props.label}}</span>
    </button>
  `;
}

export type TTextButtonProps = {
  name: string;
  type?: string;
  label: string;
  onTextBtnClick?: (name: string) => void;
};

export const TextButton = prepareComponent<TTextButtonProps>({
  name: 'text-button',
  getTemplate,
  events: {
    handleClick(this: Component<TTextButtonProps>) {
      if (this.props.onTextBtnClick) this.props.onTextBtnClick(this.props.name);
    },
  },
});
