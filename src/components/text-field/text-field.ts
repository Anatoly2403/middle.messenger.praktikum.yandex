import { Component, prepareComponent } from '../../core/base/component';
import './text-field.scss';

export type TTextFieldProps = {
  name: string;
  label: string;
  value: string;
};

function getTemplate(this: Component) {
  return `
    <div class="text-field">
      <span class="text-field__title">{{ props.label }}</span>
      <input 
        class="text-field__value"
        name="{{ props.name }}"
        value="{{ props.value }}" 
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
