import { prepareComponent } from '../../core/base/component';
import { Link } from '../../ui-kit/link';
import './error-page.scss';

const template = `
  <div class="root">
    <h1 class="root__code">500</h1>
    <p class="root__message">Мы уже фиксим</p>
    {{{ link href="/main" label="Назад к чатам" }}}
  </div>
`;

export const ErrorPage = prepareComponent({
  name: 'error-page',
  template,
  children: [Link],
});
