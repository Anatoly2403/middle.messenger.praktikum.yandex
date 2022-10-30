import { Component, prepareComponent } from '../../core/base/component';
import { Link } from '../../components/link';
import './form.scss';

import { ISimpleObject } from '../../core/base/models';
import { InputField } from '../input-field';

export type TFormProps = {
  title: string;
  fields: ISimpleObject;
};

function getTemplate(this: Component) {
  return `
    <form class="form">
      <div class="form__title">
        <h3>{{ props.title }}</h3>
      </div>
      <div class="form__content">
        <div class="form__fields">
          {{#each props.fields}}        
            {{{ input-field name=name label=label }}}
          {{/each}}
          
        </div>
      </div>
        <div class="form__footer">
        </div>
    </form>
  `;
}

//

// {{{ link href="/main" label="Назад к чатам" }}}

export const Form = prepareComponent<TFormProps>({
  name: 'form',
  getTemplate,
  children: [Link, InputField],
});
