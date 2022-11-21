import { Component, prepareComponent } from '../../core/component';
import './file-field.scss';

export type TFileFieldProps = {
  name: string;
  label: string;
  required?: boolean;
};

function handleInput(this: Component, e: Event) {
  const field = e.target as HTMLInputElement;
  const label = field.previousElementSibling as Element;
  const files = field.files || [];
  if (!files.length) return;
  label.textContent = files[0].name;
  label.classList.add(`file-field__label_full`);
}

const template = `
      <div class="file-field">
        <label class="file-field__label" for={{props.name}}>{{props.label}}</label>
        <input class="file-field__input" type="file" name="{{props.name}}" data-event="[input:handleInput]" />
      </div> 
  `;

export const FileField = prepareComponent<TFileFieldProps>({
  name: 'file-field',
  template,
  events: { handleInput },
});
