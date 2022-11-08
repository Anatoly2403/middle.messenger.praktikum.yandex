import { Component, prepareComponent } from '../../core/component';
import './text-button.scss';

export type TTextButtonProps = {
  name: string;
  type?: string;
  label: string;
  onTextBtnClick?: (name: string) => void;
};

function handleClick(this: Component<TTextButtonProps>) {
  if (this.props.onTextBtnClick) this.props.onTextBtnClick(this.props.name);
}

const template = `
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

export const TextButton = prepareComponent<TTextButtonProps>({
  name: 'text-button',
  template,
  events: { handleClick },
});
