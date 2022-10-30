import { registerHbHelpers, renderDOM } from './core/base/utils';
import { LoginPage } from './pages/login-page/login-page';

registerHbHelpers();

const page = LoginPage({});

renderDOM('#app', page);
