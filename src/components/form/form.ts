import { Component, prepareComponent } from '../../core/base/component';
import './form.scss';
import { Link, TLinkProps } from '../../components/link';
import { InputField, TInputFieldProps } from '../input-field';
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

function onSubmit(this: Component<TFormProps>, e: Event) {
  e.preventDefault();
  const form = e.target as HTMLElement;
  const inputs = form.querySelectorAll('input');
  const formIsInvalid = this.props.fields.some((item) => {
    const field = Array.from(inputs).find((input) => input.name === item.name);
    if (isInputFieldProps(item)) {
      return item.validators && field && field.value
        ? item.validators.some((validator) => !validator(field.value))
        : true;
    } else {
      return item.required ? !!field?.files?.length : true;
    }
  });

  if (formIsInvalid) return;

  const data = Array.from(inputs).reduce<ISimpleObject>((acc, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {});

  this.props.onSubmit(data);
}

export const Form = prepareComponent<TFormProps>({
  name: 'form',
  template,
  children: [Link, InputField, FileField, Button],
  events: { onSubmit },
});
