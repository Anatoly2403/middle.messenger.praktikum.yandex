import { prepareComponent } from '../../core/base/component';
import { Link } from '../../ui-kit/link';
import './not-found-page.scss';

const template = `
    <div class="not-found-page">
      <h1 class="not-found-page__code">404</h1>
      <p class="not-found-page__message">Не туда попали</p>
      {{{ link href="/" label="Назад к чатам" }}}
    </div>
  `;

export const NotFoundPage = prepareComponent({
  name: 'not-found-page',
  template,
  children: [Link],
});
