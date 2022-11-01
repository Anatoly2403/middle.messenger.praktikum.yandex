import { renderDOM } from './core/base/utils';
import { SigninPage } from './pages/signin-page/signin-page';

const page = SigninPage({
  fields: [],
  button: {
    type: '',
    label: '',
    onClick: undefined,
  },
  link: {
    href: '',
    label: '',
  },
});

renderDOM('#app', page);
