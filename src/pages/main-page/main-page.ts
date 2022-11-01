import { prepareComponent } from '../../core/base/component';
import './main-page.scss';

const template = `
  <div class="root">
    <h1 class="root__code">MainPage</h1>   
  </div>
`;

export const MainPage = prepareComponent({
  name: 'main-page',
  template,
  children: [],
});
