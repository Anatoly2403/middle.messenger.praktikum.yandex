import { prepareComponent } from '../../core/component';
import './text-field.scss';

export type TTextFieldProps = {
  name: string;
  label: string;
  value: string;
  disabled: boolean;
  type?: string;
  errorMessage?: string;
};

const template = `
    <div class="text-field">
      <span class="text-field__title">{{ props.label }}</span>
      <input 
        class="text-field__value"
        name="{{ props.name }}"
        value="{{ props.value }}"
        {{#if_eq props.type "password"}}
          type="password"
        {{else}}
          type="text"
        {{/if_eq}}  
        {{#if_not props.disabled}}
          disabled
        {{/if_not}}       
      />  
      <span class="text-field__error">{{props.errorMessage}}</span>
    </div>
`;

export const TextField = prepareComponent<TTextFieldProps>({
  name: 'text-field',
  template,
});
