import { Component, prepareComponent } from '../../core/component';
import './form.scss';
import { Link, TLinkProps } from '../../core/router/components/link';
import { InputField, inputValidator, TInputFieldProps } from '../../ui-kit/input-field';
import { Button, TButtonProps } from '../../ui-kit/button';
import { FileField, TFileFieldProps } from '../../ui-kit/file-field';
import { ISimpleObject } from '../../core/models';
import { prepareProps } from '../../utils/formUtils';

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
              {{{ 
                input-field 
                  key=@index 
                  name=name 
                  label=label 
                  validators=validators 
                  fieldType=fieldType 
                  errorText=errorText 
              }}}
            {{/if_eq}}            
            {{#if_eq type "fileField"}}
              {{{ file-field key=@index name=name label=label validators=validators }}}
            {{/if_eq}}            
          {{/each}}          
        </div>
      </div>
      <div class="form__submit">
        {{{ button key=1 type=props.button.type label=props.button.label }}}
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
      const isValid = item.required ? !field?.files?.length : true;
      if (!acc) acc = isValid;
    }
    return acc;
  }, false);
}

function onSubmit(this: Component<TFormProps>, e: Event) {
  e.preventDefault();
  const form = e.target as HTMLElement;
  const inputs = form.querySelectorAll('input');
  const formInValid = validateForm(this.props.fields, inputs);
  if (formInValid) return;
  const data = prepareProps(inputs);
  this.props.onSubmit(data);
}

export const Form = prepareComponent<TFormProps>({
  name: 'form',
  template,
  children: [Link, InputField, FileField, Button],
  events: { onSubmit },
});
