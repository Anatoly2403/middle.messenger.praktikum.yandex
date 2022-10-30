import { registerHbHelpers, renderDOM } from './core/base/utils';
import { ProfilePage } from './pages/profile-page/profile-page';

registerHbHelpers();

const page = ProfilePage({
  info: [],
  avatar: {
    src: '',
  },
  buttons: [],
  modal: {
    show: false,
  },
});

renderDOM('#app', page);
