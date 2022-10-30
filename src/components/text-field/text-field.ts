import { Component, prepareComponent } from '../../core/base/component';
import './text-field.scss';

export type TTextFieldProps = {
  name: string;
  label: string;
};

function getTemplate(this: Component) {
  return `
    <div class="text-field">
      <span class="text-field__title">{{ props.label }}</span>
      <input 
        name="{{ props.name }}"
        class="text-field__value" 
        value="asdasd" 
        type="text" 
        disabled
      />
    </div>
  `;
}

export const TextField = prepareComponent<TTextFieldProps>({
  name: 'text-field',
  getTemplate,
  events: {},
});
