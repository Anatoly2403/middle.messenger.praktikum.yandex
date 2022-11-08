import { prepareComponent } from '../../core/component';
import { Link } from '../../ui-kit/link';
import './error-page.scss';

const template = `
  <div class="error-page">
    <h1 class="error-page__code">500</h1>
    <p class="error-page__message">Мы уже фиксим</p>
    {{{ link href="/" label="Назад к чатам" }}}
  </div>
`;

export const ErrorPage = prepareComponent({
  name: 'error-page',
  template,
  children: [Link],
});
