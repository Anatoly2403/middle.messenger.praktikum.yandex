import { renderDOM } from './core/base/utils';
import { LoginPage } from './pages/login-page/login-page';

const page = LoginPage({});

renderDOM('#app', page);
