import { renderDOM } from './core/base/utils';
import { ProfilePage } from './pages/profile-page/profile-page';

const page = ProfilePage({
  avatar: {
    src: '',
  },
  info: [],
  buttons: [],
  modal: {
    show: false,
    formData: undefined,
  },
});

renderDOM('#app', page);
