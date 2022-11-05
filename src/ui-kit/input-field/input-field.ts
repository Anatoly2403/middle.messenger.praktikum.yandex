import { Component, prepareComponent } from '../../core/base/component';
import './input-field.scss';

export type TInputFieldProps = {
  type: string;
  fieldType?: string;
  name: string;
  label: string;
  validators?: Array<(value: string) => boolean>;
};

export function inputValidator(input: HTMLInputElement, validators?: Array<(value: string) => boolean>) {
  const { value } = input;
  if (!validators || !validators.length) return true;
  const isInValid = validators.some((validator) => !validator(value));
  if (isInValid) input.classList.add(`input-field__input_invalid`);
  else input.classList.remove(`input-field__input_invalid`);
  return isInValid;
}

function handleFocus(this: Component<TInputFieldProps>, e: Event) {
  const field = e.target as HTMLInputElement;
  const label = field.previousElementSibling as Element;
  label.classList.remove(`input-field__label_low`);
  inputValidator(field, this.props.validators);
}

function handleBlur(this: Component<TInputFieldProps>, e: Event) {
  const field = e.target as HTMLInputElement;
  const label = field.previousElementSibling as Element;
  if (!field.value) label.classList.add(`input-field__label_low`);
  inputValidator(field, this.props.validators);
}

const template = `
    <div class="input-field">
      <label class="input-field__label input-field__label_low" for="{{ props.name }}">{{ props.label }}</label>
        <input 
          class="input-field__input {{#if props.invalid}}input-field__input_invalid{{/if}}" 
          type={{#if props.fieldType}} {{props.fieldType}} {{else}}'text'{{/if}}
          name="{{ props.name }}" 
          data-event="[focus:handleFocus, blur:handleBlur]"  
        />
    </div>
  `;

export const InputField = prepareComponent<TInputFieldProps>({
  name: 'input-field',
  template,
  events: { handleFocus, handleBlur },
});
