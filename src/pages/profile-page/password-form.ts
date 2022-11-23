import { Component, prepareComponent } from './../../core/component/Component';
import { Button } from '../../ui-kit/button';
import { TextField } from '../../ui-kit/text-field/text-field';

type TProfilePagePasswordForm = {
  onSubmit: (e: Event) => void;
  isDisabled: boolean;
};

const template = `
  <form class="profile-page__user-data" data-event="[submit:onSubmitData]">
    {{{text-field 
        key=0
        disabled=props.isDisabled
        name="oldPassword"
        errorMessage="Неверный пароль"
        label="Старый пароль"
        type='password'}}}
    {{{text-field 
        key=1
        disabled=props.isDisabled
        name="newPassword"
        errorMessage="Неверный пароль"
        label="Новый пароль"
        type='password'}}}
    {{#if props.isDisabled}}
      <div class="profile-page__user-data-submit">
        {{{button key=3 type="submit" label="Сохранить"}}}
      </div>
    {{/if}}
  </form>  
`;

export const ProfilePagePasswordForm = prepareComponent<TProfilePagePasswordForm>({
  name: 'profile-page-password-form',
  template,
  children: [TextField, Button],
  events: { onSubmitData },
});

function onSubmitData(this: Component<TProfilePagePasswordForm>, e: Event) {
  e.preventDefault();
  if (this.props.onSubmit) this.props.onSubmit(e);
}
