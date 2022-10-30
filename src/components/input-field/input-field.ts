import { Component, prepareComponent } from '../../core/base/component';
import './input-field.scss';

export type TInputFieldProps = {
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

function getTemplate(this: Component) {
  return `
    <div class="input-field">
      <label class="input-field__label input-field__label_low" for="{{ props.name }}">{{ props.label }}</label>
        <input 
          class="input-field__input" type="text" 
          name="{{ props.name }}" 
          data-event="[focus:handleFocus, blur:handleBlur]"  
        />
      <span class="input-field__error"></span>
    </div>
  `;
}

export const InputField = prepareComponent<TInputFieldProps>({
  name: 'input-field',
  getTemplate,
  events: { handleFocus, handleBlur },
});
