import { renderDOM } from './core/base/utils';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

const notFoundPage = NotFoundPage({ content: 'some text', some: true });

renderDOM('#app', notFoundPage);

setTimeout(() => {
  notFoundPage.setNewProps({
    content: 'asdasd text',
    some: false,
  });
}, 1000);

setTimeout(() => {
  notFoundPage.setNewProps({
    content: 'asdasd text',
    some: false,
  });
}, 2000);

setTimeout(() => {
  notFoundPage.setNewProps({
    content: 'some text',
    some: false,
  });
}, 3000);
