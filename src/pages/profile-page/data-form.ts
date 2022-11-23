import { Component, prepareComponent } from './../../core/component/Component';
import { Button } from '../../ui-kit/button';
import { TextField } from '../../ui-kit/text-field/text-field';

type TProfilePageDataForm = {
  onSubmit: (e: Event) => void;
  isDisabled: boolean;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

const template = `
  <form class="profile-page__user-data" data-event="[submit:onSubmitData]">
    {{{text-field 
      key=0 
      disabled=props.isDisabled
      name="email" 
      label="Почта"
      errorMessage="Некорректная почта"
      value=props.email}}}
    {{{text-field 
      key=1 
      disabled=props.isDisabled
      name="login" 
      label="Логин"
      errorMessage="Некорректный логин"
      value=props.login}}}
    {{{text-field 
      key=2 
      disabled=props.isDisabled
      name="first_name" 
      label="Имя"
      errorMessage="Некорректное имя"
      value=props.first_name}}}
    {{{text-field 
      key=3 
      disabled=props.isDisabled
      name="second_name" 
      label="Фамилия"
      errorMessage="Некорректная фамилия"
      value=props.second_name}}}
    {{{text-field 
      key=4 
      disabled=props.isDisabled
      name="display_name" 
      label="Имя в чате"
      value=props.display_name}}}
    {{{text-field 
      key=5 
      disabled=props.isDisabled
      name="phone" 
      label="Телефон"
      errorMessage="Некорректный телефон"
      value=props.phone }}}
    {{#if props.isDisabled}}
      <div class="profile-page__user-data-submit">
        {{{button key=2 type="submit" label="Сохранить"}}}
      </div>
    {{/if}}
  </form>  
`;

export const ProfilePageDataForm = prepareComponent<TProfilePageDataForm>({
  name: 'profile-page-data-form',
  template,
  children: [TextField, Button],
  events: { onSubmitData },
});

function onSubmitData(this: Component<TProfilePageDataForm>, e: Event) {
  e.preventDefault();
  if (this.props.onSubmit) this.props.onSubmit(e);
}
