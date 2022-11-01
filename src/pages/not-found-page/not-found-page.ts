import { prepareComponent } from '../../core/base/component';
import { Link } from '../../components/link';
import './not-found-page.scss';

const template = `
    <div class="root">
      <h1 class="root__code">404</h1>
      <h3 class="root__message">Не туда попали</h3>
      {{{ link href="/main" label="Назад к чатам" }}}
    </div>
  `;

export const NotFoundPage = prepareComponent({
  name: 'not-found-page',
  template,
  children: [Link],
});
