import { prepareComponent } from '../../core/base/component';
import { Link } from '../../components/link';
import './error-page.scss';

const template = `
  <div class="root">
    <h1 class="root__code">500</h1>
    <h3 class="root__message">Мы уже фиксим</h3>
    {{{ link href="/main" label="Назад к чатам" }}}
  </div>
`;

export const ErrorPage = prepareComponent({
  name: 'error-page',
  template,
  children: [Link],
});
