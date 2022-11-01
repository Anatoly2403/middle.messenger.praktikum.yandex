import { Component, prepareComponent } from '../../core/base/component';
import './input-field.scss';

export type TInputFieldProps = {
  type: string;
  fieldType?: string;
  name: string;
  label: string;
  validators?: Array<(value: string) => boolean>;
};

function handleFocus(this: Component<TInputFieldProps>, e: Event) {
  const field = e.target as HTMLInputElement;
  const label = field.previousElementSibling as Element;
  label.classList.remove(`input-field__label_low`);
  if (field.value && this.props.validators) {
    const isInValid = this.props.validators.some((validator) => !validator(field.value));
    if (isInValid) field.classList.add(`input-field__input_invalid`);
    else field.classList.remove(`input-field__input_invalid`);
    return;
  }
}

function handleBlur(this: Component<TInputFieldProps>, e: Event) {
  const field = e.target as HTMLInputElement;
  const label = field.previousElementSibling as Element;

  if (field.value && this.props.validators) {
    const isInvalid = this.props.validators.some((validator) => !validator(field.value));
    if (isInvalid) field.classList.add(`input-field__input_invalid`);
    else field.classList.remove(`input-field__input_invalid`);
    return;
  }

  field.classList.remove(`input-field__input_invalid`);
  label.classList.add(`input-field__label_low`);
}

const template = `
    <div class="input-field">
      <label class="input-field__label input-field__label_low" for="{{ props.name }}">{{ props.label }}</label>
        <input 
          class="input-field__input" 
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
