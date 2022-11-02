import { Component, prepareComponent } from '../../core/base/component';
import './form.scss';
import { Link, TLinkProps } from '../../components/link';
import { InputField, inputValidator, TInputFieldProps } from '../input-field';
import { Button, TButtonProps } from '../button';
import { ISimpleObject } from '../../core/base/models';
import { FileField, TFileFieldProps } from '../file-field';

function isInputFieldProps(item: TInputFieldProps | TFileFieldProps): item is TInputFieldProps {
  return 'type' in item && item.type === 'inputField';
}

export type TFormProps = {
  title: string;
  fields: Array<TInputFieldProps | TFileFieldProps>;
  button: TButtonProps;
  link?: TLinkProps;
  onSubmit: (data: ISimpleObject) => void;
};

const template = `
    <form class="form" data-event="[submit:onSubmit]">
      <div class="form__title">
        <h3>{{ props.title }}</h3>
      </div>
      <div class="form__content">
        <div class="form__fields">
          {{#each props.fields}}
            {{#if_eq type "inputField"}}
              {{{ input-field key=@index name=name label=label validators=validators fieldType=fieldType }}}
            {{/if_eq}}            
            {{#if_eq type "fileField"}}
              {{{ file-field key=@index name=name label=label validators=validators }}}
            {{/if_eq}}            
          {{/each}}          
        </div>
      </div>
      <div class="form__submit">
        {{{ button type=props.button.type label=props.button.label }}}
      </div>
      {{#if props.link }}
        <div class="form__link">
          {{{ link href=props.link.href label=props.link.label }}}
        </div> 
      {{/if}}
    </form>
  `;

function validateForm(propsData: Array<TInputFieldProps | TFileFieldProps>, fields?: NodeListOf<HTMLInputElement>) {
  if (!fields) return true;
  return propsData.reduce<boolean>((acc, item) => {
    const field = Array.from(fields).find((input) => input.name === item.name);
    if (isInputFieldProps(item) && field) {
      const isValid = inputValidator(field, item.validators);
      if (!acc) acc = isValid;
    }
    if ('required' in item && field) {
      const isValid = item.required ? !!field?.files?.length : true;
      if (!acc) acc = isValid;
    }
    return acc;
  }, false);
}

function prepareProps(fields: NodeListOf<HTMLInputElement>) {
  return Array.from(fields).reduce<{ [key: string]: string | File }>((acc, item) => {
    if (item.type === 'file' && item.files) {
      acc[item.name] = item.files[0];
    } else {
      acc[item.name] = item.value;
    }
    return acc;
  }, {});
}

function onSubmit(this: Component<TFormProps>, e: Event) {
  e.preventDefault();
  const form = e.target as HTMLElement;
  const inputs = form.querySelectorAll('input');
  const formIsValid = validateForm(this.props.fields, inputs);
  if (!formIsValid) return;
  const data = prepareProps(inputs);
  this.props.onSubmit(data);
}

export const Form = prepareComponent<TFormProps>({
  name: 'form',
  template,
  children: [Link, InputField, FileField, Button],
  events: { onSubmit },
});
