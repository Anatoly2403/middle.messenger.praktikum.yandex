import { createComponent } from '../../core/base/component';
import './not-found-page.scss';
import { Test } from './test';
import { TProps } from './types';

const template = `
  <div>
    {{content}}
    {{{ Test  }}}
  </div>
`;

export const NotFoundPage = createComponent<TProps>({
  name: 'not-found-page',
  template,
  children: [Test],
});
