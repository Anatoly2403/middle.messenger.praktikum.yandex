import { registerHbHelpers, renderDOM } from './core/base/utils';
import { ProfilePage } from './pages/profile-page/profile-page';

registerHbHelpers();

const page = ProfilePage({});

renderDOM('#app', page);
